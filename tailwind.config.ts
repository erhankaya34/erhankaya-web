import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Gothic dark palette
        void: {
          DEFAULT: '#0a0a0a',
          50: '#171717',
          100: '#0a0a0a',
          200: '#050505',
        },
        smoke: {
          DEFAULT: '#1a1a1a',
          50: '#262626',
          100: '#1a1a1a',
          200: '#121212',
        },
        // Blood red accent
        blood: {
          DEFAULT: '#c41e3a',
          light: '#e63950',
          dark: '#9a1830',
          muted: '#8b1a2d',
        },
        // Cream for text
        bone: {
          DEFAULT: '#f5f0e8',
          50: '#faf8f5',
          100: '#f5f0e8',
          200: '#e8e0d5',
          muted: '#a8a095',
        },
        // Gold accent (subtle)
        gilt: {
          DEFAULT: '#c9a962',
          light: '#d4ba7a',
          dark: '#a88d4a',
        },
      },
      fontFamily: {
        hero: ['Bokor', 'var(--font-bokor)', 'Georgia', 'serif'],
        display: ['var(--font-playfair)', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains)', 'monospace'],
      },
      animation: {
        'fade-up': 'fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-in': 'slideIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'grain': 'grain 8s steps(10) infinite',
        'pulse-subtle': 'pulseSubtle 4s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        grain: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '10%': { transform: 'translate(-5%, -10%)' },
          '20%': { transform: 'translate(-15%, 5%)' },
          '30%': { transform: 'translate(7%, -25%)' },
          '40%': { transform: 'translate(-5%, 25%)' },
          '50%': { transform: 'translate(-15%, 10%)' },
          '60%': { transform: 'translate(15%, 0%)' },
          '70%': { transform: 'translate(0%, 15%)' },
          '80%': { transform: 'translate(3%, 35%)' },
          '90%': { transform: 'translate(-10%, 10%)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      boxShadow: {
        'glow-blood': '0 0 40px rgba(196, 30, 58, 0.3)',
        'glow-blood-sm': '0 0 20px rgba(196, 30, 58, 0.2)',
        'inner-dark': 'inset 0 2px 20px rgba(0, 0, 0, 0.5)',
        'soft': '0 4px 20px rgba(0, 0, 0, 0.3)',
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-blood': 'linear-gradient(135deg, #c41e3a 0%, #9a1830 100%)',
      },
    },
  },
  plugins: [],
} satisfies Config;
