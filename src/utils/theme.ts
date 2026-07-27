export interface ThemeColor {
  id: string;
  name: string;
  primary: string;
  hover: string;
  dark: string;
  darker: string;
  light: string;
  border: string;
  ring: string;
}

function adjustColorBrightness(hex: string, percent: number): string {
  let num = parseInt(hex.replace('#', ''), 16);
  if (isNaN(num)) return hex;
  let amt = Math.round(2.55 * percent);
  let R = (num >> 16) + amt;
  let G = (num >> 8 & 0x00FF) + amt;
  let B = (num & 0x0000FF) + amt;
  return '#' + (
    0x1000000 +
    (R < 255 ? (R < 0 ? 0 : R) : 255) * 0x10000 +
    (G < 255 ? (G < 0 ? 0 : G) : 255) * 0x100 +
    (B < 255 ? (B < 0 ? 0 : B) : 255)
  ).toString(16).slice(1);
}

export const THEME_CONFIGS: Record<string, ThemeColor> = {
  '#2E6640': {
    id: 'emerald-green',
    name: 'Emerald Green',
    primary: '#2E6640',
    hover: '#214A2E',
    dark: '#20482D',
    darker: '#183823',
    light: '#EAF2EC',
    border: 'rgba(46, 102, 64, 0.2)',
    ring: 'rgba(46, 102, 64, 0.3)'
  },
  '#2C633E': {
    id: 'emerald-green',
    name: 'Emerald Green',
    primary: '#2C633E',
    hover: '#214A2E',
    dark: '#20482D',
    darker: '#183823',
    light: '#EAF2EC',
    border: 'rgba(44, 99, 62, 0.2)',
    ring: 'rgba(44, 99, 62, 0.3)'
  },
  '#2563EB': {
    id: 'sapphire-blue',
    name: 'Sapphire Blue',
    primary: '#2563EB',
    hover: '#1D4ED8',
    dark: '#1E40AF',
    darker: '#1E3A8A',
    light: '#EFF6FF',
    border: 'rgba(37, 99, 235, 0.2)',
    ring: 'rgba(37, 99, 235, 0.3)'
  },
  '#0F766E': {
    id: 'royal-teal',
    name: 'Royal Teal',
    primary: '#0F766E',
    hover: '#0D9488',
    dark: '#115E59',
    darker: '#134E4A',
    light: '#F0FDFA',
    border: 'rgba(15, 118, 110, 0.2)',
    ring: 'rgba(15, 118, 110, 0.3)'
  },
  '#4F46E5': {
    id: 'royal-indigo',
    name: 'Royal Indigo',
    primary: '#4F46E5',
    hover: '#4338CA',
    dark: '#3730A3',
    darker: '#312E81',
    light: '#EEF2FF',
    border: 'rgba(79, 70, 229, 0.2)',
    ring: 'rgba(79, 70, 229, 0.3)'
  },
  '#EA580C': {
    id: 'sunset-orange',
    name: 'Sunset Orange',
    primary: '#EA580C',
    hover: '#C2410C',
    dark: '#9A3412',
    darker: '#7C2D12',
    light: '#FFF7ED',
    border: 'rgba(234, 88, 12, 0.2)',
    ring: 'rgba(234, 88, 12, 0.3)'
  },
  '#C2410C': {
    id: 'crimson-red',
    name: 'Crimson Red',
    primary: '#C2410C',
    hover: '#9A3412',
    dark: '#7C2D12',
    darker: '#451A03',
    light: '#FFF1F2',
    border: 'rgba(194, 65, 12, 0.2)',
    ring: 'rgba(194, 65, 12, 0.3)'
  },
  '#166534': {
    id: 'forest-green',
    name: 'Forest Green',
    primary: '#166534',
    hover: '#15803D',
    dark: '#14532D',
    darker: '#052E16',
    light: '#F0FDF4',
    border: 'rgba(22, 101, 52, 0.2)',
    ring: 'rgba(22, 101, 52, 0.3)'
  },
  '#0284C7': {
    id: 'ocean-blue',
    name: 'Ocean Blue',
    primary: '#0284C7',
    hover: '#0369A1',
    dark: '#075985',
    darker: '#0C4A6E',
    light: '#F0F9FF',
    border: 'rgba(2, 132, 199, 0.2)',
    ring: 'rgba(2, 132, 199, 0.3)'
  },
  '#15803D': {
    id: 'jade-green',
    name: 'Jade Green',
    primary: '#15803D',
    hover: '#166534',
    dark: '#14532D',
    darker: '#052E16',
    light: '#F0FDF4',
    border: 'rgba(21, 128, 61, 0.2)',
    ring: 'rgba(21, 128, 61, 0.3)'
  },
  '#1E3A8A': {
    id: 'midnight-blue',
    name: 'Midnight Blue',
    primary: '#1E3A8A',
    hover: '#1E40AF',
    dark: '#172554',
    darker: '#0F172A',
    light: '#EFF6FF',
    border: 'rgba(30, 58, 138, 0.2)',
    ring: 'rgba(30, 58, 138, 0.3)'
  }
};

export function applyTheme(colorHex: string) {
  if (typeof document === 'undefined') return;

  const root = document.documentElement;
  const hexUpper = colorHex.toUpperCase();

  // Find exact theme or match by upper case
  let theme = THEME_CONFIGS[hexUpper] || THEME_CONFIGS[colorHex];

  if (!theme) {
    // Fallback for custom color if passed
    theme = {
      id: 'custom',
      name: 'Custom',
      primary: colorHex,
      hover: adjustColorBrightness(colorHex, -15),
      dark: adjustColorBrightness(colorHex, -25),
      darker: adjustColorBrightness(colorHex, -40),
      light: '#F8F9FC',
      border: 'rgba(0,0,0,0.15)',
      ring: 'rgba(0,0,0,0.25)'
    };
  }

  root.style.setProperty('--brand-primary', theme.primary);
  root.style.setProperty('--brand-primary-hover', theme.hover);
  root.style.setProperty('--brand-primary-dark', theme.dark);
  root.style.setProperty('--brand-primary-darker', theme.darker);
  root.style.setProperty('--brand-primary-light', theme.light);
  root.style.setProperty('--brand-primary-border', theme.border);
  root.style.setProperty('--brand-primary-ring', theme.ring);
}
