import React, { useState } from 'react';
import type { Pessoa, NecessidadePessoa } from '../types';
import { User, DollarSign, Plus, Edit2, AlertCircle, Trash2 } from 'lucide-react';

interface Props {
  equipeAtual: Pessoa[];
  necessidades: NecessidadePessoa[];
  onUpdatePessoa: (pessoa: Pessoa) => void;
  onAddPessoa: (pessoa: Omit<Pessoa, 'id'>) => void;
  onAddNecessidade: (necessidade: Omit<NecessidadePessoa, 'id'>) => void;
  onDeleteNecessidade: (id: string) => void;
}

export const GestaoEquipe: React.FC<Props> = ({ 
  equipeAtual, 
  necessidades,
  onUpdatePessoa,
  onAddPessoa,
  onAddNecessidade,
  onDeleteNecessidade
}) => {
  const [showFormPessoa, setShowFormPessoa] = useState(false);
  const [showFormNecessidade, setShowFormNecessidade] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formPessoa, setFormPessoa] = useState<Partial<Pessoa>>({
    nome: '',
    cargo: '',
    vertical: 'todos',
    salario: 0,
    tipo: 'clt',
    dataContratacao: new Date()
  });
  const [formNecessidade, setFormNecessidade] = useState<Partial<NecessidadePessoa>>({
    cargo: '',
    vertical: 'todos',
    quantidade: 1,
    salarioEstimado: 0,
    prioridade: 'media',
    justificativa: ''
  });

  const tipoContratacao = {
    'clt': 'CLT',
    'pj': 'PJ',
    'freelancer': 'Freelancer'
  };

  const prioridadeColors = {
    'alta': 'bg-red-100 text-red-800',
    'media': 'bg-yellow-100 text-yellow-800',
    'baixa': 'bg-green-100 text-green-800'
  };

  const handleSubmitPessoa = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      onUpdatePessoa({ ...formPessoa, id: editingId } as Pessoa);
    } else {
      onAddPessoa(formPessoa as Omit<Pessoa, 'id'>);
    }
    resetFormPessoa();
  };

  const handleSubmitNecessidade = (e: React.FormEvent) => {
    e.preventDefault();
    onAddNecessidade(formNecessidade as Omit<NecessidadePessoa, 'id'>);
    resetFormNecessidade();
  };

  const resetFormPessoa = () => {
    setShowFormPessoa(false);
    setEditingId(null);
    setFormPessoa({
      nome: '',
      cargo: '',
      vertical: 'todos',
      salario: 0,
      tipo: 'clt',
      dataContratacao: new Date()
    });
  };

  const resetFormNecessidade = () => {
    setShowFormNecessidade(false);
    setFormNecessidade({
      cargo: '',
      vertical: 'todos',
      quantidade: 1,
      salarioEstimado: 0,
      prioridade: 'media',
      justificativa: ''
    });
  };

  const handleEditPessoa = (pessoa: Pessoa) => {
    setFormPessoa(pessoa);
    setEditingId(pessoa.id);
    setShowFormPessoa(true);
  };

  const custoTotalEquipe = equipeAtual.reduce((acc, p) => acc + p.salario, 0);
  const custoTotalNecessidades = necessidades.reduce((acc, n) => acc + (n.salarioEstimado * n.quantidade), 0);

  const agruparPorVertical = () => {
    const grupos: Record<string, Pessoa[]> = {};
    equipeAtual.forEach(pessoa => {
      const vertical = pessoa.vertical;
      if (!grupos[vertical]) {
        grupos[vertical] = [];
      }
      grupos[vertical].push(pessoa);
    });
    return grupos;
  };

  const grupos = agruparPorVertical();

  return (
    <div className="space-y-6">
      {/* Resumo de Custos */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Custo Total Equipe</p>
              <p className="text-xl font-bold">R$ {custoTotalEquipe.toLocaleString('pt-BR')}</p>
            </div>
            <User className="text-blue-500" size={24} />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Custo Novas Contratações</p>
              <p className="text-xl font-bold">R$ {custoTotalNecessidades.toLocaleString('pt-BR')}</p>
            </div>
            <DollarSign className="text-green-500" size={24} />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total de Funcionários</p>
              <p className="text-xl font-bold">{equipeAtual.length}</p>
            </div>
            <User className="text-purple-500" size={24} />
          </div>
        </div>
      </div>

      {/* Equipe Atual */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Equipe Atual</h2>
          <button
            onClick={() => setShowFormPessoa(!showFormPessoa)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            <Plus size={20} />
            Adicionar Pessoa
          </button>
        </div>

        {showFormPessoa && (
          <form onSubmit={handleSubmitPessoa} className="mb-4 p-4 border rounded-md bg-gray-50">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Nome</label>
                <input
                  type="text"
                  value={formPessoa.nome}
                  onChange={(e) => setFormPessoa({ ...formPessoa, nome: e.target.value })}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Cargo</label>
                <input
                  type="text"
                  value={formPessoa.cargo}
                  onChange={(e) => setFormPessoa({ ...formPessoa, cargo: e.target.value })}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Vertical</label>
                <select
                  value={formPessoa.vertical}
                  onChange={(e) => setFormPessoa({ ...formPessoa, vertical: e.target.value as any })}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="todos">Todos</option>
                  <option value="B2B">B2B</option>
                  <option value="B2B2C">B2B2C</option>
                  <option value="B2G">B2G</option>
                  <option value="B2S">B2S</option>
                  <option value="Franquia">Franquia</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Tipo</label>
                <select
                  value={formPessoa.tipo}
                  onChange={(e) => setFormPessoa({ ...formPessoa, tipo: e.target.value as any })}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="clt">CLT</option>
                  <option value="pj">PJ</option>
                  <option value="freelancer">Freelancer</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Salário (R$)</label>
                <input
                  type="number"
                  value={formPessoa.salario}
                  onChange={(e) => setFormPessoa({ ...formPessoa, salario: parseFloat(e.target.value) })}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Data Contratação</label>
                <input
                  type="date"
                  value={formPessoa.dataContratacao ? (formPessoa.dataContratacao instanceof Date ? formPessoa.dataContratacao.toISOString().split('T')[0] : new Date(formPessoa.dataContratacao).toISOString().split('T')[0]) : ''}
                  onChange={(e) => setFormPessoa({ ...formPessoa, dataContratacao: new Date(e.target.value) })}
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
                onClick={resetFormPessoa}
                className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
              >
                Cancelar
              </button>
            </div>
          </form>
        )}

        <div className="space-y-4">
          {Object.entries(grupos).map(([vertical, pessoas]) => (
            <div key={vertical} className="border rounded-lg p-3">
              <h3 className="font-semibold mb-2 capitalize">{vertical}</h3>
              <div className="space-y-2">
                {pessoas.map((pessoa) => (
                  <div key={pessoa.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
                    <div className="flex items-center gap-3">
                      <User size={16} className="text-gray-500" />
                      <div>
                        <p className="font-medium">{pessoa.nome}</p>
                        <p className="text-sm text-gray-600">{pessoa.cargo}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="font-medium">R$ {pessoa.salario.toLocaleString('pt-BR')}</p>
                        <p className="text-xs text-gray-500">{tipoContratacao[pessoa.tipo]}</p>
                      </div>
                      <button
                        onClick={() => handleEditPessoa(pessoa)}
                        className="p-1 text-gray-500 hover:text-gray-700"
                      >
                        <Edit2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Necessidades de Contratação */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Necessidades de Contratação</h2>
          <button
            onClick={() => setShowFormNecessidade(!showFormNecessidade)}
            className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
          >
            <AlertCircle size={20} />
            Nova Necessidade
          </button>
        </div>

        {showFormNecessidade && (
          <form onSubmit={handleSubmitNecessidade} className="mb-4 p-4 border rounded-md bg-gray-50">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Cargo</label>
                <input
                  type="text"
                  value={formNecessidade.cargo}
                  onChange={(e) => setFormNecessidade({ ...formNecessidade, cargo: e.target.value })}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Vertical</label>
                <select
                  value={formNecessidade.vertical}
                  onChange={(e) => setFormNecessidade({ ...formNecessidade, vertical: e.target.value as any })}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="todos">Todos</option>
                  <option value="B2B">B2B</option>
                  <option value="B2B2C">B2B2C</option>
                  <option value="B2G">B2G</option>
                  <option value="B2S">B2S</option>
                  <option value="Franquia">Franquia</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Quantidade</label>
                <input
                  type="number"
                  min="1"
                  value={formNecessidade.quantidade}
                  onChange={(e) => setFormNecessidade({ ...formNecessidade, quantidade: parseInt(e.target.value) })}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Salário Estimado (R$)</label>
                <input
                  type="number"
                  value={formNecessidade.salarioEstimado}
                  onChange={(e) => setFormNecessidade({ ...formNecessidade, salarioEstimado: parseFloat(e.target.value) })}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Prioridade</label>
                <select
                  value={formNecessidade.prioridade}
                  onChange={(e) => setFormNecessidade({ ...formNecessidade, prioridade: e.target.value as any })}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="alta">Alta</option>
                  <option value="media">Média</option>
                  <option value="baixa">Baixa</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Justificativa</label>
                <input
                  type="text"
                  value={formNecessidade.justificativa}
                  onChange={(e) => setFormNecessidade({ ...formNecessidade, justificativa: e.target.value })}
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
                Adicionar
              </button>
              <button
                type="button"
                onClick={resetFormNecessidade}
                className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
              >
                Cancelar
              </button>
            </div>
          </form>
        )}

        <div className="space-y-3">
          {necessidades.map((necessidade) => (
            <div key={necessidade.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-semibold">{necessidade.cargo}</h4>
                    <span className={`px-2 py-1 text-xs rounded ${prioridadeColors[necessidade.prioridade]}`}>
                      {necessidade.prioridade}
                    </span>
                    <span className="px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded">
                      {necessidade.vertical}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>Quantidade: {necessidade.quantidade} vaga(s)</p>
                    <p>Salário estimado: R$ {necessidade.salarioEstimado.toLocaleString('pt-BR')}</p>
                    <p>Custo total: R$ {(necessidade.salarioEstimado * necessidade.quantidade).toLocaleString('pt-BR')}</p>
                    <p className="italic">{necessidade.justificativa}</p>
                  </div>
                </div>
                <button
                  onClick={() => onDeleteNecessidade(necessidade.id)}
                  className="text-red-500 hover:text-red-700 p-1"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};