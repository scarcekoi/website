import defaultTheme from 'tailwindcss/defaultTheme';
import plugin from 'tailwindcss/plugin';
import typographyPlugin from '@tailwindcss/typography';

export default {
  content: ['./src/**/*.{astro,html,js,jsx,json,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: 'var(--aw-color-primary)',
        secondary: 'var(--aw-color-secondary)',
        accent: 'var(--aw-color-accent)',
        default: 'var(--aw-color-text-default)',
        muted: 'var(--aw-color-text-muted)',
        // Merge additional colors from the second configuration
        rosewater: {
          light: '#dc8a78',
          dark: '#f5e0dc',
        },
        flamingo: {
          light: '#dd7878',
          dark: '#f2cdcd',
        },
        pink: {
          light: '#ea76cb',
          dark: '#f5c2e7',
        },
        mauve: {
          light: '#8839ef',
          dark: '#cba6f7',
        },
        red: {
          light: '#d20f39',
          dark: '#f38ba8',
        },
        maroon: {
          light: '#e64553',
          dark: '#eba0ac',
        },
        peach: {
          light: '#fe640b',
          dark: '#fab387',
        },
        yellow: {
          light: '#df8e1d',
          dark: '#f9e2af',
        },
        green: {
          light: '#40a02b',
          dark: '#a6e3a1',
        },
        teal: {
          light: '#179299',
          dark: '#94e2d5',
        },
        sky: {
          light: '#04a5e5',
          dark: '#89dceb',
        },
        sapphire: {
          light: '#209fb5',
          dark: '#74c7ec',
        },
        blue: {
          light: '#1e66f5',
          dark: '#89b4fa',
        },
        lavender: {
          light: '#7287fd',
          dark: '#b4befe',
        },
        text: {
          light: '#4c4f69',
          dark: '#cdd6f4',
        },
        subtext1: {
          light: '#5c5f77',
          dark: '#bac2de',
        },
        subtext0: {
          light: '#6c6f85',
          dark: '#a6adc8',
        },
        overlay2: {
          light: '#7c7f93',
          dark: '#9399b2',
        },
        overlay1: {
          light: '#8c8fa1',
          dark: '#7f849c',
        },
        overlay0: {
          light: '#9ca0b0',
          dark: '#6c7086',
        },
        surface2: {
          light: '#acb0be',
          dark: '#585b70',
        },
        surface1: {
          light: '#bcc0cc',
          dark: '#45475a',
        },
        surface0: {
          light: '#ccd0da',
          dark: '#313244',
        },
        base: {
          light: '#eff1f5',
          dark: '#1e1e2e',
        },
        mantle: {
          light: '#e6e9ef',
          dark: '#181825',
        },
        crust: {
          light: '#dce0e8',
          dark: '#11111b',
        },
      },
      fontFamily: {
        sans: ['var(--aw-font-sans, ui-sans-serif)', ...defaultTheme.fontFamily.sans],
        serif: ['var(--aw-font-serif, ui-serif)', ...defaultTheme.fontFamily.serif],
        heading: ['var(--aw-font-heading, ui-sans-serif)', ...defaultTheme.fontFamily.sans],
      },

      animation: {
        fade: 'fadeInUp 1s both',
      },

      keyframes: {
        fadeInUp: {
          '0%': { opacity: 0, transform: 'translateY(2rem)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [
    typographyPlugin,
    plugin(({ addVariant }) => {
      addVariant('intersect', '&:not([no-intersect])');
    }),
  ],
  darkMode: 'class',
};
