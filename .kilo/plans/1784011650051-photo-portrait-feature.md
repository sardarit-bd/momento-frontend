# Photo Portrait — Implementation Plan

## Goal
Add a **separate, self-contained** feature **"Photo Portrait"** at `/application/photoportrait/[slug]`
for products of `type: "photo"`. It mirrors the Momento Portrait Deck customizer **exactly**, with
one addition: an optional **user‑uploaded photo** that, when provided, **replaces the layered
character** on the card. The character layers stay available as the default character.

> **NON‑NEGOTIABLE:** Do **not** modify or break any existing deck / trading logic or code.
> Photo Portrait is implemented by **duplication** into new files; every shared component used by
> the deck (`CardPreview`, `CardSidebar`, `SideController`, `LayerSelector`, `BaseSelector`,
> `MobileCustomizerSheet`, `CardThumbnail`, `useDeckFinalPreview`, `useCartStore` deck helpers)
> is reused **read‑only** — never edited.

## Resolved decisions
- **Backend:** Reuse the existing external API. A `photo` product exists / will be created in the
  backend with `customizations.base_cards` **and the layer arrays** (dresses, skin_tones, hairs,
  crowns, beards, eyes, mouths, noses) — same shape as `customizable`. No new endpoint required.
  The customized card images (base64) are sent to the backend as usual via checkout.
- **Image storage:** Client‑side only. `FileReader → dataURL`, composited onto the base card via
  canvas, persisted like the deck (IndexedDB + localStorage). No upload server needed.
- **Code strategy:** Duplicate the deck customizer into a standalone `photoportrait` route.
  Add a `PhotoUploader` alongside the existing `LayerSelector`. No existing file is edited.
- **URL / type:** `/application/photoportrait/[slug]`, product `type: "photo"`.
- **Character vs photo:** Character **layers are the default**. If `userPhoto` is set on a card,
  it **overrides** the layered character everywhere (preview, thumbnail, composite, box preview).

## Data model (per card slot)
Photo card: `{ editedCard, baseImage, slotName, selectedLayers, userPhoto }`
- `selectedLayers` — same as deck (default character).
- `userPhoto` — `null` by default; a dataURL string once the user uploads a photo.
`FinalProduct` item (to cart/backend): `{ rank, image (composite), name, character_image }`
where `image`/`character_image` are built from `userPhoto` when present, else from layers.
`customization_mode: "photo"`.

## Files to create
1. **Route page** — `app/(allsite)/(application)/application/photoportrait/[slug]/page.jsx`
   Copy of `app/(allsite)/(application)/application/deckcard/[slug]/page.jsx` with these changes
   ONLY (deck file untouched):
   - Card model gains `userPhoto: null` (keep `selectedLayers`).
   - Add `selectPhotoImage(dataUrl)` — sets `userPhoto` for the active card (parallel to
     `selectLayerImage`). `selectPhotoImage(null)` clears it.
   - `compositeCardToBase64(card)`: if `card.userPhoto` → draw base + photo; else → draw base +
     layers (existing layer logic copied verbatim). 750×1050 canvas, `crossOrigin="anonymous"`.
     For the photo, draw it **once**, centered in the character region, `object-fit: contain`
     (do **not** mirror it upside‑down like the layers).
   - `compositeCharacterOnly(card)`: if `card.userPhoto` → return the photo; else → layers composite.
   - `Done`/`goToFinalView`/`addNewCard`/`handleAddJokerCard`: keep layer init logic **and** set
     `userPhoto: null` on new cards. 4‑card‑type requirement unchanged (photo is optional).
   - Use **distinct localStorage keys** so deck saved sessions are never overwritten, e.g.
     `photoCustomCards:${slug}`, `photoCustomCardsActiveIndex:${slug}` (+ `photoCustomCards`
     generic fallback). Keep the same sanitize / re‑sort logic, keyed off `userPhoto`+`selectedLayers`.
   - Push to `usePhotoFinalPreview` store + `savePhotoCartImagesToIDB` (new), then
     `router.push('/final/photoportrait')` (or `…/checkout`).
   - Joker upsell: keep. Joker slot may also carry `userPhoto` (overrides its empty layers).
   - Render `PhotoCardPreview`, `PhotoCardSidebar`, `PhotoMobileCustomizerSheet` (new components).
2. **`app/componnent/PhotoUploader.jsx`** (new) — Props: `activeCard, selectPhoto`. File input
   (`accept="image/*"`), drag‑and‑drop, `FileReader` → dataURL, preview thumbnail, remove button.
   Validate type (png/jpg/webp) and size (e.g. ≤ 10 MB). Calls `selectPhoto(dataUrl)` /
   `selectPhoto(null)`. Shows current state: "Using your photo" vs "Using default character".
