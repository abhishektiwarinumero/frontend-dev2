export const state = () => ({
	nickname: '',
	booster: '',
	comment: '',
	chatMode: false,
});

export const mutations = {
	changeNickname(state, payload) {
		state.nickname = payload;
	},
	changeBooster(state, payload) {
		state.booster = payload;
	},
	changeComment(state, payload) {
		state.comment = payload;
	},
	changeChatMode(state, payload) {
		state.chatMode = payload;
	}
}
