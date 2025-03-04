import React, { useState } from 'react';
import { 
  BarChart, 
  PieChart, 
  LineChart, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  CheckCircle, 
  Info, 
  ArrowRight,
  Shield,
  DollarSign,
  ThumbsDown,
  Percent,
  Clock,
  Award,
  HelpCircle
} from 'lucide-react';
import { 
  BarChart as ReBarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  LineChart as ReLineChart,
  Line,
  PieChart as RePieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  ReferenceLine
} from 'recharts';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import { useDeviceDetect } from '../utils/useDeviceDetect';

const InsightsReport: React.FC = () => {
  // Estado para controlar o gráfico interativo
  const [selectedYear, setSelectedYear] = useState(10);
  const { isMobile } = useDeviceDetect();
  
  // Dados simulados para o cliente
  const clientData = {
    name: 'Maria Silva',
    currentInvestment: 152437.89,
    currentFees: 3810.95, // 2.5% de taxa
    potentialSavings: 2573.42, // Economia potencial com taxas menores
    unrealizedGains: 45729.63, // Ganhos não realizados em 10 anos
    riskProfile: 'Moderado',
    portfolioScore: 4.2, // Nota da carteira (de 0 a 10)
    taxPaid: 2286.57, // Impostos pagos anualmente (1.5% do investimento)
    taxEfficiency: 35.7, // Eficiência tributária (%)
    potentialTaxSavings: 1143.28 // Economia potencial em impostos
  };

  // Dados para comparação de taxas
  const feeComparisonData = [
    { name: 'Taxa de Administração', tradicional: 2.5, iopen: 0.8 },
    { name: 'Taxa de Performance', tradicional: 20, iopen: 10 },
    { name: 'Taxa de Custódia', tradicional: 0.3, iopen: 0.1 },
    { name: 'Taxa de Corretagem', tradicional: 0.5, iopen: 0.0 },
  ];

  // Dados para projeção de patrimônio
  const wealthProjectionData = [
    { year: 'Atual', tradicional: 150000, iopen: 150000 },
    { year: 'Ano 5', tradicional: 180000, iopen: 195000 },
    { year: 'Ano 10', tradicional: 216000, iopen: 253500 },
    { year: 'Ano 15', tradicional: 259200, iopen: 329550 },
    { year: 'Ano 20', tradicional: 311040, iopen: 428415 },
  ];

  // Dados para o gráfico de pizza de alocação
  const allocationData = [
    { name: 'Renda Fixa', value: 40 },
    { name: 'Ações', value: 30 },
    { name: 'Fundos Imobiliários', value: 15 },
    { name: 'Internacional', value: 10 },
    { name: 'Outros', value: 5 },
  ];

  // Dados para o gráfico de impacto acumulado de taxas e impostos
  const cumulativeImpactData = [
    { year: 0, investment: 150000, withFeesTaxes: 150000, withoutFeesTaxes: 150000 },
    { year: 5, investment: 195000, withFeesTaxes: 180000, withoutFeesTaxes: 210000 },
    { year: 10, investment: 253500, withFeesTaxes: 216000, withoutFeesTaxes: 283500 },
    { year: 15, investment: 329550, withFeesTaxes: 259200, withoutFeesTaxes: 382000 },
    { year: 20, investment: 428415, withFeesTaxes: 311040, withoutFeesTaxes: 510000 },
    { year: 25, investment: 556939, withFeesTaxes: 373248, withoutFeesTaxes: 680000 },
    { year: 30, investment: 724021, withFeesTaxes: 447897, withoutFeesTaxes: 900000 },
  ];

  // Dados para o gráfico interativo de simulação
  const getSimulationData = (years: number) => {
    const data = [];
    let investmentTraditional = clientData.currentInvestment;
    let investmentIopen = clientData.currentInvestment;
    
    for (let i = 0; i <= years; i++) {
      // Tradicional: rendimento de 8% - 2.5% taxas - 1.5% impostos = 4% líquido
      // Iopen: rendimento de 8% - 0.8% taxas - 0.75% impostos = 6.45% líquido
      investmentTraditional = i === 0 ? investmentTraditional : investmentTraditional * 1.04;
      investmentIopen = i === 0 ? investmentIopen : investmentIopen * 1.0645;
      
      data.push({
        year: i,
        tradicional: Math.round(investmentTraditional),
        iopen: Math.round(investmentIopen),
        difference: Math.round(investmentIopen - investmentTraditional)
      });
    }
    
    return data;
  };

  // Calcular o impacto total de taxas e impostos
  const totalImpact = clientData.currentFees + clientData.taxPaid;
  const totalPotentialSavings = clientData.potentialSavings + clientData.potentialTaxSavings;
  
  // Calcular o valor perdido em 30 anos
  const lostIn30Years = cumulativeImpactData[cumulativeImpactData.length - 1].withoutFeesTaxes - 
                        cumulativeImpactData[cumulativeImpactData.length - 1].withFeesTaxes;

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];
  
  // Função para renderizar a nota da carteira
  const renderPortfolioScore = (score: number) => {
    // Determinar a cor e mensagem com base na nota
    let color = '';
    let message = '';
    
    if (score < 3) {
      color = 'text-red-600';
      message = 'Crítica';
    } else if (score < 5) {
      color = 'text-orange-500';
      message = 'Preocupante';
    } else if (score < 7) {
      color = 'text-yellow-500';
      message = 'Regular';
    } else if (score < 9) {
      color = 'text-green-500';
      message = 'Boa';
    } else {
      color = 'text-green-600';
      message = 'Excelente';
    }
    
    return (
      <div className="flex flex-col items-center">
        <div className={`text-4xl font-bold ${color}`}>{score.toFixed(1)}</div>
        <div className="text-sm text-gray-600">de 10</div>
        <div className={`text-sm font-medium ${color} mt-1`}>{message}</div>
      </div>
    );
  };

  // Dados para o gráfico de simulação interativo
  const simulationData = getSimulationData(selectedYear);

  return (
    <div className="font-sans text-gray-800 overflow-x-hidden w-full">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-10 px-4 sm:px-8 lg:px-16 bg-gradient-to-b from-cyan-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="w-full md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-700 to-blue-800 bg-clip-text text-transparent">
                Como será seu relatório de insights
              </h1>
              <p className="text-lg text-gray-700 mb-6">
                Descubra como você está sendo impactado por taxas excessivas e quais oportunidades estão sendo perdidas.
              </p>
              <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded-r-md mb-6">
                <div className="flex items-start">
                  <Info className="text-orange-500 mr-3 flex-shrink-0 mt-1" size={20} />
                  <p className="text-orange-800">
                    Este relatório é baseado nos dados fornecidos pelo Open Finance. As informações são atualizadas mensalmente.
                  </p>
                </div>
              </div>
              
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-md">
                <div className="flex items-start">
                  <AlertTriangle className="text-red-500 mr-3 flex-shrink-0 mt-1" size={20} />
                  <div>
                    <p className="text-red-800 font-medium">Alerta de Urgência</p>
                    <p className="text-red-700">
                      Você está perdendo R$ {totalImpact.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2})} por ano em taxas e impostos. Isso representa {((totalImpact/clientData.currentInvestment)*100).toFixed(2)}% do seu patrimônio atual.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full md:w-2/5">
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <p className="text-sm text-gray-500">Cliente</p>
                    <p className="font-semibold text-xl">{clientData.name}</p>
                  </div>
                  <div className="bg-cyan-50 px-4 py-2 rounded-full">
                    <p className="font-medium text-cyan-700">Perfil: {clientData.riskProfile}</p>
                  </div>
                </div>
                
                <div className="flex justify-between items-center mb-6 bg-gray-50 p-4 rounded-lg">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Nota da sua carteira</p>
                    <div className="flex items-center">
                      <Award className="text-orange-500 mr-2" size={20} />
                      <p className="font-medium">Avaliação Iopen</p>
                    </div>
                  </div>
                  {renderPortfolioScore(clientData.portfolioScore)}
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500 mb-1">Investimento atual</p>
                    <p className="font-bold text-xl">R$ {clientData.currentInvestment.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
                  </div>
                  <div className="bg-red-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500 mb-1">Taxas anuais pagas</p>
                    <p className="font-bold text-xl text-red-600">R$ {clientData.currentFees.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-red-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500 mb-1">Impostos anuais</p>
                    <p className="font-bold text-xl text-red-600">R$ {clientData.taxPaid.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
                  </div>
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500 mb-1">Eficiência tributária</p>
                    <p className="font-bold text-xl text-orange-600">{clientData.taxEfficiency.toFixed(1)}%</p>
                  </div>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg mb-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Economia potencial anual</p>
                      <p className="font-bold text-xl text-green-600">R$ {totalPotentialSavings.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
                    </div>
                    <TrendingUp className="text-green-500" size={24} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 py-10">
        {/* Seção de Impacto das Taxas e Impostos */}
        <section className="mb-16">
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-2">O impacto devastador de taxas e impostos</h2>
            <p className="text-gray-600">
              Seu dinheiro está sendo silenciosamente corroído por taxas excessivas e impostos mal planejados. Veja quanto você está perdendo:
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <ThumbsDown className="text-red-500 mr-2" size={20} />
                Taxas que estão drenando seu patrimônio
              </h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <ReBarChart
                    data={feeComparisonData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis unit="%" />
                    <Tooltip formatter={(value) => [`${value}%`, 'Taxa']} />
                    <Legend />
                    <Bar dataKey="tradicional" name="Bancos Tradicionais" fill="#ef4444" />
                    <Bar dataKey="iopen" name="Iopen" fill="#0ea5e9" />
                  </ReBarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 bg-red-50 p-4 rounded-lg">
                <p className="text-red-700">
                  <span className="font-bold">Alerta:</span> Você está pagando até <span className="font-bold">3x mais</span> em taxas do que o necessário!
                </p>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <DollarSign className="text-red-500 mr-2" size={20} />
                Impacto de impostos na sua rentabilidade
              </h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={cumulativeImpactData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" label={{ value: 'Anos', position: 'insideBottom', offset: -5 }} />
                    <YAxis />
                    <Tooltip formatter={(value) => [`R$ ${value.toLocaleString()}`, 'Valor']} />
                    <Legend />
                    <Area type="monotone" dataKey="withoutFeesTaxes" name="Sem taxas e impostos" fill="#10b981" stroke="#059669" fillOpacity={0.8} />
                    <Area type="monotone" dataKey="investment" name="Com otimização Iopen" fill="#0ea5e9" stroke="#0284c7" fillOpacity={0.8} />
                    <Area type="monotone" dataKey="withFeesTaxes" name="Situação atual" fill="#ef4444" stroke="#dc2626" fillOpacity={0.8} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 bg-red-50 p-4 rounded-lg">
                <p className="text-red-700">
                  <span className="font-bold">Impacto em 30 anos:</span> Você perderá aproximadamente <span className="font-bold">R$ {lostIn30Years.toLocaleString()}</span> se continuar com a estratégia atual!
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 mb-8">
            <h3 className="text-xl font-semibold mb-6">Simulador de patrimônio futuro</h3>
            <div className="mb-6">
              <label htmlFor="yearSlider" className="block text-sm font-medium text-gray-700 mb-2">
                Selecione o horizonte de tempo: <span className="font-bold">{selectedYear} anos</span>
              </label>
              <input
                type="range"
                id="yearSlider"
                min="1"
                max="30"
                value={selectedYear}
                onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
            
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <ReLineChart
                  data={simulationData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" label={{ value: 'Anos', position: 'insideBottom', offset: -5 }} />
                  <YAxis />
                  <Tooltip formatter={(value) => [`R$ ${value.toLocaleString()}`, 'Valor']} />
                  <Legend />
                  <Line type="monotone" dataKey="tradicional" name="Bancos Tradicionais" stroke="#ef4444" strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 5 }} />
                  <Line type="monotone" dataKey="iopen" name="Iopen" stroke="#0ea5e9" strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 5 }} />
                  <ReferenceLine y={clientData.currentInvestment} stroke="#6b7280" strokeDasharray="3 3" label={{ value: 'Investimento Inicial', position: 'insideLeft' }} />
                </ReLineChart>
              </ResponsiveContainer>
            </div>
            
            <div className="mt-6 bg-cyan-50 p-4 rounded-lg">
              <p className="text-cyan-800">
                <span className="font-bold">Diferença em {selectedYear} anos:</span> R$ {simulationData[selectedYear].difference.toLocaleString()} a mais com a Iopen
                <span className="block mt-2 text-sm">
                  Isso representa um ganho adicional de {((simulationData[selectedYear].difference / simulationData[selectedYear].tradicional) * 100).toFixed(1)}% em relação aos bancos tradicionais.
                </span>
              </p>
            </div>
          </div>
          
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md mb-8">
            <div className="flex items-start">
              <Clock className="text-red-500 mr-3 flex-shrink-0 mt-1" size={20} />
              <div>
                <p className="text-red-800 font-medium">O tempo está passando!</p>
                <p className="text-red-700">
                  A cada mês que você permanece com investimentos em bancos tradicionais, você perde aproximadamente <span className="font-bold">R$ {Math.round(totalImpact/12).toLocaleString()}</span> em taxas e impostos excessivos.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Seção de Alocação e Eficiência */}
        <section className="mb-16">
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-2">Análise da sua carteira atual</h2>
            <p className="text-gray-600">
              Sua carteira atual tem uma nota <span className="font-bold text-orange-500">{clientData.portfolioScore.toFixed(1)}/10</span>, o que indica problemas significativos na alocação e eficiência.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <PieChart className="text-cyan-600 mr-2" size={20} />
                Alocação atual dos seus investimentos
              </h3>
              <div className="h-80 flex justify-center items-center">
                <ResponsiveContainer width="100%" height="100%">
                  <RePieChart>
                    <Pie
                      data={allocationData}
                      cx="50%"
                      cy="50%"
                      labelLine={true}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {allocationData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value}%`, 'Alocação']} />
                  </RePieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 bg-orange-50 p-4 rounded-lg">
                <p className="text-orange-700">
                  <span className="font-bold">Problemas identificados:</span> Concentração excessiva em renda fixa e baixa diversificação internacional.
                </p>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <Percent className="text-cyan-600 mr-2" size={20} />
                Eficiência tributária
              </h3>
              <div className="flex flex-col items-center justify-center h-80">
                <div className="relative w-48 h-48">
                  <div className="w-full h-full rounded-full bg-gray-200"></div>
                  <div 
                    className="absolute top-0 left-0 w-full h-full rounded-full bg-orange-500"
                    style={{ 
                      clipPath: `polygon(0 0, 100% 0, 100% ${clientData.taxEfficiency}%, 0 ${clientData.taxEfficiency}%)` 
                    }}
                  ></div>
                  <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-orange-600">{clientData.taxEfficiency.toFixed(1)}%</div>
                      <div className="text-sm text-gray-600">Eficiência</div>
                    </div>
                  </div>
                </div>
                <div className="mt-6 text-center">
                  <p className="text-lg font-medium">Você poderia economizar até</p>
                  <p className="text-2xl font-bold text-green-600">R$ {clientData.potentialTaxSavings.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
                  <p className="text-sm text-gray-600">por ano em impostos</p>
                </div>
              </div>
              <div className="mt-4 bg-orange-50 p-4 rounded-lg">
                <p className="text-orange-700">
                  <span className="font-bold">Oportunidade:</span> Com uma estratégia tributária adequada, você poderia aumentar sua eficiência para mais de 70%.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Seção de Recomendações */}
        <section className="mb-16">
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-2">Recomendações para melhorar sua situação financeira</h2>
            <p className="text-gray-600">
              Com base na análise da sua carteira e do mercado, recomendamos as seguintes ações:
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <Award className="text-cyan-600 mr-2" size={20} />
                Rebalanceamento da carteira
              </h3>
              <p className="text-gray-700 mb-6">
                Ajuste a alocação dos seus investimentos para melhorar a diversificação e reduzir o risco.
              </p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-lg font-medium">Potencial de ganho:</p>
                  <p className="text-2xl font-bold text-green-600">R$ {clientData.unrealizedGains.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
                </div>
                <TrendingUp className="text-green-500" size={24} />
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <DollarSign className="text-cyan-600 mr-2" size={20} />
                Otimização de taxas e impostos
              </h3>
              <p className="text-gray-700 mb-6">
                Implemente estratégias para reduzir as taxas e impostos, aumentando a eficiência tributária.
              </p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-lg font-medium">Economia potencial:</p>
                  <p className="text-2xl font-bold text-green-600">R$ {clientData.potentialTaxSavings.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
                </div>
                <TrendingUp className="text-green-500" size={24} />
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Perguntas Frequentes</h2>
          
          <div className="space-y-4">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-start">
                <HelpCircle className="text-cyan-600 mr-3 flex-shrink-0 mt-1" size={20} />
                <div>
                  <h3 className="font-bold text-lg mb-2">Como vocês calculam o impacto das taxas?</h3>
                  <p className="text-gray-700">
                    Utilizamos os dados fornecidos pelo Open Finance para analisar todas as taxas que você paga atualmente, incluindo taxas de administração, performance, custódia e corretagem. Comparamos com as taxas médias do mercado e calculamos o impacto no longo prazo usando modelos de projeção financeira.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-start">
                <HelpCircle className="text-cyan-600 mr-3 flex-shrink-0 mt-1" size={20} />
                <div>
                  <h3 className="font-bold text-lg mb-2">Como posso melhorar a eficiência tributária?</h3>
                  <p className="text-gray-700">
                    A eficiência tributária pode ser melhorada através de estratégias como: utilização adequada de isenções fiscais, escolha de produtos com tratamento tributário favorável, planejamento de resgates e reinvestimentos, e diversificação em diferentes classes de ativos com regimes tributários complementares.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-start">
                <HelpCircle className="text-cyan-600 mr-3 flex-shrink-0 mt-1" size={20} />
                <div>
                  <h3 className="font-bold text-lg mb-2">Por que minha carteira recebeu uma nota baixa?</h3>
                  <p className="text-gray-700">
                    A nota da carteira é calculada com base em diversos fatores, incluindo: diversificação adequada, eficiência tributária, nível de taxas pagas, alinhamento com o perfil de risco, e potencial de retorno ajustado ao risco. Uma nota baixa indica que há oportunidades significativas de melhoria em um ou mais desses aspectos.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default InsightsReport;
