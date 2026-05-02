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



export default async function middleware(req) {

    const path = req.nextUrl.pathname;
    const token = req.cookies.get("token")?.value;
    const role = req.cookies.get("role")?.value;


    // Check token validity
    const decoded = token ? await verifyJWT(token) : null;


    // Protected routes
    const protectedRoutes = ['/deshboard'];
    const isProtected = protectedRoutes.some(route => path.startsWith(route));





    if (!decoded) {

        const res = NextResponse.redirect(new URL("/signin", req.nextUrl));

        // Clear cookies correctly on the response
        ["id", "role", "token", "name"].forEach(cookieName => {
            res.cookies.set(cookieName, "", {
                path: "/",
                maxAge: 0, // delete cookie
            });
        });
    }



    // If not logged in but trying to access protected routes
    if (!decoded && isProtected) {

        const res = NextResponse.redirect(new URL("/signin", req.nextUrl));
        return res;

    }

    // Role-based access
    if (decoded && role) {
        if (role !== "Admin" && path.startsWith("/deshboard/admin")) return NextResponse.redirect(new URL("/signin", req.nextUrl));
    }

    // If logged in but trying to visit signin page
    if (decoded && path.startsWith("/signin")) {
        const redirects = {
            "Admin": "/deshboard/admin",
            "Customer": "/application",
        };
        if (role && redirects[role]) return NextResponse.redirect(new URL(redirects[role], req.nextUrl));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};