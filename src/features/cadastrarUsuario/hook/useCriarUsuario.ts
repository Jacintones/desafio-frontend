import { useState } from "react"
import { criarUsuarioService } from "../service/criarUsuarioService" 
import { CriarUsuarioRequest, CriarUsuarioResponse } from "../types/type"

export function useCriarUsuario() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [response, setResponse] = useState<CriarUsuarioResponse | null>(null)

  const criarUsuario = async (usuario: CriarUsuarioRequest) => {
    setLoading(true)
    setError(null)
    try {
      const res = await criarUsuarioService(usuario)
      setResponse(res)
      return res
    } catch (err: any) {
      console.log("error: ", err)
      setError(err.message || "Erro ao criar usuário.")
      throw err
    } finally {
      setLoading(false)
    }
  }

  return {
    criarUsuario,
    loading,
    error,
    response,
  }
}
