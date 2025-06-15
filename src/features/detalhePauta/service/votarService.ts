import { apiFetch } from "@/services/api";
import { VotacaoRequest, VotacaoResponse } from "../types/type";



export async function votar(
  request: VotacaoRequest
): Promise<VotacaoResponse> {
  const response = await apiFetch<VotacaoResponse>("/api/v1/votos", {
    method: "POST",
    body: JSON.stringify(request),
  });

  return response;
}