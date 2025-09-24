import { DadosFinanceiros } from '../types';

export const dadosIniciais: DadosFinanceiros = {
  contratos: [
    {
      id: '1',
      vertical: 'B2B',
      empresa: 'Tech Corp',
      numeroAlunos: 150,
      valorMensal: 22500,
      dataInicio: new Date('2024-01-15'),
      dataFim: new Date('2025-01-15'),
      status: 'ativo',
      probabilidadeRenovacao: 85,
      possibilidadeUpsell: true,
      valorUpsellEstimado: 5000,
      observacoes: 'Cliente satisfeito, interessado em expandir para mais departamentos'
    },
    {
      id: '2',
      vertical: 'B2G',
      empresa: 'Prefeitura Municipal',
      numeroAlunos: 500,
      valorMensal: 50000,
      dataInicio: new Date('2024-03-01'),
      dataFim: new Date('2025-03-01'),
      status: 'ativo',
      probabilidadeRenovacao: 90,
      possibilidadeUpsell: false,
      observacoes: 'Contrato via licitação'
    }
  ],
  negociacoes: [
    {
      id: '1',
      vertical: 'B2B2C',
      empresa: 'Universidade XYZ',
      numeroAlunosEstimado: 1000,
      valorEstimado: 80000,
      probabilidadeFechamento: 70,
      dataContatoInicial: new Date('2024-08-01'),
      proximaAcao: 'Apresentação final para reitoria',
      dataProximaAcao: new Date('2024-10-05'),
      estagio: 'negociacao',
      observacoes: 'Decisão esperada até final de outubro'
    }
  ],
  estrategiasMarketing: [
    {
      id: '1',
      vertical: 'B2B',
      nomeEstrategia: 'Campanha LinkedIn B2B',
      investimentoMensal: 5000,
      canalMarketing: 'linkedin',
      automacoes: [
        {
          id: '1',
          nome: 'Follow-up automático',
          tipo: 'email',
          gatilho: 'Download de material',
          ativo: true
        }
      ],
      metaLeads: 100,
      taxaConversaoEstimada: 3
    }
  ],
  equipeAtual: [
    {
      id: '1',
      nome: 'Ana Silva',
      cargo: 'Gerente de Vendas B2B',
      vertical: 'B2B',
      salario: 8000,
      tipo: 'clt',
      dataContratacao: new Date('2023-06-15')
    },
    {
      id: '2',
      nome: 'Carlos Santos',
      cargo: 'Analista de Marketing',
      vertical: 'todos',
      salario: 4500,
      tipo: 'clt',
      dataContratacao: new Date('2024-01-10')
    }
  ],
  necessidadesEquipe: [
    {
      id: '1',
      cargo: 'Consultor de Franquias',
      vertical: 'Franquia',
      quantidade: 2,
      salarioEstimado: 6000,
      prioridade: 'alta',
      justificativa: 'Lançamento do modelo de franquias previsto para este ano'
    }
  ]
};