3. **`app/componnent/PhotoSideController.jsx`** (new) — Composes **reused, unmodified**
   `BaseSelector` + `LayerSelector` + new `PhotoUploader`. Props bundle the deck ones plus
   `selectPhoto`. (SideController itself is NOT edited.)
4. **`app/componnent/PhotoCardPreview.jsx`** (new) — Copy of `CardPreview` rendering logic: if
   `activeCard.userPhoto` → render base + photo; else → base + layers (verbatim copy of layer
   rendering). (`CardPreview` is NOT edited.)
5. **`app/componnent/PhotoCardThumbnail.jsx`** (new) — Copy of `CardThumbnail` with the same
   userPhoto‑over‑layers branch. (`CardThumbnail` is NOT edited.)
6. **`app/componnent/PhotoCardSidebar.jsx`** (new) — Copy of `CardSidebar` but imports
   `PhotoCardThumbnail` (reuse `AddNewCardBtn`). (`CardSidebar` is NOT edited.)
7. **`app/componnent/PhotoMobileCustomizerSheet.jsx`** (new) — Copy of `MobileCustomizerSheet`
   mounting `PhotoSideController` and passing `selectPhoto`. (`MobileCustomizerSheet` is NOT edited.)
8. **`store/usePhotoFinalPreview.js`** (new) — Copy of `useDeckFinalPreview` with a separate
   persisted store name (e.g. `momento-photo-preview-storage`), holding `photocart: []`.
   (`useDeckFinalPreview` is NOT edited.)
9. **`app/(allsite)/(site)/final/photoportrait/page.jsx`** (new) — Copy of
   `app/(allsite)/(site)/final/customization/page.js`, but reads `usePhotoFinalPreview`
   (`photocart[0]`) and renders `DeckBoxPreview characterImages={photocart[0].CharacterImages}`.
   (`final/customization/page.js` is NOT edited.)

## Files to modify
10. **`store/useCartStore.js`** — ADD (do not alter deck helpers) `savePhotoCartImagesToIDB` +
    `restorePhotoCartImagesFromIDB`, parallel to the deck helpers, key `cart-photo-images:${id}`,
    matching `item.customization_mode === "photo"`. Reuse the existing `idb.js` import.
11. **`app/(allsite)/(site)/my-cart/checkout/page.js`**
    - In the IDB restore step, also call `restorePhotoCartImagesFromIDB` (or extend
      `restoreDeckCartImagesFromIDB` to also accept `"photo"` — without changing deck behavior).
    - Treat `customization_mode === "photo"` exactly like `"deck"` for: box preview
      (`DeckBoxPreview`), Joker +$7 pricing (`hasJokerCard`), and order payload building.
    - The "edit" redirect at `checkout/page.js:541` must also branch: photo →
      `/application/photoportrait/${editableItem.productSlug}`.
12. **`app/(allsite)/(site)/shop/page.js`** — add filter option `photo` → label "Photo Portrait"
    (alongside Trading / Deck). Grid already filters by `p.type`.
13. **`app/(allsite)/(site)/shop/[slug]/page.jsx`**
    - `handleaddToCustomizable`: add `else if (type === "photo") router.push('/application/photoportrait/'+slug)`.
    - Button / type label: add `photo` → "Create Your Photo Portrait" / "Photo Portrait".

## Out of scope (optional)
- Dedicated landing/marketing section for Photo Portrait (deck has one in
  `app/(newLandingPageUpdate)/newlanding/page.js`). Discovery via `/shop` is enough for v1.
- Server‑side upload / persistent storage of the user photo (not needed; client‑side like deck).

## Validation
- `npm run lint` and `npm run build` pass.
- Manual: create a `photo` product in the backend with `base_cards` + layer arrays; open `/shop`,
  filter Photo Portrait, open product, "Create Your Photo Portrait" → `/application/photoportrait/[slug]`.
- Verify the **default** character (layers) renders with no photo uploaded (identical look to deck).
- Upload a photo per King/Queen/Jack/Ace → it **overrides** the layered character in preview,
  sidebar thumbnail, add/remove/reorder, and Joker upsell. Switching base type keeps the photo.
- Clear the photo → falls back to the layered character.
- Finish → `/final/photoportrait` shows composited cards + box preview (photo or character per card);
  Add to Cart → checkout restores images from IDB; edit from checkout returns to the photoportrait
  customizer.
- **Regression:** confirm deck (`/application/deckcard/[slug]`), trading, shop, and checkout are
  100% unchanged (separate stores, separate localStorage keys, separate component files).

## Risks / notes
- Composite `canvas.toDataURL` requires the remote **base** image to allow CORS
  (`crossOrigin="anonymous"`) — already true for the deck; unchanged.
- Large photo dataURLs live in IndexedDB (localStorage strips big images) — same safeguard as deck.
- Because components are duplicated, future deck bug‑fixes must be ported manually; acceptable for
  a "totally separate" feature that must never regress the existing deck.
