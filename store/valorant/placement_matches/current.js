export const state = () => ({
	rank: 3,
	division: 8,
});

export const mutations = {
	changerank(state, payload) {
		state.rank = payload;
	},
	changeDivision(state, payload) {
		state.division = payload;
	},
}
