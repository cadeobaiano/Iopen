import React, { useState } from 'react';
import { 
  ArrowRight, 
  Shield, 
  Target, 
  Briefcase, 
  CheckCircle2,
  AlertCircle,
  RefreshCcw,
  TrendingUp,
  PieChart,
  Award,
  Clock,
  Copy,
  ChevronUp, 
  ChevronDown,
  DollarSign,
  Info,
  Filter,
  Laptop,
  Smartphone,
  Sparkles,
  Scale,
  BarChart2,
  Globe,
  Home,
  HeartPulse,
  Users,
  Wallet,
  Landmark,
  CreditCard,
  Leaf,
  Building,
  Zap,
  PercentCircle,
  Coins
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

type InvestmentOption = {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  categories: string[];
  riskLevel: 'Baixo' | 'Moderado' | 'Alto' | 'Ajustado';
  expectedReturn: string;
  minInvestment: string;
  timeHorizon: string;
  features: string[];
  recommended: boolean;
  order?: number; // For sorting recommended items to the top
};

const InvestmentPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'regular' | 'goal'>('all');
  const [riskFilter, setRiskFilter] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);

  const investmentOptions: InvestmentOption[] = [
    // Crescimento Patrimonial options
    {
      id: 'iopen-smart',
      title: 'Portfólio Iopen Smart',
      description: 'Um portfólio totalmente personalizado, estruturado após uma análise detalhada do perfil do investidor. A composição busca equilibrar diversificação e eficiência, com rebalanceamentos automáticos conforme mudanças no cenário econômico.',
      icon: <PieChart className="text-cyan-600" size={24} />,
      categories: ['regular'],
      riskLevel: 'Ajustado',
      expectedReturn: '12-15% a.a.',
      minInvestment: 'R$ 5.000',
      timeHorizon: '3-5 anos',
      features: [
        'Alocação dinâmica com base em perfis de risco e objetivos pessoais',
        'Diversificação em múltiplas classes de ativos e regiões',
        'Rebalanceamento automático para manter a estratégia alinhada',
        'Foco em preservação e crescimento gradual do capital'
      ],
      recommended: true,
      order: 1
    },
    {
      id: 'dividends-portfolio',
      title: 'Portfólio Dividendos',
      description: 'Focado em ativos que reúnem empresas com histórico consistente de distribuição de dividendos, oferecendo uma fonte de renda recorrente e potencial de valorização de longo prazo.',
      icon: <DollarSign className="text-cyan-600" size={24} />,
      categories: ['regular'],
      riskLevel: 'Moderado',
      expectedReturn: '13-17% a.a.',
      minInvestment: 'R$ 5.000',
      timeHorizon: '5-7 anos',
      features: [
        'Concentração em companhias consolidadas e com boa governança',
        'Fluxo de caixa recorrente por meio de dividendos',
        'Maior previsibilidade de retornos, ainda que sujeito a oscilações de mercado',
        'Possibilidade de reinvestimento dos proventos para crescimento do patrimônio'
      ],
      recommended: false
    },
    {
      id: 'us-tech-portfolio',
      title: 'Portfólio Tecnologia EUA',
      description: 'Composto por ativos vinculados aos principais índices do setor tecnológico norte-americano, concentrando-se em empresas líderes em inovação e alto potencial de crescimento nos Estados Unidos.',
      icon: <Laptop className="text-cyan-600" size={24} />,
      categories: ['regular'],
      riskLevel: 'Alto',
      expectedReturn: '10-15% a.a. USD',
      minInvestment: 'R$ 10.000',
      timeHorizon: '5-7 anos',
      features: [
        'Exposição a empresas de destaque em tecnologia e inovação',
        'Potencial de crescimento acelerado, mas sujeito a maior volatilidade',
        'Foco em setores como software, hardware, internet e serviços digitais',
        'Indicado para investidores que buscam retornos superiores no longo prazo'
      ],
      recommended: false
    },
    {
      id: 'global-tech-portfolio',
      title: 'Portfólio Tecnologia Global',
      description: 'Direcionado a capturar oportunidades no setor de tecnologia em escala mundial. Inclui instrumentos que abrangem mercados desenvolvidos e emergentes, promovendo uma diversificação geográfica maior do que a exposição exclusiva aos EUA.',
      icon: <Globe className="text-cyan-600" size={24} />,
      categories: ['regular'],
      riskLevel: 'Alto',
      expectedReturn: '10-15% a.a. USD',
      minInvestment: 'R$ 10.000',
      timeHorizon: '5-7 anos',
      features: [
        'Investimento em empresas de tecnologia de diferentes regiões',
        'Potencial de crescimento global, mas sujeito a variações cambiais e geopolíticas',
        'Foco em inovação e setores de alto valor agregado',
        'Maior diversificação em relação ao Portfólio Tecnologia EUA'
      ],
      recommended: false
    },
    {
      id: 'iopen-usd',
      title: 'Portfólio Iopen USD',
      description: 'Concentrado em ativos cotados em dólar, permitindo ao investidor diversificar sua carteira em moeda forte e acessar oportunidades de mercados internacionais, protegendo-se de oscilações do câmbio local.',
      icon: <DollarSign className="text-cyan-600" size={24} />,
      categories: ['regular'],
      riskLevel: 'Moderado',
      expectedReturn: '5-8% a.a. USD',
      minInvestment: 'R$ 7.500',
      timeHorizon: '3-5 anos',
      features: [
        'Exposição cambial ao dólar, atuando como proteção contra desvalorização local',
        'Alocação em ativos de diferentes setores e países, sempre denominados em USD',
        'Possibilidade de aproveitar oportunidades globais com gestão simplificada',
        'Rebalanceamento periódico de acordo com tendências macroeconômicas'
      ],
      recommended: false
    },
    {
      id: 'real-estate-portfolio',
      title: 'Portfólio Imobiliário',
      description: 'Estruturado com instrumentos que investem em ativos do setor imobiliário, buscando tanto valorização de capital quanto renda recorrente proveniente de aluguéis e ganhos do segmento de real estate.',
      icon: <Home className="text-cyan-600" size={24} />,
      categories: ['regular'],
      riskLevel: 'Moderado',
      expectedReturn: '7-10% a.a.',
      minInvestment: 'R$ 5.000',
      timeHorizon: '5-7 anos',
      features: [
        'Exposição a imóveis comerciais, residenciais e de logística',
        'Potencial de renda passiva por meio de dividendos imobiliários',
        'Proteção parcial contra inflação e oscilações de mercado',
        'Diversificação geográfica e setorial dentro do ramo imobiliário'
      ],
      recommended: false
    },
    {
      id: 'international-fixed-income',
      title: 'Portfólio de Renda Fixa Internacional',
      description: 'Composto por títulos de renda fixa emitidos por governos e empresas de diversos países, este portfólio oferece diversificação global e proporciona maior estabilidade e proteção em cenários de alta volatilidade econômica.',
      icon: <Shield className="text-cyan-600" size={24} />,
      categories: ['regular'],
      riskLevel: 'Baixo',
      expectedReturn: '5-7% a.a. USD',
      minInvestment: 'R$ 3.000',
      timeHorizon: '3-5 anos',
      features: [
        'Alocação em bonds de mercados desenvolvidos e emergentes',
        'Menor volatilidade em comparação a portfólios de ações',
        'Possibilidade de ganhos cambiais e de taxas de juros mais atrativas',
        'Indicado para equilibrar a carteira e reduzir riscos'
      ],
      recommended: false
    },
    {
      id: 'growth-portfolio',
      title: 'Portfólio Crescimento',
      description: 'Direcionado a ativos de empresas com alto potencial de expansão. O objetivo é buscar retornos acima da média de mercado, aproveitando oportunidades em setores em rápido desenvolvimento.',
      icon: <TrendingUp className="text-cyan-600" size={24} />,
      categories: ['regular'],
      riskLevel: 'Alto',
      expectedReturn: '12-18% a.a.',
      minInvestment: 'R$ 10.000',
      timeHorizon: '5-7 anos',
      features: [
        'Maior exposição a setores de ponta e mercados em transformação',
        'Volatilidade elevada, demandando maior tolerância a riscos',
        'Estratégia focada em ganhos de capital no longo prazo',
        'Requer acompanhamento de tendências econômicas e tecnológicas'
      ],
      recommended: false
    },
    {
      id: 'healthcare-sector',
      title: 'Portfólio de Setor Saúde',
      description: 'Constituído por ativos que reúnem empresas do setor de saúde, incluindo farmacêuticas, hospitais, biotecnologia e dispositivos médicos, combinando potencial de crescimento e resiliência de mercado.',
      icon: <HeartPulse className="text-cyan-600" size={24} />,
      categories: ['regular'],
      riskLevel: 'Moderado',
      expectedReturn: '8-12% a.a. USD',
      minInvestment: 'R$ 5.000',
      timeHorizon: '5-7 anos',
      features: [
        'Exposição a segmentos considerados defensivos e de alta demanda',
        'Potencial de inovação em biotecnologia e tratamentos de ponta',
        'Menor correlação com ciclos econômicos gerais',
        'Boa opção para diversificar e equilibrar carteiras de risco'
      ],
      recommended: false
    },
    {
      id: 'sustainable-impact',
      title: 'Portfólio Impacto Sustentável',
      description: 'Investe em ativos que selecionam empresas alinhadas a critérios ESG (ambiental, social e governança), promovendo práticas responsáveis e potencial de retorno competitivo no longo prazo.',
      icon: <Leaf className="text-cyan-600" size={24} />,
      categories: ['regular'],
      riskLevel: 'Moderado',
      expectedReturn: '7-10% a.a. USD',
      minInvestment: 'R$ 5.000',
      timeHorizon: '5-7 anos',
      features: [
        'Foco em sustentabilidade e responsabilidade corporativa',
        'Empresas com boa governança, práticas ambientais sólidas e impacto social positivo',
        'Alinhamento entre objetivos financeiros e valores pessoais',
        'Tendência de crescimento da demanda por investimentos ESG'
      ],
      recommended: false
    },
    {
      id: 'global-small-caps',
      title: 'Portfólio Global de Small Caps',
      description: 'Voltado para ativos que investem em empresas de menor capitalização em diversas regiões, explorando oportunidades de crescimento expressivo, mas também com volatilidade acentuada.',
      icon: <BarChart2 className="text-cyan-600" size={24} />,
      categories: ['regular'],
      riskLevel: 'Alto',
      expectedReturn: '10-15% a.a. USD',
      minInvestment: 'R$ 7.500',
      timeHorizon: '5-7 anos',
      features: [
        'Exposição a empresas inovadoras em estágio de expansão',
        'Maior risco devido à menor liquidez e estabilidade financeira',
        'Possibilidade de identificar nichos e tendências emergentes',
        'Diversificação internacional para diluir riscos específicos de cada região'
      ],
      recommended: false
    },
    {
      id: 'commodities-portfolio',
      title: 'Portfólio de Commodities',
      description: 'Reúne ativos que oferecem exposição a commodities como metais preciosos, energia e produtos agrícolas, atuando como instrumento de proteção contra a inflação e volatilidade do mercado de ações.',
      icon: <Coins className="text-cyan-600" size={24} />,
      categories: ['regular'],
      riskLevel: 'Moderado',
      expectedReturn: '7-11% a.a.',
      minInvestment: 'R$ 5.000',
      timeHorizon: '3-5 anos',
      features: [
        'Exposição a ativos reais, sensíveis a fatores de oferta e demanda',
        'Proteção parcial em cenários de incerteza econômica',
        'Inclui ouro, prata, petróleo e outras commodities estratégicas',
        'Complementa portfólios que buscam redução de correlação com renda variável'
      ],
      recommended: false
    },
    
    // Propósito Específico options
    {
      id: 'retirement-plan',
      title: 'Plano de Aposentadoria',
      description: 'Informe a renda desejada para a sua aposentadoria e o prazo em que pretende atingi-la, e nós indicaremos quanto você deve aportar. Simples assim. Cuidamos de tudo para você, alocando seu capital, ajustando-o pela inflação e preservando seu poder de compra.',
      icon: <Clock className="text-orange-600" size={24} />,
      categories: ['goal'],
      riskLevel: 'Moderado',
      expectedReturn: 'IPCA+ 6% a IPCA+ 7% a.a.',
      minInvestment: 'R$ 200/mês',
      timeHorizon: '10+ anos',
      features: [
        'Opção de débito diretamente do seu cartão de crédito',
        'Proteção contra a inflação',
        'Simulações de renda futura',
        'Integração com Tesouro Renda+'
      ],
      recommended: true,
      order: 2
    },
    {
      id: 'real-estate',
      title: 'Aquisição Imobiliária',
      description: 'Focado em ativos que reúnem empresas com histórico consistente de distribuição de dividendos, este fundo proporciona uma fonte de renda recorrente e potencial de valorização no longo prazo, oferecendo segurança e solidez.',
      icon: <Building className="text-orange-600" size={24} />,
      categories: ['goal'],
      riskLevel: 'Baixo',
      expectedReturn: '9-12% a.a.',
      minInvestment: 'R$ 500/mês',
      timeHorizon: '5+ anos',
      features: [
        'Opção de débito diretamente do seu cartão de crédito',
        'Simulação de financiamento integrada',
        'Estratégia de entrada vs. aluguel',
        'Liquidez parcial para oportunidades'
      ],
      recommended: false
    },
    {
      id: 'education-fund',
      title: 'Fundo Educacional',
      description: 'Investir no seu futuro nunca foi tão fácil. Informe o valor destinado à sua jornada acadêmica e nós calcularemos o montante ideal a ser investido. Seja no Brasil ou no exterior, planeje seu futuro com segurança e expertise.',
      icon: <BarChart2 className="text-orange-600" size={24} />,
      categories: ['goal'],
      riskLevel: 'Moderado',
      expectedReturn: '10-13% a.a.',
      minInvestment: 'R$ 300/mês',
      timeHorizon: '5-18 anos',
      features: [
        'Opção de débito diretamente do seu cartão de crédito',
        'Perfeito para planejar o futuro do seu filho',
        'Proteção cambial para estudos no exterior',
        'Simulador de custos educacionais'
      ],
      recommended: false
    }
  ];

  // Sort options to put recommended ones at the top
  const sortedOptions = [...investmentOptions].sort((a, b) => {
    if (a.recommended && !b.recommended) return -1;
    if (!a.recommended && b.recommended) return 1;
    if (a.recommended && b.recommended) {
      return (a.order || 99) - (b.order || 99);
    }
    return 0;
  });

  const filteredOptions = sortedOptions.filter(option => {
    // Filter by tab
    if (activeTab === 'regular' && !option.categories.includes('regular')) return false;
    if (activeTab === 'goal' && !option.categories.includes('goal')) return false;
    
    // Filter by risk level
    if (riskFilter !== 'all' && option.riskLevel !== riskFilter) return false;
    
    return true;
  });

  // Função para determinar a cor do badge de risco
  const getRiskBadgeColor = (risk: string) => {
    switch (risk) {
      case 'Baixo':
        return 'bg-green-50 text-green-700 border border-green-200';
      case 'Moderado':
        return 'bg-yellow-50 text-yellow-700 border border-yellow-200';
      case 'Alto':
        return 'bg-red-50 text-red-700 border border-red-200';
      case 'Ajustado':
        return 'bg-blue-50 text-blue-700 border border-blue-200';
      default:
        return 'bg-gray-50 text-gray-700 border border-gray-200';
    }
  };

  const getRiskIcon = (risk: string) => {
    if (risk === 'Ajustado') {
      return <Sparkles size={12} className="mr-1" />;
    } else if (risk === 'Baixo') {
      return <Shield size={12} className="mr-1" />;
    } else if (risk === 'Alto') {
      return <TrendingUp size={12} className="mr-1" />;
    }
    return <BarChart2 size={12} className="mr-1" />;
  };

  return (
    <div className="font-sans text-gray-800">
      <Header />
      
      {/* Hero Section - Otimizado e Aprimorado */}
      <section className="bg-gradient-to-r from-cyan-600 to-blue-700 pt-24 pb-12 sm:pt-28 sm:pb-16 px-4 sm:px-8 lg:px-16 text-white relative overflow-hidden mt-14 sm:mt-16">
        {/* Elementos Visuais de Fundo - Aprimorados */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -right-10 -bottom-20 w-72 h-72 rounded-full bg-white/10 backdrop-blur-sm"></div>
          <div className="absolute -left-20 top-10 w-96 h-96 rounded-full bg-white/5 backdrop-blur-sm"></div>
          <div className="absolute left-1/3 top-1/4 w-48 h-48 rounded-full bg-white/10 backdrop-blur-sm"></div>
          
          {/* Elementos gráficos relacionados a investimentos */}
          <div className="absolute top-1/4 right-1/4 w-16 h-16 sm:w-24 sm:h-24 text-white/20 hidden sm:block">
            <TrendingUp size={64} strokeWidth={1} />
          </div>
          <div className="absolute bottom-1/4 left-1/5 w-12 h-12 sm:w-16 sm:h-16 text-white/10 hidden sm:block">
            <PieChart size={48} strokeWidth={1} />
          </div>
          <div className="absolute top-1/3 right-1/6 w-8 h-8 sm:w-12 sm:h-12 text-white/15 hidden sm:block">
            <DollarSign size={32} strokeWidth={1} />
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Título e Descrição - Aprimorados */}
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-3 md:mb-4 leading-tight shadow-text-sm mx-auto max-w-4xl">
              Investimentos personalizados para seus objetivos
            </h1>
            <p className="text-sm sm:text-base md:text-lg opacity-95 max-w-2xl mx-auto font-normal leading-relaxed">
              Escolha entre nossas estratégias de investimento ou crie um plano personalizado.
            </p>
          </div>
          
          {/* Botões de Navegação - Redesenhados */}
          <div className="max-w-2xl mx-auto">
            <div 
              className="bg-white/10 backdrop-blur-md p-1.5 rounded-xl shadow-lg border border-white/20"
            >
              <div className="flex flex-col sm:flex-row gap-1.5 sm:gap-2">
                <button 
                  onClick={() => setActiveTab('all')}
                  className={`flex-1 px-4 py-2.5 rounded-lg font-medium transition-all duration-300 flex items-center justify-center ${
                    activeTab === 'all' 
                      ? 'bg-white text-blue-600 shadow-md' 
                      : 'bg-white/20 hover:bg-white/30 text-white'
                  }`}
                >
                  {activeTab === 'all' ? (
                    <Sparkles size={16} className="mr-2 text-blue-500" />
                  ) : (
                    <Sparkles size={16} className="mr-2" />
                  )}
                  <span className="text-sm">Todos os investimentos</span>
                </button>
                
                <button 
                  onClick={() => setActiveTab('regular')}
                  className={`flex-1 px-4 py-2.5 rounded-lg font-medium transition-all duration-300 flex items-center justify-center ${
                    activeTab === 'regular' 
                      ? 'bg-white text-blue-600 shadow-md' 
                      : 'bg-white/20 hover:bg-white/30 text-white'
                  }`}
                >
                  {activeTab === 'regular' ? (
                    <TrendingUp size={16} className="mr-2 text-blue-500" />
                  ) : (
                    <TrendingUp size={16} className="mr-2" />
                  )}
                  <span className="text-sm">Crescimento Patrimonial</span>
                </button>
                
                <button 
                  onClick={() => setActiveTab('goal')}
                  className={`flex-1 px-4 py-2.5 rounded-lg font-medium transition-all duration-300 flex items-center justify-center ${
                    activeTab === 'goal' 
                      ? 'bg-white text-blue-600 shadow-md' 
                      : 'bg-white/20 hover:bg-white/30 text-white'
                  }`}
                >
                  {activeTab === 'goal' ? (
                    <Target size={16} className="mr-2 text-blue-500" />
                  ) : (
                    <Target size={16} className="mr-2" />
                  )}
                  <span className="text-sm">Propósito Específico</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Investment Options Section - Otimizado para Mobile */}
      <section className="py-12 sm:py-16 md:py-20 px-4 md:px-8 lg:px-16 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 sm:mb-8 md:mb-12">
            <div>
              <h2 className="text-2xl sm:text-2xl md:text-3xl font-bold mb-2 md:mb-3 text-gray-800">
                {activeTab === 'all' && 'Todas as opções de investimento'}
                {activeTab === 'regular' && 'Crescimento Patrimonial'}
                {activeTab === 'goal' && 'Investimentos com Propósito'}
              </h2>
              <p className="text-gray-600 text-sm sm:text-base md:text-lg">
                {filteredOptions.length} opções disponíveis para você
              </p>
            </div>
            
            <div className="mt-4 md:mt-0 w-full md:w-auto">
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center justify-center w-full md:w-auto bg-white border border-gray-300 px-4 sm:px-5 py-2.5 sm:py-3 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors shadow-sm text-sm sm:text-base"
              >
                Filtros
                <ChevronDown className={`ml-2 transition-transform ${showFilters ? 'rotate-180' : ''}`} size={16} />
              </button>
              
              {showFilters && (
                <div className="fixed inset-0 z-40 md:absolute md:inset-auto md:mt-2 flex items-end md:items-start justify-center">
                  <div className="fixed inset-0 bg-black bg-opacity-30" onClick={() => setShowFilters(false)}></div>
                  <div className="bg-white w-full md:w-auto rounded-t-xl md:rounded-xl shadow-xl border border-gray-200 z-50 p-5 md:p-6 relative max-h-[80vh] overflow-y-auto">
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-4 md:hidden">
                        <h3 className="text-lg font-bold text-gray-800">Filtros</h3>
                        <button 
                          onClick={() => setShowFilters(false)}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                      <p className="font-medium mb-3 text-gray-800">Nível de risco</p>
                      <div className="space-y-3">
                        <label className="flex items-center cursor-pointer">
                          <input 
                            type="radio" 
                            name="risk" 
                            value="all" 
                            checked={riskFilter === 'all'} 
                            onChange={() => setRiskFilter('all')}
                            className="form-radio text-cyan-600 h-5 w-5"
                          />
                          <span className="ml-2 text-gray-700">Todos</span>
                        </label>
                        <label className="flex items-center cursor-pointer">
                          <input 
                            type="radio" 
                            name="risk" 
                            value="Baixo" 
                            checked={riskFilter === 'Baixo'} 
                            onChange={() => setRiskFilter('Baixo')}
                            className="form-radio text-cyan-600 h-5 w-5"
                          />
                          <span className="ml-2 text-gray-700">Baixo</span>
                        </label>
                        <label className="flex items-center cursor-pointer">
                          <input 
                            type="radio" 
                            name="risk" 
                            value="Moderado" 
                            checked={riskFilter === 'Moderado'} 
                            onChange={() => setRiskFilter('Moderado')}
                            className="form-radio text-cyan-600 h-5 w-5"
                          />
                          <span className="ml-2 text-gray-700">Moderado</span>
                        </label>
                        <label className="flex items-center cursor-pointer">
                          <input 
                            type="radio" 
                            name="risk" 
                            value="Alto" 
                            checked={riskFilter === 'Alto'} 
                            onChange={() => setRiskFilter('Alto')}
                            className="form-radio text-cyan-600 h-5 w-5"
                          />
                          <span className="ml-2 text-gray-700">Alto</span>
                        </label>
                        <label className="flex items-center cursor-pointer">
                          <input 
                            type="radio" 
                            name="risk" 
                            value="Ajustado" 
                            checked={riskFilter === 'Ajustado'} 
                            onChange={() => setRiskFilter('Ajustado')}
                            className="form-radio text-cyan-600 h-5 w-5"
                          />
                          <span className="ml-2 text-gray-700">Ajustado ao perfil</span>
                        </label>
                      </div>
                    </div>
                    
                    <button 
                      onClick={() => {
                        setShowFilters(false);
                      }}
                      className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
                    >
                      Aplicar Filtros
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {filteredOptions.map((option) => (
              <div 
                key={option.id} 
                className={`bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 flex flex-col h-full w-full`}
              >
                <div className="p-3 sm:p-4 flex-grow flex flex-col">
                  {/* Cabeçalho do Card - Versão mais compacta para mobile */}
                  <div className="flex items-start mb-2 sm:mb-3">
                    <div className={`p-1.5 sm:p-2 rounded-full mr-2 sm:mr-3 ${
                      option.categories.includes('goal') 
                        ? 'bg-gradient-to-br from-orange-100 to-orange-200 text-orange-600' 
                        : 'bg-gradient-to-br from-cyan-100 to-cyan-200 text-cyan-600'
                      } flex-shrink-0 shadow-sm`}>
                      {React.cloneElement(option.icon as React.ReactElement, { size: 20 })}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base sm:text-lg font-bold mb-0.5 sm:mb-1 truncate">{option.title}</h3>
                      <span className={`inline-flex items-center px-1.5 sm:px-2 py-0.5 rounded-full text-xs font-medium ${getRiskBadgeColor(option.riskLevel)}`}>
                        {getRiskIcon(option.riskLevel)}
                        <span className="truncate">Risco {option.riskLevel}</span>
                      </span>
                    </div>
                  </div>
                  
                  {/* Descrição - Expandida para telas maiores */}
                  <div className="mb-3 flex-grow">
                    <details className="text-sm">
                      <summary className={`${
                        option.categories.includes('goal') 
                          ? 'text-orange-600' 
                          : 'text-cyan-600'
                        } font-medium cursor-pointer text-xs sm:text-sm`}>
                        Ver detalhes
                      </summary>
                      <div className="mt-2 text-xs sm:text-sm text-gray-600 leading-relaxed space-y-2">
                        <p>{option.description}</p>
                        
                        <div>
                          <h4 className="font-medium text-gray-700 mb-1">Características:</h4>
                          <ul className="pl-4 space-y-1 list-disc">
                            {option.features.map((feature, index) => (
                              <li key={index}>{feature}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </details>
                  </div>
                  
                  {/* Informações principais - Layout em grid compacto */}
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    <div className="bg-gray-50 p-2 rounded-lg">
                      <p className="text-xs text-gray-500 mb-0.5">Investimento</p>
                      <p className="font-semibold text-sm truncate">
                        {option.minInvestment}
                      </p>
                    </div>
                    
                    <div className="bg-gray-50 p-2 rounded-lg">
                      <p className="text-xs text-gray-500 mb-0.5">Horizonte</p>
                      <p className="font-semibold text-sm truncate">
                        {option.timeHorizon}
                      </p>
                    </div>
                    
                    <div className="bg-gray-50 p-2 rounded-lg col-span-2">
                      <div className="flex items-center">
                        {option.categories.includes('goal') ? (
                          <Target size={14} className="mr-1.5 flex-shrink-0 text-orange-600" />
                        ) : (
                          <Briefcase size={14} className="mr-1.5 flex-shrink-0 text-cyan-600" />
                        )}
                        <p className="font-medium text-xs truncate">
                          {option.categories.includes('goal') ? 'Propósito Específico' : 'Crescimento Patrimonial'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className={`p-3 sm:p-4 border-t border-gray-100 ${
                  option.recommended 
                    ? 'bg-gradient-to-br from-cyan-50 to-blue-50' 
                    : ''
                  }`}>
                  {option.recommended && (
                    <div className="mb-2">
                      <span className="bg-cyan-100 text-cyan-800 text-xs py-0.5 px-2 rounded-full font-medium inline-flex items-center">
                        <CheckCircle2 size={12} className="mr-1" />
                        Recomendado
                      </span>
                    </div>
                  )}
                  
                  <Link
                    to={`/investir/${option.id}`}
                    className={`w-full flex items-center justify-center py-2.5 sm:py-3 px-4 rounded-lg font-medium ${
                      option.categories.includes('goal') 
                        ? 'bg-orange-600 hover:bg-orange-700 text-white' 
                        : 'bg-cyan-600 hover:bg-cyan-700 text-white'
                    } transition-colors text-sm`}
                  >
                    Investir agora
                    <ArrowRight size={16} className="ml-2" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
          
          {filteredOptions.length === 0 && (
            <div className="bg-white p-8 rounded-xl text-center">
              <AlertCircle className="mx-auto text-gray-400 mb-4" size={48} />
              <h3 className="text-xl font-bold mb-2">Nenhuma opção encontrada</h3>
              <p className="text-gray-600 mb-4">
                Não encontramos opções de investimento com os filtros selecionados.
              </p>
              <button 
                onClick={() => {
                  setActiveTab('all');
                  setRiskFilter('all');
                }}
                className="bg-cyan-500 text-white px-4 py-2 rounded-lg hover:bg-cyan-600 transition-colors"
              >
                Limpar filtros
              </button>
            </div>
          )}
        </div>
      </section>
      
      {/* Investment Process Section */}
      <section className="py-24 px-4 md:px-8 lg:px-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
              Como funciona o processo de investimento
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Um processo simples e transparente para você começar a investir com a Iopen
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {/* Connecting line for desktop */}
            <div className="hidden md:block absolute top-16 left-[calc(12.5%+16px)] right-[calc(12.5%+16px)] h-0.5 bg-gradient-to-r from-cyan-100 via-cyan-200 to-cyan-100 z-0"></div>
            
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full w-20 h-20 flex items-center justify-center mb-8 font-bold text-2xl text-white shadow-lg shadow-cyan-100">1</div>
              <h3 className="text-xl font-bold mb-4 text-gray-800">Escolha seu investimento</h3>
              <p className="text-gray-600 leading-relaxed">
                Selecione entre nossas estratégias pré-definidas ou crie um plano personalizado para seus objetivos específicos.
              </p>
            </div>
            
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full w-20 h-20 flex items-center justify-center mb-8 font-bold text-2xl text-white shadow-lg shadow-cyan-100">2</div>
              <h3 className="text-xl font-bold mb-4 text-gray-800">Abertura de conta</h3>
              <p className="text-gray-600 leading-relaxed">
                Complete seu cadastro e realize a verificação de identidade. O processo é 100% digital e leva apenas alguns minutos.
              </p>
            </div>
            
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full w-20 h-20 flex items-center justify-center mb-8 font-bold text-2xl text-white shadow-lg shadow-cyan-100">3</div>
              <h3 className="text-xl font-bold mb-4 text-gray-800">Faça seu aporte</h3>
              <p className="text-gray-600 leading-relaxed">
                Realize seu primeiro investimento via TED, PIX ou débito automático. Você pode configurar aportes recorrentes.
              </p>
            </div>
            
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full w-20 h-20 flex items-center justify-center mb-8 font-bold text-2xl text-white shadow-lg shadow-cyan-100">4</div>
              <h3 className="text-xl font-bold mb-4 text-gray-800">Acompanhe seu progresso</h3>
              <p className="text-gray-600 leading-relaxed">
                Monitore o desempenho dos seus investimentos através do nosso aplicativo ou plataforma web com relatórios detalhados.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-24 px-4 md:px-8 lg:px-16 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
            Perguntas frequentes
          </h2>
          
          <div className="space-y-6">
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-xl font-bold mb-4 text-gray-800">Qual é o investimento mínimo para começar?</h3>
              <p className="text-gray-600 leading-relaxed">
                O valor mínimo varia de acordo com a estratégia escolhida. Nossos planos começam a partir de R$ 100 para investimentos com objetivos específicos e R$ 1.000 para portfólios regulares.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-xl font-bold mb-4 text-gray-800">Como são cobradas as taxas?</h3>
              <p className="text-gray-600 leading-relaxed">
                A Iopen cobra uma taxa de administração anual entre 0,4% e 0,7%, dependendo do plano escolhido e do volume investido. Não há taxas de performance ou outras taxas ocultas. As taxas são debitadas mensalmente do seu saldo.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-xl font-bold mb-4 text-gray-800">Posso resgatar meu dinheiro a qualquer momento?</h3>
              <p className="text-gray-600 leading-relaxed">
                Sim, você pode solicitar resgates a qualquer momento. O prazo para recebimento varia de acordo com os ativos da sua carteira, mas geralmente é de D+1 a D+3 para a maioria dos investimentos. Não há penalidades por resgates antecipados.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-xl font-bold mb-4 text-gray-800">Como funciona a tributação dos investimentos?</h3>
              <p className="text-gray-600 leading-relaxed">
                A tributação segue as regras da legislação brasileira. Renda fixa e fundos de investimento seguem a tabela regressiva de IR, com alíquotas que variam de 22,5% a 15%, dependendo do prazo. ETFs de renda variável seguem a tributação de ações, com alíquota de 15% sobre o ganho de capital.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-xl font-bold mb-4 text-gray-800">Meus investimentos estão seguros?</h3>
              <p className="text-gray-600 leading-relaxed">
                Sim, todos os investimentos são realizados através de instituições financeiras reguladas pelo Banco Central e CVM. Os ativos são custodiados em seu nome e protegidos pelo FGC (Fundo Garantidor de Créditos) até os limites estabelecidos, quando aplicável.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-24 px-4 md:px-8 lg:px-16 bg-gradient-to-r from-cyan-500 via-blue-500 to-blue-600 text-white relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden opacity-10">
          <div className="absolute right-1/4 top-20 w-64 h-64 rounded-full bg-white"></div>
          <div className="absolute left-1/3 -bottom-10 w-80 h-80 rounded-full bg-white"></div>
        </div>
        
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold mb-8 leading-tight">
            Pronto para começar a investir?
          </h2>
          <p className="text-xl max-w-3xl mx-auto mb-12 font-light">
            Abra sua conta gratuitamente e comece a construir seu futuro financeiro com a Iopen.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link 
              to="/cadastro" 
              className="px-8 py-4 bg-white text-cyan-600 font-medium rounded-xl shadow-md hover:shadow-lg transition-all duration-300 text-lg w-full sm:w-auto"
            >
              Abrir minha conta
            </Link>
            <Link 
              to="/simulador" 
              className="px-8 py-4 bg-transparent border-2 border-white text-white font-medium rounded-xl hover:bg-white/10 transition-all duration-300 text-lg w-full sm:w-auto"
            >
              Simular investimentos
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default InvestmentPage;