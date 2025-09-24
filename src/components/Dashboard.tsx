import React from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, Users, DollarSign, Calendar } from 'lucide-react';
import { DadosFinanceiros, VerticalType } from '../types';
import { 
  calcularReceitaAtual, 
  calcularReceitaPorVertical, 
  calcularReceitaPotencial,
  calcularForecastAnual,
  calcularTaxaRenovacao
} from '../utils/calculations';

interface Props {
  dados: DadosFinanceiros;
}

export const Dashboard: React.FC<Props> = ({ dados }) => {
  const receitaAtual = calcularReceitaAtual(dados.contratos);
  const receitaPotencial = calcularReceitaPotencial(dados.negociacoes);
  const receitaPorVertical = calcularReceitaPorVertical(dados.contratos);
  const forecastAnual = calcularForecastAnual(dados.contratos, dados.negociacoes);
  const taxaRenovacao = calcularTaxaRenovacao(dados.contratos);
  
  const totalAlunos = dados.contratos
    .filter(c => c.status === 'ativo')
    .reduce((acc, c) => acc + c.numeroAlunos, 0);

  const verticalColors: Record<VerticalType, string> = {
    'B2B': '#3B82F6',
    'B2B2C': '#10B981',
    'B2G': '#8B5CF6',
    'B2S': '#F97316',
    'Franquia': '#EC4899'
  };

  const dadosVertical = Object.entries(receitaPorVertical).map(([vertical, valor]) => ({
    name: vertical,
    valor: valor
  }));

  const dadosPizza = Object.entries(receitaPorVertical).map(([vertical, valor]) => ({
    name: vertical,
    value: valor
  }));

  return (
    <div className="space-y-6">
      {/* Cards de Métricas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Receita Mensal Atual</p>
              <p className="text-2xl font-bold text-gray-800">
                R$ {receitaAtual.toLocaleString('pt-BR')}
              </p>
            </div>
            <DollarSign className="text-green-500" size={32} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Receita Potencial</p>
              <p className="text-2xl font-bold text-gray-800">
                R$ {receitaPotencial.toLocaleString('pt-BR')}
              </p>
            </div>
            <TrendingUp className="text-blue-500" size={32} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total de Alunos</p>
              <p className="text-2xl font-bold text-gray-800">{totalAlunos}</p>
            </div>
            <Users className="text-purple-500" size={32} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Taxa de Renovação</p>
              <p className="text-2xl font-bold text-gray-800">
                {taxaRenovacao.toFixed(0)}%
              </p>
            </div>
            <Calendar className="text-orange-500" size={32} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfico de Receita por Vertical */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Receita por Vertical</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dadosVertical}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis tickFormatter={(value) => `R$ ${(value / 1000).toFixed(0)}k`} />
              <Tooltip 
                formatter={(value: number) => `R$ ${value.toLocaleString('pt-BR')}`}
              />
              <Bar dataKey="valor" fill="#3B82F6">
                {dadosVertical.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={verticalColors[entry.name as VerticalType]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Gráfico de Pizza - Distribuição de Receita */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Distribuição de Receita</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={dadosPizza}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(entry) => `${entry.name}: ${((entry.value / receitaAtual) * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {dadosPizza.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={verticalColors[entry.name as VerticalType]} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number) => `R$ ${value.toLocaleString('pt-BR')}`} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Gráfico de Forecast Anual */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Previsão de Receita - Próximos 12 Meses</h3>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={forecastAnual}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="mes" />
            <YAxis tickFormatter={(value) => `R$ ${(value / 1000).toFixed(0)}k`} />
            <Tooltip 
              formatter={(value: number) => `R$ ${value.toLocaleString('pt-BR')}`}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="receitaRecorrente" 
              stroke="#3B82F6" 
              name="Receita Recorrente"
              strokeWidth={2}
            />
            <Line 
              type="monotone" 
              dataKey="receitaPotencial" 
              stroke="#10B981" 
              name="Receita Potencial Total"
              strokeWidth={2}
              strokeDasharray="5 5"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};