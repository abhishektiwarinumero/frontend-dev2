export const state = () => ({
	wins: 1,
	mode: "Solo/Duo",
})

export const mutations = {
	changeNumberOfWins(state, payload) {
		state.wins = payload;
	},
	changeGameMode(state, mode) {
		state.mode = mode;
	},
}
