import { NextResponse } from "next/server";
import { SignJWT } from "jose";
import { connectDB } from "@/app/utils/database";
import { UserModel } from "@/app/utils/schemaModels";

export const POST = async (
  request: Request,
  context: { params: { id: string } }
) => {
  const reqBody = await request.json();

  try {
    await connectDB();
    const savedUserData = await UserModel.findOne({ email: reqBody.email });

    if (!savedUserData)
      return NextResponse.json({
        message: "ログイン失敗:ユーザーが登録されていません",
      });

    if (reqBody.password !== savedUserData.password)
      return NextResponse.json({
        message: "ログイン失敗:パスワードが間違っています",
      });

    const secretKey = new TextEncoder().encode("next-market-app-book");
    const payload = {
      email: reqBody.email,
    };

    const token = await new SignJWT(payload)
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("1d")
      .sign(secretKey);

    return NextResponse.json({ message: "ログイン成功", token });
  } catch {
    return NextResponse.json({ message: "ログイン失敗" });
  }
};
