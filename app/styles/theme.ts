// Base theme colors
export const themeColors = {
  sage: {
    900: '#2C3930', // Dark sage
    800: '#3F4F44', // Medium sage
    700: '#4A5D4E',
    600: '#5B705F',
    500: '#6B8270',
    400: '#839A88',
    300: '#9BB2A1',
    200: '#B3C5B8',
    100: '#CBE0CF',
    50: '#E8F1EA',
  },
  earth: {
    900: '#7C5B42', // Dark earth
    800: '#A27B5C', // Medium earth
    700: '#B38E6F',
    600: '#C4A182',
    500: '#D5B495',
    400: '#E6C7A8',
    300: '#F0D6BC',
    200: '#F7E5D1',
    100: '#FCF2E6',
    50: '#FEF9F4',
  },
  moss: {
    900: '#4B5D4F',
    800: '#687F6D',
    700: '#7E997F',
    600: '#94B095',
    500: '#A9C5AA',
    400: '#BFDABF',
    300: '#D4ECD4',
    200: '#E5F5E5',
    100: '#F2FAF2',
    50: '#F9FCF9',
  },
  clay: {
    900: '#8B4513',
    800: '#A65D2F',
    700: '#C17449',
    600: '#D88B62',
    500: '#EEA27B',
    400: '#FFB994',
    300: '#FFCDB2',
    200: '#FFE0CF',
    100: '#FFF0E8',
    50: '#FFF7F2',
  },
  bark: {
    900: '#3E2723',
    800: '#4E342E',
    700: '#5D4037',
    600: '#6D4C41',
    500: '#795548',
    400: '#8D6E63',
    300: '#A1887F',
    200: '#BCAAA4',
    100: '#D7CCC8',
    50: '#EFEBE9',
  },
  cream: {
    900: '#B1AC9E',
    800: '#C4BEB0',
    700: '#DCD7C9', // Base cream
    600: '#E3DFD3',
    500: '#EAE7DD',
    400: '#F1EFE7',
    300: '#F8F7F1',
    200: '#FBFAF6',
    100: '#FDFCFA',
    50: '#FEFEFE',
  }
};

export const colors = {
  ...themeColors,
  primary: themeColors.sage[800],
  primaryLight: themeColors.sage[100],
  secondary: themeColors.earth[800],
  secondaryLight: themeColors.earth[100],
  background: themeColors.cream[700],
  backgroundLight: themeColors.cream[300],
  text: themeColors.sage[900],
  textMuted: themeColors.sage[600],
  border: themeColors.cream[800],
  white: '#FFFFFF',
  black: '#000000',
  success: '#3B8132',
  successLight: '#E7F3E5',
  warning: '#CD6E1D',
  warningLight: '#FDF3E4',
  info: '#2E7DAB',
  infoLight: '#E5F2F9',
};

// Update shadows to be more subtle and match the theme
export const shadows = {
  sm: {
    shadowColor: colors.sage[900],
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  md: {
    shadowColor: colors.sage[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3,
  },
  lg: {
    shadowColor: colors.sage[900],
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const borderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  xxl: 24,
  full: 9999,
};

// Add gradient themes
export const gradients = {
  primary: {
    colors: ['#2563eb', '#1d4ed8'] as const,
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  },
  header: {
    colors: ['#ffffff', '#f8fafc'] as const,
    start: { x: 0, y: 0 },
    end: { x: 0, y: 1 },
  },
  card: {
    colors: ['#ffffff', '#f8fafc'] as const,
    start: { x: 0, y: 0 },
    end: { x: 0, y: 1 },
  },
}; 