import { useEffect, useState } from "react";
import { PautaResponse } from "../types/type";
import { getPautas } from "../service/pautaService";


export function usePautas() {
  const [pautas, setPautas] = useState<PautaResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPautas();
        setPautas(data);
      } catch (err: any) {
        setError(err.message || "Erro ao buscar pautas");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { pautas, loading, error };
}
