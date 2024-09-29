import type { ItemModel } from "@/app/api/item/update/[id]/route";
import Link from "next/link";
import Image from "next/image";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

const getAllItem = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/item/readall`,
    {
      cache: "no-cache",
    }
  );
  const jsonData: {
    message: string;
    allItems: ItemModel[];
  } = await response.json();

  return jsonData.allItems;
};

const ReadAllItems = async () => {
  const allItems = await getAllItem();

  return (
    <div className="grid-container-in">
      {allItems.map((item) => (
        <Link href={`/item/readsingle/${item._id}`} key={item._id}>
          <Image
            src={item.image}
            width={750}
            height={500}
            alt="item-image"
            priority
          />
          <h2>{item.price}</h2>
          <h3>{item.title}</h3>
          <p>{item.description.substring(0, 80)}</p>
        </Link>
      ))}
    </div>
  );
};

export default ReadAllItems;
