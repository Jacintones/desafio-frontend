import { PautaResponseDetails } from "../types/type";
import { apiFetch } from "@/services/api"; 

export async function getPautaDetails(id: string): Promise<PautaResponseDetails> {
  return await apiFetch<PautaResponseDetails>(`/api/v1/pautas/${id}`);
}
