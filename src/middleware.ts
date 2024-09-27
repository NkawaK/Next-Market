import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

interface iConfig {
  matcher: string[];
}

export const middleware = async (request: Request) => {
  const token = request.headers.get("Authorization")?.split(" ")[1];

  if (!token) return NextResponse.json({ message: "トークンがありません" });

  try {
    const secretKey = new TextEncoder().encode("next-market-app-book");
    await jwtVerify(token, secretKey);
    return NextResponse.next();
  } catch {
    return NextResponse.json({ message: "トークンが不一致です" });
  }
};

export const config: iConfig = {
  matcher: [
    "/api/item/create",
    "/api/item/update/:path*",
    "/api/item/delete/:path*",
  ],
};
