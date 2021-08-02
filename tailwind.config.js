module.exports = {
	purge: [
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}',
	],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {},
		colors: {
			book: {
				main: '#86425f',
				second: '#c7889c',
				neutral: '#aca7aa',
				dark: '#637077',
				light: '#f5edf4',
				lighter: '#63707714',
				gray: '#6d6d6d',
				black: '#111',
				white: '#FEFEFE',
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};
