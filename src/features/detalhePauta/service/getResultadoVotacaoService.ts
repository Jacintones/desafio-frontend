// src/service/resultadoService.ts
import { apiFetch } from "@/services/api"
import { ResultadoVotacaoResponse } from "../types/type"


export async function getResultadoVotacao(pautaId: string): Promise<ResultadoVotacaoResponse> {
  return await apiFetch(`/api/v1/votos/pauta/${pautaId}/resultado`, {
    method: "GET",
  })
}
