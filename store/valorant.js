export const state = () => ({
	rank: 3,
	division: 7,
});

export const mutations = {
	changerank(state, payload) {
		state.rank = payload;
	},
	changeDivision(state, payload) {
		state.division = payload;
	},
}
