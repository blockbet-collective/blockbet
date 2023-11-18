const config = {
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		'./node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}'
	],

	plugins: [require('flowbite/plugin')],

	darkMode: 'class',

	theme: {
		extend: {
			colors: {
				// flowbite-svelte
				primary: {
					50: '#FFF5F2',
					100: '#FFF1EE',
					200: '#FFE4DE',
					300: '#FFD5CC',
					400: '#FFBCAD',
					500: '#FE795D',
					600: '#EF562F',
					700: '#EB4F27',
					800: '#CC4522',
					900: '#A5371B'
				},
				'custom-blue1': '#0b254a',
				'custom-blue2': '#0b254c',
				'custom-blue3': '#0b2448',
				'custom-blue4': '#0b254b',
				'custom-blue5': '#0b2349',
				'custom-blue6': '#0a2347',
				'custom-blue7': '#0b2449',
				'custom-blue8': '#0c264e'
			}
		}
	}
};

module.exports = config;
