"use client";
import { useState } from "react";

export type userFormType = {
  name: string;
  email: string;
  password: string;
};

const Register = () => {
  const [formDate, setFormDate] = useState<userFormType>({
    name: "",
    email: "",
    password: "",
  });

  const changeValue = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormDate((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/user/register`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formDate),
        }
      );

      const jsonDate: { message: string } = await response.json();
      alert(jsonDate.message);
    } catch {
      alert("ユーザー登録失敗");
    }
  };

  return (
    <div>
      <h1 className="page-title">ユーザー登録</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="名前 "
          required
          defaultValue={formDate.name}
          onChange={changeValue}
        />
        <input
          type="email"
          name="email"
          placeholder="メールアドレス "
          required
          defaultValue={formDate.name}
          onChange={changeValue}
        />
        <input
          type="password"
          name="password"
          placeholder="パスワード "
          required
          defaultValue={formDate.name}
          onChange={changeValue}
        />
        <button>登録</button>
      </form>
    </div>
  );
};

export default Register;
