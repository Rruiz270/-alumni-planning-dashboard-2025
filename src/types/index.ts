export type VerticalType = 'B2B' | 'B2B2C' | 'B2G' | 'B2S' | 'Franquia';

export interface Contrato {
  id: string;
  vertical: VerticalType;
  empresa: string;
  numeroAlunos: number;
  valorMensal: number;
  dataInicio: Date;
  dataFim: Date;
  status: 'ativo' | 'encerrado' | 'pausado';
  probabilidadeRenovacao: number;
  possibilidadeUpsell: boolean;
  valorUpsellEstimado?: number;
  observacoes?: string;
  documentos?: string[];
  links?: string[];
}

export interface NegociacaoEmAndamento {
  id: string;
  vertical: VerticalType;
  empresa: string;
  numeroAlunosEstimado: number;
  valorEstimado: number;
  probabilidadeFechamento: number;
  dataContatoInicial: Date;
  proximaAcao: string;
  dataProximaAcao: Date;
  estagio: 'prospeccao' | 'proposta' | 'negociacao' | 'fechamento';
  observacoes?: string;
  documentos?: string[];
  links?: string[];
}

export interface EstrategiaMarketing {
  id: string;
  vertical: VerticalType;
  nomeEstrategia: string;
  investimentoMensal: number;
  canalMarketing: 'google_ads' | 'facebook' | 'linkedin' | 'email' | 'eventos' | 'outro';
  automacoes: Automacao[];
  metaLeads: number;
  taxaConversaoEstimada: number;
}

export interface Automacao {
  id: string;
  nome: string;
  tipo: 'email' | 'whatsapp' | 'crm' | 'outro';
  gatilho: string;
  ativo: boolean;
}

export interface Pessoa {
  id: string;
  nome: string;
  cargo: string;
  vertical: VerticalType | 'todos';
  salario: number;
  tipo: 'clt' | 'pj' | 'freelancer';
  dataContratacao: Date;
}

export interface NecessidadePessoa {
  id: string;
  cargo: string;
  vertical: VerticalType | 'todos';
  quantidade: number;
  salarioEstimado: number;
  prioridade: 'alta' | 'media' | 'baixa';
  justificativa: string;
}

export interface DadosFinanceiros {
  contratos: Contrato[];
  negociacoes: NegociacaoEmAndamento[];
  estrategiasMarketing: EstrategiaMarketing[];
  equipeAtual: Pessoa[];
  necessidadesEquipe: NecessidadePessoa[];
}

export interface MetricasVertical {
  vertical: VerticalType;
  receitaAtual: number;
  receitaPotencial: number;
  numeroContratos: number;
  numeroAlunos: number;
  taxaCrescimento: number;
  investimentoMarketing: number;
  custoEquipe: number;
}