import { apiFetch } from "@/services/api";
import { CriarPautaRequest, CriarPautaResponse } from "../types/type";


export async function criarPauta(
  pauta: CriarPautaRequest
): Promise<CriarPautaResponse> {
   return await apiFetch("/api/v1/pautas", {
     method: "POST",
     body: JSON.stringify(pauta),
   });
}