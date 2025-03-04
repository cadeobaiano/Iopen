import React from 'react';
import { 
  TrendingUp, 
  CheckCircle, 
  Info, 
  DollarSign,
  ThumbsDown,
  Award,
  BarChart2,
  PieChart
} from 'lucide-react';
import { 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  LineChart as ReLineChart,
  Line,
  AreaChart,
  Area
} from 'recharts';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useDeviceDetect } from '../utils/useDeviceDetect';

// Estilos para animações
const styles = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  @keyframes widthIn {
    from { width: 0; }
    to { width: 100%; }
  }
  
  .animate-fadeIn {
    animation: fadeIn 0.8s ease-out forwards;
  }
  
  .animate-widthIn {
    animation: widthIn 1.5s ease-out forwards;
  }
`;

const InsightsReport: React.FC = () => {
  const { isMobile } = useDeviceDetect();
  
  // Dados do cliente
  const clientData = {
    name: 'Maria Silva',
    currentInvestment: 152437.89,
    currentFees: 3810.95, // 2.5% de taxa
    potentialSavings: 2287.00, // Economia potencial com taxas menores (1.5% vs 0.6%)
    riskProfile: 'Moderado',
    portfolioScore: 4.2, // Nota da carteira (de 0 a 10)
    taxPaid: 2286.57, // Impostos pagos anualmente (1.5% do investimento)
    taxEfficiency: 35.7, // Eficiência tributária (%)
    potentialTaxSavings: 1143.28, // Economia potencial em impostos
    comeCotas: 13582.00, // Valor perdido com come-cotas (acumulado em 5 anos)
    etfGain: 28963.20, // Ganho adicional com ETFs em 5 anos
    etfGainProjection: 173779.20 // Projeção de ganho adicional com ETFs em 20 anos
  };

  // Calcular o total de economia potencial
  const totalPotentialSavings = clientData.potentialSavings + clientData.potentialTaxSavings;
  
  // Calcular a taxa Iopen (0.6% do investimento atual)
  const iopenFee = Math.round(clientData.currentInvestment * 0.006);
  
  // Dados dos gráficos
  const comeCotas = [
    { ano: 2019, valor: 100000, comeCotas: 0 },
    { ano: 2020, valor: 112000, comeCotas: 2250 },
    { ano: 2021, valor: 123200, comeCotas: 4725 },
    { ano: 2022, valor: 133000, comeCotas: 7450 },
    { ano: 2023, valor: 142500, comeCotas: 10412 },
    { ano: 2024, valor: clientData.currentInvestment, comeCotas: clientData.comeCotas }
  ];
  
  const rentabilidadeComparativa = [
    { ano: 2019, fundos: 100, etfs: 100 },
    { ano: 2020, fundos: 102, etfs: 104 },
    { ano: 2021, fundos: 109, etfs: 115 },
    { ano: 2022, fundos: 111, etfs: 120 },
    { ano: 2023, fundos: 117, etfs: 131 },
    { ano: 2024, fundos: 124, etfs: 143 }
  ];
  
  // Cores principais do tema para manter consistência
  const theme = {
    primary: {
      light: '#e0f2fe', // cyan-100
      medium: '#0ea5e9', // cyan-500
      dark: '#0369a1'  // cyan-700
    },
    secondary: {
      light: '#f0f9ff', // sky-50
      medium: '#0284c7', // sky-600
      dark: '#075985'  // sky-800
    },
    warning: {
      light: '#fff7ed', // orange-50
      medium: '#f97316', // orange-500
      dark: '#c2410c'  // orange-700
    },
    danger: {
      light: '#fee2e2', // red-100
      medium: '#ef4444', // red-500
      dark: '#b91c1c'  // red-700
    },
    success: {
      light: '#dcfce7', // green-100
      medium: '#22c55e', // green-500
      dark: '#15803d'  // green-700
    }
  };

  return (
    <div className="font-sans text-gray-800 overflow-x-hidden w-full">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-20 sm:pt-28 pb-6 sm:pb-10 px-3 sm:px-8 lg:px-16 bg-gradient-to-br from-cyan-50 via-sky-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="w-full md:w-1/2 mb-6 md:mb-0">
              <h1 className="text-2xl sm:text-4xl font-bold mb-5 sm:mb-6 bg-gradient-to-r from-cyan-600 to-blue-700 bg-clip-text text-transparent">
                Relatório de Insights Financeiros
              </h1>
              <div className="bg-sky-50 border-l-4 border-sky-500 p-3 sm:p-4 rounded-r-md mb-4 sm:mb-6 shadow-sm">
                <div className="flex items-start">
                  <Info className="text-sky-500 mr-2 flex-shrink-0 mt-1" size={18} />
                  <p className="text-sky-800 text-sm sm:text-base">
                    Este relatório é baseado nos dados fornecidos pelo Open Finance; portanto, é gratuito e seguro, seguindo as regras de conformidade do Banco Central.
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full md:w-2/5">
              <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 border border-sky-100">
                <div className="flex justify-between items-center mb-4 sm:mb-6">
                  <div>
                    <p className="text-xs sm:text-sm text-gray-500">Cliente</p>
                    <p className="font-semibold text-lg sm:text-xl">{clientData.name}</p>
                  </div>
                  <div className="bg-cyan-50 px-3 py-1 sm:px-4 sm:py-2 rounded-full border border-cyan-100">
                    <p className="font-medium text-cyan-700 text-xs sm:text-sm">Perfil: {clientData.riskProfile}</p>
                  </div>
                </div>
                
                <div className="flex justify-between items-center mb-4 sm:mb-6 bg-gradient-to-r from-sky-50 to-cyan-50 p-3 sm:p-4 rounded-lg border border-sky-100">
                  <div>
                    <p className="text-xs sm:text-sm text-gray-600 mb-1">Nota da sua carteira</p>
                    <div className="flex items-center">
                      <Award className="text-cyan-600 mr-2" size={isMobile ? 16 : 20} />
                      <p className="font-medium text-sm sm:text-base text-cyan-800">Avaliação Iopen</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className={`text-3xl sm:text-4xl font-bold ${clientData.portfolioScore < 5 ? 'text-orange-500' : 'text-green-500'}`}>{clientData.portfolioScore.toFixed(1)}</div>
                    <div className="text-xs sm:text-sm text-gray-600">de 10</div>
                    <div className={`text-xs sm:text-sm font-medium ${clientData.portfolioScore < 5 ? 'text-orange-500' : 'text-green-500'} mt-1`}>
                      {clientData.portfolioScore < 3 ? 'Crítica' : 
                       clientData.portfolioScore < 5 ? 'Preocupante' : 
                       clientData.portfolioScore < 7 ? 'Regular' : 
                       clientData.portfolioScore < 9 ? 'Boa' : 'Excelente'}
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-2 sm:gap-4 mb-4 sm:mb-6">
                  <div className="bg-sky-50 p-2 sm:p-4 rounded-lg border border-sky-100">
                    <p className="text-xs sm:text-sm text-gray-600 mb-1">Investimento atual</p>
                    <p className="font-bold text-base sm:text-xl text-sky-800">R$ {clientData.currentInvestment.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
                  </div>
                  <div className="bg-red-50 p-2 sm:p-4 rounded-lg border border-red-100">
                    <p className="text-xs sm:text-sm text-gray-600 mb-1">Taxas anuais pagas</p>
                    <p className="font-bold text-base sm:text-xl text-red-600">R$ {clientData.currentFees.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-2 sm:gap-4 mb-4 sm:mb-6">
                  <div className="bg-red-50 p-2 sm:p-4 rounded-lg border border-red-100">
                    <p className="text-xs sm:text-sm text-gray-600 mb-1">Impostos anuais</p>
                    <p className="font-bold text-base sm:text-xl text-red-600">R$ {clientData.taxPaid.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
                  </div>
                  <div className="bg-orange-50 p-2 sm:p-4 rounded-lg border border-orange-100">
                    <p className="text-xs sm:text-sm text-gray-600 mb-1">Eficiência tributária</p>
                    <p className="font-bold text-base sm:text-xl text-orange-600">{clientData.taxEfficiency.toFixed(1)}%</p>
                  </div>
                </div>
                
                <div className="bg-green-50 p-2 sm:p-4 rounded-lg mb-2 sm:mb-4 border border-green-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs sm:text-sm text-gray-600 mb-1">Economia potencial anual</p>
                      <p className="font-bold text-base sm:text-xl text-green-600">R$ {totalPotentialSavings.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
                    </div>
                    <TrendingUp className="text-green-500" size={isMobile ? 20 : 24} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-3 sm:px-8 lg:px-16 py-6 sm:py-10">
        {/* Seção de Oportunidade Perdida */}
        <section className="mb-8 sm:mb-16 animate-fadeIn">
          <h2 className="text-xl sm:text-2xl font-bold mb-6 text-sky-800 border-b border-sky-100 pb-2">Principais Problemas Identificados</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md border border-sky-100 transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1">
              <h3 className="text-lg sm:text-xl font-semibold mb-4 flex items-center text-sky-800">
                <ThumbsDown className="text-red-500 mr-2" size={isMobile ? 18 : 20} />
                <span>A realidade dolorosa do come-cotas</span>
              </h3>
              
              {!isMobile && (
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={comeCotas}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="ano" tick={{fontSize: 12}} stroke="#64748b" />
                      <YAxis tick={{fontSize: 12}} stroke="#64748b" />
                      <Tooltip 
                        formatter={(value) => [`R$ ${Number(value).toLocaleString('pt-BR')}`, 'Valor']}
                        contentStyle={{borderRadius: '8px', border: '1px solid #e2e8f0'}}
                      />
                      <Legend wrapperStyle={{fontSize: 12}} />
                      <Area type="monotone" dataKey="valor" name="Seu patrimônio" fill="#0ea5e9" stroke="#0284c7" fillOpacity={0.8} />
                      <Area type="monotone" dataKey="comeCotas" name="Perdido com come-cotas" fill="#ef4444" stroke="#dc2626" fillOpacity={0.8} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              )}
              
              {isMobile && (
                <div className="flex flex-col space-y-4">
                  <div className="bg-red-50 p-4 rounded-xl border border-red-100">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-medium text-red-800">Perdido com come-cotas</p>
                      <p className="text-lg font-bold text-red-700">R$ {clientData.comeCotas.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden shadow-inner">
                      <div className="bg-gradient-to-r from-red-400 to-red-600 h-3 rounded-full animate-widthIn" style={{ width: `${(clientData.comeCotas / clientData.currentInvestment) * 100}%` }}></div>
                    </div>
                    <p className="text-xs text-gray-600 mt-2">Equivale a <span className="font-bold">{((clientData.comeCotas / clientData.currentInvestment) * 100).toFixed(1)}%</span> do seu patrimônio atual</p>
                  </div>
                  
                  <div className="bg-orange-50 p-4 rounded-xl border border-orange-100">
                    <div className="flex flex-col">
                      <p className="text-sm font-medium text-orange-800 mb-1">Evolução do come-cotas</p>
                      <div className="grid grid-cols-3 gap-1 mt-2">
                        <div className="text-center">
                          <p className="text-xs text-gray-500">2020</p>
                          <p className="text-sm font-bold text-red-600">R$ 2.250</p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-gray-500">2022</p>
                          <p className="text-sm font-bold text-red-600">R$ 7.450</p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-gray-500">2024</p>
                          <p className="text-sm font-bold text-red-600">R$ {clientData.comeCotas.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="mt-4 bg-red-50 p-3 rounded-lg border border-red-100">
                <p className="text-red-700 text-sm">
                  <span className="font-bold">Impacto do come-cotas:</span> Você já perdeu R$ {clientData.comeCotas.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2})} com o come-cotas nos últimos 5 anos. Esse dinheiro saiu do seu bolso de forma silenciosa.
                </p>
              </div>
            </div>
            
            <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md border border-sky-100 transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1">
              <h3 className="text-lg sm:text-xl font-semibold mb-4 flex items-center text-sky-800">
                <DollarSign className="text-red-500 mr-2" size={isMobile ? 18 : 20} />
                <span>Taxas que estão sugando seu patrimônio</span>
              </h3>
              
              <div className="flex flex-col gap-4 sm:gap-6 mb-4">
                <div className="relative">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm sm:text-base font-medium">Taxas atuais: 2,5% a.a.</span>
                    <span className="text-sm sm:text-base font-medium text-red-600">R$ {clientData.currentFees.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2})}/ano</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden shadow-inner">
                    <div className="bg-gradient-to-r from-red-500 to-red-600 h-4 rounded-full animate-widthIn" style={{ width: '100%' }}></div>
                  </div>
                </div>
                
                <div className="relative">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm sm:text-base font-medium">Iopen: 0,6% a.a.</span>
                    <span className="text-sm sm:text-base font-medium text-green-600">R$ {iopenFee.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2})}/ano</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden shadow-inner">
                    <div className="bg-gradient-to-r from-green-500 to-green-600 h-4 rounded-full animate-widthIn" style={{ width: '24%' }}></div>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 bg-green-50 p-3 rounded-lg border border-green-100">
                <p className="text-green-700 text-sm">
                  <span className="font-bold">Economia anual em taxas:</span> Com a Iopen, você economizaria R$ {clientData.potentialSavings.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2})} por ano em taxas de administração, valor que permanece investido e rendendo para você.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Seção de Ineficiências */}
        <section className="mb-8 sm:mb-16 animate-fadeIn" style={{ animationDelay: '0.2s' }}>
          <div className="mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-bold mb-2 text-sky-800 border-b border-sky-100 pb-2">Ineficiências identificadas na sua carteira</h2>
            <p className="text-sm sm:text-base text-gray-600">
              Nosso sistema identificou diversos pontos de melhoria que estão comprometendo seus resultados:
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-8">
            <div className="bg-white p-4 rounded-xl shadow-md border-l-4 border-l-red-500 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <h3 className="font-bold mb-2 flex items-center text-sky-800">
                <ThumbsDown className="text-red-500 mr-2" size={18} />
                <span>Taxas excessivas</span>
              </h3>
              <p className="text-sm text-gray-700">
                Você paga 2,5% em taxas quando poderia pagar apenas 0,6% com a Iopen.
              </p>
              <p className="text-sm font-bold text-red-600 mt-2 flex items-center">
                <DollarSign className="text-red-500 mr-1" size={14} />
                Perda anual: R$ {clientData.potentialSavings.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
              </p>
            </div>
            
            <div className="bg-white p-4 rounded-xl shadow-md border-l-4 border-l-red-500 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <h3 className="font-bold mb-2 flex items-center text-sky-800">
                <ThumbsDown className="text-red-500 mr-2" size={18} />
                <span>Alta exposição ao come-cotas</span>
              </h3>
              <p className="text-sm text-gray-700">
                O come-cotas está reduzindo seu capital acumulado sem planejamento adequado.
              </p>
              <p className="text-sm font-bold text-red-600 mt-2 flex items-center">
                <DollarSign className="text-red-500 mr-1" size={14} />
                Perda anual: R$ {(clientData.comeCotas / 5).toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
              </p>
            </div>
            
            <div className="bg-white p-4 rounded-xl shadow-md border-l-4 border-l-red-500 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <h3 className="font-bold mb-2 flex items-center text-sky-800">
                <ThumbsDown className="text-red-500 mr-2" size={18} />
                <span>Distribuição ineficiente</span>
              </h3>
              <p className="text-sm text-gray-700">
                Sua distribuição atual ignora benefícios fiscais importantes em diversas classes de ativos.
              </p>
              <p className="text-sm font-bold text-red-600 mt-2 flex items-center">
                <DollarSign className="text-red-500 mr-1" size={14} />
                Perda anual: R$ {clientData.potentialTaxSavings.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
              </p>
            </div>
          </div>
        </section>
        
        {/* Seção: Diferença de Rentabilidade */}
        <section className="mb-8 sm:mb-16 animate-fadeIn" style={{ animationDelay: '0.4s' }}>
          <div className="mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-bold mb-2 text-sky-800 border-b border-sky-100 pb-2">ETFs vs. Fundos: A rentabilidade que você está perdendo</h2>
            <p className="text-sm sm:text-base text-gray-600">
              ETFs (Fundos de Índice) geralmente têm rentabilidade superior a fundos tradicionais similares devido às taxas mais baixas e estratégias de gestão passiva mais eficientes.
            </p>
          </div>
          
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md border border-sky-100 mb-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            <h3 className="text-lg sm:text-xl font-semibold mb-4 flex items-center text-sky-800">
              <TrendingUp className="text-cyan-600 mr-2" size={isMobile ? 18 : 20} />
              <span>Comparativo de rentabilidade acumulada</span>
            </h3>
            
            {!isMobile && (
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <ReLineChart
                    data={rentabilidadeComparativa}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="ano" tick={{fontSize: 12}} stroke="#64748b" />
                    <YAxis tick={{fontSize: 12}} stroke="#64748b" />
                    <Tooltip 
                      formatter={(value) => [`${value}%`, 'Rentabilidade']} 
                      contentStyle={{borderRadius: '8px', border: '1px solid #e2e8f0'}}
                    />
                    <Legend wrapperStyle={{fontSize: 12}} />
                    <Line type="monotone" dataKey="fundos" name="Seus fundos tradicionais" stroke="#ef4444" strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 5 }} />
                    <Line type="monotone" dataKey="etfs" name="ETFs equivalentes" stroke="#0ea5e9" strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 5 }} />
                  </ReLineChart>
                </ResponsiveContainer>
              </div>
            )}
            
            {isMobile && (
              <div className="space-y-4 mb-4">
                <div className="bg-gradient-to-r from-sky-50 to-cyan-50 p-4 rounded-xl border border-sky-100">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium text-sky-800">Rentabilidade perdida</p>
                    <p className="text-lg font-bold text-sky-700">+ 19%</p>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">Em 5 anos, ETFs renderam 19 pontos percentuais a mais que seus fundos tradicionais</p>
                </div>
                
                <div className="space-y-3 mt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">Rentabilidade acumulada - Fundos tradicionais</span>
                    <span className="text-sm font-bold text-red-600">24%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden shadow-inner">
                    <div className="bg-gradient-to-r from-red-400 to-red-600 h-3 rounded-full animate-widthIn" style={{ width: '24%' }}></div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-sm text-gray-700">Rentabilidade acumulada - ETFs</span>
                    <span className="text-sm font-bold text-cyan-600">43%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden shadow-inner">
                    <div className="bg-gradient-to-r from-cyan-400 to-cyan-600 h-3 rounded-full animate-widthIn" style={{ width: '43%' }}></div>
                  </div>
                </div>
              </div>
            )}
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
              <div className="bg-red-50 p-4 rounded-lg border border-red-100 transition-all duration-300 hover:shadow-md">
                <div className="flex items-start">
                  <div className="mr-3 mt-1">
                    <ThumbsDown className="text-red-500" size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1 text-sky-800">Seus fundos tradicionais</h4>
                    <p className="text-sm text-gray-700">Rendimento médio anual: <span className="font-bold text-red-600">4,4%</span></p>
                    <p className="text-sm text-gray-700">Rendimento acumulado (5 anos): <span className="font-bold text-red-600">24%</span></p>
                  </div>
                </div>
              </div>
              
              <div className="bg-cyan-50 p-4 rounded-lg border border-cyan-100 transition-all duration-300 hover:shadow-md">
                <div className="flex items-start">
                  <div className="mr-3 mt-1">
                    <CheckCircle className="text-green-500" size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1 text-sky-800">ETFs equivalentes</h4>
                    <p className="text-sm text-gray-700">Rendimento médio anual: <span className="font-bold text-green-600">7,4%</span></p>
                    <p className="text-sm text-gray-700">Rendimento acumulado (5 anos): <span className="font-bold text-green-600">43%</span></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-cyan-50 to-sky-100 p-4 sm:p-6 rounded-xl border border-sky-200 shadow-sm transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
              <div className="w-full sm:w-1/2">
                <h3 className="text-xl sm:text-2xl font-bold text-sky-700 mb-2">R$ {clientData.etfGain.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</h3>
                <p className="text-sm sm:text-base text-sky-800 font-medium">
                  Valor que você deixou de ganhar nos últimos 5 anos por não utilizar ETFs
                </p>
              </div>
              <div className="w-full sm:w-1/2 border-t sm:border-t-0 sm:border-l border-sky-200 pt-4 sm:pt-0 sm:pl-8">
                <h3 className="text-xl sm:text-2xl font-bold text-sky-700 mb-2">R$ {clientData.etfGainProjection.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</h3>
                <p className="text-sm sm:text-base text-sky-800 font-medium">
                  Projeção do que você deixará de ganhar nos próximos 20 anos seguindo com fundos tradicionais
                </p>
              </div>
            </div>
            
            <div className="mt-5 bg-white/50 p-3 rounded-lg border border-sky-100">
              <p className="text-sky-700 text-sm">
                <span className="font-bold">Como a Iopen ajuda:</span> Nossa plataforma prioriza ETFs com baixas taxas e estruturas tributárias mais eficientes, permitindo que você acesse uma rentabilidade muito superior à dos fundos tradicionais.
              </p>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default InsightsReport;
