import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        arabic: [
          'var(--font-amiri)',
          'var(--font-noto-naskh)',
          'Amiri',
          'Scheherazade New',
          'Traditional Arabic',
          'Geeza Pro',
          'Segoe UI',
          'Tahoma',
          'Arial',
          'sans-serif',
        ],
        sans: [
          'var(--font-inter)',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
        ui: [
          'var(--font-inter)',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'sans-serif',
        ],
        devanagari: [
          'var(--font-devanagari)',
          'Noto Sans Devanagari',
          'Mangal',
          'Segoe UI',
          'sans-serif',
        ],
        bengali: [
          'var(--font-bengali)',
          'Noto Serif Bengali',
          'Vrinda',
          'SolaimanLipi',
          'Segoe UI',
          'sans-serif',
        ],
      },
      colors: {
        primary: {
          DEFAULT: '#00E699',
          dark: '#00B377',
          light: '#05DF8E',
          surface: '#082B1F',
        },
        accent: {
          DEFAULT: '#F9AB00',
          dark: '#EA580C',
          light: '#FEF7E0',
        },
        forest: {
          bg: '#03140E',
          sidebar: '#041A12',
          card: '#082B1F',
          cardElevated: '#0A3325',
          cardPill: '#0D3A2B',
          border: '#134E3A',
          borderGlow: '#1B5E46',
          accent: '#00E699',
          text: '#FFFFFF',
          textMuted: '#8EBDAE',
          textSubtle: '#5A8A7C',
          sandBg: '#F5E6C8',
          sandText: '#5B4314',
          level1: '#05DF8E',
          level2: '#F9AB00',
          level3: '#EA580C',
          level4: '#8B5CF6',
          level5a: '#3B82F6',
          level5b: '#06B6D4',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-in-right': 'slideInRight 0.25s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(12px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
