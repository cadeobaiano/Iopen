import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import TrackableLink from './TrackableLink';

// Cores padronizadas para uso consistente com a HomePage
const COLORS = {
  primary: 'from-cyan-600 to-blue-700',
  secondary: 'from-orange-500 to-orange-600',
  accent: 'bg-orange-500',
  light: 'bg-cyan-50',
  success: 'bg-green-50 text-green-600',
  error: 'bg-red-50 text-red-600',
  neutral: 'bg-gray-50',
};

// Format currency in Brazilian Real
const formatCurrency = (value: number): string => {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
};

// Calculate investment results based on the refined calculation logic
const calculateInvestmentResults = (totalInvestment: number, years: number): { 
  traditionalValue: number, 
  iopenValue: number,
  differenceValue: number, 
  differencePercentage: number 
} => {
  // Fixed parameters
  const affectedProportion = 0.8540;      // Proportion of portfolio affected by performance difference
  const iopenReturnRate = 0.1022;         // Annual effective rate for Iopen (10.22%)
  const traditionalReturnRate = 0.0618;   // Annual effective rate for traditional funds (6.18%)
  
  // Calculate accumulation factors
  const iopenFactor = Math.pow(1 + iopenReturnRate, years);
  const traditionalFactor = Math.pow(1 + traditionalReturnRate, years);
  
  // Calculate final values
  const iopenValue = totalInvestment * (affectedProportion * iopenFactor + (1 - affectedProportion));
  const traditionalValue = totalInvestment * (affectedProportion * traditionalFactor + (1 - affectedProportion));
  
  // Calculate difference
  const differenceValue = iopenValue - traditionalValue;
  const differencePercentage = (differenceValue / totalInvestment) * 100;
  
  return { 
    traditionalValue, 
    iopenValue, 
    differenceValue, 
    differencePercentage 
  };
};

