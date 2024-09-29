"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/utils/useAuth";
import Image from "next/image";
import type { ItemModel } from "@/app/api/item/update/[id]/route";
import { getSingleItem } from "@/app/utils/getSingleItem";

const DeleteItem = ({ params }: { params: { id: string } }) => {
  const [formDate, setFormData] = useState<Omit<ItemModel, "_id" | "__v">>({
    title: "",
    price: 0,
    image: "",
    description: "",
    email: "",
  });

  const router = useRouter();
  const userEmail = useAuth();

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/item/delete/${params.id}`,
        {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("nextMarketToken")}`,
          },
          body: JSON.stringify({ email: userEmail }),
        }
      );

      const jsonData: { message: string } = await response.json();
      alert(jsonData.message);
      router.push("/");
      router.refresh();
    } catch {
      alert("アイテム削除失敗");
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
      <h1 className="page-title">アイテム削除</h1>
      <form onSubmit={handleSubmit}>
        <h2>{formDate.title}</h2>
        <Image
          src={formDate.image}
          width={750}
          height={500}
          alt="item-image"
          priority
        />
        <h3>{formDate.price}</h3>
        <p>{formDate.description}</p>
        <button>削除</button>
      </form>
    </div>
  ) : null;
};

export default DeleteItem;
