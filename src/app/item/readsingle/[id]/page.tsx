import type { ItemModel } from "@/app/api/item/update/[id]/route";
import Image from "next/image";
import Link from "next/link";

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

const ReadSingleItem = async ({ params }: { params: { id: string } }) => {
  const singleItem = await getSingleItem(params.id);

  return singleItem ? (
    <div className="grid-container-si">
      <div>
        <Image
          src={singleItem.image}
          width={750}
          height={500}
          alt="item-image"
          priority
        />
      </div>
      <div>
        <h1>{singleItem.title}</h1>
        <h2>{singleItem.price}</h2>
        <hr />
        <p>{singleItem.description}</p>
        <div>
          <Link href={`/item/update/${singleItem._id}`}>アイテム編集</Link>
          <Link href={`/item/delete/${singleItem._id}`}>アイテム削除</Link>
        </div>
      </div>
    </div>
  ) : (
    <h1>アイテムが見つかりませんでした</h1>
  );
};

export default ReadSingleItem;
