/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        kraft: '#EDE6D6',
        kraftdark: '#DED2B8',
        ink: '#1A1815',
        safety: '#FF5A1F',
        stock: '#4A5D3A',
        cream: '#F7F3E9',
      },
      fontFamily: {
        stencil: ['"Archivo Black"', 'Impact', 'sans-serif'],
        body: ['"Work Sans"', 'system-ui', 'sans-serif'],
      },
      rotate: {
        '1.5': '1.5deg',
        '-1.5': '-1.5deg',
        '2.5': '2.5deg',
        '-2.5': '-2.5deg',
      },
    },
  },
  plugins: [],
}
