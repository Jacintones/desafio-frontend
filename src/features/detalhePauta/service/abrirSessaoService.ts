import { apiFetch } from "@/services/api";
import { AbrirSessaoRequest, AbrirSessaoResponse } from "../types/type";

export async function abrirSessao(
  request: AbrirSessaoRequest
): Promise<AbrirSessaoResponse> {
  return apiFetch<AbrirSessaoResponse>("/api/v1/sessoes", {
    method: "POST",
    body: JSON.stringify(request),
  });
}
