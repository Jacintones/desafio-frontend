"use client"

import { useState } from "react"
import {
  TextField,
  Button,
  Box,
  Typography,
  CircularProgress,
  Alert,
  Paper,
  Avatar,
  MenuItem,
} from "@mui/material"
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1"
import { useCriarUsuario } from "../hook/useCriarUsuario"

const inputPropsNome = {
  'data-testid': 'input-nome',
};
const inputPropsSobrenome = {
  'data-testid': 'input-sobrenome',
};
const inputPropsCpf = {
  'data-testid': 'input-cpf',
  maxLength: 14, 
};
const inputPropsSenha = {
  'data-testid': 'input-senha',
};
const inputPropsRole = {
  'data-testid': 'input-role',
};

export default function CadastroUsuarioForm() {
  const { criarUsuario, loading, error } = useCriarUsuario()

  const [nome, setNome] = useState("")
  const [sobrenome, setSobrenome] = useState("")
  const [cpf, setCpf] = useState("")
  const [senha, setSenha] = useState("")
  const [role, setRole] = useState("")
  const [mensagem, setMensagem] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMensagem(null)

    try {
      await criarUsuario({ nome, sobrenome, cpf, senha, role })
      setMensagem("Usuário cadastrado com sucesso!")
      setNome("")
      setSobrenome("")
      setCpf("")
      setSenha("")
      setRole("")
    } catch {
    }
  }

  function mascaraCPF(cpf: string): string {
    return cpf
      .replace(/\D/g, '') 
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f4f6f8",
        padding: 2,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          width: "100%",
          maxWidth: 400,
          borderRadius: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
            mb: 2,
          }}
        >
          <Avatar sx={{ bgcolor: "primary.main" }}>
            <PersonAddAlt1Icon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Cadastrar Usuário
          </Typography>
        </Box>

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            label="Nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            fullWidth
            required
            slotProps={{
              input: {
                inputProps: {
                  'data-testid': 'input-nome',
                },
              },
            }}
          />


          <TextField
            id="sobrenomeCadastro"
            margin="normal"
            label="Sobrenome"
            variant="outlined"
            value={sobrenome}
            onChange={(e) => setSobrenome(e.target.value)}
            fullWidth
            required
            slotProps={{
              input: {
                inputProps: {
                  'data-testid': 'input-sobrenome',
                },
              },
            }}
          />

          <TextField
            id="cpfCadastro"
            margin="normal"
            label="CPF"
            variant="outlined"
            value={mascaraCPF(cpf)}
            onChange={(e) => setCpf(mascaraCPF(e.target.value))}
            fullWidth
            required
            slotProps={{
              input: {
                inputProps: {
                  maxLength: 14,
                  'data-testid': 'input-cpf',
                },
              },
            }}
          />

          <TextField
            id="senhaCadastro"
            margin="normal"
            label="Senha"
            type="password"
            variant="outlined"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            fullWidth
            required
            slotProps={{
              input: {
                inputProps: {
                  'data-testid': 'input-senha',
                },
              },
            }}
          />

          <TextField
            id="roleCadastro"
            margin="normal"
            label="Perfil (Role)"
            select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            fullWidth
            required
            slotProps={{
              input: {
                inputProps: {
                  'data-testid': 'input-role',
                },
              },
            }}
          >

            <MenuItem value="ADMIN">Admin</MenuItem>
            <MenuItem value="USER">Usuário</MenuItem>
          </TextField>

          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}

          {mensagem && (
            <Alert severity="success" sx={{ mt: 2 }}>
              {mensagem}
            </Alert>
          )}

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading}
            sx={{ mt: 3 }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Cadastrar"}
          </Button>
        </Box>
      </Paper>
    </Box>
  )
}
