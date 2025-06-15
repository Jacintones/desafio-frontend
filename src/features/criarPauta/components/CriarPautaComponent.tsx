import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  CircularProgress,
  Alert,
} from "@mui/material"
import { useState } from "react"
import { useCriarPauta } from "../hook/useCriarPauta"

interface DialogCriarPautaProps {
  open: boolean
  onClose: () => void
  onSuccess?: () => void
}

export default function CriarPauta({
  open,
  onClose,
  onSuccess,
}: DialogCriarPautaProps) {
  const [descricao, setDescricao] = useState("")
  const { criarPauta, loading, error } = useCriarPauta()

  const handleSubmit = async () => {
    try {
      await criarPauta({ descricao })
      onSuccess?.()
      onClose()
      setDescricao("") 
    } catch {
    }
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Criar Nova Pauta</DialogTitle>
      <DialogContent>
        <TextField
          label="Descrição"
          fullWidth
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          margin="normal"
        />
        {error && (
          <Alert severity="error" sx={{ mt: 1 }}>
            {error}
          </Alert>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>
          Cancelar
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={loading || descricao.trim() === ""}
        >
          {loading ? <CircularProgress size={20} /> : "Criar"}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
