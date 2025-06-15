
export interface PautaResponseDetails{
    id: number;
    descricao: string;
    dataCriacao: Date;
    dataAbertura: Date;
    dataFechamento: Date;
    status: string;

}

export interface AbrirSessaoRequest {
    duracaoEmMinutos?: number;
    pautaId: number;
}

export interface AbrirSessaoResponse {
    id: number;
    pautaId: number;
    dataInicio: Date;
    dataFim: Date;
}

export interface VotacaoResponse {
    id: number;
    pautaId: number;
    usuarioId: number;
    opcao: string;
    status: string;
    dataVoto: Date;
}

export interface VotacaoRequest {
    pautaId: number;
    cpf: string;
    opcao: string;
}

export interface ResultadoVotacaoResponse {
  votosSim: number
  votosNao: number
}