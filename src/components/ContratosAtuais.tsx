import React, { useState } from 'react';
import type { Contrato, VerticalType } from '../types';
import { Calendar, Users, DollarSign, TrendingUp, Edit2, Plus, Link, Upload } from 'lucide-react';
import { formatDateForInput, parseInputDate } from '../utils/dateHelpers';
import { calcularValorTotalContrato } from '../utils/calculations';

interface Props {
  contratos: Contrato[];
  onUpdateContrato: (contrato: Contrato) => void;
  onAddContrato: (contrato: Omit<Contrato, 'id'>) => void;
}

export const ContratosAtuais: React.FC<Props> = ({ contratos, onUpdateContrato, onAddContrato }) => {
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Contrato>>({
    vertical: 'B2B',
    empresa: '',
    numeroAlunos: 0,
    valorMensal: 0,
    dataInicio: new Date(),
    dataFim: new Date(),
    status: 'ativo',
    probabilidadeRenovacao: 50,
    possibilidadeUpsell: false
  });

  const verticalColors: Record<VerticalType, string> = {
    'B2B': 'bg-blue-500',
    'B2B2C': 'bg-green-500',
    'B2G': 'bg-purple-500',
    'B2S': 'bg-orange-500',
    'Franquia': 'bg-pink-500'
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      onUpdateContrato({ ...formData, id: editingId } as Contrato);
    } else {
      onAddContrato(formData as Omit<Contrato, 'id'>);
    }
    setShowForm(false);
    setEditingId(null);
    setFormData({
      vertical: 'B2B',
      empresa: '',
      numeroAlunos: 0,
      valorMensal: 0,
      dataInicio: new Date(),
      dataFim: new Date(),
      status: 'ativo',
      probabilidadeRenovacao: 50,
      possibilidadeUpsell: false
    });
  };

  const handleEdit = (contrato: Contrato) => {
    setFormData(contrato);
    setEditingId(contrato.id);
    setShowForm(true);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Contratos Atuais</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          <Plus size={20} />
          Novo Contrato
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
              <label className="block text-sm font-medium mb-1">Número de Alunos</label>
              <input
                type="number"
                value={formData.numeroAlunos}
                onChange={(e) => setFormData({ ...formData, numeroAlunos: parseInt(e.target.value) })}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Valor Mensal (R$)</label>
              <input
                type="number"
                value={formData.valorMensal}
                onChange={(e) => setFormData({ ...formData, valorMensal: parseFloat(e.target.value) })}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Data Início</label>
              <input
                type="date"
                value={formatDateForInput(formData.dataInicio)}
                onChange={(e) => {
                  const date = parseInputDate(e.target.value);
                  if (date) {
                    setFormData({ ...formData, dataInicio: date });
                  }
                }}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Data Fim</label>
              <input
                type="date"
                value={formatDateForInput(formData.dataFim)}
                onChange={(e) => {
                  const date = parseInputDate(e.target.value);
                  if (date) {
                    setFormData({ ...formData, dataFim: date });
                  }
                }}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as 'ativo' | 'encerrado' | 'pausado' })}
                className="w-full p-2 border rounded-md"
              >
                <option value="ativo">Ativo</option>
                <option value="pausado">Pausado</option>
                <option value="encerrado">Encerrado</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Prob. Renovação (%)</label>
              <input
                type="number"
                min="0"
                max="100"
                value={formData.probabilidadeRenovacao}
                onChange={(e) => setFormData({ ...formData, probabilidadeRenovacao: parseInt(e.target.value) })}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium mb-1">Observações</label>
              <textarea
                value={formData.observacoes || ''}
                onChange={(e) => setFormData({ ...formData, observacoes: e.target.value })}
                className="w-full p-2 border rounded-md"
                rows={2}
              />
            </div>
            <div className="col-span-2">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.possibilidadeUpsell || false}
                  onChange={(e) => setFormData({ ...formData, possibilidadeUpsell: e.target.checked })}
                  className="rounded"
                />
                <span className="text-sm font-medium">Possibilidade de Upsell</span>
              </label>
            </div>
            {formData.possibilidadeUpsell && (
              <div className="col-span-2">
                <label className="block text-sm font-medium mb-1">Valor Estimado de Upsell (R$)</label>
                <input
                  type="number"
                  value={formData.valorUpsellEstimado || 0}
                  onChange={(e) => setFormData({ ...formData, valorUpsellEstimado: parseFloat(e.target.value) })}
                  className="w-full p-2 border rounded-md"
                />
              </div>
            )}
          </div>
          <div className="mt-4">
            <div className="p-3 bg-blue-50 rounded-md">
              <p className="text-sm font-medium text-blue-900">
                Valor Total do Contrato: R$ {calcularValorTotalContrato(formData).toLocaleString('pt-BR')}
              </p>
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
              onClick={() => {
                setShowForm(false);
                setEditingId(null);
              }}
              className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
            >
              Cancelar
            </button>
          </div>
        </form>
      )}

      <div className="space-y-4">
        {contratos.map((contrato) => (
          <div key={contrato.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`px-2 py-1 text-white text-xs rounded ${verticalColors[contrato.vertical]}`}>
                    {contrato.vertical}
                  </span>
                  <h3 className="text-lg font-semibold">{contrato.empresa}</h3>
                  <span className={`px-2 py-1 text-xs rounded ${
                    contrato.status === 'ativo' ? 'bg-green-100 text-green-800' : 
                    contrato.status === 'pausado' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {contrato.status}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Users size={16} className="text-gray-500" />
                    <span>{contrato.numeroAlunos} alunos</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <DollarSign size={16} className="text-gray-500" />
                    <span>R$ {contrato.valorMensal.toLocaleString('pt-BR')}/mês</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar size={16} className="text-gray-500" />
                    <span>{new Date(contrato.dataFim).toLocaleDateString('pt-BR')}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <TrendingUp size={16} className="text-gray-500" />
                    <span>{contrato.probabilidadeRenovacao}% renovação</span>
                  </div>
                </div>
                
                <div className="mt-2 p-2 bg-gray-50 rounded text-sm">
                  <p className="font-medium">Valor Total: R$ {calcularValorTotalContrato(contrato).toLocaleString('pt-BR')}</p>
                </div>
                
                {contrato.possibilidadeUpsell && (
                  <p className="text-sm text-green-600 mt-2">
                    ⬆️ Possibilidade de upsell: R$ {contrato.valorUpsellEstimado?.toLocaleString('pt-BR')}
                  </p>
                )}
                
                {contrato.observacoes && (
                  <p className="text-sm text-gray-600 mt-2 italic">{contrato.observacoes}</p>
                )}
                
                <div className="mt-3 flex gap-3">
                  <button className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800">
                    <Upload size={16} />
                    Documentos
                  </button>
                  <button className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800">
                    <Link size={16} />
                    Links
                  </button>
                </div>
              </div>
              
              <button
                onClick={() => handleEdit(contrato)}
                className="ml-4 p-2 text-gray-500 hover:text-gray-700"
              >
                <Edit2 size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};