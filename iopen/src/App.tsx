import React from 'react';
import { 
  ArrowRight, 
  BarChart3, 
  CheckCircle, 
  ChevronDown, 
  Download, 
  Menu, 
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
  FileText
} from 'lucide-react';
import Header from './components/Header';
import Footer from './components/Footer';
import FinancialCalculator from './components/FinancialCalculator';
import MobileOptimizer from './components/MobileOptimizer';

function App() {
  return (
    <div className="font-sans text-gray-800 touch-highlight-none">
      <MobileOptimizer />
      <Header />
      
      {/* Hero Section */}
      <section className="bg-white pt-24 pb-16 px-4 md:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center">
            <div className="w-full md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Investimentos de forma simples e eficaz
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-8">
                Recupere o controle da sua carteira com tecnologia avançada e análise detalhada via open finance.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-cyan-500 hover:bg-white hover:text-cyan-500 border-2 border-cyan-500 text-white font-semibold py-3 px-8 rounded-lg transition duration-300">
                  Comece a investir
                </button>
                <button className="bg-white hover:bg-orange-500 hover:text-white text-orange-500 border-2 border-orange-500 font-semibold py-3 px-8 rounded-lg transition duration-300">
                  Saiba mais <ArrowRight className="inline ml-2" size={18} />
                </button>
              </div>
              <div className="mt-10">
                <p className="text-gray-600 mb-4">Baixe nosso aplicativo</p>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center bg-gray-100 rounded-lg p-2 pr-4">
                    <Download className="mr-2 text-gray-700" size={24} />
                    <div>
                      <div className="flex items-center">
                        <Star className="text-yellow-500" size={14} fill="#EAB308" />
                        <Star className="text-yellow-500" size={14} fill="#EAB308" />
                        <Star className="text-yellow-500" size={14} fill="#EAB308" />
                        <Star className="text-yellow-500" size={14} fill="#EAB308" />
                        <Star className="text-yellow-500" size={14} fill="#EAB308" />
                      </div>
                      <span className="text-xs text-gray-600">4.8 (2.5k reviews)</span>
                    </div>
                  </div>
                  <div className="flex items-center bg-gray-100 rounded-lg p-2 pr-4">
                    <Download className="mr-2 text-gray-700" size={24} />
                    <div>
                      <div className="flex items-center">
                        <Star className="text-yellow-500" size={14} fill="#EAB308" />
                        <Star className="text-yellow-500" size={14} fill="#EAB308" />
                        <Star className="text-yellow-500" size={14} fill="#EAB308" />
                        <Star className="text-yellow-500" size={14} fill="#EAB308" />
                        <Star className="text-yellow-500" size={14} fill="#EAB308" />
                      </div>
                      <span className="text-xs text-gray-600">4.7 (3.1k reviews)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" 
                alt="Investimentos inteligentes" 
                className="rounded-xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Iopen Platform Section */}
      <section className="py-16 px-4 md:px-8 lg:px-16 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Revolucionando sua experiência financeira
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A Iopen une tecnologia avançada e análise detalhada de dados via open finance para transformar sua relação com investimentos
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-16">
            <div>
              <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
                <div className="flex items-center mb-6">
                  <div className="bg-cyan-100 p-3 rounded-full mr-4">
                    <Search className="text-cyan-600" size={28} />
                  </div>
                  <h3 className="text-2xl font-bold">Análise transparente</h3>
                </div>
                
                <p className="text-gray-700 mb-6">
                  Com a liberação dos seus dados financeiros via open finance, geramos um relatório detalhado que revela:
                </p>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-start">
                    <div className="bg-red-100 p-2 rounded-full mr-3 mt-1">
                      <TrendingDown className="text-red-600" size={16} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Taxas excessivas</h4>
                      <p className="text-gray-600">Identificamos quanto você perde com taxas de administração elevadas</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-red-100 p-2 rounded-full mr-3 mt-1">
                      <Lock className="text-red-600" size={16} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Produtos inadequados</h4>
                      <p className="text-gray-600">Revelamos produtos financeiros que não estão alinhados aos seus objetivos</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-red-100 p-2 rounded-full mr-3 mt-1">
                      <BarChart4 className="text-red-600" size={16} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Potencial não realizado</h4>
                      <p className="text-gray-600">Calculamos quanto você deixou de ganhar com estratégias ineficientes</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-cyan-500">
                  <p className="text-gray-700 italic">
                    "Nosso relatório de insights revela, de maneira transparente, como você vem sendo explorado pelos bancos e assessores tradicionais."
                  </p>
                </div>
              </div>
            </div>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold mb-4 flex items-center">
                  <div className="bg-cyan-100 p-2 rounded-full mr-3">
                    <TrendingUp className="text-cyan-600" size={20} />
                  </div>
                  Crescimento Patrimonial
                </h3>
                <p className="text-gray-700 mb-4 pl-12">
                  Utilizamos predominantemente ETFs e títulos do tesouro para aplicar uma metodologia fundamentada em portfólios eficientes.
                </p>
                <div className="bg-white p-5 rounded-lg shadow-md ml-12">
                  <div className="flex items-center mb-3">
                    <LineChart className="text-cyan-600 mr-3" size={20} />
                    <span className="font-medium">Alocação diversificada e otimizada</span>
                  </div>
                  <div className="flex items-center mb-3">
                    <Zap className="text-cyan-600 mr-3" size={20} />
                    <span className="font-medium">Maximização do crescimento dos ativos</span>
                  </div>
                  <div className="flex items-center">
                    <Shield className="text-cyan-600 mr-3" size={20} />
                    <span className="font-medium">Proteção contra inflação e volatilidade</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold mb-4 flex items-center">
                  <div className="bg-orange-100 p-2 rounded-full mr-3">
                    <Target className="text-orange-600" size={20} />
                  </div>
                  Investimentos com Propósitos Específicos
                </h3>
                <p className="text-gray-700 mb-4 pl-12">
                  Oferecemos soluções personalizadas focadas em objetivos financeiros concretos, como aposentadoria e aquisição de bens.
                </p>
                <div className="bg-white p-5 rounded-lg shadow-md ml-12">
                  <div className="flex items-center mb-3">
                    <FileText className="text-orange-600 mr-3" size={20} />
                    <span className="font-medium">Tesouro Renda+ para aposentadoria</span>
                  </div>
                  <div className="flex items-center mb-3">
                    <CreditCard className="text-orange-600 mr-3" size={20} />
                    <span className="font-medium">Débito mensal integrado ao cartão de crédito</span>
                  </div>
                  <div className="flex items-center">
                    <Landmark className="text-orange-600 mr-3" size={20} />
                    <span className="font-medium">Construção de reserva de renda de longo prazo</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white p-8 md:p-10 rounded-xl shadow-lg">
            <div className="flex flex-col md:flex-row items-center">
              <div className="w-full md:w-3/4 mb-6 md:mb-0 md:pr-8">
                <h3 className="text-2xl font-bold mb-4">Recupere o controle da sua carteira</h3>
                <p className="text-lg opacity-90 mb-4">
                  A Iopen capacita você a eliminar ineficiências e promover uma gestão mais transparente, eficiente e alinhada aos seus objetivos individuais.
                </p>
                <div className="flex flex-wrap gap-4 mt-6">
                  <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                    <span className="text-white font-medium">Transparência total</span>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                    <span className="text-white font-medium">Baixo custo</span>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                    <span className="text-white font-medium">Automação inteligente</span>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/4 flex justify-center">
                <button className="bg-white text-cyan-600 hover:bg-orange-500 hover:text-white font-semibold py-3 px-6 rounded-lg transition duration-300 shadow-md hover:shadow-lg">
                  Comece agora
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Financial Calculator Section */}
      <FinancialCalculator />

      {/* Passive Funds Trend Section */}
      <section className="py-16 px-4 md:px-8 lg:px-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="w-full md:w-1/2">
              <div className="bg-gradient-to-br from-cyan-50 to-blue-50 p-8 rounded-xl border border-cyan-100 shadow-lg">
                <div className="flex items-center mb-6">
                  <div className="bg-cyan-100 p-3 rounded-full mr-4">
                    <PieChart className="text-cyan-600" size={28} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">Você sabia?</h3>
                </div>
                <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                  Nos Estados Unidos, os ativos dos fundos passivos têm batido recordes de captação e já representam mais da metade do mercado norte-americano, impulsionados por baixas taxas de administração.
                </p>
                <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                  Esse cenário, em que os fundos passivos superaram os ativos, reforça a importância da eficiência e do controle de custos na gestão de investimentos.
                </p>
                <p className="text-gray-700 text-lg leading-relaxed bg-cyan-50 p-3 rounded-lg border-l-4 border-cyan-500">
                  Na Iopen, adotamos estratégias alinhadas a essa tendência para oferecer soluções de investimento sólidas e de baixo custo.
                </p>
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Eficiência e baixo custo: o futuro dos investimentos
              </h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-cyan-100 p-2 rounded-full mr-4 mt-1">
                    <TrendingDown className="text-cyan-600" size={20} />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold mb-2">Taxas reduzidas</h4>
                    <p className="text-gray-600">
                      Nossos portfólios utilizam ETFs e outros instrumentos de baixo custo, eliminando taxas excessivas que corroem seus rendimentos ao longo do tempo.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-cyan-100 p-2 rounded-full mr-4 mt-1">
                    <BarChart className="text-cyan-600" size={20} />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold mb-2">Diversificação inteligente</h4>
                    <p className="text-gray-600">
                      Combinamos estratégias passivas com alocações táticas para maximizar retornos e minimizar riscos, seguindo as melhores práticas globais.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-cyan-100 p-2 rounded-full mr-4 mt-1">
                    <DollarSign className="text-cyan-600" size={20} />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold mb-2">Resultados comprovados</h4>
                    <p className="text-gray-600">
                      Estudos mostram que estratégias de baixo custo superam consistentemente fundos ativos de alto custo no longo prazo, especialmente após considerar todas as taxas.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <a href="#" className="inline-flex items-center text-cyan-600 font-semibold hover:text-cyan-800 transition duration-300">
                  Conheça nossa metodologia de investimento <ArrowRight className="ml-2" size={16} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How to Invest Section */}
      <section className="py-16 px-4 md:px-8 lg:px-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Como investir com a Iopen
          </h2>
          <p className="text-xl text-gray-600 text-center max-w-3xl mx-auto mb-16">
            Um processo simples, transparente e totalmente automatizado para você alcançar seus objetivos financeiros.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="relative">
              <div className="bg-gray-100 rounded-full w-12 h-12 flex items-center justify-center mb-6 font-bold text-xl">1</div>
              <h3 className="text-2xl font-bold mb-4">Análise financeira</h3>
              <p className="text-gray-600 mb-4">
                Conecte suas contas via open finance para uma análise detalhada da sua situação financeira atual.
              </p>
              <p className="text-gray-600">
                Identificamos ineficiências e oportunidades para otimizar seus investimentos.
              </p>
            </div>
            
            <div className="relative">
              <div className="bg-gray-100 rounded-full w-12 h-12 flex items-center justify-center mb-6 font-bold text-xl">2</div>
              <h3 className="text-2xl font-bold mb-4">Estratégia personalizada</h3>
              <p className="text-gray-600 mb-4">
                Definimos uma estratégia de investimento baseada nos seus objetivos e perfil de risco.
              </p>
              <p className="text-gray-600">
                Utilizamos algoritmos avançados para criar um portfólio eficiente e diversificado.
              </p>
            </div>
            
            <div className="relative">
              <div className="bg-gray-100 rounded-full w-12 h-12 flex items-center justify-center mb-6 font-bold text-xl">3</div>
              <h3 className="text-2xl font-bold mb-4">Gestão automatizada</h3>
              <p className="text-gray-600 mb-4">
                Implementamos e gerenciamos seus investimentos de forma automática e contínua.
              </p>
              <p className="text-gray-600">
                Rebalanceamos seu portfólio quando necessário para manter a estratégia alinhada aos seus objetivos.
              </p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <button className="bg-orange-500 hover:bg-white hover:text-orange-500 border-2 border-orange-500 text-white font-semibold py-3 px-8 rounded-lg transition duration-300">
              Comece agora mesmo
            </button>
          </div>
        </div>
      </section>

      {/* Awards Section */}
      <section className="py-16 px-4 md:px-8 lg:px-16 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Reconhecimento e premiações
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
            <div className="flex flex-col items-center">
              <div className="bg-white p-6 rounded-full shadow-md mb-4">
                <CheckCircle className="text-cyan-600" size={40} />
              </div>
              <p className="text-center font-semibold">Melhor Fintech 2024</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="bg-white p-6 rounded-full shadow-md mb-4">
                <CheckCircle className="text-orange-600" size={40} />
              </div>
              <p className="text-center font-semibold">Inovação Financeira</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="bg-white p-6 rounded-full shadow-md mb-4">
                <CheckCircle className="text-teal-600" size={40} />
              </div>
              <p className="text-center font-semibold">Excelência em UX</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="bg-white p-6 rounded-full shadow-md mb-4">
                <CheckCircle className="text-blue-600" size={40} />
              </div>
              <p className="text-center font-semibold">Top 10 Startups</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 md:px-8 lg:px-16 bg-gradient-to-r from-cyan-500 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Pronto para transformar seus investimentos?
          </h2>
          <p className="text-xl max-w-3xl mx-auto mb-10">
            Junte-se a milhares de investidores que já recuperaram o controle de suas finanças com a Iopen.
          </p>
          <button className="bg-white text-cyan-600 hover:bg-orange-500 hover:text-white font-semibold py-3 px-8 rounded-lg transition duration-300 shadow-lg">
            Comece a investir agora
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default App;