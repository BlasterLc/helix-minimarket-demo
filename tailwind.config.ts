import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'helix-bg':    '#0a1628',
        'helix-bg2':   '#112240',
        'helix-card':  '#0d1b2a',
        'helix-green': '#00d084',
        'helix-text':  '#f1f5f9',
        'helix-muted': '#94a3b8',
        'helix-dim':   '#64748b',
      },
      keyframes: {
        fadeInUp: {
          '0%':   { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.35s ease forwards',
      },
    },
  },
  plugins: [],
}
export default config
