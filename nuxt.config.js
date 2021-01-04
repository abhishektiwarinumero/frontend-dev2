import webpack from "webpack";
import seo from "./seo";

export default {
	vue: {
		config: {
			productionTip: false,
		}
	},
	// Global page headers (https://nuxtjs.org/docs/2.x/features/meta-tags-seo)
	/*
	 ** Head elements
	 */
	head: seo,

	// Global CSS (https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-css)
	css: [
		'~/static/css/main',
		'~/static/css/stripe',
	],

	// Plugins to run before rendering page (https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-plugins)
	plugins: [
		{ src: '~/plugins/axios' },
		{ src: '~/plugins/particles', mode: 'client' },
		{ src: '~/plugins/notify', mode: 'client' },
	],

	// Auto import components (https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-components)
	components: true,

	// Modules for dev and build (recommended) (https://nuxtjs.org/docs/2.x/directory-structure/modules)
	buildModules: [
		// https://github.com/nuxt-community/vuetify-module
		'@nuxtjs/vuetify',
		'@nuxtjs/dotenv',
	],

	// Modules (https://nuxtjs.org/docs/2.x/directory-structure/modules)
	modules: [
		// https://axios.nuxtjs.org/
		'@nuxtjs/axios',
		'@nuxtjs/auth-next',
		'nuxt-stripe-module'
	],

	axios: {
		baseURL: 'http://localhost:8000', // Used as fallback if no runtime config is provided
		proxy: true,
		credentials: true
	},

	publicRuntimeConfig: {
		axios: {
			browserBaseURL: process.env.HOST_URL,
		}
	},

	privateRuntimeConfig: {
		axios: {
			baseURL: process.env.HOST_URL,
		}
	},

	proxy: {
		'/laravel': {
			target: 'https://laravel-auth.nuxtjs.app',
			pathRewrite: { '^/laravel': '/' }
		}
	},

	auth: {
		strategies: {
			'laravelSanctum': {
				provider: 'laravel/sanctum',
				url: process.env.HOST_URL
			},
		}
	},

	stripe: {
		publishableKey: process.env.STRIPE_KEY,
	},

	// Vuetify module configuration (https://github.com/nuxt-community/vuetify-module#options)
	vuetify: {
		treeShake: true,
		customVariables: ['@/assets/variables.scss'],
		optionsPath: './vuetify.options.js',
		defaultAssets: {
			font: false
		}
	},

	// Build Configuration (https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-build)
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
