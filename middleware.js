import { jwtVerify } from "jose";
import { NextResponse } from "next/server";

async function verifyJWT(token) {
  try {
    const secret = new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET);
    const { payload } = await jwtVerify(token, secret, {
      clockTolerance: 30,
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
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
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

  const decoded = token ? await verifyJWT(token) : null;

  const protectedRoutes = ["/dashboard"];
  const isProtected = protectedRoutes.some((route) => path.startsWith(route));

  if (!decoded) {
    if (isProtected && !path.startsWith("/signin")) {
      const res = NextResponse.redirect(new URL("/signin", req.nextUrl));
      ["id", "role", "token", "name"].forEach((cookieName) => {
        res.cookies.set(cookieName, "", {
          path: "/",
          maxAge: 0,
        });
      });

      return res;
    }

    const res = NextResponse.next();
    ["id", "role", "token", "name"].forEach((cookieName) => {
      res.cookies.set(cookieName, "", {
        path: "/",
        maxAge: 0,
      });
    });
    return res;
  }

  if (decoded && path.startsWith("/dashboard/admin")) {
    const currentRole = await fetchUserRole(token);

    if (currentRole !== "Admin") {
      const res = NextResponse.redirect(new URL("/signin", req.nextUrl));
      ["id", "role", "token", "name"].forEach((cookieName) => {
        res.cookies.set(cookieName, "", {
          path: "/",
          maxAge: 0,
        });
      });

      return res;
    }
  }

  if (decoded && path.startsWith("/signin")) {
    const currentRole = await fetchUserRole(token);

    const redirects = {
      Admin: "/dashboard/admin",
      Customer: "/application",
    };

    if (currentRole && redirects[currentRole]) {
      return NextResponse.redirect(
        new URL(redirects[currentRole], req.nextUrl),
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
