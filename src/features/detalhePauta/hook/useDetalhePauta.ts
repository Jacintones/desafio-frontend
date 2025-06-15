import { useEffect, useState } from "react";
import { PautaResponseDetails } from "../types/type";
import { getPautaDetails } from "../service/detalhePautaService";

export function usePautaDetails(id: string) {
  const [data, setData] = useState<PautaResponseDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchDetails = async () => {
      setLoading(true);
      try {
        const result = await getPautaDetails(id);
        if (!result) {
          setError("Pauta não encontrada.");
        } else {
          setData(result);
        }
      } catch (err: any) {
        setError(err.message || "Erro ao carregar os detalhes da pauta.");
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  return { data, loading, error };
}
