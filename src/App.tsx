import { useState } from 'react';
import { ContratosAtuais } from './components/ContratosAtuais';
import { NegociacoesAndamento } from './components/NegociacoesAndamento';
import { Dashboard } from './components/Dashboard';
import { EstrategiaMarketingComponent } from './components/EstrategiaMarketing';
import { GestaoEquipe } from './components/GestaoEquipe';
import type { DadosFinanceiros, Contrato, NegociacaoEmAndamento, EstrategiaMarketing, Pessoa, NecessidadePessoa } from './types';
import { dadosIniciais } from './data/mockData';
import { BarChart3, FileText, TrendingUp, Megaphone, Users, GraduationCap } from 'lucide-react';

function App() {
  const [dados, setDados] = useState<DadosFinanceiros>(dadosIniciais);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'contratos' | 'negociacoes' | 'marketing' | 'equipe'>('dashboard');

  const handleUpdateContrato = (contratoAtualizado: Contrato) => {
    setDados(prev => ({
      ...prev,
      contratos: prev.contratos.map(c => 
        c.id === contratoAtualizado.id ? contratoAtualizado : c
      )
    }));
  };

  const handleAddContrato = (novoContrato: Omit<Contrato, 'id'>) => {
    const contrato: Contrato = {
      ...novoContrato,
      id: Date.now().toString()
    };
    setDados(prev => ({
      ...prev,
      contratos: [...prev.contratos, contrato]
    }));
  };

  const handleUpdateNegociacao = (negociacaoAtualizada: NegociacaoEmAndamento) => {
    setDados(prev => ({
      ...prev,
      negociacoes: prev.negociacoes.map(n => 
        n.id === negociacaoAtualizada.id ? negociacaoAtualizada : n
      )
    }));
  };

  const handleAddNegociacao = (novaNegociacao: Omit<NegociacaoEmAndamento, 'id'>) => {
    const negociacao: NegociacaoEmAndamento = {
      ...novaNegociacao,
      id: Date.now().toString()
    };
    setDados(prev => ({
      ...prev,
      negociacoes: [...prev.negociacoes, negociacao]
    }));
  };

  const handleUpdateEstrategia = (estrategiaAtualizada: EstrategiaMarketing) => {
    setDados(prev => ({
      ...prev,
      estrategiasMarketing: prev.estrategiasMarketing.map(e => 
        e.id === estrategiaAtualizada.id ? estrategiaAtualizada : e
      )
    }));
  };

  const handleAddEstrategia = (novaEstrategia: Omit<EstrategiaMarketing, 'id'>) => {
    const estrategia: EstrategiaMarketing = {
      ...novaEstrategia,
      id: Date.now().toString()
    };
    setDados(prev => ({
      ...prev,
      estrategiasMarketing: [...prev.estrategiasMarketing, estrategia]
    }));
  };

  const handleDeleteEstrategia = (id: string) => {
    setDados(prev => ({
      ...prev,
      estrategiasMarketing: prev.estrategiasMarketing.filter(e => e.id !== id)
    }));
  };

  const handleUpdatePessoa = (pessoaAtualizada: Pessoa) => {
    setDados(prev => ({
      ...prev,
      equipeAtual: prev.equipeAtual.map(p => 
        p.id === pessoaAtualizada.id ? pessoaAtualizada : p
      )
    }));
  };

  const handleAddPessoa = (novaPessoa: Omit<Pessoa, 'id'>) => {
    const pessoa: Pessoa = {
      ...novaPessoa,
      id: Date.now().toString()
    };
    setDados(prev => ({
      ...prev,
      equipeAtual: [...prev.equipeAtual, pessoa]
    }));
  };

  const handleAddNecessidade = (novaNecessidade: Omit<NecessidadePessoa, 'id'>) => {
    const necessidade: NecessidadePessoa = {
      ...novaNecessidade,
      id: Date.now().toString()
    };
    setDados(prev => ({
      ...prev,
      necessidadesEquipe: [...prev.necessidadesEquipe, necessidade]
    }));
  };

  const handleDeleteNecessidade = (id: string) => {
    setDados(prev => ({
      ...prev,
      necessidadesEquipe: prev.necessidadesEquipe.filter(n => n.id !== id)
    }));
  };

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'contratos', label: 'Contratos', icon: FileText },
    { id: 'negociacoes', label: 'Negociações', icon: TrendingUp },
    { id: 'marketing', label: 'Marketing', icon: Megaphone },
    { id: 'equipe', label: 'Equipe', icon: Users },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <GraduationCap className="text-blue-600" size={32} />
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Alumni by Better - Planejamento</h1>
              <p className="text-sm text-gray-600">Sistema de Gestão e Previsão de Receitas</p>
            </div>
          </div>
        </div>
      </header>

      <nav className="bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex space-x-1">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-gray-800'
                }`}
              >
                <tab.icon size={20} />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-6">
        {activeTab === 'dashboard' && <Dashboard dados={dados} />}
        
        {activeTab === 'contratos' && (
          <ContratosAtuais
            contratos={dados.contratos}
            onUpdateContrato={handleUpdateContrato}
            onAddContrato={handleAddContrato}
          />
        )}
        
        {activeTab === 'negociacoes' && (
          <NegociacoesAndamento
            negociacoes={dados.negociacoes}
            onUpdateNegociacao={handleUpdateNegociacao}
            onAddNegociacao={handleAddNegociacao}
          />
        )}
        
        {activeTab === 'marketing' && (
          <EstrategiaMarketingComponent
            estrategias={dados.estrategiasMarketing}
            onUpdateEstrategia={handleUpdateEstrategia}
            onAddEstrategia={handleAddEstrategia}
            onDeleteEstrategia={handleDeleteEstrategia}
          />
        )}
        
        {activeTab === 'equipe' && (
          <GestaoEquipe
            equipeAtual={dados.equipeAtual}
            necessidades={dados.necessidadesEquipe}
            onUpdatePessoa={handleUpdatePessoa}
            onAddPessoa={handleAddPessoa}
            onAddNecessidade={handleAddNecessidade}
            onDeleteNecessidade={handleDeleteNecessidade}
          />
        )}
      </main>
    </div>
  );
}

export default App;
