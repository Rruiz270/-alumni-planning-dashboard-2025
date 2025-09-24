import React, { useState } from 'react';
import type { EstrategiaMarketing, VerticalType, Automacao } from '../types';
import { Target, DollarSign, Bot, Plus, Edit2, Trash2, TrendingUp } from 'lucide-react';

interface Props {
  estrategias: EstrategiaMarketing[];
  onUpdateEstrategia: (estrategia: EstrategiaMarketing) => void;
  onAddEstrategia: (estrategia: Omit<EstrategiaMarketing, 'id'>) => void;
  onDeleteEstrategia: (id: string) => void;
}

export const EstrategiaMarketingComponent: React.FC<Props> = ({ 
  estrategias, 
  onUpdateEstrategia, 
  onAddEstrategia,
  onDeleteEstrategia 
}) => {
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<EstrategiaMarketing>>({
    vertical: 'B2B',
    nomeEstrategia: '',
    investimentoMensal: 0,
    canalMarketing: 'google_ads',
    automacoes: [],
    metaLeads: 0,
    taxaConversaoEstimada: 2
  });
  const [novaAutomacao, setNovaAutomacao] = useState<Partial<Automacao>>({
    nome: '',
    tipo: 'email',
    gatilho: '',
    ativo: true
  });

  const canaisLabels = {
    'google_ads': 'Google Ads',
    'facebook': 'Facebook/Instagram',
    'linkedin': 'LinkedIn',
    'email': 'E-mail Marketing',
    'eventos': 'Eventos',
    'outro': 'Outro'
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      onUpdateEstrategia({ ...formData, id: editingId } as EstrategiaMarketing);
    } else {
      onAddEstrategia(formData as Omit<EstrategiaMarketing, 'id'>);
    }
    resetForm();
  };

  const resetForm = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData({
      vertical: 'B2B',
      nomeEstrategia: '',
      investimentoMensal: 0,
      canalMarketing: 'google_ads',
      automacoes: [],
      metaLeads: 0,
      taxaConversaoEstimada: 2
    });
  };

  const handleEdit = (estrategia: EstrategiaMarketing) => {
    setFormData(estrategia);
    setEditingId(estrategia.id);
    setShowForm(true);
  };

  const adicionarAutomacao = () => {
    if (novaAutomacao.nome && novaAutomacao.gatilho) {
      const automacao: Automacao = {
        id: Date.now().toString(),
        nome: novaAutomacao.nome!,
        tipo: novaAutomacao.tipo!,
        gatilho: novaAutomacao.gatilho!,
        ativo: novaAutomacao.ativo!
      };
      setFormData({
        ...formData,
        automacoes: [...(formData.automacoes || []), automacao]
      });
      setNovaAutomacao({
        nome: '',
        tipo: 'email',
        gatilho: '',
        ativo: true
      });
    }
  };

  const removerAutomacao = (id: string) => {
    setFormData({
      ...formData,
      automacoes: formData.automacoes?.filter(a => a.id !== id) || []
    });
  };

  const calcularROI = (estrategia: EstrategiaMarketing) => {
    const leadsEsperados = estrategia.metaLeads;
    const conversoes = leadsEsperados * (estrategia.taxaConversaoEstimada / 100);
    const receitaEstimada = conversoes * 15000; // Valor médio por cliente
    const roi = ((receitaEstimada - estrategia.investimentoMensal) / estrategia.investimentoMensal) * 100;
    return roi;
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Estratégias de Marketing</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          <Plus size={20} />
          Nova Estratégia
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
              <label className="block text-sm font-medium mb-1">Nome da Estratégia</label>
              <input
                type="text"
                value={formData.nomeEstrategia}
                onChange={(e) => setFormData({ ...formData, nomeEstrategia: e.target.value })}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Canal</label>
              <select
                value={formData.canalMarketing}
                onChange={(e) => setFormData({ ...formData, canalMarketing: e.target.value as any })}
                className="w-full p-2 border rounded-md"
              >
                <option value="google_ads">Google Ads</option>
                <option value="facebook">Facebook/Instagram</option>
                <option value="linkedin">LinkedIn</option>
                <option value="email">E-mail Marketing</option>
                <option value="eventos">Eventos</option>
                <option value="outro">Outro</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Investimento Mensal (R$)</label>
              <input
                type="number"
                value={formData.investimentoMensal}
                onChange={(e) => setFormData({ ...formData, investimentoMensal: parseFloat(e.target.value) })}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Meta de Leads/mês</label>
              <input
                type="number"
                value={formData.metaLeads}
                onChange={(e) => setFormData({ ...formData, metaLeads: parseInt(e.target.value) })}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Taxa de Conversão (%)</label>
              <input
                type="number"
                step="0.1"
                value={formData.taxaConversaoEstimada}
                onChange={(e) => setFormData({ ...formData, taxaConversaoEstimada: parseFloat(e.target.value) })}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>
          </div>

          {/* Seção de Automações */}
          <div className="mt-4">
            <h4 className="font-semibold mb-2">Automações</h4>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                placeholder="Nome da automação"
                value={novaAutomacao.nome}
                onChange={(e) => setNovaAutomacao({ ...novaAutomacao, nome: e.target.value })}
                className="flex-1 p-2 border rounded-md text-sm"
              />
              <select
                value={novaAutomacao.tipo}
                onChange={(e) => setNovaAutomacao({ ...novaAutomacao, tipo: e.target.value as any })}
                className="p-2 border rounded-md text-sm"
              >
                <option value="email">E-mail</option>
                <option value="whatsapp">WhatsApp</option>
                <option value="crm">CRM</option>
                <option value="outro">Outro</option>
              </select>
              <input
                type="text"
                placeholder="Gatilho"
                value={novaAutomacao.gatilho}
                onChange={(e) => setNovaAutomacao({ ...novaAutomacao, gatilho: e.target.value })}
                className="flex-1 p-2 border rounded-md text-sm"
              />
              <button
                type="button"
                onClick={adicionarAutomacao}
                className="px-3 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 text-sm"
              >
                <Plus size={16} />
              </button>
            </div>
            <div className="space-y-1">
              {formData.automacoes?.map((auto) => (
                <div key={auto.id} className="flex items-center justify-between p-2 bg-white rounded-md text-sm">
                  <span>{auto.nome} - {auto.tipo} - {auto.gatilho}</span>
                  <button
                    type="button"
                    onClick={() => removerAutomacao(auto.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {estrategias.map((estrategia) => {
          const roi = calcularROI(estrategia);
          return (
            <div key={estrategia.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-semibold text-lg">{estrategia.nomeEstrategia}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">
                      {estrategia.vertical}
                    </span>
                    <span className="px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded">
                      {canaisLabels[estrategia.canalMarketing]}
                    </span>
                  </div>
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => handleEdit(estrategia)}
                    className="p-1 text-gray-500 hover:text-gray-700"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button
                    onClick={() => onDeleteEstrategia(estrategia.id)}
                    className="p-1 text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1">
                    <DollarSign size={16} className="text-gray-500" />
                    Investimento
                  </span>
                  <span className="font-medium">R$ {estrategia.investimentoMensal.toLocaleString('pt-BR')}/mês</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1">
                    <Target size={16} className="text-gray-500" />
                    Meta de Leads
                  </span>
                  <span className="font-medium">{estrategia.metaLeads}/mês</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1">
                    <TrendingUp size={16} className="text-gray-500" />
                    Conversão
                  </span>
                  <span className="font-medium">{estrategia.taxaConversaoEstimada}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-semibold">ROI Estimado</span>
                  <span className={`font-bold ${roi > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {roi.toFixed(0)}%
                  </span>
                </div>
              </div>

              {estrategia.automacoes.length > 0 && (
                <div className="mt-3 pt-3 border-t">
                  <p className="text-sm font-medium mb-1 flex items-center gap-1">
                    <Bot size={16} />
                    Automações ({estrategia.automacoes.length})
                  </p>
                  <div className="space-y-1">
                    {estrategia.automacoes.map((auto) => (
                      <div key={auto.id} className="text-xs text-gray-600">
                        • {auto.nome} ({auto.tipo})
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};