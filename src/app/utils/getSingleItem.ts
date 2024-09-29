import type { ItemModel } from "@/app/api/item/update/[id]/route";

export const getSingleItem = async (id: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/item/readsingle/${id}`
  );
  const jsonData: {
    message: string;
    singleItem?: ItemModel;
  } = await response.json();

  return jsonData.singleItem;
};
