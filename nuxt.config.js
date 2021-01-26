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
	plugins: [{
			src: '~/plugins/axios'
		},
		{
			src: '~/plugins/particles',
			mode: 'client'
		},
		{
			src: '~/plugins/notify',
			mode: 'client'
		},
		{
			src: '~/plugins/globals.js',
		}
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
		"@nuxtjs/sentry",
		'nuxt-stripe-module'
	],

	sentry: {
		dsn: "https://f8d1200b27ae4ec0a627eefbdf4f5f21@o143524.ingest.sentry.io/5425202", // Enter your project's DSN here
		config: {} // Additional config
	},

	axios: {
		baseURL: process.env.HOST_URL, // Used as fallback if no runtime config is provided
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
			pathRewrite: {
				'^/laravel': '/'
			}
		}
	},

	auth: {
		strategies: {
			'laravelSanctum': {
				provider: 'laravel/sanctum',
				url: process.env.HOST_URL,
			},
		},
		redirect: false
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

	router: {
		extendRoutes(nuxtRoutes) {
			nuxtRoutes.map(route => {
				route.path = route.path.replace('/services', '');
				route.name = route.name.replace('services-', '');

				return route;
			});
		},
	},

	// Build Configuration (https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-build)
	build: {
		transpile: [/vuetify/],
		extractCSS: {
			ignoreOrder: true
		},
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
		},

		loaders: {
			vue: {
				prettify: false
			}
		}
	}
}
