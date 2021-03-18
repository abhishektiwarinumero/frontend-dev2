export default {
	strategies: {
		// 'laravelSanctum': {
		// 	provider: 'laravel/sanctum',
		// 	url: 'http://localhost:8000',
		// },

		'laravelSanctum': {
			provider: 'laravel/sanctum',
			url: process.env.HOST_URL,
		},
	},
	redirect: false
}


