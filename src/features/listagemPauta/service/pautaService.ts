// src/services/pautaService.ts
import { apiFetch } from "@/services/api";
import { PautaResponse } from "../types/type";

export async function getPautas(): Promise<PautaResponse[]> {
  return await apiFetch<PautaResponse[]>("/api/v1/pautas");
}
