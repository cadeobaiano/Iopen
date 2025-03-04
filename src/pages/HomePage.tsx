import React from 'react';
import { 
  ArrowRight, 
  BarChart3, 
  CheckCircle, 
  Shield, 
  Star, 
  Target, 
  TrendingUp, 
  Users, 
  Wallet,
  CreditCard,
  Landmark,
  PieChart,
  TrendingDown,
  DollarSign,
  BarChart,
  LineChart,
  Zap,
  Lock,
  Search,
  BarChart4,
  FileText,
  AlertTriangle,
  Award
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FinancialCalculator from '../components/FinancialCalculator';
import { Link } from 'react-router-dom';
import useDeviceDetect from '../hooks/useDeviceDetect';
import InsightsReport from './InsightsReport';

// Cores padronizadas para uso em toda a página
const COLORS = {
  primary: 'from-cyan-600 to-blue-700',
  secondary: 'from-orange-500 to-orange-600',
  accent: 'bg-orange-500',
  light: 'bg-cyan-50',
  success: 'bg-green-50 text-green-600',
  error: 'bg-red-50 text-red-600',
  neutral: 'bg-gray-50',
};

function HomePage() {
  const { isMobile } = useDeviceDetect();
  
  return (
    <div className="font-sans text-gray-800 overflow-x-hidden w-full">
      <Header />
      
      {/* Hero Section - Redesenhada e Padronizada */}
      <section className={`bg-gradient-to-r from-cyan-600 to-blue-700 pt-24 pb-12 sm:pt-28 sm:pb-16 px-4 sm:px-8 lg:px-16 text-white relative overflow-hidden`}>
        {/* Background Elements - Simplificados e Sutis */}
        <div className="absolute inset-0 overflow-hidden opacity-5">
          <div className="absolute -right-10 -bottom-20 w-60 h-60 rounded-full bg-white"></div>
          <div className="absolute -left-20 top-10 w-80 h-80 rounded-full bg-white"></div>
        </div>
        
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="flex flex-col items-center text-center sm:text-left sm:items-start">
            {/* Título principal */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight mb-3 max-w-xl">
              Pare de perder dinheiro com taxas ocultas
            </h1>
            
            {/* Descrição */}
            <p className="text-sm sm:text-base text-white/90 mb-4 max-w-lg">
              A Iopen revela como bancos tradicionais comprometem seus rendimentos e oferece estratégias para maximizar seu patrimônio.
            </p>
            
            {/* Benefícios em grid para melhor organização visual */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-5 max-w-lg w-full">
              <div className="flex items-center">
                <CheckCircle className="text-white mr-2 flex-shrink-0" size={16} />
                <p className="text-sm text-white/90">ETFs e títulos</p>
              </div>
              <div className="flex items-center">
                <CheckCircle className="text-white mr-2 flex-shrink-0" size={16} />
                <p className="text-sm text-white/90">Planos de aposentadoria</p>
              </div>
              <div className="flex items-center">
                <CheckCircle className="text-white mr-2 flex-shrink-0" size={16} />
                <p className="text-sm text-white/90">Análise de taxas</p>
              </div>
              <div className="flex items-center">
                <CheckCircle className="text-white mr-2 flex-shrink-0" size={16} />
                <p className="text-sm text-white/90">Gestão transparente</p>
              </div>
            </div>
            
            {/* Botões de ação - Design consistente */}
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <Link 
                to="/login"
                className="bg-white text-cyan-600 hover:bg-orange-500 hover:text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 w-full text-center"
              >
                Começar agora
              </Link>
              <Link 
                to="/quem-somos" 
                className="bg-transparent border border-white text-white hover:bg-white/10 font-semibold py-2.5 px-5 rounded-lg transition duration-300 text-sm sm:text-base flex items-center justify-center w-full sm:w-auto"
              >
                Saiba mais <ArrowRight className="inline ml-2" size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Estatísticas Rápidas - Design padronizado */}
      <section className="py-12 sm:py-16 px-4 sm:px-8 lg:px-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-xl sm:text-3xl font-bold mb-3 bg-gradient-to-r from-cyan-600 to-blue-700 bg-clip-text text-transparent">
              O impacto das taxas em seus investimentos
            </h2>
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
              Dados que revelam como práticas abusivas do mercado financeiro comprometem seu patrimônio.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-8">
            <div className="bg-gradient-to-br from-white to-cyan-50 p-6 sm:p-8 rounded-xl shadow-sm border border-gray-100 transition-transform duration-300 hover:shadow-md hover:-translate-y-1">
              <div className="flex items-center mb-3 sm:mb-4">
                <div className="bg-red-100 p-3 rounded-full mr-4">
                  <TrendingDown className="text-red-600" size={22} />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold">35%</h3>
              </div>
              <p className="text-gray-700 text-sm">
                Do seu patrimônio é perdido em taxas e comissões ocultas em 20 anos.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-white to-cyan-50 p-6 sm:p-8 rounded-xl shadow-sm border border-gray-100 transition-transform duration-300 hover:shadow-md hover:-translate-y-1">
              <div className="flex items-center mb-3 sm:mb-4">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <Landmark className="text-blue-600" size={22} />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold">R$ 8,7 bilhões</h3>
              </div>
              <p className="text-gray-700 text-sm">
                Em taxas excessivas são cobradas anualmente por bancos no Brasil.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-white to-cyan-50 p-6 sm:p-8 rounded-xl shadow-sm border border-gray-100 transition-transform duration-300 hover:shadow-md hover:-translate-y-1">
              <div className="flex items-center mb-3 sm:mb-4">
                <div className="bg-green-100 p-3 rounded-full mr-4">
                  <Shield className="text-green-600" size={22} />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold">92%</h3>
              </div>
              <p className="text-gray-700 text-sm">
                Dos investidores desconhecem o impacto real das taxas em seus rendimentos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Seção de Relatório de Insights - Estilo padronizado e otimizado para mobile */}
      <section className="py-10 sm:py-16 bg-gradient-to-b from-white to-cyan-50 px-4 sm:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-6 sm:mb-10">
            <h2 className="text-xl sm:text-3xl font-bold mb-2 sm:mb-3 bg-gradient-to-r from-cyan-600 to-blue-700 bg-clip-text text-transparent">
              Relatório de insights financeiros
            </h2>
            <p className="text-sm sm:text-lg text-gray-600 max-w-3xl mx-auto">
              Descubra quanto você perde com taxas e impostos mal planejados.
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 mb-6 sm:mb-10">
            <div className="p-4 sm:p-6 md:p-8">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                <div className="mb-5 md:mb-0 md:mr-6 md:w-1/2">
                  <div className="inline-block px-3 py-1 bg-cyan-100 text-cyan-800 rounded-full text-xs font-medium mb-2 sm:mb-3">
                    Exemplo
                  </div>
                  <h3 className="text-base sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">
                    Perdas com taxas excessivas
                  </h3>
                  <p className="text-gray-600 mb-3 sm:mb-4 text-sm">
                    <span className="font-bold text-red-600">R$ 3.810,95</span> em taxas por ano (<span className="font-bold text-red-600">2,5%</span> do patrimônio)
                  </p>
                  
                  <div className="bg-red-50 border-l-4 border-red-500 p-3 sm:p-4 rounded-r-md mb-4 sm:mb-6">
                    <div className="flex items-start">
                      <AlertTriangle className="text-red-500 mr-2 flex-shrink-0 mt-0.5" size={16} />
                      <p className="text-red-700 text-xs sm:text-sm">
                        Em 30 anos: <span className="font-bold">-R$ 285.821,25</span>
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="md:w-1/2 bg-gray-50 p-4 rounded-lg">
                  <div className="grid grid-cols-2 gap-3 mb-3 sm:mb-4">
                    <div className="bg-gray-100 p-3 rounded-lg">
                      <p className="text-xs text-gray-500 mb-1">Investimento atual</p>
                      <p className="font-bold text-base sm:text-lg text-gray-800">R$ 152.437,89</p>
                    </div>
                    <div className="bg-red-50 p-3 rounded-lg">
                      <p className="text-xs text-gray-500 mb-1">Taxas anuais pagas</p>
                      <p className="font-bold text-base sm:text-lg text-red-600">R$ 3.810,95</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 mb-3 sm:mb-4">
                    <div className="bg-red-50 p-3 rounded-lg">
                      <p className="text-xs text-gray-500 mb-1">Impostos anuais</p>
                      <p className="font-bold text-base sm:text-lg text-red-600">R$ 2.286,57</p>
                    </div>
                    <div className="bg-orange-50 p-3 rounded-lg">
                      <p className="text-xs text-gray-500 mb-1">Eficiência tributária</p>
                      <p className="font-bold text-base sm:text-lg text-orange-600">35.7%</p>
                    </div>
                  </div>
                  
                  <div className="bg-green-50 p-3 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Economia potencial anual</p>
                        <p className="font-bold text-base sm:text-lg text-green-600">R$ 3.430,28</p>
                      </div>
                      <TrendingUp className="text-green-500" size={18} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <Link 
              to="/insights" 
              className="inline-flex items-center justify-center px-5 py-2.5 sm:px-6 sm:py-3 text-sm font-medium rounded-lg bg-gradient-to-r from-cyan-600 to-blue-700 text-white hover:shadow-md transition-all duration-300 w-full sm:w-auto max-w-xs mx-auto"
            >
              Ver exemplo de relatório completo
              <ArrowRight className="ml-2" size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Financial Calculator Section - Estilo consistente */}
      <div className="mt-4 sm:mt-8">
        <FinancialCalculator />
      </div>
      
      {/* Recursos e Benefícios - Nova seção para maior coesão */}
      <section className="py-12 sm:py-16 bg-white px-4 sm:px-8 lg:px-16 mt-0">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-xl sm:text-3xl font-bold mb-3 bg-gradient-to-r from-cyan-600 to-blue-700 bg-clip-text text-transparent">
              Recursos que fazem a diferença
            </h2>
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
              A plataforma Iopen oferece ferramentas completas para otimizar seus investimentos.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <PieChart className="text-blue-600" size={22} />
              </div>
              <h3 className="text-lg font-bold mb-2">Análise Inteligente</h3>
              <p className="text-gray-600 text-sm">
                Utilizamos algoritmos avançados para identificar taxas ocultas e oportunidades de otimização.
              </p>
            </div>
            
            <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
              <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Lock className="text-green-600" size={22} />
              </div>
              <h3 className="text-lg font-bold mb-2">Segurança Total</h3>
              <p className="text-gray-600 text-sm">
                Suas informações são protegidas com a mais alta tecnologia de criptografia e segurança digital.
              </p>
            </div>
            
            <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
              <div className="bg-orange-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Target className="text-orange-600" size={22} />
              </div>
              <h3 className="text-lg font-bold mb-2">Personalização</h3>
              <p className="text-gray-600 text-sm">
                Cada estratégia é adaptada ao seu perfil, objetivos e horizonte de investimento.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}

export default HomePage;