# Photo Portrait — Implementation Plan

## Goal
Replicate the **Momento Portrait Deck** customizer as a separate, self-contained feature
**"Photo Portrait"** at `/application/photoportrait/[slug]` for products of `type: "photo"`.
The only functional difference: the composited *character* (built from `dresses, skin_tones,
hairs, crowns, beards, eyes, mouths, noses` layers) is replaced by a **user‑uploaded photo**.
Everything else (base‑card selection King/Queen/Jack/Ace, Joker upsell, box preview, cart,
checkout) behaves the same as the deck.

## Resolved decisions
- **Backend:** Reuse the existing external API (`NEXT_PUBLIC_API_BASE_URL`). A `photo` product
  already exists / will be created in the backend with `customizations.base_cards`. Frontend
  reads it exactly like a `customizable` product. No new backend endpoint required.
- **Image storage:** Client‑side only. `FileReader → dataURL`, composited onto the base card
  via canvas, persisted like the deck (IndexedDB + localStorage). Matches deck pattern, no
  upload server needed.
- **Code strategy:** Duplicate the deck customizer into a standalone `photoportrait` route.
  Swapped component: `LayerSelector` → new `PhotoUploader`. Lowest risk to the working deck.
- **URL / type:** `/application/photoportrait/[slug]`, product `type: "photo"`.

## Data model (per card slot)
Deck card: `{ editedCard, baseImage, slotName, selectedLayers }`
Photo card: `{ editedCard, baseImage, slotName, userPhoto }`   // `userPhoto` = dataURL string
`FinalProduct` item (to cart/backend): `{ rank, image (base+photo composite), name, character_image (photo) }`
`customization_mode: "photo"`.

## Files to create
1. **Route page** — `app/(allsite)/(application)/application/photoportrait/[slug]/page.jsx`
   Copy of `app/(allsite)/(application)/application/deckcard/[slug]/page.jsx` with these changes:
   - Remove ALL references to `layers` arrays and `selectedLayers` (initial layers, `addNewCard`,
     `Done`, `handleAddJokerCard`, `compositeCardToBase64`, `compositeCharacterOnly`,
     `selectLayerImage`). The `photo` product will NOT return layer arrays.
   - Card model uses `userPhoto` (not `selectedLayers`). `selectPhoto(dataUrl)` sets it.
   - `compositeCardToBase64(card)`: draw `baseImage`, then draw `card.userPhoto` once in the
     character region (centered, `object-fit: contain`, preserve aspect ratio). Do **NOT** mirror
     the photo upside‑down as the deck does for layers (a person photo should not be flipped).
     Keep 750×1050 canvas + `crossOrigin="anonymous"` for the remote base image.
   - `compositeCharacterOnly(card)`: return `card.userPhoto` (the uploaded photo) as the
     `character_image` used by the box preview.
   - `Done`/`goToFinalView`: require the 4 card types (King/Queen/Jack/Ace) like the deck;
     optionally also require `userPhoto` present before allowing "Next/Finish" (recommended).
   - Use **distinct localStorage keys** to avoid clashing with deck saved sessions, e.g.
     `photoCustomCards:${slug}`, `photoCustomCardsActiveIndex:${slug}` (plus a `photoCustomCards`
     generic fallback). Keep the same sanitize/re‑sort logic, but keyed off `userPhoto`.
   - Push to `usePhotoFinalPreview` store + `savePhotoCartImagesToIDB` (new), then
     `router.push('/final/photoportrait')` (or `…/checkout`).
   - Joker upsell: keep. Joker slot may also carry a `userPhoto`.
2. **`app/componnent/PhotoUploader.jsx`** (new) — replaces `LayerSelector`. Props:
   `product, activeCard, selectPhoto`. File input (`accept="image/*"`), drag‑and‑drop,
   `FileReader` → dataURL, preview thumbnail, remove button. Validate type (png/jpg/webp) and
   size (e.g. ≤ 10 MB). Calls `selectPhoto(dataUrl)` / `selectPhoto(null)` to clear.
3. **`app/componnent/PhotoSideController.jsx`** (new) — copy of `SideController`, but renders
   reused `BaseSelector` + new `PhotoUploader` (no `LayerSelector`). Props: `selectBase,
   selectPhoto, activeCard, product, editedCard, seteditedCard, activebaseEditCard,
   setactivebaseEditCard`.
