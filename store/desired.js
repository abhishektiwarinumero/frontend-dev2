export const state = () => ({
	tier: 4,
	division: 13,
	server: "EU-West",
	mode: "Solo/Duo",
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
	changeMode(state, payload) {
		state.mode = payload;
	}
}
