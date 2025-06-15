// hooks/useVotar.ts
import { useState } from "react"
import { VotacaoRequest, VotacaoResponse } from "../types/type"
import { votar } from "../service/votarService"

export function useVotar() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [data, setData] = useState<VotacaoResponse | null>(null)

  const votarNaPauta = async (request: VotacaoRequest) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await votar(request)
      setData(response)
      return response
    } catch (err: any) {
      setError(err?.message || "Erro ao registrar o voto")
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  return {
    votarNaPauta,
    isLoading,
    error,
    data,
  }
}
