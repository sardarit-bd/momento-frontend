import { jwtVerify } from "jose";
import { NextResponse } from "next/server";

async function verifyJWT(token) {
    try {
        const secret = new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET);
        const { payload } = await jwtVerify(token, secret, {
            clockTolerance: 30 // allow 30 seconds difference
        });
        return payload;
    } catch (err) {
        return null;
    }
}

async function fetchUserRole(token) {
    try {
        const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/me`;
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
                "Accept": "application/json"
            },
        });
        if (!response.ok) {
            console.error("[fetchUserRole] non-OK response", {
                url,
                status: response.status,
                statusText: response.statusText,
            });
            return null;
        }
        const data = await response.json();
        if (!data?.success) {
            console.error("[fetchUserRole] API returned success:false", data);
        }
        return data?.success ? data?.data?.role : null;
    } catch (err) {
        console.error("[fetchUserRole] threw", err);
        return null;
    }
}

export default async function middleware(req) {

    const path = req.nextUrl.pathname;
    const token = req.cookies.get("token")?.value;


    // Check token validity
    const decoded = token ? await verifyJWT(token) : null;


    // Protected routes
    const protectedRoutes = ['/dashboard'];
    const isProtected = protectedRoutes.some(route => path.startsWith(route));


    if (!decoded) {

        // Only force a redirect to /signin when the route actually requires
        // auth. Public routes (/, /shop, etc.) must render normally even
        // with no/invalid token. And never redirect when already on /signin
        // itself — that caused the infinite-redirect loop earlier.
        if (isProtected && !path.startsWith("/signin")) {
            const res = NextResponse.redirect(new URL("/signin", req.nextUrl));

            // Clear cookies correctly on the response
            ["id", "role", "token", "name"].forEach(cookieName => {
                res.cookies.set(cookieName, "", {
                    path: "/",
                    maxAge: 0, // delete cookie
                });
            });

            return res;
        }

        // Public route, or already on /signin, with no valid token —
        // just render, but wipe any stale auth cookies along the way.
        const res = NextResponse.next();
        ["id", "role", "token", "name"].forEach(cookieName => {
            res.cookies.set(cookieName, "", {
                path: "/",
                maxAge: 0,
            });
        });
        return res;
    }

    // Role-based access for admin routes.
    // IMPORTANT: never trust the `role` cookie here — it's set once at login and
    // goes stale the moment an admin changes this user's role in the DB. Always
    // resolve the live role from the backend. If the check fails for any reason
    // (network error, non-200, etc.), fail closed (deny), never fall back to the cookie.
    if (decoded && path.startsWith("/dashboard/admin")) {
        const currentRole = await fetchUserRole(token);

        if (currentRole !== "Admin") {
            const res = NextResponse.redirect(new URL("/signin", req.nextUrl));

            // The token was rejected (revoked via role change, expired, or
            // the user genuinely isn't Admin) — clear cookies so the rest of
            // the app (navbar, profile page, etc.) stops treating this
            // browser as logged in.
            ["id", "role", "token", "name"].forEach((cookieName) => {
                res.cookies.set(cookieName, "", {
                    path: "/",
                    maxAge: 0,
                });
            });

            return res;
        }
    }

    // If logged in but trying to visit signin page — also resolve live role here.
    // The `role` cookie must not be used as the source of truth, for the same
    // reason as above (it can point a freshly-promoted Admin back to /application).
    if (decoded && path.startsWith("/signin")) {
        const currentRole = await fetchUserRole(token);

        const redirects = {
            "Admin": "/dashboard/admin",
            "Customer": "/application",
        };

        if (currentRole && redirects[currentRole]) {
            return NextResponse.redirect(new URL(redirects[currentRole], req.nextUrl));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};