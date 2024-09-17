import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/settings"];

export async function middleware(request: NextRequest) {
  let accessToken = request.cookies.get("accessToken");
  const requestHeaders = new Headers(request.headers);

  //console.log("Token:   ", accessToken?.value);

  // this block if for SignIn and SignUp pages
  if (request.nextUrl.pathname.startsWith("/auth")) {
    if (accessToken) {
      // Check explicitly if it's "true"
      return NextResponse.rewrite(new URL(request.nextUrl.pathname, request.url));
    } else {
      return NextResponse.rewrite(new URL("/auth", request.url));
    }
  }

  // this block is for protecting some pages from unauthorized users
  if (!accessToken && protectedRoutes.includes(request.nextUrl.pathname)) {
    const absoluteURL = new URL("/", request.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }

  // there is check token functionality below
  if (accessToken) {
    // check token's longevity
    console.log("__OK__");
  } else {
    // use refreshToken and requests
    const response = await fetch("https://reqres.in/api/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        email: "eve.holt@reqres.in",
        password: "cityslicka",
      }),
    });
    if (response.status === 200) {
      let json = await response.json();
      requestHeaders.set("Authorization", `Bearer ${json.token}`);
      accessToken = json.token;
    } else {
      console.log("__FAIL__");
    }
  }

  // You can set token in NextResponse, attach it to the request, or modify as needed
  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
  if (accessToken && typeof accessToken === "string") response.cookies.set("accessToken", accessToken);

  return response;
}
