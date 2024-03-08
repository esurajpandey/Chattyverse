/** @type {import('tailwindcss').Config} */
import withMT from '@material-tailwind/react/utils/withMT';

export default withMT({
	content: ['./index.html', './src/**/*.tsx'],
	theme: {
		extend: {
			colors: {
				dark: {
					theme: '#1E1E1E',
					text: '#FFFFFF',
					bg: '#121212',
				},
				light: {
					theme: '#2979FF',
					text: '#333333',
					bg: '#FFFFFF',
				},
			},
		},
	},
	plugins: [],
});
