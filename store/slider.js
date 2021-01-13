export const state = () => ({
	amount: 1,
	mode: "Solo/Duo",
})

export const mutations = {
	changeAmount(state, payload) {
		state.amount = payload;
	},
	changeMode(state, mode) {
		state.mode = mode;
	},
}