const FinancialCalculator: React.FC = () => {
  const [investmentAmount, setInvestmentAmount] = useState<number>(10000);
  const [sliderValue, setSliderValue] = useState<number>(10000);
  const [results, setResults] = useState<{
    [key: number]: { 
      traditionalValue: number, 
      iopenValue: number, 
      differenceValue: number, 
      differencePercentage: number 
    }
  }>({
    1: { traditionalValue: 0, iopenValue: 0, differenceValue: 0, differencePercentage: 0 },
    5: { traditionalValue: 0, iopenValue: 0, differenceValue: 0, differencePercentage: 0 },
    10: { traditionalValue: 0, iopenValue: 0, differenceValue: 0, differencePercentage: 0 }
  });
  
  const sliderRef = useRef<HTMLInputElement>(null);
  const minSliderValue = 10000;  // Começando com 10.000 (base 0)
  const maxSliderValue = 1000000;
  const stepSize = 10000; // Step size of 10,000

  // Calculate results for all periods whenever investment amount changes
  useEffect(() => {
    const periods = [1, 5, 10];
    const newResults: {
      [key: number]: { 
        traditionalValue: number, 
        iopenValue: number, 
        differenceValue: number, 
        differencePercentage: number 
      }
    } = {};
    
    periods.forEach(period => {
      const result = calculateInvestmentResults(investmentAmount, period);
      newResults[period] = result;
    });
    
    setResults(newResults);
  }, [investmentAmount]);

  // Update slider background gradient
  useEffect(() => {
    if (sliderRef.current) {
      const percentage = ((sliderValue - minSliderValue) / (maxSliderValue - minSliderValue)) * 100;
      sliderRef.current.style.background = `linear-gradient(to right, #0891b2 0%, #0891b2 ${percentage}%, #E5E7EB ${percentage}%, #E5E7EB 100%)`;
    }
  }, [sliderValue]);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setSliderValue(value);
    setInvestmentAmount(value);
  };

  // Generate tick marks for the slider
  const generateTickMarks = () => {
    const tickMarks = [];
    const numTicks = 10; // Number of visible tick marks (excluding min and max)
    const tickInterval = (maxSliderValue - minSliderValue) / (numTicks + 1);
    
    for (let i = 1; i <= numTicks; i++) {
      const tickValue = minSliderValue + (tickInterval * i);
      const percentage = ((tickValue - minSliderValue) / (maxSliderValue - minSliderValue)) * 100;
      
      tickMarks.push(
        <div 
          key={i} 
          className="absolute h-3 w-1 bg-gray-300" 
          style={{ 
            left: `${percentage}%`, 
            top: '50%', 
            transform: 'translateY(-50%)',
          }}
        />
      );
    }
    
    return tickMarks;
  };

  // Format the slider value labels
  const formatSliderLabel = (value: number): string => {
    if (value >= 1000000) {
      return `R$ ${(value / 1000000).toLocaleString('pt-BR')} milhões`;
    } else if (value >= 1000) {
      return `R$ ${(value / 1000).toLocaleString('pt-BR')} mil`;
    }
    return `R$ ${value.toLocaleString('pt-BR')}`;
  };

  const [focusedYear, setFocusedYear] = useState<number | null>(null);
  
  // Definir o ano padrão para exibição em dispositivos móveis
  useEffect(() => {
    // Inicializar com 1 ano selecionado para dispositivos móveis
    setFocusedYear(1);
  }, []);

  return (
    <section className="bg-white py-8 sm:py-16 px-3 sm:px-8 lg:px-16 w-full overflow-x-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="mb-4 sm:mb-10 text-center">
          <h2 className={`text-lg sm:text-3xl font-bold mb-2 sm:mb-4 bg-gradient-to-r ${COLORS.primary} bg-clip-text text-transparent`}>
            Simulador de Investimentos
          </h2>
          <p className="text-xs sm:text-base text-gray-600 max-w-3xl mx-auto">
            Veja o quanto a Iopen pode fazer a diferença na sua vida financeira
          </p>
        </div>

        <div className="bg-white p-4 sm:p-8 rounded-xl shadow-xl max-w-5xl mx-auto border border-gray-200">
          {/* Título explicativo */}
          <div className={`bg-gradient-to-r ${COLORS.primary} text-white p-3 sm:p-4 -mt-4 -mx-4 sm:-mx-8 mb-4 sm:mb-6 rounded-t-xl`}>
            <p className="text-center font-medium text-xs sm:text-base">
              Descubra quanto dinheiro você está <span className="font-bold underline">perdendo</span> com investimentos tradicionais
            </p>
          </div>
          
          {/* Slider Section */}
          <div className="mb-4 sm:mb-10">
            <div className="text-center mb-3 sm:mb-5">
              <span className={`text-xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r ${COLORS.primary} bg-clip-text text-transparent`}>
                {formatCurrency(investmentAmount)}
              </span>
            </div>
            
            <div className="relative mb-3 sm:mb-6 px-2">
              <input
                ref={sliderRef}
                type="range"
                min={minSliderValue}
                max={maxSliderValue}
                step={stepSize}
                value={sliderValue}
                onChange={handleSliderChange}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer touch-highlight-none"
                style={{
                  height: '8px',
                  borderRadius: '4px',
                  outline: 'none',
                  WebkitAppearance: 'none',
                  appearance: 'none',
                }}
                data-track-id="investment-slider"
              />
              {/* Tick marks container */}
              <div className="absolute w-full h-8 top-0 pointer-events-none">
                {generateTickMarks()}
              </div>
              <style>{`
                input[type=range]::-webkit-slider-thumb {
                  -webkit-appearance: none;
                  appearance: none;
                  width: 20px;
                  height: 20px;
                  border-radius: 50%;
                  background: linear-gradient(135deg, #0891b2, #1e40af);
                  cursor: pointer;
                  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
                  border: 2px solid white;
                  touch-action: manipulation;
                }
                
                input[type=range]::-moz-range-thumb {
                  width: 20px;
                  height: 20px;
                  border-radius: 50%;
                  background: linear-gradient(135deg, #0891b2, #1e40af);
                  cursor: pointer;
                  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
                  border: 2px solid white;
                  touch-action: manipulation;
                }
              `}</style>
            </div>
            
            <div className="flex justify-between text-xs sm:text-sm text-gray-500 mb-3 sm:mb-6 px-2">
              <span>{formatSliderLabel(minSliderValue)}</span>
              <span>{formatSliderLabel(maxSliderValue)}</span>
            </div>
            
            <div className="text-center mb-4 sm:mb-6">
              <p className="text-gray-600 text-xs sm:text-sm">Selecione o valor aproximado do seu patrimônio investido</p>
            </div>
            
            {/* Resultados - Versão Mobile: Tabs */}
            <div className="sm:hidden">
              <div className="flex border-b border-gray-200 mb-3">
                <button 
                  className={`flex-1 py-2 text-xs font-medium ${focusedYear === 1 ? 'text-cyan-600 border-b-2 border-cyan-600' : 'text-gray-500'}`}
                  onClick={() => setFocusedYear(1)}
                >
                  1 ano
                </button>
                <button 
                  className={`flex-1 py-2 text-xs font-medium ${focusedYear === 5 ? 'text-cyan-600 border-b-2 border-cyan-600' : 'text-gray-500'}`}
                  onClick={() => setFocusedYear(5)}
                >
                  5 anos
                </button>
                <button 
                  className={`flex-1 py-2 text-xs font-medium ${focusedYear === 10 ? 'text-cyan-600 border-b-2 border-cyan-600' : 'text-gray-500'}`}
                  onClick={() => setFocusedYear(10)}
                >
                  10 anos
                </button>
              </div>
              
              {/* Conteúdo do Tab Selecionado */}
              <div className="rounded-xl p-4 border border-gray-200 shadow-sm">
                {focusedYear === 1 && (
                  <>
                    <div className="text-center mb-3">
                      <p className="text-gray-500 font-medium text-xs mb-1">Em 1 ano</p>
                      <div className={`bg-gradient-to-r ${COLORS.primary} bg-clip-text text-transparent font-bold text-xl mb-1`}>
                        {formatCurrency(results[1].iopenValue)}
                      </div>
                      <div className="flex items-center justify-center gap-2 text-sm mt-1">
                        <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full text-xs">
                          Iopen
                        </span>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-500 text-xs">Investimentos tradicionais</span>
                        <span className="text-gray-700 font-medium text-xs">{formatCurrency(results[1].traditionalValue)}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-500 text-xs">Sua vantagem</span>
                        <span className="text-green-600 font-medium text-xs">+{formatCurrency(results[1].differenceValue)}</span>
                      </div>
                    </div>
                  </>
                )}
                
                {focusedYear === 5 && (
                  <>
                    <div className="text-center mb-3">
                      <p className="text-gray-500 font-medium text-xs mb-1">Em 5 anos</p>
                      <div className={`bg-gradient-to-r ${COLORS.primary} bg-clip-text text-transparent font-bold text-xl mb-1`}>
                        {formatCurrency(results[5].iopenValue)}
                      </div>
                      <div className="flex items-center justify-center gap-2 text-sm mt-1">
                        <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full text-xs">
                          Iopen
                        </span>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-500 text-xs">Investimentos tradicionais</span>
                        <span className="text-gray-700 font-medium text-xs">{formatCurrency(results[5].traditionalValue)}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-500 text-xs">Sua vantagem</span>
                        <span className="text-green-600 font-medium text-xs">+{formatCurrency(results[5].differenceValue)}</span>
                      </div>
                    </div>
                  </>
                )}
                
                {focusedYear === 10 && (
                  <>
                    <div className="text-center mb-3">
                      <p className="text-gray-500 font-medium text-xs mb-1">Em 10 anos</p>
                      <div className={`bg-gradient-to-r ${COLORS.primary} bg-clip-text text-transparent font-bold text-xl mb-1`}>
                        {formatCurrency(results[10].iopenValue)}
                      </div>
                      <div className="flex items-center justify-center gap-2 text-sm mt-1">
                        <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full text-xs">
                          Iopen
                        </span>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-500 text-xs">Investimentos tradicionais</span>
                        <span className="text-gray-700 font-medium text-xs">{formatCurrency(results[10].traditionalValue)}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-500 text-xs">Sua vantagem</span>
                        <span className="text-green-600 font-medium text-xs">+{formatCurrency(results[10].differenceValue)}</span>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
            
            {/* Resultados - Versão Desktop: Grid */}
            <div className="hidden sm:grid sm:grid-cols-3 sm:gap-4">
              {/* 1 Ano */}
              <div 
                className={`rounded-xl p-6 border ${
                  focusedYear === 1 
                    ? 'transform scale-105 transition-transform duration-300 shadow-lg border-2 border-cyan-500' 
                    : 'border-gray-200 shadow-sm hover:shadow-md transition-all duration-300'
                }`}
                onMouseEnter={() => setFocusedYear(1)}
                onMouseLeave={() => setFocusedYear(null)}
                data-track-id="investment-result-1year"
              >
                <div className="text-center mb-4">
                  <p className="text-gray-500 font-medium text-sm mb-2">Em 1 ano</p>
                  <div className={`bg-gradient-to-r ${COLORS.primary} bg-clip-text text-transparent font-bold text-xl sm:text-2xl mb-1`}>
                    {formatCurrency(results[1].iopenValue)}
                  </div>
                  <div className="flex items-center justify-center gap-2 text-sm mt-2">
                    <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full text-xs">
                      Iopen
                    </span>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-500 text-xs">Investimentos tradicionais</span>
                    <span className="text-gray-700 font-medium text-sm">{formatCurrency(results[1].traditionalValue)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 text-xs">Sua vantagem</span>
                    <span className="text-green-600 font-medium text-sm">+{formatCurrency(results[1].differenceValue)}</span>
                  </div>
                </div>
              </div>
              
              {/* 5 Anos */}
              <div 
                className={`rounded-xl p-6 border ${
                  focusedYear === 5 
                    ? 'transform scale-105 transition-transform duration-300 shadow-lg border-2 border-cyan-500' 
                    : 'border-gray-200 shadow-sm hover:shadow-md transition-all duration-300'
                }`}
                onMouseEnter={() => setFocusedYear(5)}
                onMouseLeave={() => setFocusedYear(null)}
                data-track-id="investment-result-5year"
              >
                <div className="text-center mb-4">
                  <p className="text-gray-500 font-medium text-sm mb-2">Em 5 anos</p>
                  <div className={`bg-gradient-to-r ${COLORS.primary} bg-clip-text text-transparent font-bold text-xl sm:text-2xl mb-1`}>
                    {formatCurrency(results[5].iopenValue)}
                  </div>
                  <div className="flex items-center justify-center gap-2 text-sm mt-2">
                    <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full text-xs">
                      Iopen
                    </span>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-500 text-xs">Investimentos tradicionais</span>
                    <span className="text-gray-700 font-medium text-sm">{formatCurrency(results[5].traditionalValue)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 text-xs">Sua vantagem</span>
                    <span className="text-green-600 font-medium text-sm">+{formatCurrency(results[5].differenceValue)}</span>
                  </div>
                </div>
              </div>
              
              {/* 10 Anos */}
              <div 
                className={`rounded-xl p-6 border ${
                  focusedYear === 10
                    ? 'transform scale-105 transition-transform duration-300 shadow-lg border-2 border-cyan-500' 
                    : 'border-gray-200 shadow-sm hover:shadow-md transition-all duration-300'
                }`}
                onMouseEnter={() => setFocusedYear(10)}
                onMouseLeave={() => setFocusedYear(null)}
                data-track-id="investment-result-10year"
              >
                <div className="text-center mb-4">
                  <p className="text-gray-500 font-medium text-sm mb-2">Em 10 anos</p>
                  <div className={`bg-gradient-to-r ${COLORS.primary} bg-clip-text text-transparent font-bold text-xl sm:text-2xl mb-1`}>
                    {formatCurrency(results[10].iopenValue)}
                  </div>
                  <div className="flex items-center justify-center gap-2 text-sm mt-2">
                    <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full text-xs">
                      Iopen
                    </span>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-500 text-xs">Investimentos tradicionais</span>
                    <span className="text-gray-700 font-medium text-sm">{formatCurrency(results[10].traditionalValue)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 text-xs">Sua vantagem</span>
                    <span className="text-green-600 font-medium text-sm">+{formatCurrency(results[10].differenceValue)}</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* CTA Block */}
            <div className="mt-4 sm:mt-8 text-center">
              <TrackableLink 
                to="/login" 
                trackId="calculator-cta"
                className={`inline-flex items-center justify-center px-4 sm:px-6 py-2 sm:py-3 text-sm font-medium rounded-lg bg-gradient-to-r ${COLORS.primary} text-white hover:shadow-md transition-all duration-300`}
              >
                Otimizar seus investimentos
                <ArrowRight className="ml-2" size={16} />
              </TrackableLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinancialCalculator;