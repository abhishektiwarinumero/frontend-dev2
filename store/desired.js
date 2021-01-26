export const state = () => ({
	tier: {},
	division: {},
	lp: 0, // Only for Master+
	server: "EU-West",
	queue: "Solo/Duo",
});

export const mutations = {
	changeTier(state, payload) {
		state.tier = payload;
	},
	changeDivision(state, payload) {
		state.division = payload;
	},
	changeServer(state, payload) {
		state.server = payload;
	},
	changeQueue(state, payload) {
		state.queue = payload;
	}
}
