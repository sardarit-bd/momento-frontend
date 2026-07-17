# Send Photo Portrait Box to Backend

## Problem
Photo portrait checkout sends `tuckbox_image: null` to the backend. Admin cannot display the user's customized photo portrait box. Root causes:
1. `final/photoportrait/page.js` and `box-customizer/page.js` call `usePhotoFinalPreview.updateCart(...)` only — updates the preview store, not the real cart (`useCartStore`).
2. Checkout reads `hydratedCart` from `useCartStore`, so `item.BoxImage` is always `null` for photo items.
3. Checkout hardcodes `tuckbox_image: null`.

## Backend Findings (momento_backend)
- `storage/app/private/tuckbox/photo-portrait-box.png` — template exists.
- `StripeGatewayService.php:210` — saves `tuckbox_image_blob` **only for deck items** (`customization_mode === 'deck'`), not for `photo`.
- `PublishDeckJob.php:155` — processes only deck items. No `PublishPhotoPortraitJob` exists yet.
- Admin `orders/page.js:343` reads `tuckbox_image` from order items for display.

## Design Decision
**Send the pre-composited `BoxImage` as `tuckbox_image` for photo portrait items.**

Rationale:
- `BoxImage` is already captured via `dom-to-image-more` at checkout — user-adjusted positions are baked into the PNG.
- Matches the existing `tuckbox_image` field semantics (single rendered box image).
- Backend admin already displays `tuckbox_image`.
- Avoids payload bloat from raw `boxImages` base64 and avoids needing a new upload/cloud-storage flow.
- Preserves exact user positioning without requiring backend re-compositing.

Trade-off: Photo portrait orders will not yet get a TGC tuckbox (no job processes them). Admin display works immediately. TGC integration can follow later with a new `PublishPhotoPortraitJob` if needed.

## Changes

### Frontend

#### 1. Sync `BoxImage` (and `boxImages`) to real cart on capture
**Files:**
- `app/(allsite)/(site)/final/photoportrait/page.js`
- `app/(allsite)/(site)/final/box-customizer/page.js`

After calling `usePhotoFinalPreview.updateCart({...photocart[0], BoxImage: boxImage})`, also call the real `useCartStore.updateCart(...)` so `hydratedCart` carries the captured box image.

#### 2. Add `updateCart` action to `useCartStore`
**File:** `store/useCartStore.js`
- Add `updateCart(updatedItem)` that maps over `cart` and merges by `id`.

#### 3. Populate `tuckbox_image` for photo items in checkout payload
**File:** `app/(allsite)/(site)/my-cart/checkout/page.js`
- Replace `tuckbox_image: null` with logic:
  - `photo` item → `deckItem?.BoxImage ?? null`
  - `deck` item → keep existing `tuckbox_characters` / `tuckbox_image` behavior
  - `trading` item → keep existing behavior

### Backend (momento_backend)

#### 4. Save `tuckbox_image_blob` for photo items
**File:** `momento_backend/app/Services/PaymentGateway/StripeGatewayService.php`
- Expand the deck-only condition at line 210 to also include `customization_mode === 'photo'`.
- This stores the sent `tuckbox_image` as `tuckbox_image_blob` on the photo portrait order item.

## Validation
- Photo portrait checkout sends `tuckbox_image` with a valid data URL.
- Backend stores it as `tuckbox_image_blob` on the order item.
- Admin orders page renders the photo portrait box in "Box Preview".
- Deck card and trading card logic unchanged.

## Out of Scope
- New `PublishPhotoPortraitJob` for TGC tuckbox creation.
- Uploading `boxImages` to cloud storage and sending URLs.
- Backend re-compositing from source images + position metadata.
