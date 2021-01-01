import webpack from "webpack";

export default {
	vue: {
		config: {
			productionTip: false,
		}
	},
	// Global page headers (https://go.nuxtjs.dev/config-head)
	/*
	 ** Head elements
	 ** Add Roboto font and Material Icons
	 */
	head: {
		title: "Most Affordable Premium LOL Boosting & Valorant ELO Boost",
		titleTemplate: "%s | King Boosting",
		htmlAttrs: {
			lang: 'en',
		},
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
			content: "Premium LoL & Valorant Boosting, Coaching, and Account Selling, all at an Affordable Price! Safe, fast, effortless delivery to ALL Regions! Don't wait, RANK UP NOW!"
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
		},
		],
		script: [{
			src: '//code.tidio.co/bytmjjusa3gkjkwwkmqjbag7x3lzanqk.js'
		}],
		noscript: [{
			innerHTML: 'This website requires JavaScript.'
		}]
	},

	// Global CSS (https://go.nuxtjs.dev/config-css)
	css: [
		'~/assets/css/main.css',
		'~/assets/css/stripe.css',
	],

	// Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
	plugins: [
		{ src: '~/plugins/axios' },
		{ src: '~/plugins/particles', mode: 'client' }
	],

	// Auto import components (https://go.nuxtjs.dev/config-components)
	components: true,

	// Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
	buildModules: [
		// https://go.nuxtjs.dev/vuetify
		'@nuxtjs/vuetify',
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
		strategies: {
			local: {
				endpoints: {
					user: {
						url: 'user',
						method: 'get',
						propertyName: false
					}
				},
			},
		}
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
		treeShake: true,
		customVariables: ['@/assets/variables.scss'],
		optionsPath: './vuetify.options.js',
	},

	// Build Configuration (https://go.nuxtjs.dev/config-build)
	build: {
		transpile: [/vuetify/],
		extractCSS: true,
		cssSourceMap: true,
		plugins: [
			// Expose lodash globally
			new webpack.ProvidePlugin({
				// global modules
				_: "lodash"
			})
		],

		/*
		 ** You can extend webpack config here
		 */
		extend(config, ctx) {
			if (ctx.isClient && ctx.isDev) {
				config.devtool = 'source-map'
			}
		}
	}
}
