import webpack from "webpack";
import colors from 'vuetify/es5/util/colors'

export default {
	// Global page headers (https://go.nuxtjs.dev/config-head)
	head: {
		titleTemplate: "%s | King Boosting",
		title: "Buy LOL ELO Boost & Premium LOL Boosting",
		meta: [{
			charset: "utf-8"
		},
		{
			name: "viewport",
			content: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
		},
		{
			hid: "description",
			name: "description",
			content: "Buy high quality ELO Boosting and LoL Boost services. 100% Safety and Privacy. The best ELO &amp; League Boost experience. Available on all servers."
		},
		{
			name: "keywords",
			content: "elo boost, lol elo boost, lol boost, lol elo boosting, elo boost lol, cheap elo boosting, elo boosting"
		}
		],
		link: [{
			rel: "icon",
			type: "image/x-icon",
			href: "/favicon.ico"
		}]
	},

	// Global CSS (https://go.nuxtjs.dev/config-css)
	css: [
		'~/assets/css/main.css',
		'~/assets/css/stripe.css',
	],

	// Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
	plugins: [
	],

	// Auto import components (https://go.nuxtjs.dev/config-components)
	components: true,

	// Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
	buildModules: [
		// https://go.nuxtjs.dev/vuetify
		// '@nuxtjs/vuetify',
		'@nuxtjs/dotenv',
	],

	// Modules (https://go.nuxtjs.dev/config-modules)
	modules: [
		// https://go.nuxtjs.dev/axios
		'@nuxtjs/axios',
		'@nuxtjs/auth',
		'nuxt-stripe-module'
	],

	auth: {
		redirect: false,
	},

	// Axios module configuration (https://go.nuxtjs.dev/config-axios)
	axios: {
		baseURL: process.env.API_URL, // Used as fallback if no runtime config is provided
	},

	stripe: {
		publishableKey: process.env.STRIPE_KEY,
	},

	// Vuetify module configuration (https://go.nuxtjs.dev/config-vuetify)
	vuetify: {
		customVariables: ['~/assets/variables.scss'],
		theme: {
			dark: true,
			themes: {
				dark: {
					primary: colors.blue.darken2,
					accent: colors.grey.darken3,
					secondary: colors.amber.darken3,
					info: colors.teal.lighten1,
					warning: colors.amber.base,
					error: colors.deepOrange.accent4,
					success: colors.green.accent3
				}
			}
		}
	},

	// Build Configuration (https://go.nuxtjs.dev/config-build)
	build: {
		plugins: [
			// Expose lodash globally
			new webpack.ProvidePlugin({
				// global modules
				_: "lodash"
			})
		],
	}
}
