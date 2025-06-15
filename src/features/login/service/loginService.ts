import { apiFetch } from "@/services/api";
import { LoginRequest, LoginResponse } from "../types/type";

export async function login(data: LoginRequest): Promise<LoginResponse> {
  return await apiFetch<LoginResponse>("/api/v1/auth", {
    method: "POST",
    body: JSON.stringify(data),
  });
}
