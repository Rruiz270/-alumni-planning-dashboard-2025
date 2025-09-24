import { Contrato, NegociacaoEmAndamento, EstrategiaMarketing, Pessoa, NecessidadePessoa, VerticalType } from '../types';

export const calcularReceitaAtual = (contratos: Contrato[]): number => {
  return contratos
    .filter(c => c.status === 'ativo')
    .reduce((acc, c) => acc + c.valorMensal, 0);
};

export const calcularReceitaPorVertical = (contratos: Contrato[]): Record<VerticalType, number> => {
  const resultado: Partial<Record<VerticalType, number>> = {};
  
  contratos
    .filter(c => c.status === 'ativo')
    .forEach(c => {
      resultado[c.vertical] = (resultado[c.vertical] || 0) + c.valorMensal;
    });
    
  return resultado as Record<VerticalType, number>;
};

export const calcularReceitaPotencial = (negociacoes: NegociacaoEmAndamento[]): number => {
  return negociacoes.reduce((acc, n) => {
    return acc + (n.valorEstimado * (n.probabilidadeFechamento / 100));
  }, 0);
};

export const calcularForecastAnual = (
  contratos: Contrato[], 
  negociacoes: NegociacaoEmAndamento[]
): { mes: string; receitaRecorrente: number; receitaPotencial: number }[] => {
  const meses = [];
  const dataAtual = new Date();
  
  for (let i = 0; i < 12; i++) {
    const mes = new Date(dataAtual.getFullYear(), dataAtual.getMonth() + i, 1);
    const mesStr = mes.toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' });
    
    const contratosAtivos = contratos.filter(c => {
      const inicio = new Date(c.dataInicio);
      const fim = new Date(c.dataFim);
      return c.status === 'ativo' && inicio <= mes && fim >= mes;
    });
    
    const receitaRecorrente = contratosAtivos.reduce((acc, c) => acc + c.valorMensal, 0);
    
    const negociacoesPotenciais = negociacoes.filter(n => {
      const dataProxima = new Date(n.dataProximaAcao);
      return dataProxima.getMonth() === mes.getMonth() && 
             dataProxima.getFullYear() === mes.getFullYear();
    });
    
    const receitaPotencial = negociacoesPotenciais.reduce((acc, n) => {
      return acc + (n.valorEstimado * (n.probabilidadeFechamento / 100));
    }, 0);
    
    meses.push({
      mes: mesStr,
      receitaRecorrente,
      receitaPotencial: receitaRecorrente + receitaPotencial
    });
  }
  
  return meses;
};

export const calcularCustoMarketing = (estrategias: EstrategiaMarketing[]): number => {
  return estrategias.reduce((acc, e) => acc + e.investimentoMensal, 0);
};

export const calcularCustoEquipe = (equipe: Pessoa[]): number => {
  return equipe.reduce((acc, p) => acc + p.salario, 0);
};

export const calcularCustoNecessidadesEquipe = (necessidades: NecessidadePessoa[]): number => {
  return necessidades.reduce((acc, n) => acc + (n.salarioEstimado * n.quantidade), 0);
};

export const calcularTaxaRenovacao = (contratos: Contrato[]): number => {
  if (contratos.length === 0) return 0;
  const somaProb = contratos.reduce((acc, c) => acc + c.probabilidadeRenovacao, 0);
  return somaProb / contratos.length;
};

export const calcularROIMarketing = (
  estrategias: EstrategiaMarketing[], 
  receitaPotencial: number
): number => {
  const custoTotal = calcularCustoMarketing(estrategias);
  if (custoTotal === 0) return 0;
  return ((receitaPotencial - custoTotal) / custoTotal) * 100;
};