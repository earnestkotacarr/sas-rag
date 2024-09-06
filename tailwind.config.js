module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#93c5fd',
          DEFAULT: '#3b82f6',
          dark: '#1e3a8a',
        },
        secondary: {
          light: '#fcd34d',
          DEFAULT: '#f59e0b',
          dark: '#b45309',
        },
        background: {
          light: '#f3f4f6',
          DEFAULT: '#e5e7eb',
          dark: '#d1d5db',
        },
        text: {
          light: '#9ca3af',
          DEFAULT: '#374151',
          dark: '#1f2937',
        },
        error: {
          light: '#fca5a5',
          DEFAULT: '#ef4444',
          dark: '#b91c1c',
        },
        success: {
          light: '#86efac',
          DEFAULT: '#22c55e',
          dark: '#15803d',
        },
        warning: {
          light: '#fde68a',
          DEFAULT: '#fbbf24',
          dark: '#b45309',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
