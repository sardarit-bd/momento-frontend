# Fix localStorage QuotaExceededError on checkout

## Problem
`QuotaExceededError` when calling `updateCart` in `usePhotoFinalPreview` (and similarly in `useDeckFinalPreview`). The persist middleware writes full base64 image payloads to `localStorage`, which has a 5–10 MB hard quota. A single box-capture PNG plus composited card images easily exceeds this.

## Root cause
| Store | Storage key | What blows it up |
|---|---|---|
| `usePhotoFinalPreview` | `momento-photo-preview-storage` | `BoxImage` (PNG dataURL), `boxImages[].src`, `boxImages[].image`, `CharacterImages` |
| `useDeckFinalPreview` | `momento-deck-preview-storage` | `CharacterImages`, `BoxImage` |
| `useboxcartstore` | `momento-box-storage` | Box payloads (size varies) |

All three use raw `localStorage` (or a thin wrapper in `useboxcartstore`) and never strip or offload large strings. `useCartStore` already has `safeLocalStorage` + `deepStripLargeImages` + IDB offload, but the preview stores do not.

## Fix: hybrid localStorage + IndexedDB storage
Offload any base64 string > 50 KB to IndexedDB before persisting. Keep only lightweight metadata and IDs in `localStorage`. Reuse the existing `idb.js` (`idbPut`, `idbGet`, `idbDelete`).

### Tasks
1. **Create `store/idbBlobCache.js`**
   - `saveBlobs(prefix, obj)` — recursively walk object, find `data:image/...` strings > 50 KB, save each to IDB under key `${prefix}:blob:${path}`, return a new object with those values replaced by `{ __blobRef: "${path}" }`
   - `restoreBlobs(prefix, obj)` — walk object, replace `__blobRef` values with the actual data URL from IDB
   - `deleteBlobs(prefix)` — remove all IDB records for the prefix

2. **Create `store/createHybridStorage.js`**
   - Factory returning a zustand-compatible storage adapter (`getItem`, `setItem`, `removeItem`)
   - `setItem`: call `saveBlobs(prefix, JSON.parse(value))`, then `JSON.stringify` the stripped object and write to real `localStorage`
   - `removeItem`: call `deleteBlobs(prefix)` then `localStorage.removeItem`
   - `getItem`: return `localStorage.getItem` (stripped payload). Images are ephemeral for these stores; no automatic hydration needed because the real durable copy lives in `useCartStore` → IDB and is restored at checkout.

3. **Update `usePhotoFinalPreview`**
   - Replace `storage: createJSONStorage(() => localStorage)` with `storage: createJSONStorage(() => createHybridStorage("momento-photo-preview"))`
   - No change to `partialize`, actions, or call sites.

4. **Update `useDeckFinalPreview`**
   - Same treatment: `createHybridStorage("momento-deck-preview")`

5. **Update `useboxcartstore`**
   - Replace the inline `localStorage` wrapper with `createHybridStorage("momento-box")`

6. **(Optional, but recommended) Proactive quota guard on `updateCart` in final pages**
   - In `photoportrait/page.js`, `box-customizer/page.js`, and `customization/page.js`, before calling `updateCart(...)` with box data, call a tiny helper that pre-extracts the largest blobs to IDB. This gives an extra safety margin if a future change bypasses `partialize`.
   - Example: `await saveBlobs("photo-preview", { BoxImage, boxImages, CharacterImages })` then `updateCart(payloadWithoutRawImages)`.

7. **Test matrix**
   - Single large photo upload (3–5 MB source) → box capture → checkout. No console error.
   - Multiple cards with photos + Joker → same.
   - Deck with many character images → same.
   - Verify `/final/photoportrait` previews still render images (in-memory state is untouched; only the persisted copy is stripped).
   - Verify checkout restores all images from IDB (`restorePhotoCartImagesFromIDB`, `restoreDeckCartImagesFromIDB`).
   - Verify a page refresh on `/final/photoportrait` does not crash (preview store reloads stripped metadata gracefully).
   - Run `npm run lint` and `npm run build`.

## Risks / mitigation
- **Lost images after refresh**: intentional. These stores are ephemeral session state. The durable cache is `useCartStore` → IDB, restored at checkout.
- **IDB quota**: IndexedDB is typically 50–80 % of free disk vs localStorage's 5–10 MB. Safe for image cache.
- **Performance**: Blob extraction walks the object only on `setItem` (checkout/add-to-cart), not on every render. Acceptable.
