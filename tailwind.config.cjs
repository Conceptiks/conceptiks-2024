const defaultTheme = require('tailwindcss/defaultTheme');

/**
 * Semantic colours resolve through CSS custom properties (see src/styles/app.css),
 * so light/dark is a variable swap rather than a `dark:` class on every element.
 * The channel-triplet form keeps Tailwind's opacity modifiers working (bg-surface/60).
 */
const token = (name) => `rgb(var(--${name}) / <alpha-value>)`;

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
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
    extend: {
      colors: {
        // Brand ramp built around the existing #EB4511.
        primary: {
          50: '#FFF4ED',
          100: '#FFE6D5',
          200: '#FFC9AA',
          300: '#FFA274',
          400: '#FF6F3C',
          500: '#EB4511',
          600: '#D93A0B',
          700: '#B02E0C',
          800: '#8C2711',
          900: '#732312',
          950: '#3E0F06',
          DEFAULT: '#EB4511',
        },
        secondary: '#B02E0C',
        light: '#EEEEEE',
        dark: '#0E0004',
        black: '#0E0004',

        // Semantic surfaces / text / lines.
        surface: token('surface'),
        'surface-2': token('surface-2'),
        'surface-3': token('surface-3'),
        ink: token('ink'),
        'ink-muted': token('ink-muted'),
        'ink-subtle': token('ink-subtle'),
        line: token('line'),
        'line-strong': token('line-strong'),
      },
      fontFamily: {
        sans: ['Source Sans 3', ...defaultTheme.fontFamily.sans],
      },
      letterSpacing: {
        tightest: '-0.035em',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      boxShadow: {
        // Softer, multi-layer elevation instead of a single heavy drop-shadow.
        card: '0 1px 2px rgb(14 0 4 / 0.04), 0 4px 12px -2px rgb(14 0 4 / 0.06)',
        'card-hover':
          '0 2px 4px rgb(14 0 4 / 0.05), 0 12px 28px -6px rgb(14 0 4 / 0.10)',
        panel: '0 1px 2px rgb(14 0 4 / 0.04), 0 16px 48px -12px rgb(14 0 4 / 0.14)',
      },
      transitionTimingFunction: {
        out: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.5s cubic-bezier(0.22, 1, 0.36, 1) both',
      },
      // `theme()` would hand back the unresolved `<alpha-value>` placeholder here,
      // so the prose variables reference the custom properties directly.
      typography: {
        DEFAULT: {
          css: {
            '--tw-prose-body': 'rgb(var(--ink-muted))',
            '--tw-prose-headings': 'rgb(var(--ink))',
            '--tw-prose-lead': 'rgb(var(--ink-muted))',
            '--tw-prose-bold': 'rgb(var(--ink))',
            '--tw-prose-links': '#EB4511',
            '--tw-prose-counters': 'rgb(var(--ink-subtle))',
            '--tw-prose-bullets': 'rgb(var(--line-strong))',
            '--tw-prose-hr': 'rgb(var(--line))',
            '--tw-prose-quotes': 'rgb(var(--ink))',
            '--tw-prose-quote-borders': '#EB4511',
            '--tw-prose-captions': 'rgb(var(--ink-subtle))',
            '--tw-prose-code': 'rgb(var(--ink))',
            '--tw-prose-th-borders': 'rgb(var(--line-strong))',
            '--tw-prose-td-borders': 'rgb(var(--line))',
            maxWidth: 'none',
          },
        },
      },
    },
  },
  corePlugins: {
    preflight: true,
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/typography'),
  ],
};
