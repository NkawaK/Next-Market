"use client";
import { useState } from "react";
import type { userFormType } from "@/app/user/register/page";

const Login = () => {
  const [formDate, setFormDate] = useState<Omit<userFormType, "name">>({
    email: "",
    password: "",
  });

  const changeValue = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormDate((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/user/login`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formDate),
        }
      );

      const jsonDate: {
        message: string;
        token: string;
      } = await response.json();

      localStorage.setItem("nextMarketToken", jsonDate.token);
      alert(jsonDate.message);
    } catch {
      alert("ログイン失敗");
    }
  };

  return (
    <div>
      <h1 className="page-title">ログイン</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="メールアドレス "
          required
          defaultValue={formDate.email}
          onChange={changeValue}
        />
        <input
          type="password"
          name="password"
          placeholder="パスワード "
          required
          defaultValue={formDate.password}
          onChange={changeValue}
        />
        <button>ログイン</button>
      </form>
    </div>
  );
};

export default Login;
