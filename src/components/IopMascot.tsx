import React from 'react';

interface IopMascotProps {
  size?: number;
  className?: string;
  variant?: 'default' | 'minimal' | 'animated';
}

const IopMascot: React.FC<IopMascotProps> = ({ size = 40, className = '', variant = 'default' }) => {
  const sizeStyle = {
    width: `${size}px`,
    height: `${size}px`,
  };

  // Animated variant (pulses and glows)
  if (variant === 'animated') {
    return (
      <div 
        className={`relative ${className}`} 
        style={sizeStyle}
      >
        {/* Glow effect */}
        <div className="absolute inset-0 rounded-full bg-cyan-500 opacity-30 animate-pulse" style={sizeStyle}></div>
        
        {/* Main icon */}
        <div 
          className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-cyan-500 to-blue-600 text-white rounded-full shadow-lg"
          style={sizeStyle}
        >
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-3/5 h-3/5">
            <path 
              d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 5C13.66 5 15 6.34 15 8C15 9.66 13.66 11 12 11C10.34 11 9 9.66 9 8C9 6.34 10.34 5 12 5ZM12 19.2C9.5 19.2 7.29 17.92 6 15.98C6.03 13.99 10 12.9 12 12.9C13.99 12.9 17.97 13.99 18 15.98C16.71 17.92 14.5 19.2 12 19.2Z" 
              fill="currentColor"
            />
          </svg>
        </div>
        
        {/* Highlight */}
        <div 
          className="absolute top-1 left-1 w-1/4 h-1/4 bg-white opacity-70 rounded-full"
          style={{ boxShadow: '0 0 8px rgba(255,255,255,0.5)' }}
        ></div>
      </div>
    );
  }
  
  // Minimal variant (flat design, no effects)
  if (variant === 'minimal') {
    return (
      <div 
        className={`flex items-center justify-center bg-blue-500 rounded-full ${className}`}
        style={sizeStyle}
      >
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-3/5 h-3/5 text-white">
          <path 
            d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 5C13.66 5 15 6.34 15 8C15 9.66 13.66 11 12 11C10.34 11 9 9.66 9 8C9 6.34 10.34 5 12 5ZM12 19.2C9.5 19.2 7.29 17.92 6 15.98C6.03 13.99 10 12.9 12 12.9C13.99 12.9 17.97 13.99 18 15.98C16.71 17.92 14.5 19.2 12 19.2Z" 
            fill="currentColor"
          />
        </svg>
      </div>
    );
  }
  
  // Default variant (with gradient and soft shadow)
  return (
    <div 
      className={`relative flex items-center justify-center ${className}`}
      style={sizeStyle}
    >
      {/* Main circular background with gradient */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-blue-400 to-cyan-600 rounded-full shadow-md"
        style={sizeStyle}
      ></div>
      
      {/* Robot face */}
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="relative w-3/4 h-3/4 text-white z-10">
        <path 
          d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM7.07 18.28C7.5 17.38 10.12 16.5 12 16.5C13.88 16.5 16.51 17.38 16.93 18.28C15.57 19.36 13.86 20 12 20C10.14 20 8.43 19.36 7.07 18.28ZM18.36 16.83C16.93 15.09 13.46 14.5 12 14.5C10.54 14.5 7.07 15.09 5.64 16.83C4.62 15.49 4 13.82 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 13.82 19.38 15.49 18.36 16.83ZM8.5 9.5C8.5 10.6 7.6 11.5 6.5 11.5C5.4 11.5 4.5 10.6 4.5 9.5C4.5 8.4 5.4 7.5 6.5 7.5C7.6 7.5 8.5 8.4 8.5 9.5ZM17.5 9.5C17.5 10.6 16.6 11.5 15.5 11.5C14.4 11.5 13.5 10.6 13.5 9.5C13.5 8.4 14.4 7.5 15.5 7.5C16.6 7.5 17.5 8.4 17.5 9.5ZM12 7.5C12.83 7.5 13.5 8.17 13.5 9C13.5 9.83 12.83 10.5 12 10.5C11.17 10.5 10.5 9.83 10.5 9C10.5 8.17 11.17 7.5 12 7.5Z" 
          fill="currentColor"
        />
      </svg>
      
      {/* Highlight */}
      <div 
        className="absolute top-1 right-1 w-1/5 h-1/5 bg-white opacity-50 rounded-full"
      ></div>
    </div>
  );
};

export default IopMascot;