4. **`app/componnent/PhotoCardPreview.jsx`** (new) — copy of `CardPreview`, renders `baseImage`
   + `userPhoto` (single, centered) instead of layers.
5. **`app/componnent/PhotoCardThumbnail.jsx`** (new) — copy of `CardThumbnail`, renders
   `baseImage` + `userPhoto` instead of layers.
6. **`app/componnent/PhotoCardSidebar.jsx`** (new) — copy of `CardSidebar`, imports
   `PhotoCardThumbnail` (reuse `AddNewCardBtn`).
7. **`app/componnent/PhotoMobileCustomizerSheet.jsx`** (new) — copy of `MobileCustomizerSheet`,
   mounts `PhotoSideController` and passes `selectPhoto`.
8. **`store/usePhotoFinalPreview.js`** (new) — copy of `useDeckFinalPreview` with a separate
   persisted store name (e.g. `momento-photo-preview-storage`), holding `photocart: []`.
9. **`app/(allsite)/(site)/final/photoportrait/page.jsx`** (new) — copy of
   `app/(allsite)/(site)/final/customization/page.js`, but reads `usePhotoFinalPreview`
   (`photocart[0]`) and renders `DeckBoxPreview characterImages={photocart[0].CharacterImages}`.
   Add‑to‑cart / checkout flow identical to deck final page.

## Files to modify
10. **`store/useCartStore.js`** — add `savePhotoCartImagesToIDB` + `restorePhotoCartImagesFromIDB`
    (parallel to the deck helpers, key `cart-photo-images:${id}`, matching
    `item.customization_mode === "photo"`). Reuse the shared `idb.js` import.
11. **`app/(allsite)/(site)/my-cart/checkout/page.js`**
    - In the IDB restore step, also call `restorePhotoCartImagesFromIDB` (or extend
      `restoreDeckCartImagesFromIDB` to also accept `"photo"`).
    - Treat `customization_mode === "photo"` exactly like `"deck"` for: box preview
      (`DeckBoxPreview`), Joker +$7 pricing (`hasJokerCard`), and order payload building.
    - The "edit" redirect at `checkout/page.js:541` must also branch on photo →
      `/application/photoportrait/${editableItem.productSlug}`.
12. **`app/(allsite)/(site)/shop/page.js`** — add filter option `photo` → label "Photo Portrait"
    (alongside Trading / Deck). Grid already filters by `p.type`, so a `photo` product appears.
13. **`app/(allsite)/(site)/shop/[slug]/page.jsx`**
    - `handleaddToCustomizable`: add `else if (type === "photo") router.push('/application/photoportrait/'+slug)`.
    - Button label / type label: add `photo` → "Create Your Photo Portrait" / "Photo Portrait".

## Out of scope (optional, confirm if wanted)
- A dedicated marketing/landing section for Photo Portrait (the deck has one in
  `app/(newLandingPageUpdate)/newlanding/page.js`). Discovery via `/shop` is sufficient for v1.
- Server‑side upload / persistent storage of the user photo (not needed; client‑side like deck).

## Validation
- `npm run lint` and `npm run build` pass.
- Manual: create a `photo` product in the backend with `base_cards`; open `/shop`, filter Photo
  Portrait, open product, "Create Your Photo Portrait" → lands on `/application/photoportrait/[slug]`.
- Upload a photo per King/Queen/Jack/Ace; verify preview, sidebar thumbnail, add/remove/reorder
  cards, Joker upsell, and that switching base type keeps the photo.
- Finish → `/final/photoportrait` shows composited cards + box preview; Add to Cart → checkout
  restores images from IDB; edit from checkout returns to the photoportrait customizer.
- Confirm deck flow (`/application/deckcard/[slug]`) is completely unaffected (separate stores,
  separate localStorage keys, separate components).

## Risks / notes
- Composite `canvas.toDataURL` requires the remote **base** image to allow CORS
  (`crossOrigin="anonymous"`) — already true for the deck; unchanged.
- Large photo dataURLs live in IndexedDB (not localStorage, which strips big images) — same
  safeguard the deck uses.
- Because components are duplicated, future deck bug‑fixes must be ported manually; acceptable
  for a "totally separate" feature.
