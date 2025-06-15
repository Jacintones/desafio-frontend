import { useState } from "react"
import { criarPauta } from "../service/criarPautaService" 
import { CriarPautaRequest, CriarPautaResponse } from "../types/type"

export function useCriarPauta() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [response, setResponse] = useState<CriarPautaResponse | null>(null)

  const handleCriarPauta = async (pauta: CriarPautaRequest) => {
    setLoading(true)
    setError(null)
    try {
      const res = await criarPauta(pauta)
      setResponse(res)
      return res
    } catch (err: any) {
      setError(err.message || "Erro ao criar pauta.")
      throw err
    } finally {
      setLoading(false)
    }
  }

  return {
    criarPauta: handleCriarPauta,
    loading,
    error,
    response,
  }
}
