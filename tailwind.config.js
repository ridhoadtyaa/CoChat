const { fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    container: {
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
    },
    extend: {
      fontFamily: {
        poppins: ['"Poppins"', ...fontFamily.sans],
      },
      colors: {
        primary: '#4A72FF',
      },
      backgroundImage: {
        leftLogin: "url('/img/leftLogin.png')",
      },
    },
  },
  plugins: [],
};
