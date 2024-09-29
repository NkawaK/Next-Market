"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/utils/useAuth";
import type { ItemModel } from "@/app/api/item/update/[id]/route";

const CreateItem = () => {
  const [formDate, setFormData] = useState<
    Omit<ItemModel, "_id" | "__v" | "email">
  >({
    title: "",
    price: 0,
    image: "",
    description: "",
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
        `${process.env.NEXT_PUBLIC_URL}/api/item/create`,
        {
          method: "POST",
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
      alert("アイテム作成失敗");
    }
  };

  return userEmail ? (
    <div>
      <h1 className="page-title">アイテム作成</h1>
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
        <button>作成</button>
      </form>
    </div>
  ) : null;
};

export default CreateItem;
