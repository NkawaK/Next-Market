import { NextResponse, NextRequest } from "next/server";
import { connectDB } from "@/app/utils/database";
import { ItemModel } from "@/app/utils/schemaModels";

export const POST = async (request: NextRequest) => {
  const reqBody = await request.json();

  try {
    await connectDB();
    await ItemModel.create(reqBody);
    return NextResponse.json({ message: "アイテム作成成功" });
  } catch {
    return NextResponse.json({ message: "アイテム作成失敗" });
  }
};
