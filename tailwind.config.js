/** @type {import('tailwindcss').Config} */

/**
 * - screen sizes for laptops
 * - look into spacing
 * - look into sizing (icon size), sizing constants, padding, border size
 * - look into responsive design
 */

//CONSTANTS
const UNIT = 1;
const TEXT_BASE_SIZE = 1;
const TEXT_SCALE_RATIO = 1.2;

module.exports = {
  content: [
    './src/components/**/*.{js,jsx,ts,tsx}',
    './node_modules/tw-elements/dist/js/**/*.js',
  ],
  plugins: [],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },

    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
    extend: {
      spacing: {
        xxs: 0.25 * UNIT + 'em',
        xs: 0.5 * UNIT + 'em',
        sm: 0.75 * UNIT + 'em',
        md: 1.25 * UNIT + 'em',
        lg: 2 * UNIT + 'em',
        xl: 3.25 * UNIT + 'em',
        xxl: 5.25 * UNIT + 'em',
      },
      borderRadius: {
        text_box: '2rem',
        tab: '4rem',
      },

      colors: {
        base_black: '#424245',
        base_white: '#FEF9EF',
        node: '#8DD39C',
        selected_white: '#FFF9E9',
        connection: '#4362B1',
      },
      fontSize: {
        xs: TEXT_BASE_SIZE / (TEXT_SCALE_RATIO * TEXT_SCALE_RATIO) + 'em',
        sm: TEXT_BASE_SIZE / TEXT_SCALE_RATIO + 'em',
        md: TEXT_BASE_SIZE * TEXT_SCALE_RATIO + 'em',
        lg: TEXT_BASE_SIZE * TEXT_SCALE_RATIO * TEXT_SCALE_RATIO + 'em',
        xl:
          TEXT_BASE_SIZE *
            TEXT_SCALE_RATIO *
            TEXT_SCALE_RATIO *
            TEXT_SCALE_RATIO +
          'em',
        xxl:
          TEXT_BASE_SIZE *
            TEXT_SCALE_RATIO *
            TEXT_SCALE_RATIO *
            TEXT_SCALE_RATIO *
            TEXT_SCALE_RATIO +
          'em',
        xxxl:
          TEXT_BASE_SIZE *
            TEXT_SCALE_RATIO *
            TEXT_SCALE_RATIO *
            TEXT_SCALE_RATIO *
            TEXT_SCALE_RATIO *
            TEXT_SCALE_RATIO +
          'em',
      },
      fontFamily: {
        primary: 'serif',
        secondary: 'sans-serif',
        code: [
          'source-code-pro',
          'Menlo',
          'Monaco',
          'Consolas',
          '"Courier New"',
          'monospace',
        ],
      },
    },
  },
};
