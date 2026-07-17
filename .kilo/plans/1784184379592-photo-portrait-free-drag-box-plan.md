# Plan: Photo Portrait Box — Resolved-Rect Capture & Print-Quality Delivery

## Goal
Let users place image(s) **anywhere** on the photo portrait box (free drag, not locked slots), and
deliver **print-quality, backend-regenerated** box art — not a client-side raster flatten.

## Current implementation (rect-capture approach — ACTIVE)

### Root-cause findings (verified against rendered output + source)

Two prior rounds tried to replay the frontend's CSS transform math
(`translateX/Y` with `transform-origin: bottom center` + a separate `scale()` on the inner `<img>`)
in PHP from a drag delta. That replay was never exactly right. The fundamental problems, confirmed
by inspecting actual rendered output:

1. **Position/size mismatch.** Reconstructing a resolved CSS transform from a delta does not
   reliably reproduce the frontend placement. The browser already *resolves* the final geometry; we
   should read that output directly, not re-derive it.
2. **Missing clipping (the critical defect).** The single-photo layout returns no `clip` key from
   `getLayout()`, so the old backend never clipped — the photo was drawn straight onto the canvas and
   overflowed into the barcode/logo/template art. In the frontend, every slot `<div>` has
   `overflow-hidden` **unconditionally** as a base class, independent of any decorative `clip` inset
   preset. Clipping to the frame boundary and applying the extra inset preset are **two separate
   operations** in the browser and must be two separate operations in the backend.
3. **object-fit: cover not replicated.** The inner `<img>` uses `object-cover`, so the browser crops
   the source to fill the frame while preserving aspect ratio. The backend must not stretch the source
   into the frame rect; it must honor the already-cropped bounding box.

### Strategy change (this is the fix)

**Stop replaying transforms. Capture the browser's resolved geometry and send it directly.**

- At submit time (once, when the user finishes editing — NOT on every drag tick), the frontend reads
  each slot `<div>` (`data-img-id`, has `overflow-hidden` + transform) and its inner `<img>`
  (`object-cover` + `scale(zoom)`) `getBoundingClientRect()`, converts both to fractions of the outer
  box container's own rect, and sends them in the payload.
- The backend converts those fractions to template pixels and composites directly — no transform
  replay, no `getLayout()`-driven position math.

### Frontend (this repo — `moments-custom-card`)

