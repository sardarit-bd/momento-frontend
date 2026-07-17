# Plan: Photo Portrait Box — Backend Regeneration (separate from deck/trading)

## Goal
Add a **separate, isolated** backend path that regenerates the photo-portrait tuckbox image
using the new template `storage/app/private/tuckbox/photo-portrait-box.png` (2325×1950, RGBA)
plus the user's customized box photo(s), perfectly aligned. Mirror the existing
`PublishDeckJob` / `TuckBoxCompositeService` flow so the photo product is published to TGC
(game → folder → deck → tuckbox → 54 cards → cart → pay) **without touching deck or trading logic**.

## Current state (verified by reading code)
- Frontend `app/componnent/PhotoPortraitBoxPreview.jsx` draws box photos into a zone:
  - Zone box: `top:43%, left:10%, width:36%, height:42%` of the 2325×1950 canvas.
  - Slot layout identical math to `TuckBoxCompositeService::getZone2Layout` (1–5 images, with
    `x%`, `y%`, `size%`, `clip` insets, `z` order). Inner img: `object-fit:cover`,
    `object-position:top center`, `transform: scale(zoom)`, slot `transformOrigin: bottom center`.
- Frontend stores box data on the photocart item:
  - `boxImages`: `[{ id, src(dataURL), zoom, x, y }]` (structured, per-image).
  - `BoxImage`: a single flattened PNG captured via `dom-to-image-more` (NOT sent to backend today).
- `app/(allsite)/(site)/my-cart/checkout/page.js`:
  - `deriveCustomizationMode` returns `"photo"` for `productType==="photo"`.
  - `normalizeDeckFinalProduct` sends 54 `FinalProduct` cards → backend stores as `card_type='photo'`.
  - **Today `boxImages`/`BoxImage` are NOT sent** (`cartItems` omits them; `tuckbox_image: null`).
- Backend receives photo order item with `customization_mode='photo'` and 54 `OrderItemCard`s
  (`card_type='photo'`), but no box image is generated/published.
- `PublishDeckJob` is dispatched from `WebhookController` only when `hasDeck` (type deck / mode deck).
  There is no photo branch.

## Frontend change required (so backend can re-align perfectly)
Send the **structured `boxImages`** (not just the flattened blob) to the backend, one entry per photo:
`{ src (base64 dataURL), zoom, x, y }`. The backend composites each onto the template using the
same layout math, giving exact alignment. Keep `BoxImage` as an optional quick preview only.

In `checkout/page.js` `cartItems` map (≈ line 735), add for photo items:
```js
boxImages: item.boxImages ?? [],
```
(Already available on the cart item from the photocart store.) Backend decodes each `src` via the
existing `decodeBase64Image` helper.

## Backend implementation (all NEW files, plus minimal non-destructive additions)

### 1. New service: `app/Services/TGC/PhotoBoxCompositeService.php`
Mirror `TuckBoxCompositeService` but for the photo box.
- `TEMPLATE_PATH = 'tuckbox/photo-portrait-box.png'` (loaded via `Storage::disk('local')->path(...)`).
- `composite(array $boxImages): string` where each element is
  `[ 'blob' => decodedPngString, 'zoom' => float, 'x' => px, 'y' => px ]`.
- Canvas 2325×1950 (constants W/H). Enable alpha blending + save-alpha (template is RGBA).
- Zone 2 (the only used zone for photo box):
  - `zX = round(W*0.10)`, `zY = round(H*0.43)`, `zW = round(W*0.36)`, `zH = round(H*0.42)`.
- Reuse the EXACT `getZone2Layout($total)` logic from `TuckBoxCompositeService`
  (1→5 images, `x%`, `y%`, `size%`, `clip` insets, `z` order) so on-box positions match the preview.
- Per slot drawing (reproduce `PhotoPortraitBoxPreview` CSS):
  - `slotW = round(zW * size)`, `slotH = round(slotW * 4/3)`.
  - Center x in zone: `cx = zX + zW/2 + x% * zW`.
  - Anchor `bottom center`: `destX = cx - scaledW/2`, `destY = (zY + zH) - scaledH + (y% * zH) + userYpx`.
    (`y%` positive moves image DOWN in CSS translateY; bottom-anchored math matches preview.)
  - `scaledW = slotW * zoom`, `scaledH = slotH * zoom`, plus user `x`/`y` px offset.
  - Draw image with `imagecopyresampled` (cover, anchored top) sized to `scaledW×scaledH` of the
    source; apply `clip` insets via the existing `applyInsetClip()` copied from `TuckBoxCompositeService`.
  - Copied helpers (private, identical): `applyInsetClip`, `applyRoundedMask`, `applyCircularMask`,
    `toPng`. Do NOT modify the deck service.
- Return PNG blob string. No-op image (just template) when `$boxImages` empty.

### 2. New job: `app/Jobs/TGC/PublishPhotoJob.php`
Copy `PublishDeckJob` structure; isolate for photo:
- Load order with `orderItems.cards` + `shippingInformation`.
- Steps 1–2: game + folder (identical).
- Step 3: create deck (same `PokerDeck` identity + `backId` as deck). Note: photo currently sends
  cards with `rank` set; use `backId` constant from `PublishDeckJob`.
