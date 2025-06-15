import { apiFetch } from "@/services/api";
import { CriarUsuarioRequest, CriarUsuarioResponse } from "../types/type";


export async function criarUsuarioService(usuario: CriarUsuarioRequest) : Promise<CriarUsuarioResponse>{
    return await apiFetch("/api/v1/usuarios", {
        method: "POST",
        body: JSON.stringify(usuario),
    })
}