- `app/componnent/PhotoPortraitBoxPreview.jsx` is now a `forwardRef` component exposing
  `captureResolvedRects()` via `useImperativeHandle`. It reads
  `container.querySelectorAll('[data-img-id]')`, and for each captures:
  - `frame` = `slotEl.getBoundingClientRect()` (the overflow-hidden clip box)
  - `image` = `imgEl.getBoundingClientRect()` (the object-cover'd `<img>`)
  - both converted with `toFrac(rect) = { leftFrac, topFrac, widthFrac, heightFrac }` relative to
    the root container's `getBoundingClientRect()`.
  - **TEMP DEBUG:** `captureResolvedRects()` currently `console.log`s both rects. Run a manual
    drag/zoom of 2–3 photos and confirm in the console: `frame.widthFrac` ~ matches the slot `size`
    preset (e.g. ~0.55 single photo), and the `image` rect fully covers the `frame` rect. Remove the
    log once the numbers look reasonable.
- Live drag still accumulates `xFraction/yFraction` in the store for smooth preview (unchanged render
  path). The resolved `frame`/`image` rects are captured fresh from the DOM at submit.
- Submit paths wired to capture + merge rects into `boxImages`:
  - `app/(allsite)/(application)/application/photoportrait/[slug]/page.jsx` → `goToFinalView`
  - `app/(allsite)/(site)/final/box-customizer/page.js` → `handleAddToCart` / `handleCheckout`
  - `app/(allsite)/(site)/final/photoportrait/page.js` → `handleAddToCart` / `handleCheckout`
- Payload to backend (checkout builder in `app/(allsite)/(site)/my-cart/checkout/page.js`):
  each image is now `{ id, src, frame: {leftFrac,topFrac,widthFrac,heightFrac},
  image: {leftFrac,topFrac,widthFrac,heightFrac} }`. `xFraction/yFraction/zoom` removed from the
  payload (zoom is baked into the `image` rect already).
- `store/usePhotoFinalPreview.js` `partialize` persists `{ id, src, zoom, frame, image }` per image
  so the resolved rects survive a refresh before submit. (Investigation result: capture is live
  during drag for preview, but the *resolved* rects must be persisted to survive refresh — so the
  store DID need to change, not just the payload builder.)

### Backend (Laravel repo — `momento_backend/App/Services/TGC/PhotoPortraitBoxCompositeService`)

- Input contract: each `boxImages` entry is `['src' => string, 'frame' => [...], 'image' => [...]]`.
  `x_fraction`/`y_fraction`/`zoom` no longer used.
- `composite()` parses `frame`/`image` per entry (no more `x_fraction`/`zoom` normalization).
- New `fractionsToPixels()` converts `{leftFrac,topFrac,widthFrac,heightFrac}` → integer template
  pixels `[left, top, width, height]`.
- `drawFrontFace()` rewritten around per-photo resolved rects, in **array order** = z-order (earlier
  painted first/behind; no fixed z from `getLayout()`):
  1. Draw source photo resized to **exactly fill** the resolved `image` rect
     (`imagecopyresampled` to `imageRect` size). The object-cover crop is already encoded in
     `imageRect` by the browser — **no re-crop / re-fit here**.
  2. **Clip UNCONDITIONALLY to the resolved `frame` rect** (mirrors `overflow:hidden`). This applies
     to every photo, every layout, with no dependency on a `clip` preset key existing — this is the
     fix for the single-photo overflow defect.
  3. If this slot ALSO has a `getLayout()` decorative inset `clip` preset, apply it as a **SECOND,
     additional crop** on top of the frame clip — never as a replacement.
- `getLayout()` retained ONLY for the decorative inset preset values (the `clip` strings). It no
  longer drives position/size. Inset values themselves are untouched.
- New `debugRects()` returns the actual pixel rects GD will draw, for the numeric diff check.

## Regression / verification (done + runnable)

- **Zero-drag single photo** (`test_zero_drag_single_photo_is_clipped`): feeds the browser-resolved
  rect for an undragged single photo through the new path; asserts a non-empty rect fully inside the
  template (i.e. clipped to the frame, cannot overflow into barcode/logo). This is the exact prior
  defect and must not reproduce.
- **Rect round-trip** (`test_debug_rects_round_trip`): confirms `fractionsToPixels` maps captured
  fractions back to the expected pixels (delta ~0 modulo rounding).
- **All layout counts** (`test_all_layout_counts_composite`): runs 1, 2, and 5 photos; confirms the
  unconditional frame clip + second decorative inset crop hold across every `getLayout()` count.
- **Debug diff (manual):** `php artisan tinker` →
  `app(PhotoPortraitBoxCompositeService::class)->debugRects($savedPayload['photo_box_images'], 2325, 1950)`
  prints the pixel rects; diff against the frontend-captured fractions × template dims. Should be ~0px.
- Run: `cd momento_backend && php artisan test tests/Unit/PhotoPortraitBoxCompositeServiceTest.php`
  → 3 passed.

## Files touched

FRONTEND (`moments-custom-card`):
- `app/componnent/PhotoPortraitBoxPreview.jsx` — `forwardRef` + `captureResolvedRects()`; temp log
- `app/(allsite)/(application)/application/photoportrait/[slug]/page.jsx` — wire capture at submit
- `app/(allsite)/(site)/final/box-customizer/page.js` — wire capture at submit
- `app/(allsite)/(site)/final/photoportrait/page.js` — wire capture at submit
- `app/(allsite)/(site)/my-cart/checkout/page.js` — payload `{id,src,frame,image}`
- `store/usePhotoFinalPreview.js` — persist `frame`/`image`

BACKEND (`momento_backend`):
- `app/Services/TGC/PhotoPortraitBoxCompositeService.php` — rect-based compositor + `debugRects()`
- `tests/Unit/PhotoPortraitBoxCompositeServiceTest.php` — rect-contract tests

UNTOUCHED:
- `app/componnent/DeckBoxPreview.jsx`, deck/trading flows
- The decorative `clip` inset **values** in `getLayout()` (only how/when they're applied changed)

---

## SUPERSEDED: fraction-delta replay approach (kept for record — do not reuse)

> **Why superseded:** two rounds of trying to get the replay exactly right failed. Re-deriving a
> resolved CSS transform (translate + scale + transform-origin) from a drag delta in PHP is
> fundamentally fragile. We now capture the resolved geometry directly instead.

The earlier plan sent each image as `{ id, src, xFraction, yFraction, zoom }` and had the backend
replay the frontend formula: `slotW = zW * size`, `draggedLeft = baseLeft + x_fraction * slotW`, etc.,
with `overflow:hidden` clipping only when a `clip` preset existed. Confirmed failures:
- Position/size didn't reliably reproduce frontend placement.
- Single-photo layout had **no `clip` key**, so nothing clipped — photo overflowed the frame into
  barcode/logo.
- object-cover crop was not faithfully reproduced.

This approach is abandoned in favor of the resolved-rect capture above.

## Key decisions
- The browser's resolved geometry is the single source of truth; backend composites at print
  resolution directly from captured rects.
- Client-side DOM-flatten (`dom-to-image-more`) is retained only for the convenience `BoxImage`
  thumbnail (still sent as `tuckbox_image`), clearly separate from the print pipeline which uses the
  structured `photo_box_images` rects.
- Unconditional frame clipping + optional second decorative inset crop = two operations, matching the
  frontend's `overflow-hidden` + `clip-path` base/extra split.

## Risks / open questions
- **Temp debug log**: `captureResolvedRects()` logs to console — remove once 2–3 manual drag/zoom
  captures confirm reasonable numbers.
- **Live vs submit capture**: live drag still updates `xFraction/yFraction` for preview; the resolved
  `frame`/`image` rects are recomputed from the DOM at submit (most accurate). If a refresh happens
  between drag and submit, the store has the last-captured rects (null until first submit capture) —
  acceptable, since the preview re-resolves on submit.
- **image rect vs frame rect**: the `image` rect is the inner `<img>` bounding box after object-cover
  + zoom; it may extend beyond the frame (zoom) or be smaller (crop) — the unconditional frame clip
  handles the overflow case, matching `overflow:hidden`.
