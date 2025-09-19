// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#104C9A', // синій, головний
        secondary: '#FF6600', // оранжевий (кнопки, акценти)
        accent: '#FACC15', // жовтий (можна для акцій, зірок рейтингу)
        danger: '#E11D48', // червоний (-30%, помилки)
        success: '#10B981', // зелений (успіх)
        gray: {
          light: '#F8F9FA', // світлий фон секцій
          DEFAULT: '#6B7280', // сірий текст
          dark: '#111827', // темний текст
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Inter', 'sans-serif'], // можна винести окремо для заголовків
      },
      container: {
        center: true,
        padding: '1rem',
        screens: {
          lg: '1200px',
          xl: '1200px',
        },
      },
      borderRadius: {
        card: '0.5rem',
      },
    },
  },
  plugins: [],
}
