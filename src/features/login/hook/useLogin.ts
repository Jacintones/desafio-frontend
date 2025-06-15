import { useState } from "react";
import { useRouter } from "next/navigation";
import { LoginRequest, LoginResponse } from "../types/type";
import { login } from "../service/loginService";

export function useLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const doLogin = async (credentials: LoginRequest): Promise<LoginResponse | null> => {
    setLoading(true);
    setError(null);

    try {
      const response = await login(credentials);
      console.log("Login response:", response);
      localStorage.setItem("token", response.token);
      router.push("/");
      return response;
    } catch (err: any) {
      setError(err.message || "Erro inesperado.");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { doLogin, loading, error };
}
