module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './features/**/*.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    screens: {
      sm: '375px',
      md: '768px',
      lg: '1024px',
      xl: '1680px',
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem', // mobile
        lg: '2rem',
        xl: '3rem',
      },
      screens: {
        sm: '375px',
        md: '768px',
        lg: '1024px',
        xl: '1680px',
      },
      extend: {},
    },
    plugins: [],
  },
};
