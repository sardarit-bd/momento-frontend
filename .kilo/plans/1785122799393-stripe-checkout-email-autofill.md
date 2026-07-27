# Plan: Auto-fill Stripe Checkout Email with Logged-In User's Email

## Problem

The `/my-cart/checkout` route is your own application's checkout form (shipping info, order summary). On submit, it POSTs order data to your backend, which creates a Stripe Checkout Session and returns a `checkout_url`. The user is then redirected to Stripe's hosted checkout page.

The email field on Stripe's hosted checkout page is currently pre-filled with a fake value because the `email` sent to the backend is constructed, not the user's real email:

- **File**: `app/(allsite)/(site)/my-cart/checkout/page.js:763`
- **Current code**: `const checkoutEmail = \`${id || "guest"}@example.com\`;`
- This means logged-in users see a fake email (e.g., `42@example.com`) on the Stripe checkout page instead of their real email.

## Root Cause

The user's actual email is **never persisted** after signup or signin:

1. **Signup** (`app/(allsite)/(site)/signup/page.js`): Email is collected in the form and sent to `api/register`, but the response only stores `name`, `token`, and `role` in cookies and the `loginUser` Zustand store. The email is discarded.
2. **Signin** (`app/(allsite)/(site)/signin/page.js`): Same issue — the `email` from the form is sent to `api/login`, but only `name`, `token`, `role`, and `id` are persisted.
3. **Zustand store** (`store/useLogedUser.js`): The `loginUser` object has no `email` field.
4. **Cookie helper** (`utilis/helper/cookie/getemail.js`): Misnamed — it reads the `name` cookie (display name), not the actual email.

## Approach

The fix requires three coordinated changes:

### 1. Persist the user's email after signup and signin

- **Signup page** (`app/(allsite)/(site)/signup/page.js`): After successful registration, save the email to a `userEmail` cookie and include it in the `loginUser` store update.
- **Signin page** (`app/(allsite)/(site)/signin/page.js`): After successful login, save the email to a `userEmail` cookie and include it in the `loginUser` store update.

### 2. Add `email` to the `loginUser` Zustand store

- **Store** (`store/useLogedUser.js`): Add an `email` field to the `loginUser` object so it can be accessed via `useLogedUserStore` anywhere in the app.

### 3. Use the real email when creating the Stripe session

- **Checkout page** (`app/(allsite)/(site)/my-cart/checkout/page.js`): Replace the fake email construction at line 763 with a read from the `userEmail` cookie (or `loginUser.email` from the Zustand store). Fall back to `${id || "guest"}@example.com` if no email is available (e.g., guest users).

### 4. (Optional) Fix the misleading `getEmail` helper

- **`utilis/helper/cookie/getemail.js`**: Either rename it to `getUserName` or create a new `getUserEmail` helper that reads the `userEmail` cookie. This avoids confusion for future developers.

## Data Flow After Fix

```
Signup/Signin → email saved to "userEmail" cookie + loginUser.store.email
                          ↓
Checkout page (/my-cart/checkout) → reads email from cookie or store
                          ↓
POST to backend → email: realUserEmail (instead of "42@example.com")
                          ↓
Backend creates Stripe Checkout Session with email field
                          ↓
Stripe redirects user → Stripe-hosted checkout page, email field pre-filled
```

## Constraints

- Do not change any files (this is a planning document only).
- The Stripe checkout session creation endpoint (`/api/create-checkout-session`) is external — it is not in this repository, so the email is passed in the POST body from the checkout page.
- Guest users (no `id` cookie) should continue to use the fallback email pattern.

## Validation

1. After signup, verify the `userEmail` cookie is set and `loginUser.email` is populated.
2. After signin, verify the same.
3. On the checkout page, verify the email passed to the backend is the real user email, not a fake `@example.com` address.
4. For guest users (no login), verify the fallback `guest@example.com` behavior is preserved.
5. On the Stripe-hosted checkout page, confirm the email field is pre-filled with the user's real email.