- **Step 4 (box) — NEW:** read the photo item's `boxImages` payload. Because the per-image blobs
  must survive the queue, store boxImages on the order item at order-create time:
  - Add column `photo_box_images` (JSON) to `order_items` via a NEW migration (see #4).
  - In `OrderController::storeOrderItemCards` (NON-breaking): when `customization_mode==='photo'`,
    also persist `$item['boxImages']` to `photo_box_images` JSON column (guard with `isset`).
  - `PublishPhotoJob` reads `photoItem->photo_box_images`, decodes each `src`→blob, calls
    `PhotoBoxCompositeService::composite(...)`, writes temp PNG, uploads as folder file
    `name:'tuckbox-outside'`, gets `boxFileId`.
  - Also save the blob to `order_items.photo_box_image_blob` (new column) for admin preview, mirroring
    `tuckbox_image_blob`.
- Step 5: `createTuckBox` with `outsideId: boxFileId` (identical pattern).
- **Step 6 (cards) — photo variant:** upload the 54 `card_type='photo'` cards (use the same
  `resizeImageTo825x1125` + 54-slot order logic as deck; filter `where('card_type','photo')`).
  Reuse `DECK_RANKS` order so face slots align. (Photo sends King/Queen/Jack/Ace + optional Joker =
  53 or 54 cards; default the missing slots like `writeDefaultCard`.)
- Steps 7–14: cart, address, attach, SKU, user, shop-credit validate, pay, receipt — identical to deck.
- Keep `resizeImageTo825x1125`, `setStatus`, `cleanup` private copies. Do not alter `PublishDeckJob`.

### 3. Dispatch wiring (NON-breaking addition in `WebhookController::handleCheckoutCompleted`)
Add a `$hasPhoto` check alongside `$hasDeck`/`$hasTrading`:
```php
$hasPhoto = $order->orderItems->contains(fn($i) =>
    strtolower((string) optional($i->product)->type) === 'photo'
    || $i->customization_mode === 'photo');
if ($hasPhoto) \App\Jobs\TGC\PublishPhotoJob::dispatch($order->id);
```
Do not change deck/trading branches.

### 4. Migration (NEW, additive only)
- `database/migrations/2026_07_16_000001_add_photo_box_columns_to_order_items.php`
  - `photo_box_images` JSON nullable (structured payload from frontend).
  - `photo_box_image_blob` longText nullable (generated composite, for admin/preview).
  - `photo_box_image_mime` string nullable.
- Add these three to `OrderItem::$fillable` and `OrderItem::$hidden` (hidden only the blob/mime).
  Add `'photo_box_images' => 'array'` cast.

### 5. Admin preview (optional, NON-breaking)
`app/(allsite)/(dashboard)/deshboard/admin/orders/page.js` `extractTuckboxImages` currently reads
`item.tuckbox_image`. Leave deck as-is; photo box can be shown later from `photo_box_image_blob`
if desired — out of scope unless requested.

## Files touched
NEW:
- `app/Services/TGC/PhotoBoxCompositeService.php`
- `app/Jobs/TGC/PublishPhotoJob.php`
- `database/migrations/2026_07_16_000001_add_photo_box_columns_to_order_items.php`
EDITED (additive/surgical):
- `app/Http/Controllers/OrderController.php` — persist `boxImages`→`photo_box_images` for photo mode.
- `app/Models/OrderItem.php` — add fillable/hidden/cast for new columns.
- `app/Http/Controllers/PaymentGateway/WebhookController.php` — add `$hasPhoto` dispatch.
- `app/(allsite)/(site)/my-cart/checkout/page.js` — send `boxImages` in `cartItems` for photo.
UNTOUCHED: `TuckBoxCompositeService.php`, `TradingBoxCompositeService.php`, `PublishDeckJob.php`,
`PublishTradingJob.php`, `StripeGatewayService.php` deck/trading box logic.

## Key decisions
- Backend drives alignment from structured `boxImages` (per-image blob + zoom/x/y), reproducing the
  frontend `PhotoPortraitBoxPreview` zone math exactly → "perfect align".
- Photo product is published to TGC exactly like the deck (54-card PokerDeck + tuckbox), in its own job.
- All new columns are additive; no change to deck/trading schema or logic.

## Validation
1. `php artisan migrate` applies the new order_items columns without error.
2. Place a test photo order via the frontend (King/Queen/Jack/Ace + 1–5 box photos). Confirm
   `order_items.photo_box_images` JSON and 54 `card_type='photo'` cards are saved.
3. Trigger `PublishPhotoJob` (webhook/dispatch). Confirm in logs:
   - box composite uploaded (`boxFileId` resolved),
   - 54 cards uploaded in correct slot order,
   - cart created, shop credit paid, receipt fetched → status `completed`.
4. Compare generated `photo_box_image_blob` against the frontend preview: photo(s) land in the
   same zone (top 43% / left 10% / 36%×42%) with matching zoom/offset.
5. Regression: a deck order and a trading order still dispatch their existing jobs and succeed;
   no deck/trading file is modified.

## Open questions (acceptable to proceed)
- Photo deck back design: reuse the same `backId` as deck (`A5466D20-...`). Confirm with TGC if a
  photo-specific back is required; otherwise identical is fine.
- Joker handling: photo may include 1 Joker (53 cards) — `PublishPhotoJob` defaults the missing
  54th slot like `writeDefaultCard`. Confirm acceptable.
