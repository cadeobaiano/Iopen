import React, { useEffect } from 'react';
import { 
  ArrowRight, 
  Shield, 
  Target, 
  TrendingUp, 
  Users, 
  Lightbulb, 
  BarChart3, 
  CheckCircle, 
  Eye, 
  FileText,
  Scale,
  Award,
  Star,
  Clock,
  Zap,
  Compass,
  Heart
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import { useDeviceDetect } from '../utils/useDeviceDetect';

const AboutPage: React.FC = () => {
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
      
      {/* Hero Section - Otimizado para Mobile */}
      <section className="bg-gradient-to-r from-cyan-600 to-blue-700 pt-24 pb-12 sm:pt-28 sm:pb-16 px-4 sm:px-8 lg:px-16 text-white relative overflow-hidden">
        {/* Background Elements - Simplificados e Sutis */}
        <div className="absolute inset-0 overflow-hidden opacity-5">
          <div className="absolute -right-10 -bottom-20 w-60 h-60 rounded-full bg-white"></div>
          <div className="absolute -left-20 top-10 w-80 h-80 rounded-full bg-white"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 max-w-4xl mx-auto">
              Transformando a experiência financeira
            </h1>
            <p className="text-lg sm:text-xl opacity-90 mb-6 sm:mb-8 max-w-3xl mx-auto">
              Conheça a Iopen, uma empresa comprometida com a transparência e a democratização dos investimentos.
            </p>
            <div className="flex flex-wrap gap-3 sm:gap-4 justify-center">
              <div className="bg-white/20 backdrop-blur-sm px-3 py-1.5 sm:px-4 sm:py-2 rounded-full">
                <span className="text-white text-sm sm:text-base font-medium">Transparência</span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm px-3 py-1.5 sm:px-4 sm:py-2 rounded-full">
                <span className="text-white text-sm sm:text-base font-medium">Inovação</span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm px-3 py-1.5 sm:px-4 sm:py-2 rounded-full">
                <span className="text-white text-sm sm:text-base font-medium">Empoderamento</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission and Vision Section - Otimizado para Mobile */}
      <section className="py-12 sm:py-16 px-4 md:px-8 lg:px-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">
            <div className="bg-gradient-to-br from-cyan-50 to-blue-50 p-6 sm:p-8 rounded-xl border border-cyan-100 shadow-lg">
              <div className="flex items-center mb-4 sm:mb-6">
                <div className="bg-cyan-100 p-2 sm:p-3 rounded-full mr-3 sm:mr-4">
                  <Compass className="text-cyan-600" size={isMobile ? 22 : 28} />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Nossa Missão</h2>
              </div>
              <p className="text-gray-700 mb-5 text-base sm:text-lg leading-relaxed">
                Empoderar clientes financeiramente vulneráveis, revelando de forma transparente os mecanismos de exploração praticados pelas instituições financeiras e, a partir desse diagnóstico, oferecer uma assessoria de excelência.
              </p>
              <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
                Nosso propósito é transformar a experiência do investidor, proporcionando um planejamento financeiro robusto e personalizado que promova equilíbrio, segurança e o crescimento sustentável do patrimônio.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-orange-50 to-yellow-50 p-6 sm:p-8 rounded-xl border border-orange-100 shadow-lg">
              <div className="flex items-center mb-4 sm:mb-6">
                <div className="bg-orange-100 p-2 sm:p-3 rounded-full mr-3 sm:mr-4">
                  <Eye className="text-orange-600" size={isMobile ? 22 : 28} />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Nossa Visão</h2>
              </div>
              <p className="text-gray-700 mb-5 text-base sm:text-lg leading-relaxed">
                Ser a referência nacional em consultoria financeira automatizada, redefinindo o mercado ao eliminar as complexidades e os obstáculos que a tradicional educação financeira impõe.
              </p>
              <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
                Ao automatizar nosso processo de consultoria, oferecemos soluções inteligentes e personalizadas que resolvem os desafios informacionais e de exploração, garantindo transparência, segurança e eficiência na gestão dos investimentos dos nossos clientes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition Section - Otimizado para Mobile */}
      <section className="py-12 sm:py-16 px-4 md:px-8 lg:px-16 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
              Nossa Proposta de Valor
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-2">
              Entenda como a Iopen se diferencia no mercado e cria valor para seus clientes
            </p>
          </div>
          
          <div className="bg-white p-6 sm:p-8 md:p-12 rounded-xl shadow-lg border border-gray-100">
            <div className="flex flex-col md:flex-row items-center">
              <div className="w-full md:w-1/3 mb-8 md:mb-0 flex justify-center">
                <div className="bg-gradient-to-r from-cyan-500 to-blue-600 p-4 sm:p-6 rounded-full">
                  <Heart className="text-white" size={isMobile ? 60 : 80} />
                </div>
              </div>
              <div className="w-full md:w-2/3 md:pl-12">
                <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed mb-6 sm:mb-8">
                  Nossa oferta une a clareza na exposição dos custos e ineficiências impostas pelas instituições financeiras a uma consultoria de ponta, que entrega valor por meio de uma alocação inteligente e personalizada dos recursos.
                </p>
                <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed mb-6 sm:mb-8">
                  Com um custo justo e uma abordagem técnica, garantimos que cada cliente tenha acesso a um serviço que une segurança e resultados tangíveis, respeitando seu perfil de investimentos e potencializando sua autonomia financeira.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div className="flex items-start">
                    <div className="bg-cyan-100 p-2 rounded-full mr-3 mt-1 flex-shrink-0">
                      <CheckCircle className="text-cyan-600" size={isMobile ? 16 : 20} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 text-sm sm:text-base">Transparência total</h4>
                      <p className="text-gray-600 text-xs sm:text-sm">Exposição clara de custos e ineficiências</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-cyan-100 p-2 rounded-full mr-3 mt-1 flex-shrink-0">
                      <CheckCircle className="text-cyan-600" size={isMobile ? 16 : 20} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 text-sm sm:text-base">Consultoria personalizada</h4>
                      <p className="text-gray-600 text-xs sm:text-sm">Soluções adaptadas ao seu perfil</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-cyan-100 p-2 rounded-full mr-3 mt-1 flex-shrink-0">
                      <CheckCircle className="text-cyan-600" size={isMobile ? 16 : 20} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 text-sm sm:text-base">Custo justo</h4>
                      <p className="text-gray-600 text-xs sm:text-sm">Taxas transparentes e competitivas</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-cyan-100 p-2 rounded-full mr-3 mt-1 flex-shrink-0">
                      <CheckCircle className="text-cyan-600" size={isMobile ? 16 : 20} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 text-sm sm:text-base">Autonomia financeira</h4>
                      <p className="text-gray-600 text-xs sm:text-sm">Empoderamento através do conhecimento</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Strategic Objectives Section - Otimizado para Mobile */}
      <section className="py-12 sm:py-16 px-4 md:px-8 lg:px-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
              Objetivos Estratégicos
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-2">
              Conheça as metas que orientam nossas ações e impulsionam nossa missão
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            <div className="bg-white p-6 sm:p-8 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300">
              <div className="bg-cyan-100 p-3 sm:p-4 rounded-full w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center mb-4 sm:mb-6">
                <Lightbulb className="text-cyan-600" size={isMobile ? 24 : 32} />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Software de Triagem Transparente</h3>
              <p className="text-sm sm:text-base text-gray-700 mb-4 sm:mb-6">
                Desenvolver e implementar um software de triagem que exponha ao cliente as práticas exploratórias dos bancos tradicionais, revelando taxas ocultas e ineficiências em seus investimentos atuais.
              </p>
              <div className="bg-gray-50 p-3 sm:p-4 rounded-lg border-l-4 border-cyan-500">
                <p className="text-sm sm:text-base text-gray-700 italic">
                  "Nossa tecnologia revela o que as instituições financeiras tradicionais preferem esconder: quanto você realmente paga e quanto deixa de ganhar."
                </p>
              </div>
            </div>
            
            <div className="bg-white p-6 sm:p-8 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300">
              <div className="bg-cyan-100 p-3 sm:p-4 rounded-full w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center mb-4 sm:mb-6">
                <Users className="text-cyan-600" size={isMobile ? 24 : 32} />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Conversão de Clientes</h3>
              <p className="text-sm sm:text-base text-gray-700 mb-4 sm:mb-6">
                Converter clientes dos bancos e corretoras para nossa plataforma de investimentos automatizados, oferecendo uma alternativa mais justa e eficiente que respeita seus objetivos financeiros e maximiza seus resultados.
              </p>
              <div className="bg-gray-50 p-3 sm:p-4 rounded-lg border-l-4 border-cyan-500">
                <p className="text-sm sm:text-base text-gray-700 italic">
                  "Oferecemos uma alternativa real ao modelo tradicional, onde o cliente é o verdadeiro beneficiário de seus investimentos, não as instituições."
                </p>
              </div>
            </div>
            
            <div className="bg-white p-6 sm:p-8 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300">
              <div className="bg-cyan-100 p-3 sm:p-4 rounded-full w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center mb-4 sm:mb-6">
                <Target className="text-cyan-600" size={isMobile ? 24 : 32} />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Mapeamento de Perfil Avançado</h3>
              <p className="text-sm sm:text-base text-gray-700 mb-4 sm:mb-6">
                Implementar um sistema avançado de mapeamento de perfil do cliente, permitindo uma alocação de investimentos totalmente aderente às suas necessidades, objetivos financeiros e tolerância a riscos.
              </p>
              <div className="bg-gray-50 p-3 sm:p-4 rounded-lg border-l-4 border-cyan-500">
                <p className="text-sm sm:text-base text-gray-700 italic">
                  "Cada investidor é único, e nossa tecnologia garante que suas estratégias de investimento reflitam suas necessidades individuais."
                </p>
              </div>
            </div>
            
            <div className="bg-white p-6 sm:p-8 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300">
              <div className="bg-cyan-100 p-3 sm:p-4 rounded-full w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center mb-4 sm:mb-6">
                <BarChart3 className="text-cyan-600" size={isMobile ? 24 : 32} />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Estratégias Comprovadas</h3>
              <p className="text-sm sm:text-base text-gray-700 mb-4 sm:mb-6">
                Replicar modelos de alocação já validados pelo mercado, garantindo que os clientes tenham acesso a estratégias consolidadas e eficientes para a gestão de seus investimentos com resultados consistentes.
              </p>
              <div className="bg-gray-50 p-3 sm:p-4 rounded-lg border-l-4 border-cyan-500">
                <p className="text-sm sm:text-base text-gray-700 italic">
                  "Não reinventamos a roda, mas a tornamos acessível a todos. Utilizamos estratégias comprovadas que antes eram privilégio de poucos."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section - Otimizado para Mobile */}
      <section className="py-12 sm:py-16 px-4 md:px-8 lg:px-16 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
              Nossos Valores
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-2">
              Princípios que guiam nossas ações e definem quem somos
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="bg-white p-6 sm:p-8 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300 flex flex-col items-center text-center">
              <div className="bg-cyan-100 p-3 sm:p-4 rounded-full w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center mb-4 sm:mb-6">
                <Eye className="text-cyan-600" size={isMobile ? 24 : 32} />
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Transparência</h3>
              <p className="text-sm sm:text-base text-gray-600">
                Acreditamos que a clareza e a honestidade são fundamentais em todas as nossas interações. Revelamos o que outros escondem e garantimos que nossos clientes compreendam completamente seus investimentos.
              </p>
            </div>
            
            <div className="bg-white p-6 sm:p-8 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300 flex flex-col items-center text-center">
              <div className="bg-cyan-100 p-3 sm:p-4 rounded-full w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center mb-4 sm:mb-6">
                <Scale className="text-cyan-600" size={isMobile ? 24 : 32} />
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Integridade</h3>
              <p className="text-sm sm:text-base text-gray-600">
                Mantemos os mais altos padrões éticos em tudo o que fazemos. Colocamos os interesses de nossos clientes em primeiro lugar e tomamos decisões que honram a confiança depositada em nós.
              </p>
            </div>
            
            <div className="bg-white p-6 sm:p-8 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300 flex flex-col items-center text-center">
              <div className="bg-cyan-100 p-3 sm:p-4 rounded-full w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center mb-4 sm:mb-6">
                <Zap className="text-cyan-600" size={isMobile ? 24 : 32} />
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Inovação</h3>
              <p className="text-sm sm:text-base text-gray-600">
                Buscamos constantemente novas maneiras de melhorar a experiência financeira de nossos clientes. Utilizamos tecnologia avançada para simplificar o complexo e tornar o sofisticado acessível.
              </p>
            </div>
            
            <div className="bg-white p-6 sm:p-8 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300 flex flex-col items-center text-center">
              <div className="bg-cyan-100 p-3 sm:p-4 rounded-full w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center mb-4 sm:mb-6">
                <Users className="text-cyan-600" size={isMobile ? 24 : 32} />
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Empoderamento</h3>
              <p className="text-sm sm:text-base text-gray-600">
                Capacitamos nossos clientes com conhecimento e ferramentas para que possam tomar decisões financeiras informadas. Acreditamos que a educação financeira é um direito de todos.
              </p>
            </div>
            
            <div className="bg-white p-6 sm:p-8 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300 flex flex-col items-center text-center">
              <div className="bg-cyan-100 p-3 sm:p-4 rounded-full w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center mb-4 sm:mb-6">
                <Shield className="text-cyan-600" size={isMobile ? 24 : 32} />
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Segurança</h3>
              <p className="text-sm sm:text-base text-gray-600">
                Protegemos os ativos e informações de nossos clientes com os mais altos padrões de segurança. Implementamos medidas robustas para garantir a proteção de dados e investimentos.
              </p>
            </div>
            
            <div className="bg-white p-6 sm:p-8 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300 flex flex-col items-center text-center">
              <div className="bg-cyan-100 p-3 sm:p-4 rounded-full w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center mb-4 sm:mb-6">
                <TrendingUp className="text-cyan-600" size={isMobile ? 24 : 32} />
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Excelência</h3>
              <p className="text-sm sm:text-base text-gray-600">
                Comprometemo-nos com os mais altos padrões de qualidade em tudo o que fazemos. Buscamos constantemente aprimorar nossos serviços e superar as expectativas de nossos clientes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Journey Section - Otimizado para Mobile */}
      <section className="py-12 sm:py-16 px-4 md:px-8 lg:px-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
              Nossa Jornada
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-2">
              A história da Iopen e os marcos que definiram nosso caminho
            </p>
          </div>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 sm:left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-cyan-200"></div>
            
            {/* Timeline items - Otimizados para mobile */}
            <div className="relative z-10">
              {/* Item 1 */}
              <div className="flex flex-col md:flex-row items-start md:items-center mb-12 sm:mb-16 pl-10 sm:pl-0">
                <div className="md:w-1/2 md:pr-12 mb-6 md:mb-0 md:text-right">
                  <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md border border-gray-100 inline-block">
                    <h3 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2">2023</h3>
                    <h4 className="text-base sm:text-lg font-semibold text-cyan-600 mb-2 sm:mb-4">O Nascimento da Ideia</h4>
                    <p className="text-sm sm:text-base text-gray-600">
                      Fundação da Iopen com a missão de transformar a experiência financeira dos brasileiros através da transparência e tecnologia.
                    </p>
                  </div>
                </div>
                <div className="bg-cyan-500 rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center border-4 border-white shadow-md z-10 md:mx-0 absolute left-0 md:left-1/2 md:-translate-x-1/2 top-4 md:top-1/2 md:-translate-y-1/2">
                  <Clock className="text-white" size={isMobile ? 16 : 20} />
                </div>
                <div className="md:w-1/2 md:pl-12 md:text-left"></div>
              </div>
              
              {/* Item 2 */}
              <div className="flex flex-col md:flex-row items-start md:items-center mb-12 sm:mb-16 pl-10 sm:pl-0">
                <div className="md:w-1/2 md:pr-12 mb-6 md:mb-0 md:text-right"></div>
                <div className="bg-cyan-500 rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center border-4 border-white shadow-md z-10 md:mx-0 absolute left-0 md:left-1/2 md:-translate-x-1/2 top-4 md:top-1/2 md:-translate-y-1/2">
                  <Clock className="text-white" size={isMobile ? 16 : 20} />
                </div>
                <div className="md:w-1/2 md:pl-12 md:text-left w-full">
                  <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md border border-gray-100 inline-block">
                    <h3 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2">2024</h3>
                    <h4 className="text-base sm:text-lg font-semibold text-cyan-600 mb-2 sm:mb-4">Desenvolvimento da Plataforma</h4>
                    <p className="text-sm sm:text-base text-gray-600">
                      Lançamento da primeira versão da plataforma Iopen, com foco em análise de portfólio e identificação de ineficiências.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Item 3 */}
              <div className="flex flex-col md:flex-row items-start md:items-center mb-12 sm:mb-16 pl-10 sm:pl-0">
                <div className="md:w-1/2 md:pr-12 mb-6 md:mb-0 md:text-right">
                  <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md border border-gray-100 inline-block">
                    <h3 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2">2025</h3>
                    <h4 className="text-base sm:text-lg font-semibold text-cyan-600 mb-2 sm:mb-4">Expansão e Crescimento</h4>
                    <p className="text-sm sm:text-base text-gray-600">
                      Ampliação da base de clientes e desenvolvimento de novas funcionalidades, incluindo investimentos automatizados e planejamento financeiro personalizado.
                    </p>
                  </div>
                </div>
                <div className="bg-cyan-500 rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center border-4 border-white shadow-md z-10 md:mx-0 absolute left-0 md:left-1/2 md:-translate-x-1/2 top-4 md:top-1/2 md:-translate-y-1/2">
                  <Clock className="text-white" size={isMobile ? 16 : 20} />
                </div>
                <div className="md:w-1/2 md:pl-12 md:text-left"></div>
              </div>
              
              {/* Item 4 */}
              <div className="flex flex-col md:flex-row items-start md:items-center pl-10 sm:pl-0">
                <div className="md:w-1/2 md:pr-12 mb-6 md:mb-0 md:text-right"></div>
                <div className="bg-orange-500 rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center border-4 border-white shadow-md z-10 md:mx-0 absolute left-0 md:left-1/2 md:-translate-x-1/2 top-4 md:top-1/2 md:-translate-y-1/2">
                  <Star className="text-white" size={isMobile ? 16 : 20} />
                </div>
                <div className="md:w-1/2 md:pl-12 md:text-left w-full">
                  <div className="bg-gradient-to-r from-orange-500 to-yellow-500 p-4 sm:p-6 rounded-xl shadow-md text-white inline-block">
                    <h3 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2">O Futuro</h3>
                    <h4 className="text-base sm:text-lg font-semibold mb-2 sm:mb-4">Nossa Visão para o Amanhã</h4>
                    <p className="text-sm sm:text-base opacity-90">
                      Tornar-se a principal referência em consultoria financeira automatizada no Brasil, democratizando o acesso a investimentos eficientes e transformando a relação das pessoas com suas finanças.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recognition Section - Otimizado para Mobile */}
      <section className="py-12 sm:py-16 px-4 md:px-8 lg:px-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
              Reconhecimento
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-2">
              Prêmios e distinções que refletem nosso compromisso com a excelência
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="bg-white p-6 sm:p-8 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300 flex flex-col items-center text-center">
              <div className="bg-gradient-to-r from-cyan-500 to-blue-600 p-3 sm:p-4 rounded-full mb-4 sm:mb-6">
                <Award className="text-white" size={isMobile ? 32 : 40} />
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2">Melhor Fintech 2025</h3>
              <p className="text-sm sm:text-base text-gray-600">
                Reconhecida como a fintech mais inovadora do ano, destacando-se pela transparência e eficiência em investimentos.
              </p>
            </div>
            
            <div className="bg-white p-6 sm:p-8 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300 flex flex-col items-center text-center">
              <div className="bg-gradient-to-r from-orange-500 to-yellow-500 p-3 sm:p-4 rounded-full mb-4 sm:mb-6">
                <Award className="text-white" size={isMobile ? 32 : 40} />
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2">Inovação Financeira</h3>
              <p className="text-sm sm:text-base text-gray-600">
                Premiada por revolucionar a experiência do investidor através de tecnologia avançada e análise de dados.
              </p>
            </div>
            
            <div className="bg-white p-6 sm:p-8 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300 flex flex-col items-center text-center">
              <div className="bg-gradient-to-r from-green-500 to-teal-500 p-3 sm:p-4 rounded-full mb-4 sm:mb-6">
                <Award className="text-white" size={isMobile ? 32 : 40} />
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2">Excelência em UX</h3>
              <p className="text-sm sm:text-base text-gray-600">
                Reconhecida pela interface intuitiva e experiência do usuário excepcional, tornando investimentos acessíveis a todos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Otimizado para Mobile */}
      <section className="py-12 sm:py-16 md:py-20 px-4 md:px-8 lg:px-16 bg-gradient-to-r from-cyan-600 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
            Junte-se à revolução financeira
          </h2>
          <p className="text-base sm:text-lg md:text-xl max-w-3xl mx-auto mb-8 sm:mb-10 px-2 opacity-90">
            Faça parte da comunidade Iopen e transforme sua experiência com investimentos
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
            <Link 
              to="/investir" 
              className="bg-white text-cyan-600 hover:bg-orange-500 hover:text-white font-semibold py-2.5 sm:py-3 px-6 sm:px-8 rounded-lg transition duration-300 shadow-lg text-sm sm:text-base"
            >
              Comece a investir
            </Link>
            <Link 
              to="/chat" 
              className="bg-transparent border-2 border-white text-white hover:bg-white/10 font-semibold py-2.5 sm:py-3 px-6 sm:px-8 rounded-lg transition duration-300 mt-3 sm:mt-0 text-sm sm:text-base"
            >
              Fale conosco
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;