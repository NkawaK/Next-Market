"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/utils/useAuth";
import { getSingleItem } from "../../readsingle/[id]/page";
import type { ItemModel } from "@/app/api/item/update/[id]/route";

const UpdateItem = ({ params }: { params: { id: string } }) => {
  const [formDate, setFormData] = useState<Omit<ItemModel, "_id" | "__v">>({
    title: "",
    price: 0,
    image: "",
    description: "",
    email: "",
  });

  const router = useRouter();
  const userEmail = useAuth();

  const changeValue = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/item/update/${params.id}`,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("nextMarketToken")}`,
          },
          body: JSON.stringify({ ...formDate, email: userEmail }),
        }
      );

      const jsonData: { message: string } = await response.json();
      alert(jsonData.message);
      router.push("/");
      router.refresh();
    } catch {
      alert("アイテム編集失敗");
    }
  };

  useEffect(() => {
    (async () => {
      const singleItem = await getSingleItem(params.id);
      if (singleItem)
        setFormData({
          title: singleItem.title,
          price: singleItem.price,
          image: singleItem.image,
          description: singleItem.description,
          email: singleItem.email,
        });
    })();
  }, [params]);

  return userEmail === formDate.email ? (
    <div>
      <h1 className="page-title">アイテム編集</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="アイテム名"
          required
          defaultValue={formDate.title}
          onChange={changeValue}
        />
        <input
          type="number"
          name="price"
          placeholder="価格"
          required
          defaultValue={formDate.price}
          onChange={changeValue}
        />
        <input
          type="text"
          name="image"
          placeholder="画像"
          required
          defaultValue={formDate.image}
          onChange={changeValue}
        />
        <textarea
          name="description"
          rows={15}
          placeholder="商品説明"
          required
          defaultValue={formDate.description}
          onChange={changeValue}
        />
        <button>編集</button>
      </form>
    </div>
  ) : null;
};

export default UpdateItem;
