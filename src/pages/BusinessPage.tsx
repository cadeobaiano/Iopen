import React, { useEffect } from 'react';
import { 
  ArrowRight, 
  Shield, 
  Target, 
  TrendingUp, 
  Users, 
  Wallet,
  CreditCard,
  Landmark,
  BarChart3,
  ChevronDown,
  PieChart,
  LineChart,
  PercentCircle,
  Briefcase,
  Building,
  Globe,
  DollarSign,
  Percent,
  Clock,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  HeartPulse,
  Leaf,
  Coins,
  Zap,
  Home,
  DollarSign as Dollar,
  Laptop,
  Smartphone,
  Sparkles,
  Scale
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import { useDeviceDetect } from '../utils/useDeviceDetect';

// Adicionando os ícones que estavam faltando
const Database = ({ size, className }: { size: number, className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
  </svg>
);

const Lock = ({ size, className }: { size: number, className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
  </svg>
);

const Eye = ({ size, className }: { size: number, className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
    <circle cx="12" cy="12" r="3"></circle>
  </svg>
);

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

const BusinessPage: React.FC = () => {
  const { isMobile } = useDeviceDetect();
  
  // Efeito para otimizar a experiência mobile 
  useEffect(() => {
    if (isMobile) {
      // Desativa o destaque azul em dispositivos touch
      const style = document.createElement('style');
      style.innerHTML = `
        * {
          -webkit-tap-highlight-color: transparent;
          touch-action: manipulation;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `;
      document.head.appendChild(style);
      
      return () => {
        document.head.removeChild(style);
      };
    }
  }, [isMobile]);
  
  return (
    <div className="font-sans text-gray-800">
      <Header />
      
      {/* Hero Section - Otimizada para mobile */}
      <section className="bg-gradient-to-r from-cyan-600 to-blue-700 pt-24 pb-12 sm:pt-28 sm:pb-16 px-4 sm:px-8 lg:px-16 text-white relative overflow-hidden">
        {/* Elementos decorativos de fundo */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-10 left-10 w-20 sm:w-40 h-20 sm:h-40 rounded-full bg-white"></div>
          <div className="absolute bottom-20 right-10 w-32 sm:w-60 h-32 sm:h-60 rounded-full bg-white"></div>
          <div className="absolute top-1/3 right-1/4 w-12 sm:w-20 h-12 sm:h-20 rounded-full bg-white"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 sm:mb-8 flex justify-center">
              <div className="bg-white/20 backdrop-blur-md p-4 sm:p-6 rounded-full">
                <BarChart3 size={32} className="text-white" />
              </div>
            </div>
            
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 max-w-4xl">
              Revolucionando o mercado financeiro
            </h1>
            
            <p className="text-base sm:text-xl md:text-2xl opacity-90 mb-6 sm:mb-10 max-w-3xl">
              Conheça o modelo de negócio da Iopen e como transformamos a experiência de investimentos.
            </p>
            
            <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-6 sm:mb-10">
              <div className="bg-white/20 backdrop-blur-sm px-3 sm:px-6 py-2 sm:py-3 rounded-full">
                <span className="text-white text-sm sm:text-base font-medium">Fintech Regulada</span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm px-3 sm:px-6 py-2 sm:py-3 rounded-full">
                <span className="text-white text-sm sm:text-base font-medium">Open Finance</span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm px-3 sm:px-6 py-2 sm:py-3 rounded-full">
                <span className="text-white text-sm sm:text-base font-medium">Investimentos</span>
              </div>
            </div>
            
            <Link 
              to="/quem-somos" 
              className="inline-flex items-center bg-white text-blue-600 hover:bg-blue-50 font-semibold px-4 sm:px-6 py-2 sm:py-3 rounded-full transition-colors shadow-lg text-sm sm:text-base"
            >
              Conheça nossa história <ArrowRight className="ml-2" size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Business Model Section - Otimizada para mobile */}
      <section className="py-8 sm:py-16 px-4 md:px-8 lg:px-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-6">
              Nosso Modelo de Negócio
            </h2>
            <p className="text-base sm:text-xl text-gray-600 max-w-3xl mx-auto">
              A Iopen é uma fintech que integra tecnologia e análise de dados via Open Finance para transformar sua experiência financeira.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8 mb-8 sm:mb-16">
            <div className="bg-white p-5 sm:p-8 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300">
              <div className="bg-cyan-100 p-2 sm:p-3 rounded-full w-10 h-10 sm:w-14 sm:h-14 flex items-center justify-center mb-4 sm:mb-6">
                <Database className="text-cyan-600" size={24} />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-4">Análise de Dados</h3>
              <p className="text-gray-600 mb-2 sm:mb-4 text-sm sm:text-base">
                Utilizamos dados do Open Finance para gerar relatórios de insights que revelam custos excessivos e oportunidades.
              </p>
              <ul className="space-y-1 sm:space-y-2 text-sm sm:text-base">
                <li className="flex items-start">
                  <CheckCircle2 className="text-green-500 mr-2 mt-0.5 flex-shrink-0" size={16} />
                  <span>Identificação de taxas ocultas</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="text-green-500 mr-2 mt-0.5 flex-shrink-0" size={16} />
                  <span>Análise de desempenho</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="text-green-500 mr-2 mt-0.5 flex-shrink-0" size={16} />
                  <span>Comparação com benchmarks</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white p-5 sm:p-8 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300">
              <div className="bg-cyan-100 p-2 sm:p-3 rounded-full w-10 h-10 sm:w-14 sm:h-14 flex items-center justify-center mb-4 sm:mb-6">
                <TrendingUp className="text-cyan-600" size={24} />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-4">Investimentos Automatizados</h3>
              <p className="text-gray-600 mb-2 sm:mb-4 text-sm sm:text-base">
                Oferecemos soluções de investimento automatizadas baseadas em estratégias comprovadas e de baixo custo.
              </p>
              <ul className="space-y-1 sm:space-y-2 text-sm sm:text-base">
                <li className="flex items-start">
                  <CheckCircle2 className="text-green-500 mr-2 mt-0.5 flex-shrink-0" size={16} />
                  <span>Portfólios diversificados</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="text-green-500 mr-2 mt-0.5 flex-shrink-0" size={16} />
                  <span>Rebalanceamento automático</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="text-green-500 mr-2 mt-0.5 flex-shrink-0" size={16} />
                  <span>Estratégias personalizadas</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white p-5 sm:p-8 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300">
              <div className="bg-cyan-100 p-2 sm:p-3 rounded-full w-10 h-10 sm:w-14 sm:h-14 flex items-center justify-center mb-4 sm:mb-6">
                <BarChart3 className="text-cyan-600" size={24} />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-4">Educação Financeira</h3>
              <p className="text-gray-600 mb-2 sm:mb-4 text-sm sm:text-base">
                Incorporamos ferramentas analíticas que demonstram os impactos das taxas e impostos.
              </p>
              <ul className="space-y-1 sm:space-y-2 text-sm sm:text-base">
                <li className="flex items-start">
                  <CheckCircle2 className="text-green-500 mr-2 mt-0.5 flex-shrink-0" size={16} />
                  <span>Simuladores de investimento</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="text-green-500 mr-2 mt-0.5 flex-shrink-0" size={16} />
                  <span>Conteúdo educativo</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="text-green-500 mr-2 mt-0.5 flex-shrink-0" size={16} />
                  <span>Análise tributária</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-cyan-50 to-blue-50 p-5 sm:p-8 rounded-xl border border-cyan-100 shadow-md">
            <div className="flex flex-col md:flex-row items-center">
              <div className="w-full md:w-2/3 mb-6 md:mb-0 md:pr-8">
                <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-gray-800">Nosso Compromisso</h3>
                <p className="text-gray-700 mb-4 text-sm sm:text-base">
                  A Iopen alia inovação tecnológica à governança de dados para empoderar investidores com informações precisas, promovendo decisões mais conscientes.
                </p>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  <div className="flex items-center bg-white px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg shadow-sm text-sm">
                    <Lock className="text-cyan-600 mr-1.5" size={16} />
                    <span className="font-medium">Segurança</span>
                  </div>
                  <div className="flex items-center bg-white px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg shadow-sm text-sm">
                    <Eye className="text-cyan-600 mr-1.5" size={16} />
                    <span className="font-medium">Transparência</span>
                  </div>
                  <div className="flex items-center bg-white px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg shadow-sm text-sm">
                    <Scale className="text-cyan-600 mr-1.5" size={16} />
                    <span className="font-medium">Ética</span>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/3 flex justify-center">
                <img 
                  src="https://images.unsplash.com/photo-1553484771-371a605b060b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" 
                  alt="Compromisso Iopen" 
                  className="rounded-lg shadow-md w-full max-w-[250px] md:max-w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Regulatory Compliance Section */}
      <section className="py-8 sm:py-16 px-4 md:px-8 lg:px-16 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-6">
              Conformidade Regulatória
            </h2>
            <p className="text-base sm:text-xl text-gray-600 max-w-3xl mx-auto">
              A Iopen opera em total conformidade com as regulamentações do mercado financeiro brasileiro.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-12 items-center mb-8 sm:mb-16">
            <div>
              <div className="bg-white p-5 sm:p-8 rounded-xl shadow-lg border border-gray-100">
                <div className="flex items-center mb-4 sm:mb-6">
                  <div className="bg-cyan-100 p-2 sm:p-3 rounded-full mr-3 sm:mr-4">
                    <Building className="text-cyan-600" size={20} />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold">Estrutura Corporativa</h3>
                </div>
                
                <p className="text-gray-700 mb-4 sm:mb-6 text-sm sm:text-base">
                  Somos uma Distribuidora de Títulos e Valores Mobiliários (DTVM) autorizada pelo Banco Central do Brasil e regulada pela Comissão de Valores Mobiliários (CVM).
                </p>
                
                <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                  <div className="flex items-start">
                    <div className="bg-cyan-100 p-1.5 sm:p-2 rounded-full mr-2 sm:mr-3 mt-0.5 sm:mt-1">
                      <Landmark className="text-cyan-600" size={14} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 text-sm sm:text-base">Regulação CVM</h4>
                      <p className="text-gray-600 text-xs sm:text-sm">Operamos de acordo com as normas da CVM</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-cyan-100 p-1.5 sm:p-2 rounded-full mr-2 sm:mr-3 mt-0.5 sm:mt-1">
                      <Building className="text-cyan-600" size={14} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 text-sm sm:text-base">Banco Central</h4>
                      <p className="text-gray-600 text-xs sm:text-sm">Instituição financeira autorizada pelo Banco Central</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="hidden sm:block lg:hidden"></div>
            
            <div className="bg-white p-5 sm:p-8 rounded-xl shadow-lg border border-gray-100">
              <div className="flex items-center mb-4 sm:mb-6">
                <div className="bg-cyan-100 p-2 sm:p-3 rounded-full mr-3 sm:mr-4">
                  <Lock className="text-cyan-600" size={20} />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold">Segurança e Privacidade</h3>
              </div>
              
              <p className="text-gray-700 mb-4 sm:mb-6 text-sm sm:text-base">
                Priorizamos a proteção dos seus dados e recursos financeiros com criptografia de ponta a ponta e autenticação de múltiplos fatores.
              </p>
              
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-start">
                  <div className="bg-cyan-100 p-1.5 sm:p-2 rounded-full mr-2 sm:mr-3 mt-0.5 sm:mt-1">
                    <Shield className="text-cyan-600" size={14} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 text-sm sm:text-base">Segurança dos Dados</h4>
                    <p className="text-gray-600 text-xs sm:text-sm">Criptografia avançada e protocolos de segurança</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-cyan-100 p-1.5 sm:p-2 rounded-full mr-2 sm:mr-3 mt-0.5 sm:mt-1">
                    <Eye className="text-cyan-600" size={14} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 text-sm sm:text-base">Política de Privacidade</h4>
                    <p className="text-gray-600 text-xs sm:text-sm">Transparência total sobre uso de dados</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition Section */}
      <section className="py-16 px-4 md:px-8 lg:px-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Nossa Proposta de Valor
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Entenda como a Iopen se diferencia no mercado e cria valor para seus clientes e parceiros.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300">
              <div className="bg-cyan-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                <Eye className="text-cyan-600" size={28} />
              </div>
              <h3 className="text-xl font-bold mb-4">Transparência Total</h3>
              <p className="text-gray-600">
                Revelamos de forma clara todos os custos, taxas e potenciais ganhos não realizados, eliminando as "caixas pretas" do mercado financeiro tradicional.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300">
              <div className="bg-cyan-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                <TrendingUp className="text-cyan-600" size={28} />
              </div>
              <h3 className="text-xl font-bold mb-4">Eficiência de Custos</h3>
              <p className="text-gray-600">
                Utilizamos estratégias de baixo custo e alta eficiência, maximizando o retorno líquido dos investimentos através da redução de taxas desnecessárias.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300">
              <div className="bg-cyan-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                <BookOpen className="text-cyan-600" size={28} />
              </div>
              <h3 className="text-xl font-bold mb-4">Educação Financeira</h3>
              <p className="text-gray-600">
                Capacitamos nossos clientes com conhecimento financeiro prático, permitindo que tomem decisões mais informadas sobre seus investimentos.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300">
              <div className="bg-cyan-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                <Users className="text-cyan-600" size={28} />
              </div>
              <h3 className="text-xl font-bold mb-4">Autonomia do Investidor</h3>
              <p className="text-gray-600">
                Empoderamos os investidores com ferramentas e informações que lhes permitem assumir o controle de suas finanças sem dependência de intermediários.
              </p>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white p-8 md:p-10 rounded-xl shadow-lg">
            <div className="flex flex-col md:flex-row items-center">
              <div className="w-full md:w-3/4 mb-6 md:mb-0 md:pr-8">
                <h3 className="text-2xl font-bold mb-4">Junte-se à revolução financeira</h3>
                <p className="text-lg opacity-90 mb-4">
                  A Iopen está transformando o mercado de investimentos no Brasil, trazendo mais transparência, eficiência e controle para os investidores.
                </p>
                <p className="text-lg opacity-90">
                  Seja parte dessa mudança e comece a investir de forma mais inteligente e consciente.
                </p>
              </div>
              <div className="w-full md:w-1/4 flex justify-center">
                <Link 
                  to="/investir" 
                  className="bg-white text-cyan-600 hover:bg-orange-500 hover:text-white font-semibold py-3 px-6 rounded-lg transition duration-300 shadow-md hover:shadow-lg"
                >
                  Comece a investir
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 md:px-8 lg:px-16 bg-gradient-to-r from-cyan-500 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Pronto para transformar sua experiência de investimento?
          </h2>
          <p className="text-xl max-w-3xl mx-auto mb-10">
            Junte-se a milhares de investidores que já estão aproveitando os benefícios da Iopen para otimizar seus investimentos.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to="/investir" 
              className="bg-white text-cyan-600 hover:bg-orange-500 hover:text-white font-semibold py-3 px-8 rounded-lg transition duration-300 shadow-lg"
            >
              Comece a investir
            </Link>
            <Link 
              to="/chat" 
              className="bg-transparent border-2 border-white text-white hover:bg-white/10 font-semibold py-3 px-8 rounded-lg transition duration-300"
            >
              Fale com um especialista
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

// Missing components
const FileCheck = ({ size, className }: { size: number, className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
    <polyline points="14 2 14 8 20 8"></polyline>
    <line x1="16" y1="13" x2="8" y2="13"></line>
    <line x1="16" y1="17" x2="8" y2="17"></line>
    <polyline points="10 9 9 9 8 9"></polyline>
  </svg>
);

const Key = ({ size, className }: { size: number, className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"></path>
  </svg>
);

const Server = ({ size, className }: { size: number, className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
    <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
    <line x1="6" y1="6" x2="6.01" y2="6"></line>
    <line x1="6" y1="18" x2="6.01" y2="18"></line>
  </svg>
);

const FileText = ({ size, className }: { size: number, className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
    <polyline points="14 2 14 8 20 8"></polyline>
    <line x1="16" y1="13" x2="8" y2="13"></line>
    <line x1="16" y1="17" x2="8" y2="17"></line>
    <polyline points="10 9 9 9 8 9"></polyline>
  </svg>
);

const Layers = ({ size, className }: { size: number, className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
    <polyline points="2 17 12 22 22 17"></polyline>
    <polyline points="2 12 12 17 22 12"></polyline>
  </svg>
);

const AlertTriangle = ({ size, className }: { size: number, className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
    <line x1="12" y1="9" x2="12" y2="13"></line>
    <line x1="12" y1="17" x2="12.01" y2="17"></line>
  </svg>
);

const BookOpen = ({ size, className }: { size: number, className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
  </svg>
);

export default BusinessPage;