import { CadastroUsuarioForm } from '@/features/cadastrarUsuario/components'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'

jest.mock('@/features/cadastrarUsuario/hook/useCriarUsuario', () => ({
  useCriarUsuario: () => ({
    criarUsuario: jest.fn().mockResolvedValue(undefined),
    loading: false,
    error: null,
  }),
}))

describe('CadastroUsuarioForm', () => {
  it('renderiza todos os campos corretamente', () => {
    render(<CadastroUsuarioForm />)

    expect(screen.getByTestId('input-nome')).toBeInTheDocument()
    expect(screen.getByTestId('input-cpf')).toBeInTheDocument()
    expect(screen.getByTestId('input-senha')).toBeInTheDocument()
    expect(screen.getByTestId('input-role')).toBeInTheDocument()
    expect(screen.getByTestId('input-sobrenome')).toBeInTheDocument?.()
    expect(screen.getByRole('button', { name: /cadastrar/i })).toBeInTheDocument()
  })

  it('preenche o formulário e envia com sucesso', async () => {
    render(<CadastroUsuarioForm />)

    fireEvent.change(screen.getByTestId('input-nome'), {
      target: { value: 'Thiago' },
    })
    fireEvent.change(screen.getByTestId('input-sobrenome'), {
      target: { value: 'Andrade' },
    })
    fireEvent.change(screen.getByTestId('input-cpf'), {
      target: { value: '12345678901' },
    })
    fireEvent.change(screen.getByTestId('input-senha'), {
      target: { value: '123456' },
    })
    fireEvent.change(screen.getByTestId('input-role'), {
      target: { value: 'USER' },
    })

    fireEvent.click(screen.getByRole('button', { name: /cadastrar/i }))

    await waitFor(() =>
      expect(
        screen.getByText(/usuário cadastrado com sucesso/i)
      ).toBeInTheDocument()
    )
  })
})
