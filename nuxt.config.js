import webpack from "webpack";
import seo from "./seo";

export default {
	vue: {
		config: {
			productionTip: false,
		}
	},
	// Global page headers (https://go.nuxtjs.dev/config-head)
	/*
	 ** Head elements
	 */
	head: seo,

	// Global CSS (https://go.nuxtjs.dev/config-css)
	css: [
		'~/assets/css/main.css',
		'~/assets/css/stripe.css',
	],

	// Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
	plugins: [
		{ src: '~/plugins/axios' },
		{ src: '~/plugins/particles', mode: 'client' },
		{ src: '~/plugins/notify', mode: 'client' },
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
					},
					login: {
						url: 'login',
						method: 'post'
					},
					logout: {
						url: 'logout',
						method: 'post'
					}
				},
			},
		},
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
