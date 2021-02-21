export default {
	strategies: {
		'laravelSanctum': {
			provider: 'laravel/sanctum',
			url: 'https://dashboard.eloboost.app',
			endpoints: {
				// (optional) If set, we send a get request to this endpoint before login
				csrf: {
					url: '/sanctum/csrf-cookie'
				},
				login: {
					url: '/login',
					method: 'post'
				},
				logout: {
					url: '/logout',
					method: 'post'
				},
				user: {
					url: '/api/user',
					method: 'get',
					propertyName: false
				}
			},
		},
	},
	redirect: false
}
