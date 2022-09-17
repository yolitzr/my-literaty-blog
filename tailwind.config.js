module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}',
	],
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
				transparent: '#00000000',
			},
		},
		gridTemplateColumns: {
			'fit-320': 'repeat(auto-fit, minmax(320px, 1fr))',
			gridTwo: 'repeat(12, minmax(0, 1fr))',
		},
		fontFamily: {
			sans: ['Poppins', 'sans-serif'],
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};
