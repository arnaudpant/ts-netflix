import type { Config } from 'tailwindcss'

export default {
	content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
	theme: {
	extend: {
		backgroundImage: {
			'error-boundary': "url(/errorBoundary.jpeg)",
			'error-404': "url(/vignettes/bg-404.png)",
			'watermarked' : "url(/Netflix.svg)",
			'unAuthBg' : "url(/vignettes/posters.jpg)",
		}
	},
	},
	plugins: [],
} satisfies Config