import { NextResponse } from "next/server";
import { connectDB } from "@/app/utils/database";
import { ItemModel } from "@/app/utils/schemaModels";

export const GET = async () => {
  try {
    await connectDB();
    const allItems = await ItemModel.find();
    return NextResponse.json({ message: "アイテム全取得成功", allItems });
  } catch {
    return NextResponse.json({ message: "アイテム全取得失敗" });
  }
};

export const revalidate = 0;
