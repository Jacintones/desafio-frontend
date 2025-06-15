import { useMemo } from "react"

interface UserData {
  token: string
  cpf: string
}

export function useAuth(): UserData | null {
  return useMemo(() => {
    try {
      const raw = localStorage.getItem("userData")
      if (!raw) return null

      const parsed = JSON.parse(raw)
      if (parsed.token && parsed.cpf) {
        return {
          token: parsed.token,
          cpf: parsed.cpf
        }
      }

      return null
    } catch {
      return null
    }
  }, [])
}
