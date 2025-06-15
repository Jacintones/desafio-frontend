"use client"

import { useEffect, useState } from "react"
import {
  Box,
  CircularProgress,
  Container,
  Typography,
  Alert,
  Card,
  CardContent,
  CardActionArea,
  Grid,
} from "@mui/material"
import HowToVoteIcon from "@mui/icons-material/HowToVote"
import { useRouter } from "next/navigation"

import { PautaResponse } from "../types/type"
import { getPautas } from "../service/pautaService"

export default function ListagemPautas() {
  const [pautas, setPautas] = useState<PautaResponse[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPautas()
        setPautas(data)
      } catch (err: any) {
        setError(err.message || "Erro ao carregar pautas.")
      } finally {
        setLoading(false)
      }
    }

    fetchData();
  }, [])

  return (
    <Container maxWidth="lg" sx={{ mt: 6 }}>
      <Typography variant="h4" fontWeight={700} gutterBottom>
        📋 Pautas Disponíveis
      </Typography>

      {loading && (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      )}

      {error && <Alert severity="error">{error}</Alert>}

      <Grid container spacing={3} mt={2}>
        {pautas.map((pauta) => (
          <Grid  key={pauta.id}>
            <Card elevation={4}>
              <CardActionArea
                sx={{ p: 2 }}
                onClick={() => {
                  router.push(`/pautas/${pauta.id}`);
                }}
              >
                <Box display="flex" alignItems="center" gap={2}>
                  <HowToVoteIcon color="primary" />
                  <CardContent sx={{ padding: 0 }}>
                    <Typography variant="subtitle1" fontWeight={600}>
                      {pauta.descricao}
                    </Typography>
                  </CardContent>
                </Box>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}
