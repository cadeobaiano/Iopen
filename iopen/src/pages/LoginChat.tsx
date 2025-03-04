import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ChatInterface from '../components/ChatInterface';
import RegistrationForm from '../components/RegistrationForm';
import { useChatMessages } from '../hooks/useChatMessages';
import { useRegistration } from '../hooks/useRegistration';
import '../styles/custom.css';

const LoginChat: React.FC = () => {
  // Utilize os hooks personalizados
  const { 
    messages, 
    inputMessage, 
    isTyping, 
    selectedPlan,
    registrationEnabled,
    setInputMessage, 
    sendMessage 
  } = useChatMessages();
  
  const {
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    fullName,
    setFullName,
    phone,
    setPhone,
    cep,
    setCep,
    isLoading,
    error,
    handleRegister
  } = useRegistration(selectedPlan);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24 pb-8 px-4 md:px-8 bg-gradient-to-b from-gray-50 to-white subtle-pattern">
        <div className="max-w-6xl mx-auto overflow-hidden">
          <div className="flex flex-col md:flex-row rounded-xl shadow-lg elevation-3 chat-container">
            {/* Chat Section */}
            <div className="w-full md:w-3/5 bg-white">
              <ChatInterface
                messages={messages}
                inputMessage={inputMessage}
                setInputMessage={setInputMessage}
                sendMessage={sendMessage}
                isTyping={isTyping}
              />
            </div>
            
            {/* Registration Form */}
            <div className="w-full md:w-2/5 bg-gray-50">
              <RegistrationForm
                registrationEnabled={registrationEnabled}
                selectedPlan={selectedPlan}
                error={error}
                isLoading={isLoading}
                fullName={fullName}
                setFullName={setFullName}
                email={email}
                setEmail={setEmail}
                phone={phone}
                setPhone={setPhone}
                password={password}
                setPassword={setPassword}
                confirmPassword={confirmPassword}
                setConfirmPassword={setConfirmPassword}
                handleRegister={handleRegister}
                cep={cep}
                setCep={setCep}
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LoginChat;
