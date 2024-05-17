const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  safelist: [
    {
      pattern: /col-span-(1[0-2]|[0-9]|full)/,
      variants: ['[&>div]', 'sm:[&>div]', 'sm', 'lg:[&>div]', 'lg'],
    },
    {
      pattern: /grid-cols-(1[0-2]|[0-9])/,
      variants: ['sm', 'md', 'lg'],
    },
  ],
  theme: {
    colors: {
      ...colors,
      'primary': {
        DEFAULT: '#066E2B',
        50: '#63F697',
        100: '#4BF587',
        200: '#1AF367',
        300: '#0BCF51',
        400: '#099E3E',
        500: '#066E2B',
        600: '#055622',
        700: '#033E18',
        800: '#02250F',
        900: '#010D05',
        950: '#000100'
      },
      'secondary': {
        DEFAULT: '#95B46A',
        50: '#ECF1E4',
        100: '#E2EBD7',
        200: '#CFDDBB',
        300: '#BCCFA0',
        400: '#A8C285',
        500: '#95B46A',
        600: '#79994D',
        700: '#5C743A',
        800: '#3E4E27',
        900: '#202915',
        950: '#12160B'

      },
      "black": "#020202",
    },
    fontFamily: {
      sans: ['Source Sans Pro', ...defaultTheme.fontFamily.sans],
    },
  },
  corePlugins: {
    preflight: true,
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/aspect-ratio'), require('@tailwindcss/typography')],
};
