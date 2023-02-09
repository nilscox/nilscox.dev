/* eslint-env commonjs */

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['src/**/*.tsx'],
  darkMode: 'class',
  theme: {
    spacing: {
      0: '0',
      1: '0.25rem',
      2: '0.5rem',
      3: '0.75rem',
      4: '1rem',
      5: '1.5rem',
      6: '2rem',
      7: '3rem',
      8: '4rem',
    },

    colors: {
      transparent: 'transparent',
      neutral: 'rgb(var(--color-neutral) / <alpha-value>)',
      muted: 'rgb(var(--color-muted) / <alpha-value>)',
      inverted: 'rgb(var(--color-inverted) / <alpha-value>)',
      green: 'rgb(var(--color-green) / <alpha-value>)',
      yellow: 'rgb(var(--color-yellow) / <alpha-value>)',
    },
    textColor: {
      inherit: 'inherit',
      neutral: 'rgb(var(--color-text-neutral) / <alpha-value>)',
      muted: 'rgb(var(--color-text-muted) / <alpha-value>)',
      link: 'rgb(var(--color-text-link) / <alpha-value>)',
    },
    borderColor: {
      DEFAULT: 'rgb(var(--color-border) / <alpha-value>)',
      inverted: 'rgb(var(--color-inverted) / <alpha-value>)',
    },

    fontSize: {
      base: '18px',
      'base-mobile': '16px',
      xs: '0.75rem',
      sm: '0.875rem',
      lg: '1.25rem',
      xl: '1.5rem',
      '2xl': '2rem',
    },
    fontFamily: {
      body: ['"Source Sans 3Variable"', 'sans-serif'],
      mono: ['monospace'],
    },

    borderRadius: {
      xs: '0.25rem',
      sm: '0.5rem',
      DEFAULT: '1rem',
      lg: '2rem',
    },
    maxWidth: {
      page: 'var(--page-width)',
    },
    height: {
      full: '100%',
      header: 384,
    },
  },
};
