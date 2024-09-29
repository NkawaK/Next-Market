import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { jwtVerify } from "jose";

export const useAuth = () => {
  const [userEmail, setUserEmail] = useState("");
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("nextMarketToken");

    try {
      if (!token) throw new Error();

      (async () => {
        const secretKey = new TextEncoder().encode("next-market-app-book");
        const decoedJwt: {
          payload?: {
            email?: string;
          };
        } = await jwtVerify(token, secretKey);
        setUserEmail(decoedJwt?.payload?.email ?? "");
      })();
    } catch {
      router.push("/");
    }
  }, [router]);

  return userEmail;
};
