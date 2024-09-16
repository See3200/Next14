import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  let accessToken = request.cookies.get("accessToken");
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("Authorization", `Bearer ${accessToken}`);
  //console.log("Token:   ", accessToken?.value);
  if (accessToken) {
    console.log("__OK__");
    //requestHeaders.set("Authorization", `Bearer ${accessToken}`);
  } else {
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
