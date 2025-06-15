
export interface CriarUsuarioRequest {
    nome: string;
    sobrenome: string;
    cpf: string;
    senha: string;
    role: string;
}

export interface CriarUsuarioResponse {
    id: number;
    nome: string;
    sobrenome: string;
    cpf: string;
    role: string;
    dataCriacao: string;
}