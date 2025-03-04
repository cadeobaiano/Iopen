/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        'xs': '480px',
      },
      spacing: {
        '18': '4.5rem',  // 72px - para áreas de toque maiores
      },
      minWidth: {
        'touch': '44px', // Tamanho mínimo recomendado para alvos de toque
      },
      minHeight: {
        'touch': '44px', // Tamanho mínimo recomendado para alvos de toque
      },
      fontSize: {
        'xs-mobile': '0.8125rem', // 13px - melhor legibilidade em telas pequenas
        'sm-mobile': '0.9375rem', // 15px - melhor legibilidade em telas pequenas
      },
    },
  },
  plugins: [
    function({ addUtilities }) {
      const newUtilities = {
        // Remove o highlight azul em elementos clicáveis em dispositivos móveis
        '.touch-highlight-none': {
          '-webkit-tap-highlight-color': 'transparent',
        },
        // Esconde a scrollbar mantendo funcionalidade
        '.scrollbar-hide': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        },
        // Área de toque maior que o elemento visual
        '.touch-target': {
          'position': 'relative',
          '&::after': {
            'content': '""',
            'position': 'absolute',
            'top': '-8px',
            'right': '-8px',
            'bottom': '-8px',
            'left': '-8px',
            'z-index': '-1',
          },
        },
        // Melhor contraste para elementos em fundo claro
        '.mobile-text-contrast': {
          'text-shadow': '0 0 1px rgba(0, 0, 0, 0.05)',
        },
        // Alvo de toque mínimo
        '.min-touch-target': {
          'min-width': '44px',
          'min-height': '44px',
        },
      };
      
      addUtilities(newUtilities, ['responsive', 'hover']);
    },
  ],
};
