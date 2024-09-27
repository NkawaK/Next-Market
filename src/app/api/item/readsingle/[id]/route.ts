import { NextResponse } from "next/server";
import { connectDB } from "@/app/utils/database";
import { ItemModel } from "@/app/utils/schemaModels";

export const GET = async (
  request: Request,
  context: { params: { id: string } }
) => {
  try {
    await connectDB();
    const singleItem = await ItemModel.findById(context.params.id);
    return NextResponse.json({ message: "アイテム読み取り成功", singleItem });
  } catch {
    return NextResponse.json({ message: "アイテム読み取り失敗" });
  }
};
