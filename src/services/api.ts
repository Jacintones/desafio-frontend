import router from "next/router";

const BASE_URL = "http://localhost:8080";

export async function apiFetch<T = any>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers || {}),
    },
  });

  const isJson = res.headers
    .get("content-type")
    ?.includes("application/json");

  if (!res.ok) {
    if (res.status === 401 && typeof window !== "undefined") {
      router.push("/login");
    }

    const errorBody = isJson ? await res.json().catch(() => ({})) : {};
    console.log("error no body: ", errorBody);
    const message = (errorBody as any)?.error || "Erro desconhecido";

    const error = new Error(message);
    (error as any).statusCode = res.status;
    (error as any).response = errorBody;
    throw error;
  }

  return isJson ? await res.json() : ({} as T);
}
