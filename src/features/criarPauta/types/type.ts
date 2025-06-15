

export interface CriarPautaRequest {
    descricao: string;
}

export interface CriarPautaResponse {
    id: number;
    descricao: string;
    dataCriacao: string;
    dataAbertura: string;
    dataFechamento: string;
    status: string;
}