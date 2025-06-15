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
  Button,
} from "@mui/material"
import HowToVoteIcon from "@mui/icons-material/HowToVote"
import { useRouter } from "next/navigation"

import { PautaResponse } from "../types/type"
import { getPautas } from "../service/pautaService"
import { CriarPauta } from "@/features/criarPauta/components"

export default function ListagemPautas() {
  const [pautas, setPautas] = useState<PautaResponse[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [openDialog, setOpenDialog] = useState(false)
  const router = useRouter()

  const fetchPautas = async () => {
    try {
      const data = await getPautas()
      setPautas(data)
    } catch (err: any) {
      setError(err.message || "Erro ao carregar pautas.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPautas()
  }, [])

  return (
    <Container maxWidth="lg" sx={{ mt: 6 }}>
      <Box display="flex" flexDirection="column" alignItems="flex-start" mb={4}>
        <Typography variant="h4" fontWeight={700} gutterBottom>
          Pautas Disponíveis
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setOpenDialog(true)}
        >
          Criar Nova Pauta
        </Button>
      </Box>

      {loading && (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Box display="flex" justifyContent="center" mt={2}>
          <Alert severity="error">{error}</Alert>
        </Box>
      )}

      {!loading && !error && (
        <Grid container spacing={3} mt={2}>
          {pautas.map((pauta) => (
            <Grid  key={pauta.id}>
              <Card elevation={4}>
                <CardActionArea
                  onClick={() => router.push(`/pautas/${pauta.id}`)}
                >
                  <CardContent>
                    <Box display="flex" alignItems="center" gap={2}>
                      <HowToVoteIcon color="primary" />
                      <Typography variant="subtitle1" fontWeight={600}>
                        {pauta.descricao}
                      </Typography>
                    </Box>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <CriarPauta
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onSuccess={fetchPautas}
      />
    </Container>
  )
}
