import React, { useState } from 'react';
import type { NegociacaoEmAndamento, VerticalType } from '../types';
import { Building, Users, DollarSign, Calendar, TrendingUp, Edit2, Plus } from 'lucide-react';

interface Props {
  negociacoes: NegociacaoEmAndamento[];
  onUpdateNegociacao: (negociacao: NegociacaoEmAndamento) => void;
  onAddNegociacao: (negociacao: Omit<NegociacaoEmAndamento, 'id'>) => void;
}

export const NegociacoesAndamento: React.FC<Props> = ({ negociacoes, onUpdateNegociacao, onAddNegociacao }) => {
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<NegociacaoEmAndamento>>({
    vertical: 'B2B',
    empresa: '',
    numeroAlunosEstimado: 0,
    valorEstimado: 0,
    probabilidadeFechamento: 50,
    dataContatoInicial: new Date(),
    proximaAcao: '',
    dataProximaAcao: new Date(),
    estagio: 'prospeccao'
  });

  const estagioColors = {
    'prospeccao': 'bg-gray-500',
    'proposta': 'bg-blue-500',
    'negociacao': 'bg-yellow-500',
    'fechamento': 'bg-green-500'
  };

  const estagioLabels = {
    'prospeccao': 'Prospecção',
    'proposta': 'Proposta',
    'negociacao': 'Negociação',
    'fechamento': 'Fechamento'
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      onUpdateNegociacao({ ...formData, id: editingId } as NegociacaoEmAndamento);
    } else {
      onAddNegociacao(formData as Omit<NegociacaoEmAndamento, 'id'>);
    }
    resetForm();
  };

  const resetForm = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData({
      vertical: 'B2B',
      empresa: '',
      numeroAlunosEstimado: 0,
      valorEstimado: 0,
      probabilidadeFechamento: 50,
      dataContatoInicial: new Date(),
      proximaAcao: '',
      dataProximaAcao: new Date(),
      estagio: 'prospeccao'
    });
  };

  const handleEdit = (negociacao: NegociacaoEmAndamento) => {
    setFormData(negociacao);
    setEditingId(negociacao.id);
    setShowForm(true);
  };

  const agruparPorVertical = () => {
    const grupos: Record<VerticalType, NegociacaoEmAndamento[]> = {
      'B2B': [],
      'B2B2C': [],
      'B2G': [],
      'B2S': [],
      'Franquia': []
    };

    negociacoes.forEach(neg => {
      grupos[neg.vertical].push(neg);
    });

    return grupos;
  };

  const grupos = agruparPorVertical();

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Negociações em Andamento</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          <Plus size={20} />
          Nova Negociação
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-6 p-4 border rounded-md bg-gray-50">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Vertical</label>
              <select
                value={formData.vertical}
                onChange={(e) => setFormData({ ...formData, vertical: e.target.value as VerticalType })}
                className="w-full p-2 border rounded-md"
              >
                <option value="B2B">B2B</option>
                <option value="B2B2C">B2B2C</option>
                <option value="B2G">B2G</option>
                <option value="B2S">B2S</option>
                <option value="Franquia">Franquia</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Empresa</label>
              <input
                type="text"
                value={formData.empresa}
                onChange={(e) => setFormData({ ...formData, empresa: e.target.value })}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Alunos Estimados</label>
              <input
                type="number"
                value={formData.numeroAlunosEstimado}
                onChange={(e) => setFormData({ ...formData, numeroAlunosEstimado: parseInt(e.target.value) })}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Valor Estimado (R$)</label>
              <input
                type="number"
                value={formData.valorEstimado}
                onChange={(e) => setFormData({ ...formData, valorEstimado: parseFloat(e.target.value) })}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Probabilidade (%)</label>
              <input
                type="number"
                min="0"
                max="100"
                value={formData.probabilidadeFechamento}
                onChange={(e) => setFormData({ ...formData, probabilidadeFechamento: parseInt(e.target.value) })}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Estágio</label>
              <select
                value={formData.estagio}
                onChange={(e) => setFormData({ ...formData, estagio: e.target.value as any })}
                className="w-full p-2 border rounded-md"
              >
                <option value="prospeccao">Prospecção</option>
                <option value="proposta">Proposta</option>
                <option value="negociacao">Negociação</option>
                <option value="fechamento">Fechamento</option>
              </select>
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium mb-1">Próxima Ação</label>
              <input
                type="text"
                value={formData.proximaAcao}
                onChange={(e) => setFormData({ ...formData, proximaAcao: e.target.value })}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Data da Próxima Ação</label>
              <input
                type="date"
                value={formData.dataProximaAcao instanceof Date ? formData.dataProximaAcao.toISOString().split('T')[0] : ''}
                onChange={(e) => setFormData({ ...formData, dataProximaAcao: new Date(e.target.value) })}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>
          </div>
          <div className="mt-4 flex gap-2">
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            >
              {editingId ? 'Atualizar' : 'Adicionar'}
            </button>
            <button
              type="button"
              onClick={resetForm}
              className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
            >
              Cancelar
            </button>
          </div>
        </form>
      )}

      <div className="space-y-6">
        {Object.entries(grupos).map(([vertical, negs]) => {
          if (negs.length === 0) return null;
          
          return (
            <div key={vertical} className="border rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-3">{vertical}</h3>
              <div className="space-y-3">
                {negs.map((neg) => (
                  <div key={neg.id} className="bg-gray-50 p-4 rounded-md hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Building size={18} className="text-gray-600" />
                          <span className="font-semibold">{neg.empresa}</span>
                          <span className={`px-2 py-1 text-white text-xs rounded ${estagioColors[neg.estagio]}`}>
                            {estagioLabels[neg.estagio]}
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
                          <div className="flex items-center gap-1">
                            <Users size={14} />
                            <span>{neg.numeroAlunosEstimado} alunos</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <DollarSign size={14} />
                            <span>R$ {neg.valorEstimado.toLocaleString('pt-BR')}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <TrendingUp size={14} />
                            <span>{neg.probabilidadeFechamento}% prob.</span>
                          </div>
                        </div>
                        
                        <div className="mt-2">
                          <p className="text-sm">
                            <span className="font-medium">Próxima ação:</span> {neg.proximaAcao}
                          </p>
                          <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                            <Calendar size={14} />
                            {new Date(neg.dataProximaAcao).toLocaleDateString('pt-BR')}
                          </p>
                        </div>
                        
                        {neg.observacoes && (
                          <p className="text-sm text-gray-600 mt-2 italic">{neg.observacoes}</p>
                        )}
                      </div>
                      
                      <button
                        onClick={() => handleEdit(neg)}
                        className="ml-4 p-2 text-gray-500 hover:text-gray-700"
                      >
                        <Edit2 size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};