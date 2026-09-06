/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // "blue-*" is overridden here (not renamed) so every existing bg-blue-900 /
        // text-blue-950 / border-blue-200 class across the app picks up the new palette
        // automatically. This is a deep herbal pine/teal — grounded in Ayurveda (herbal)
        // while still reading as an official, trustworthy government portal — rather than
        // the generic SaaS #3b82f6 blue the prototype shipped with.
        blue: {
          50: '#eef5f4',
          100: '#d7e8e6',
          200: '#b0d1cb',
          300: '#7fb3aa',
          400: '#4f8f83',
          500: '#336f64',
          600: '#23574d',
          700: '#1c463e',
          800: '#163832',
          900: '#102a26',
          950: '#0a1b18',
        },
        brand: {
          50: '#eef5f4',
          100: '#d7e8e6',
          200: '#b0d1cb',
          300: '#7fb3aa',
          400: '#4f8f83',
          500: '#336f64',
          600: '#23574d',
          700: '#1c463e',
          800: '#163832',
          900: '#102a26',
          950: '#0a1b18',
        },
        navy: {
          800: '#163832',
          900: '#102a26',
          950: '#0a1b18',
        },
        accent: {
          amber: '#f59e0b',
          emerald: '#10b981',
          cyan: '#06b6d4',
          violet: '#8b5cf6',
          rose: '#f43f5e',
          turmeric: '#c9971c',
          terracotta: '#a15c3e',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Fraunces', 'Plus Jakarta Sans', 'serif'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        }
      }
    },
  },
  plugins: [],
}
