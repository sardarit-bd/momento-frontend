/**
 * Called whenever an authenticated API request comes back 401.
 * This can happen when:
 *   - the JWT has genuinely expired
 *   - the user's role was changed by an admin (token_valid_after revocation)
 *   - the token is otherwise invalid
 * In every case, the client's session is no longer valid — clear the
 * auth cookies and send the user to /signin so they get a fresh token.
 *
 * IMPORTANT: do NOT call this from the login/signup request helper.
 * A 401 there means "wrong credentials," not "session revoked."
 */
const handleUnauthorized = () => {
    if (typeof window === "undefined") return; // safety guard for any non-browser context

    // Avoid redirect loops if we're already on /signin
    if (window.location.pathname.startsWith("/signin")) return;

    // Clear the same cookies the Next.js middleware relies on
    ["id", "role", "token", "name"].forEach((name) => {
        document.cookie = `${name}=; path=/; max-age=0`;
    });

    window.location.href = "/signin";
};

export default handleUnauthorized;