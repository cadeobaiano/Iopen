import React, { useState } from 'react';
import { 
  ArrowRight, 
  BookOpen, 
  Lightbulb, 
  Search, 
  Calculator, 
  PieChart, 
  Target,
  Clock,
  TrendingUp,
  BarChart3,
  DollarSign,
  Percent,
  AlertCircle
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

const LearningPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'courses' | 'tools'>('tools');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="font-sans text-gray-800">
      <Header />
      
      {/* Hero Section - Melhorado visualmente */}
      <section className="bg-gradient-to-r from-cyan-500 to-blue-600 pt-20 pb-16 px-4 text-white relative overflow-hidden">
        {/* Elementos decorativos de fundo */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-white"></div>
          <div className="absolute bottom-20 right-10 w-60 h-60 rounded-full bg-white"></div>
          <div className="absolute top-1/3 right-1/4 w-20 h-20 rounded-full bg-white"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col items-center text-center">
            <div className="mb-6 flex justify-center">
              <div className="bg-white/20 backdrop-blur-md p-4 rounded-full">
                <Lightbulb size={36} className="text-white" />
              </div>
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
              Aprenda a investir com confiança
            </h1>
            <p className="text-lg sm:text-xl opacity-90 mb-8 max-w-2xl">
              Acesse ferramentas financeiras e recursos educacionais para tomar decisões de investimento mais inteligentes.
            </p>
            <div className="relative w-full max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="text-gray-400" size={20} />
              </div>
              <input
                type="text"
                placeholder="Buscar conteúdo..."
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/30"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                data-track-id="learning-search-input"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Category Tabs - Simplificado */}
      <section className="sticky top-16 z-10 bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4">
          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex space-x-4 py-4 min-w-max justify-center">
              <button 
                onClick={() => setActiveTab('tools')}
                className={`px-5 py-2.5 rounded-md text-sm font-medium whitespace-nowrap touch-target ${
                  activeTab === 'tools' 
                    ? 'bg-cyan-50 text-cyan-700' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
                data-track-id="learning-tab-tools"
              >
                <Lightbulb size={18} className="inline mr-2" />
                Ferramentas Financeiras
              </button>
              <button 
                onClick={() => setActiveTab('courses')}
                className={`px-5 py-2.5 rounded-md text-sm font-medium whitespace-nowrap touch-target ${
                  activeTab === 'courses' 
                    ? 'bg-cyan-50 text-cyan-700' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
                data-track-id="learning-tab-courses"
              >
                <BookOpen size={18} className="inline mr-2" />
                Cursos
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Conteúdo principal baseado na aba selecionada */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          {/* Título da seção */}
          <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center">
            {activeTab === 'courses' && 'Cursos - Em breve'}
            {activeTab === 'tools' && 'Ferramentas financeiras'}
          </h2>
          
          {/* Cursos - Em breve */}
          {activeTab === 'courses' && (
            <div className="flex flex-col items-center justify-center py-16 px-4">
              <div className="bg-blue-50 p-6 rounded-full mb-6">
                <Clock size={64} className="text-blue-500" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-center">Estamos preparando conteúdos incríveis para você</h3>
              <p className="text-gray-600 text-center max-w-2xl mb-8">
                Nossa equipe está desenvolvendo cursos completos sobre investimentos, finanças pessoais e educação financeira. 
                Em breve você terá acesso a conteúdos exclusivos para aprimorar seus conhecimentos.
              </p>
              <div className="bg-white rounded-lg shadow-md p-6 max-w-md w-full">
                <h4 className="font-bold text-lg mb-3 flex items-center">
                  <AlertCircle size={20} className="text-blue-500 mr-2" />
                  Seja notificado quando lançarmos
                </h4>
                <div className="flex">
                  <input 
                    type="email" 
                    placeholder="Seu melhor e-mail" 
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r-lg transition-colors">
                    Inscrever-se
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {/* Ferramentas Financeiras - Expandido */}
          {activeTab === 'tools' && (
            <div className="space-y-12">
              {/* Primeira linha de ferramentas */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-shadow duration-300">
                  <div className="bg-cyan-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                    <Calculator className="text-cyan-600" size={24} />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Calculadora de juros compostos</h3>
                  <p className="text-gray-600 mb-4">
                    Calcule o crescimento dos seus investimentos ao longo do tempo com diferentes taxas de retorno.
                  </p>
                  <Link 
                    to="/tools/compound-calculator" 
                    className="inline-flex items-center text-cyan-600 font-semibold hover:text-cyan-800 transition-colors"
                  >
                    Acessar ferramenta <ArrowRight className="ml-2" size={16} />
                  </Link>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-shadow duration-300">
                  <div className="bg-cyan-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                    <PieChart className="text-cyan-600" size={24} />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Simulador de portfólio</h3>
                  <p className="text-gray-600 mb-4">
                    Crie e teste diferentes composições de portfólio para encontrar a alocação ideal para seus objetivos.
                  </p>
                  <Link 
                    to="/tools/portfolio-simulator" 
                    className="inline-flex items-center text-cyan-600 font-semibold hover:text-cyan-800 transition-colors"
                  >
                    Acessar ferramenta <ArrowRight className="ml-2" size={16} />
                  </Link>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-shadow duration-300">
                  <div className="bg-cyan-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                    <Target className="text-cyan-600" size={24} />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Planejador de objetivos</h3>
                  <p className="text-gray-600 mb-4">
                    Defina metas financeiras e crie um plano detalhado para alcançá-las com prazos e valores de aportes.
                  </p>
                  <Link 
                    to="/tools/goal-planner" 
                    className="inline-flex items-center text-cyan-600 font-semibold hover:text-cyan-800 transition-colors"
                  >
                    Acessar ferramenta <ArrowRight className="ml-2" size={16} />
                  </Link>
                </div>
              </div>
              
              {/* Segunda linha de ferramentas */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-shadow duration-300">
                  <div className="bg-cyan-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                    <Percent className="text-cyan-600" size={24} />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Comparador de taxas</h3>
                  <p className="text-gray-600 mb-4">
                    Compare o impacto de diferentes taxas de administração no rendimento dos seus investimentos a longo prazo.
                  </p>
                  <Link 
                    to="/tools/fee-comparison" 
                    className="inline-flex items-center text-cyan-600 font-semibold hover:text-cyan-800 transition-colors"
                  >
                    Acessar ferramenta <ArrowRight className="ml-2" size={16} />
                  </Link>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-shadow duration-300">
                  <div className="bg-cyan-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                    <DollarSign className="text-cyan-600" size={24} />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Otimização tributária</h3>
                  <p className="text-gray-600 mb-4">
                    Descubra estratégias para minimizar o impacto dos impostos nos seus investimentos e maximizar seus retornos.
                  </p>
                  <Link 
                    to="/tools/tax-optimization" 
                    className="inline-flex items-center text-cyan-600 font-semibold hover:text-cyan-800 transition-colors"
                  >
                    Acessar ferramenta <ArrowRight className="ml-2" size={16} />
                  </Link>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-shadow duration-300">
                  <div className="bg-cyan-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                    <BarChart3 className="text-cyan-600" size={24} />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Análise de fundos</h3>
                  <p className="text-gray-600 mb-4">
                    Compare fundos de investimento e descubra quais têm o melhor desempenho ajustado ao risco e menores taxas.
                  </p>
                  <Link 
                    to="/tools/fund-analyzer" 
                    className="inline-flex items-center text-cyan-600 font-semibold hover:text-cyan-800 transition-colors"
                  >
                    Acessar ferramenta <ArrowRight className="ml-2" size={16} />
                  </Link>
                </div>
              </div>
              
              {/* Ferramenta em destaque */}
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-8 border border-blue-100 shadow-md">
                <div className="flex flex-col md:flex-row items-center">
                  <div className="w-full md:w-2/3 mb-6 md:mb-0 md:pr-8">
                    <div className="inline-block bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium mb-4">
                      Ferramenta em destaque
                    </div>
                    <h3 className="text-2xl font-bold mb-4">Simulador de aposentadoria</h3>
                    <p className="text-gray-700 mb-6">
                      Nossa ferramenta mais completa para planejamento de aposentadoria. Calcule quanto você precisa investir mensalmente para atingir a independência financeira, considerando inflação, expectativa de vida e diferentes cenários econômicos.
                    </p>
                    <Link 
                      to="/tools/retirement-simulator" 
                      className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2.5 rounded-lg transition-colors"
                    >
                      Experimentar agora <ArrowRight className="ml-2" size={16} />
                    </Link>
                  </div>
                  <div className="w-full md:w-1/3 flex justify-center">
                    <div className="bg-white p-6 rounded-full shadow-lg">
                      <TrendingUp size={80} className="text-blue-500" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
      
      {/* CTA Section - Melhorado visualmente */}
      <section className="py-16 px-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white relative overflow-hidden">
        {/* Elementos decorativos de fundo */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-20 right-20 w-64 h-64 rounded-full bg-white"></div>
          <div className="absolute bottom-10 left-10 w-40 h-40 rounded-full bg-white"></div>
        </div>
        
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Pronto para começar sua jornada de aprendizado?
          </h2>
          <p className="text-xl max-w-2xl mx-auto mb-8">
            Acesse nossas ferramentas financeiras gratuitas e transforme sua relação com investimentos.
          </p>
          <Link 
            to="/signup" 
            className="inline-block bg-white text-cyan-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition duration-300 shadow-lg"
          >
            Criar uma conta grátis
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LearningPage;