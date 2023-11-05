import type { Config } from 'tailwindcss'

export default {
	content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
	theme: {
	extend: {
		backgroundImage: {
			'error-boundary': "url(/errorBoundary.jpeg)"
		}
	},
	},
	plugins: [],
} satisfies Config