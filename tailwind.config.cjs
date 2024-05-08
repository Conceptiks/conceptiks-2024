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
    fontFamily: {
      sans: ['Source Sans Pro', ...defaultTheme.fontFamily.sans],
    },
  },
  corePlugins: {
    preflight: true,
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/aspect-ratio'), require('@tailwindcss/typography')],
};
