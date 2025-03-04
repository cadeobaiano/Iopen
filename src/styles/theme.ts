export const theme = {
  colors: {
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
    },
    neutral: {
      50: '#f8fafc',
      100: '#f1f5f9',
      200: '#e2e8f0',
      300: '#cbd5e1',
      400: '#94a3b8',
      500: '#64748b',
      600: '#475569',
      700: '#334155',
      800: '#1e293b',
      900: '#0f172a'
    }
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    xxl: '3rem'
  },
  borderRadius: {
    sm: '0.25rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
    full: '9999px'
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
  },
  animation: {
    fadeIn: 'fadeIn 0.8s ease-out forwards',
    widthIn: 'widthIn 1.5s ease-out forwards',
    hover: 'transform duration-300 hover:-translate-y-1 hover:shadow-lg'
  },
  typography: {
    fontFamily: {
      sans: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      mono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace'
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem'
    },
    fontWeight: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800
    },
    lineHeight: {
      none: 1,
      tight: 1.25,
      snug: 1.375,
      normal: 1.5,
      relaxed: 1.625,
      loose: 2
    }
  }
};

// Função auxiliar para acessar facilmente as cores do tema
export const getColor = (path: string): string => {
  const keys = path.split('.');
  let result: any = theme;
  
  for (const key of keys) {
    if (result && result[key] !== undefined) {
      result = result[key];
    } else {
      console.warn(`Caminho de cor não encontrado: ${path}`);
      return '';
    }
  }
  
  return result;
};

// Função para gerar classes CSS com base no tema
export const generateThemeClasses = () => {
  return {
    // Exemplos de classes de cores de texto
    textPrimary: { color: theme.colors.primary.medium },
    textSecondary: { color: theme.colors.secondary.medium },
    textDanger: { color: theme.colors.danger.medium },
    textSuccess: { color: theme.colors.success.medium },
    
    // Exemplos de classes de cores de fundo
    bgPrimary: { backgroundColor: theme.colors.primary.light },
    bgSecondary: { backgroundColor: theme.colors.secondary.light },
    bgDanger: { backgroundColor: theme.colors.danger.light },
    bgSuccess: { backgroundColor: theme.colors.success.light },
    
    // Exemplos de classes de borda
    borderPrimary: { borderColor: theme.colors.primary.medium },
    borderSecondary: { borderColor: theme.colors.secondary.medium },
    borderDanger: { borderColor: theme.colors.danger.medium },
    borderSuccess: { borderColor: theme.colors.success.medium },
    
    // Exemplos de classes de sombra
    shadowSm: { boxShadow: theme.shadows.sm },
    shadowMd: { boxShadow: theme.shadows.md },
    shadowLg: { boxShadow: theme.shadows.lg }
  };
};

export default theme; 