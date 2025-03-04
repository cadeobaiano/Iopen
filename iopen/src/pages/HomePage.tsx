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

function HomePage() {
  const { isMobile } = useDeviceDetect();
  
  return (
    <div className="font-sans text-gray-800 overflow-x-hidden w-full">
      <Header />
      
      {/* Hero Section - Redesenhada */}
      <section className="bg-gradient-to-r from-cyan-500 via-blue-500 to-blue-600 pt-20 pb-16 sm:py-24 px-4 sm:px-8 lg:px-16 text-white relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden opacity-10">
          <div className="absolute -right-10 -bottom-20 w-72 h-72 rounded-full bg-white"></div>
          <div className="absolute -left-20 top-10 w-96 h-96 rounded-full bg-white"></div>
          <div className="absolute left-1/3 top-1/4 w-48 h-48 rounded-full bg-white"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row items-center">
            <div className="w-full mb-8">
              <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm text-white rounded-full text-xs font-medium mb-4">
                Investimentos inteligentes
              </span>
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-3 sm:mb-4 text-white">
                Pare de perder dinheiro com taxas ocultas
              </h1>
              <p className="text-sm sm:text-lg text-white/90 mb-5 max-w-xl">
                A Iopen revela como bancos tradicionais comprometem seus rendimentos e oferece estratégias inteligentes para maximizar seu patrimônio.
              </p>
              
              <div className="flex flex-wrap gap-y-2 gap-x-6 mb-6 max-w-xl">
                <div className="flex items-center">
                  <CheckCircle className="text-white mr-2 flex-shrink-0" size={16} />
                  <p className="text-sm text-white/90">ETFs e títulos do tesouro</p>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="text-white mr-2 flex-shrink-0" size={16} />
                  <p className="text-sm text-white/90">Planos para aposentadoria</p>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="text-white mr-2 flex-shrink-0" size={16} />
                  <p className="text-sm text-white/90">Análise de taxas ocultas</p>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="text-white mr-2 flex-shrink-0" size={16} />
                  <p className="text-sm text-white/90">Gestão transparente</p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Link 
                  to="/login-triagem" 
                  className="bg-white text-cyan-600 hover:bg-gray-100 font-semibold py-3 px-6 sm:px-8 rounded-lg transition duration-300 shadow-md hover:shadow-lg text-sm sm:text-base touch-highlight-none min-touch-target text-center w-full sm:w-auto"
                >
                  Começar a investir
                </Link>
                <Link 
                  to="/quem-somos" 
                  className="bg-transparent border border-white text-white hover:bg-white hover:text-cyan-600 font-semibold py-3 px-6 sm:px-8 rounded-lg transition duration-300 text-sm sm:text-base flex items-center justify-center touch-highlight-none min-touch-target w-full sm:w-auto mt-3 sm:mt-0"
                >
                  Saiba mais <ArrowRight className="inline ml-2" size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Estatísticas Rápidas - Redesenhada */}
      <section className="py-10 sm:py-16 px-4 sm:px-8 lg:px-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-14">
            <h2 className="text-xl sm:text-3xl font-bold mb-3 sm:mb-4">O impacto das taxas em seus investimentos</h2>
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
              Dados que revelam como práticas abusivas do mercado financeiro comprometem seu patrimônio ao longo do tempo.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8">
            <div className="bg-gradient-to-br from-white to-cyan-50 p-6 sm:p-8 rounded-xl shadow-sm border border-gray-100 transition-transform duration-300 hover:shadow-md hover:-translate-y-1">
              <div className="flex items-center mb-4">
                <div className="bg-red-100 p-3 rounded-full mr-4">
                  <TrendingDown className="text-red-600" size={24} />
                </div>
                <h3 className="text-xl font-bold">35%</h3>
              </div>
              <p className="text-gray-700">
                Do seu patrimônio é perdido em taxas administrativas e comissões ocultas em 20 anos de investimento.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-white to-cyan-50 p-6 sm:p-8 rounded-xl shadow-sm border border-gray-100 transition-transform duration-300 hover:shadow-md hover:-translate-y-1">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <Landmark className="text-blue-600" size={24} />
                </div>
                <h3 className="text-xl font-bold">R$ 8,7 bilhões</h3>
              </div>
              <p className="text-gray-700">
                Em taxas excessivas são cobradas anualmente por grandes bancos e corretoras no Brasil.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-white to-cyan-50 p-6 sm:p-8 rounded-xl shadow-sm border border-gray-100 transition-transform duration-300 hover:shadow-md hover:-translate-y-1">
              <div className="flex items-center mb-4">
                <div className="bg-green-100 p-3 rounded-full mr-4">
                  <Shield className="text-green-600" size={24} />
                </div>
                <h3 className="text-xl font-bold">92%</h3>
              </div>
              <p className="text-gray-700">
                Dos investidores desconhecem o impacto real das taxas em seus rendimentos a longo prazo.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Seção de Relatório de Insights - Nova seção */}
      <section className="py-12 sm:py-16 bg-gradient-to-b from-white to-cyan-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">Peça seu relatório de insights financeiros</h2>
            <p className="text-base sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Descubra como você está sendo impactado por taxas abusivas e impostos mal planejados. Veja um exemplo abaixo:
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 mb-8 touch-target">
            <div className="p-4 sm:p-6 md:p-8">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                <div className="mb-6 md:mb-0 md:mr-8 md:w-1/2">
                  <div className="inline-block px-3 py-1 bg-cyan-100 text-cyan-800 rounded-full text-sm font-medium mb-4">
                    Exemplo de Relatório
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
                    Você está perdendo dinheiro com taxas e impostos excessivos
                  </h3>
                  <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">
                    Este cliente está pagando <span className="font-bold text-red-600">R$ 6.000</span> por ano em taxas e impostos desnecessários, o que representa <span className="font-bold text-red-600">4% do patrimônio</span> anualmente.
                  </p>
                  
                  <div className="bg-red-50 border-l-4 border-red-500 p-3 sm:p-4 rounded-r-md mb-4 sm:mb-6">
                    <div className="flex items-start">
                      <AlertTriangle className="text-red-500 mr-2 sm:mr-3 flex-shrink-0 mt-1" size={18} />
                      <div>
                        <p className="text-red-800 font-medium text-sm sm:text-base">Alerta de Urgência</p>
                        <p className="text-red-700 text-sm sm:text-base">
                          Em 30 anos, isso resultará em uma perda de mais de <span className="font-bold">R$ 450.000</span> em patrimônio!
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="md:w-1/2 bg-gray-50 p-4 sm:p-6 rounded-lg touch-target">
                  <div className="flex justify-between items-center mb-4 sm:mb-6">
                    <div>
                      <p className="text-xs sm:text-sm text-gray-500">Cliente</p>
                      <p className="font-semibold text-base sm:text-xl">João Silva</p>
                    </div>
                    <div className="bg-cyan-50 px-3 py-1 sm:px-4 sm:py-2 rounded-full">
                      <p className="font-medium text-cyan-700 text-xs sm:text-sm">Perfil: Moderado</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center mb-4 sm:mb-6 bg-gray-100 p-3 sm:p-4 rounded-lg">
                    <div>
                      <p className="text-xs sm:text-sm text-gray-500 mb-1">Nota da carteira</p>
                      <div className="flex items-center">
                        <Award className="text-orange-500 mr-1 sm:mr-2" size={16} />
                        <p className="font-medium text-xs sm:text-sm">Avaliação Iopen</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="text-2xl sm:text-4xl font-bold text-orange-500">4.2</div>
                      <div className="text-xs sm:text-sm text-gray-600">de 10</div>
                      <div className="text-xs sm:text-sm font-medium text-orange-500 mt-1">Preocupante</div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 sm:gap-4 mb-4 sm:mb-6">
                    <div className="bg-gray-100 p-3 sm:p-4 rounded-lg">
                      <p className="text-xs sm:text-sm text-gray-500 mb-1">Investimento atual</p>
                      <p className="font-bold text-sm sm:text-xl">R$ 150.000</p>
                    </div>
                    <div className="bg-red-50 p-3 sm:p-4 rounded-lg">
                      <p className="text-xs sm:text-sm text-gray-500 mb-1">Taxas anuais</p>
                      <p className="font-bold text-sm sm:text-xl text-red-600">R$ 3.750</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 sm:gap-4 mb-4 sm:mb-6">
                    <div className="bg-red-50 p-3 sm:p-4 rounded-lg">
                      <p className="text-xs sm:text-sm text-gray-500 mb-1">Impostos anuais</p>
                      <p className="font-bold text-sm sm:text-xl text-red-600">R$ 2.250</p>
                    </div>
                    <div className="bg-orange-50 p-3 sm:p-4 rounded-lg">
                      <p className="text-xs sm:text-sm text-gray-500 mb-1">Eficiência tributária</p>
                      <p className="font-bold text-sm sm:text-xl text-orange-600">35%</p>
                    </div>
                  </div>
                  
                  <div className="bg-green-50 p-3 sm:p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs sm:text-sm text-gray-500 mb-1">Economia potencial anual</p>
                        <p className="font-bold text-sm sm:text-xl text-green-600">R$ 3.675</p>
                      </div>
                      <TrendingUp className="text-green-500" size={20} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 sm:p-6 border-t border-gray-100">
              <div className="flex flex-col sm:flex-row justify-between items-center">
                <p className="text-sm sm:text-base text-gray-700 mb-4 sm:mb-0 text-center sm:text-left">
                  Este é apenas um exemplo. <span className="font-medium">Seu relatório personalizado</span> mostrará quanto você está perdendo com taxas e impostos excessivos.
                </p>
                <Link 
                  to="/insights" 
                  className="text-cyan-700 hover:text-cyan-800 font-medium flex items-center justify-center group touch-target min-h-[44px] w-full sm:w-auto"
                >
                  Ver exemplo completo do relatório
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
                </Link>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-sm sm:text-base text-gray-700 mb-4 sm:mb-6">
              Para acessar seu relatório personalizado, abra sua conta e libere o Open Finance.
            </p>
            <Link 
              to="/login-triagem" 
              className="inline-flex items-center justify-center px-5 py-3 sm:px-6 sm:py-4 border border-transparent text-base font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700 touch-target min-h-[44px] min-w-[44px] touch-highlight-none"
            >
              Abrir minha conta
              <ArrowRight className="ml-2" size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Financial Calculator Section - Movido para cima */}
      <FinancialCalculator />
      
      <div className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white p-6 md:p-10 rounded-xl shadow-lg mt-10 sm:mt-16 mx-4 sm:mx-8 lg:mx-16">
        <div className="flex flex-col md:flex-row items-center">
          <div className="w-full md:w-3/4 mb-6 md:mb-0 md:pr-8">
            <h3 className="text-xl sm:text-2xl font-bold mb-4 text-center md:text-left">Recupere o controle da sua carteira</h3>
            <p className="text-base sm:text-lg opacity-90 mb-4 text-center md:text-left">
              A Iopen capacita você a eliminar ineficiências e promover uma gestão mais transparente, eficiente e alinhada aos seus objetivos individuais.
            </p>
            <div className="flex flex-wrap gap-3 mt-4 justify-center md:justify-start">
              <div className="bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full">
                <span className="text-white font-medium text-sm">Transparência total</span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full">
                <span className="text-white font-medium text-sm">Baixo custo</span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full">
                <span className="text-white font-medium text-sm">Automação</span>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/4 flex justify-center">
            <Link to="/login-triagem" className="bg-white text-cyan-600 hover:bg-orange-500 hover:text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 w-full text-center">
              Comece agora
            </Link>
          </div>
        </div>
      </div>

      {/* Awards Section - Redesenhada */}
      <section className="py-12 sm:py-20 px-4 sm:px-8 lg:px-16 bg-gradient-to-b from-white to-cyan-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-xl sm:text-3xl font-bold text-center mb-4 sm:mb-6">
            Reconhecimento e premiações
          </h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-8 sm:mb-12 text-sm sm:text-base">
            Nossa missão de trazer transparência ao mercado financeiro tem sido reconhecida por instituições respeitadas
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 items-center">
            <div className="flex flex-col items-center transform transition-transform duration-300 hover:scale-105">
              <div className="bg-white p-5 sm:p-6 rounded-full shadow-md mb-4 border border-gray-100">
                <CheckCircle className="text-cyan-600" size={isMobile ? 32 : 40} />
              </div>
              <p className="text-center font-semibold">Melhor Fintech 2024</p>
              <p className="text-center text-xs sm:text-sm text-gray-600">Vanguard Fintech Awards</p>
            </div>
            
            <div className="flex flex-col items-center transform transition-transform duration-300 hover:scale-105">
              <div className="bg-white p-5 sm:p-6 rounded-full shadow-md mb-4 border border-gray-100">
                <CheckCircle className="text-orange-600" size={isMobile ? 32 : 40} />
              </div>
              <p className="text-center font-semibold">Inovação Financeira</p>
              <p className="text-center text-xs sm:text-sm text-gray-600">InovaFina Premiações</p>
            </div>
            
            <div className="flex flex-col items-center transform transition-transform duration-300 hover:scale-105">
              <div className="bg-white p-5 sm:p-6 rounded-full shadow-md mb-4 border border-gray-100">
                <CheckCircle className="text-teal-600" size={isMobile ? 32 : 40} />
              </div>
              <p className="text-center font-semibold">Excelência em UX</p>
              <p className="text-center text-xs sm:text-sm text-gray-600">NexUX Experience</p>
            </div>
            
            <div className="flex flex-col items-center transform transition-transform duration-300 hover:scale-105">
              <div className="bg-white p-5 sm:p-6 rounded-full shadow-md mb-4 border border-gray-100">
                <CheckCircle className="text-blue-600" size={isMobile ? 32 : 40} />
              </div>
              <p className="text-center font-semibold">Top 10 Startups</p>
              <p className="text-center text-xs sm:text-sm text-gray-600">StartElite Awards</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Redesenhada */}
      <section className="py-12 sm:py-20 px-4 sm:px-8 lg:px-16 bg-gradient-to-r from-cyan-600 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6">
            Pronto para transformar seus investimentos?
          </h2>
          <p className="text-sm sm:text-lg max-w-2xl mx-auto mb-6 sm:mb-10 opacity-90">
            Junte-se a milhares de investidores que já recuperaram o controle de suas finanças e descobriram o verdadeiro potencial de seus investimentos.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
            <Link 
              to="/login-triagem" 
              className="bg-white text-cyan-600 hover:bg-orange-500 hover:text-white font-semibold py-3 px-8 rounded-lg transition duration-300 shadow-lg text-base sm:text-lg min-touch-target w-full sm:w-auto"
            >
              Comece a investir agora
            </Link>
            <Link 
              to="/chat" 
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-cyan-600 font-semibold py-3 px-8 rounded-lg transition duration-300 text-base sm:text-lg min-touch-target w-full sm:w-auto"
            >
              Fale com um especialista
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default HomePage;