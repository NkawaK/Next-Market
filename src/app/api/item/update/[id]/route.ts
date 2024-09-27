import { NextResponse } from "next/server";
import { connectDB } from "@/app/utils/database";
import { ItemModel } from "@/app/utils/schemaModels";

interface ReqBody {
  title: string;
  image: string;
  price: number;
  description: string;
  email: string;
}

interface DBColumn {
  _id: string;
  __v: number;
}

type ItemModel = ReqBody & DBColumn;

export const PUT = async (
  request: Request,
  context: { params: { id: string } }
) => {
  const reqBody: ReqBody = await request.json();

  try {
    await connectDB();
    const singleItem: ItemModel | null = await ItemModel.findById(
      context.params.id
    );

    if (singleItem?.email !== reqBody.email)
      return NextResponse.json({ message: "編集する権限がないデータです" });

    await ItemModel.updateOne({ _id: context.params.id }, reqBody);
    return NextResponse.json({ message: "アイテム編集成功" });
  } catch {
    return NextResponse.json({ message: "アイテム編集失敗" });
  }
};
