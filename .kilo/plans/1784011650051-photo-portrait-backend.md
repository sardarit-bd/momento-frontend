# Photo Portrait Backend Plan

## Goal
Add `photo` as a first-class product type in the existing Laravel backend, with independent per-product layers, so Photo Portrait is created/updated through the normal product flows.

## Decisions
- Backend: same Laravel app + same database
- Photo Portrait layers: independent per-product (not linked to a deck product)
- Product type enum becomes: `simple`, `customizable`, `trading`, `photo`

## Backend Tasks

### 1. Database Migration
- Create migration to alter `products.type` enum to include `photo`
- Keep existing data intact

### 2. Product Controller (`ProductController.php`)
- **Validation (`validateProductData`)**: add `photo` to allowed types
- **Store/Cardproduct**: allow `photo` type to save customizations (`hairs`, `eyes`, `base_cards`, etc.) independently
- **Update**: allow `photo` type to update customizations
- **Show/Index**: ensure `photo` products return customizations in API response
- **Formatting**: ensure `photo` products format same as other customizable types

### 3. Routes
- No new routes needed; reuse existing `apiResource('products')` + `cardproduct`

## Frontend Cleanup Tasks

### 4. Remove Toggle
- Remove `photoPortraitEnabled` toggle from `deshboard/admin/product/page.js`
- Remove `photo_portrait_enabled` payload from `componnent/Three.jsx`

### 5. Admin Product Page
- Ensure product type selector includes `Photo Portrait`
- Ensure layer upload works for `photo` type same as `customizable`

### 6. Shop & Checkout
- `shop/page.js`: keep existing `type === "photo"` filter
- `shop/[slug]/page.jsx`: keep dual CTA for photo products
- `photoportrait/[slug]/page.jsx`: cart item sets `productType: "photo"` (already done)
- Checkout: verify `type === "photo"` flows through existing logic

## Validation
- Run `php artisan migrate` successfully
- Create a Photo Portrait product via admin with layers
- Verify API returns `type: "photo"` with customizations
- Verify shop filters and checkout flow

## Out of Scope
- Photo capture/composite canvas logic (already exists in frontend)
- Marketing/landing page updates
