export const state = () => ({
	nickname: '',
	booster: '',
	comment: '',
	chatMode: false,
});

export const mutations = {
	changeNickname(state, payload) {
		state.tier = payload;
	},
	changeBooster(state, payload) {
		state.division = payload;
	},
	changeComment(state, payload) {
		state.server = payload;
	},
	changeChatMode(state, payload) {
		state.chatMode = payload;
	}
}
