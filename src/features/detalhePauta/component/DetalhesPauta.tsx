"use client"

import { useParams } from "next/navigation"
import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material"
import AccessTimeIcon from "@mui/icons-material/AccessTime"
import InfoIcon from "@mui/icons-material/Info"
import DescriptionIcon from "@mui/icons-material/Description"
import { usePautaDetails } from "../hook/useDetalhePauta"
import { useState } from "react"
import { abrirSessao } from "../service/abrirSessaoService"
import { useVotar } from "../hook/useVotar"
import { useAuth } from "@/hooks/useAuth"

type PautaStatus = "ABERTA" | "ENCERRADA" | "NAO_ABERTA"

export default function DetalhesPauta() {
  const params = useParams()
  const pautaId = params?.id as string

  const { data, loading, error } = usePautaDetails(pautaId)
  const user = useAuth();
  const [modalOpen, setModalOpen] = useState(false)
  const [votoModalOpen, setVotoModalOpen] = useState(false)
  const [duracao, setDuracao] = useState<number | undefined>()
  const [abrindo, setAbrindo] = useState(false)
  const [erroAbertura, setErroAbertura] = useState<string | null>(null)
  const [votoUsuario, setVotoUsuario] = useState<"SIM" | "NAO" | null>(null)
  const [mensagemVoto, setMensagemVoto] = useState<string | null>(null)

  const { votarNaPauta, isLoading: votando, error: votarError } = useVotar()

  const formatDate = (dateString: Date | string | null | undefined) =>
    dateString ? new Date(dateString).toLocaleString("pt-BR") : "—"

  const handleAbrirSessao = async () => {
    setErroAbertura(null)
    setAbrindo(true)

    try {
      await abrirSessao({ pautaId: Number(pautaId), duracaoEmMinutos: duracao })
      setModalOpen(false)
    } catch (error: any) {
      setErroAbertura(
        error?.message || "Erro ao abrir a sessão de votação. Tente novamente."
      )
    } finally {
      setAbrindo(false)
    }
  }

  const handleVotar = async (voto: "SIM" | "NAO") => {
    setMensagemVoto(null)
    try {
      await votarNaPauta({
        pautaId: Number(pautaId),
        cpf: user?.cpf ?? "",
        opcao: voto,
      })
      setVotoUsuario(voto)
      setMensagemVoto("Voto registrado com sucesso.")
      setVotoModalOpen(false)
    } catch {
      setMensagemVoto("Erro ao registrar o voto.")
    }
  }

  return (
    <Container maxWidth="md" sx={{ mt: 6 }}>
      <Typography variant="h4" fontWeight={700} gutterBottom>
        Detalhes da Pauta
      </Typography>

      {loading && (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}

      {!loading && data && (
        <Paper elevation={4} sx={{ p: 4, borderRadius: 3 }}>
          <Stack spacing={3}>
            <Box>
              <Typography variant="h6" display="flex" alignItems="center" gap={1}>
                <DescriptionIcon fontSize="small" /> Descrição
              </Typography>
              <Typography color="text.secondary">{data.descricao}</Typography>
            </Box>

            <Divider />

            <Box>
              <Typography variant="h6" display="flex" alignItems="center" gap={1}>
                <InfoIcon fontSize="small" /> Status
              </Typography>

              <Chip
                label={
                  data.status === "NAO_ABERTA"
                    ? "Não aberta"
                    : data.status === "ABERTA"
                    ? "Aberta"
                    : "Encerrada"
                }
                color={
                  data.status === "ABERTA"
                    ? "success"
                    : data.status === "ENCERRADA"
                    ? "error"
                    : "default"
                }
                variant="outlined"
                sx={{ mt: 1 }}
              />
            </Box>

            <Divider />

            <Box>
              <Typography variant="h6" display="flex" alignItems="center" gap={1}>
                <AccessTimeIcon fontSize="small" /> Datas
              </Typography>
              <Stack spacing={0.5} mt={1}>
                <Typography variant="body2">
                  <strong>Criada em:</strong> {formatDate(data.dataCriacao)}
                </Typography>
                <Typography variant="body2">
                  <strong>Início da votação:</strong> {formatDate(data.dataAbertura)}
                </Typography>
                <Typography variant="body2">
                  <strong>Fim da votação:</strong> {formatDate(data.dataFechamento)}
                </Typography>
              </Stack>
            </Box>

            {data.status === "NAO_ABERTA" && (
              <Button variant="contained" onClick={() => setModalOpen(true)}>
                Abrir Sessão de Votação
              </Button>
            )}

            {data.status === "ABERTA" && !votoUsuario && (
              <Button variant="contained" color="secondary" sx={{ maxWidth: 250}} onClick={() => setVotoModalOpen(true)}>
                Votar
              </Button>
            )}

            {votoUsuario && (
              <Alert severity="info">
                Você já votou: <strong>{votoUsuario}</strong>
              </Alert>
            )}
          </Stack>
        </Paper>
      )}

      <Dialog open={modalOpen} onClose={() => setModalOpen(false)}>
        <DialogTitle>Abrir Sessão de Votação</DialogTitle>
        <DialogContent>
          <Stack spacing={2} mt={1}>
            <TextField
              type="number"
              label="Duração da sessão (min)"
              value={duracao ?? ""}
              onChange={(e) => setDuracao(Number(e.target.value))}
              slotProps={{
                input: {
                  inputProps: { min: 1 },
                },
              }}
              sx={{ maxWidth: 300 }}
            />

            {erroAbertura && <Alert severity="error">{erroAbertura}</Alert>}
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setModalOpen(false)} color="inherit">
            Cancelar
          </Button>
          <Button variant="contained" onClick={handleAbrirSessao} disabled={abrindo}>
            {abrindo ? "Abrindo..." : "Confirmar Abertura"}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={votoModalOpen} onClose={() => setVotoModalOpen(false)}>
        <DialogTitle>Registrar Voto</DialogTitle>
        <DialogContent>
          <Typography>Qual o seu voto?</Typography>
          <Stack direction="row" spacing={2} mt={2}>
            <Button
              variant="contained"
              color="success"
              onClick={() => handleVotar("SIM")}
              disabled={votando}
            >
              Sim
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => handleVotar("NAO")}
              disabled={votando}
            >
              Não
            </Button>
          </Stack>
          {mensagemVoto && (
            <Alert severity="info" sx={{ mt: 2 }}>
              {mensagemVoto}
            </Alert>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setVotoModalOpen(false)} disabled={votando}>
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}
