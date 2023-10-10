/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

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
	darkMode: ['class'],
	content: [
		'./pages/**/*.{js,jsx,ts,tsx}',
		'./components/**/*.{js,jsx,ts,tsx}',
		'./src/**/*.{js,jsx,ts,tsx}',
		'./node_modules/tw-elements/dist/js/**/*.js',
	],
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
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px',
			},
		},
		extend: {
			spacing: {
				xxs: 0.25 * UNIT + 'em',
				xs: 0.5 * UNIT + 'em',
				sm: 0.75 * UNIT + 'em',
				md: 1 * UNIT + 'em',
				lg: 2 * UNIT + 'em',
				xl: 3.25 * UNIT + 'em',
				xxl: 5.25 * UNIT + 'em',
			},
			fontSize: {
				xs:
					TEXT_BASE_SIZE / (TEXT_SCALE_RATIO * TEXT_SCALE_RATIO) +
					'em',
				sm: TEXT_BASE_SIZE / TEXT_SCALE_RATIO + 'em',
				md: TEXT_BASE_SIZE + 'em',
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
				sans: ['Open Sans'],
				body: ['Open Sans', 'sans-serif'],
				primary: 'Open Sans',
				secondary: 'Open Sans',
				code: [
					'source-code-pro',
					'Menlo',
					'Monaco',
					'Consolas',
					'"Courier New"',
					'monospace',
				],
			},
			colors: {
				base_black: '#424245',
				base_white: 'rgba(255,255,255,1)',
				secondary_white: '#FFFCF9',
				secondary_black: '#242425',
				action: '#1A57F2',
				yellow: '#FFCB45',
				highlight: 'rgba(251, 200, 19, 0.3)',
				lining: '#DADCE0',
				node: '#4362B1',
				selected_white: '#F5F6F7',
				connection: '#4362B1',
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				// Connection Colours
				HAS: '#FFB7DC',
				PARENTS: '#FFB7DC',
				CHILDREN: '#FFB7DC',

				IS: '#D7FFA2',
				ENCOMPASSES: '#D7FFA2',

				NEEDED: '#C6BCF9',
				NEEDS: '#C6BCF9',

				FOLLOWED: '#ABE0FF',
				FOLLOWS: '#ABE0FF',

				RELATED: '#FFFA91',
				CUSTOM: '#FFBC91',
				// Shadcn colours
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))',
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))',
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))',
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))',
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))',
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))',
				},
			},
			transitionProperty: {
				...defaultTheme.transitionProperty,
				width: 'max-width',
				height: 'height',
			},
			borderRadius: {
				text_box: '2rem',
				tab: '4rem',
				lg: `var(--radius)`,
				md: `calc(var(--radius) - 2px)`,
				sm: 'calc(var(--radius) - 4px)',
			},
			keyframes: {
				'accordion-down': {
					from: { height: 0 },
					to: { height: 'var(--radix-accordion-content-height)' },
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: 0 },
				},
				pulse: {
					'0%': { transform: 'scale(1)' },
					'50%': { transform: 'scale(1.1)' },
					'100%': { transform: 'scale(1)' },
				},
			},
			animation: {
				wiggle: 'wiggle 200ms ease-in-out',
				'accordion-down': 'accordion-down 0.4s ease-out',
				'accordion-up': 'accordion-up 0.4s ease-out',
				pulse: 'pulse 2s',
			},
		},
	},
	plugins: [require('tailwindcss-animate')],
};
