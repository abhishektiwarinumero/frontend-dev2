export const state = () => ({
	eta: '0-1 day',
	percent: 0,
	options: [],
	discountCode: null,
})

export const mutations = {
	changeDiscountCode(state, payload) {
		state.discountCode = payload;
	},
	addOption(state, payload) {
		// Remove the " at" from the option if applicable
		if (state.options.indexOf(payload) === -1) {
			state.options.push(payload);
		}
	},
	removeOption(state, payload) {
		state.options = _.remove(state.options, (option) => option != payload);
	},
	addPercent(state, percent) {
		state.percent += percent;
	},
	substractPercent(state, percent) {
		state.percent -= percent;
	},
	clearOptions(state) {
		state.options = [];
		state.percent = 0;
	},
}

export const getters = {
	eta(state, getters, rootState) {
		let x = rootState.league.tier;
		let y = rootState.wins.wins;
		let f = 0;
		let s = 0;
		if (x == 7 && y == 1) {
			f = 0;
		} else if (x < 5) {
			f = (y + 1) / 6;
		} else if (x < 8) {
			f = (y + 2) / (10 - x);
		} else {
			f = (y + x % 2) / 2;
		}
		s = f + (f < 3 ? 1 : 2);
		return parseInt(f) + "-" + parseInt(s);
	},
}
