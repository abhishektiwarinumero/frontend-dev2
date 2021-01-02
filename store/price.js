export const state = () => ({
	price: 3.9,
	exchangeRate: 1.1003,
});


export const getters = {
	price(state, getters, rootState) {
		let wins = rootState.wins.wins;
		let percent = rootState.checkout.percent;
		let price = state.price * wins;
		price += (price * percent) / 100;
		return price;
	}
};

export const actions = {
	async getExchangeRate({ commit }) {
		const rate = await this.$axios.$get('https://api.exchangeratesapi.io/latest?symbols=USD');
		commit('SET_RATE', rate);
	}
};
