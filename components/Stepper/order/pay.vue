<template>
	<v-stepper-content key="3-content" step="3">
		<v-card class="mb-12" color="grey lighten-1" height="200px"></v-card>
		<v-btn color="primary" @click="sendOrder">{{ $t('Continue') }}</v-btn>
		<v-btn text @click="cancel">{{ $t('Cancel') }}</v-btn>
	</v-stepper-content>
</template>

<script>
export default {
	methods: {
		sendOrder() {
			// Gather current service, get slug from url (pure JS)
			let service = document.location.pathname.replace("/", "");
			console.log(service);
			// Gather current tier and division
			let tier = this.$store.state.league.tier.name;
			console.log(tier);
			let division = this.$store.state.league.division.name;
			console.log(division);
			// Gather selected server
			let server = this.$store.state.league.server;
			console.log(server);
			// Gather number of wins
			let wins = this.$store.state.league.wins;
			console.log(wins);
			// Gather game mode (solo/duo)
			let mode = this.$store.state.league.mode;
			console.log(mode);
			// Gather extra features
			let extraFeatures = this.$store.state.league.options;
			console.log(extraFeatures);
			const specific_champions = Boolean(extraFeatures.find(e => e.startsWith('Specific')));
			const priority = Boolean(extraFeatures.find(e => e.startsWith('Priority')));
			const streaming = Boolean(extraFeatures.find(e => e.startsWith('With')));
			console.log(specific_champions,priority,streaming);
			// Gather price
			let price = this.$store.getters.price;
			// Gather discount code
			let discountCode = this.$store.state.league.discountCode;
			console.log(discountCode);
			// Gather in-game-nickname
			let nickname = this.$store.state.league.nickname;
			console.log(nickname);
			// Gather selected booster
			let booster = this.$store.state.league.booster;
			console.log(booster);
			// Gather Comments
			let comments = this.$store.state.league.comments;
			console.log(comments);
			// Gather (appear offline in chat)
			let offline = this.$store.state.league.offline;
			console.log(offline);
			// Get all data from store and post them to DB
			this.$axios.$post('/api/orders', {
				service,
				tier,
				division,
				server,
				wins,
				queue: mode === "Solo/Duo" ? "solo_duo" : "flex_5v5", // undocumented
				specific_champions,
				priority,
				streaming,
				price, // end of documented
				discountCode,
				nickname,
				booster_id: 0,
				comments,
				offline
			}).then(reponse => {
				console.log(repsonse);
			});
		},
		cancel() {
			this.$emit("cancel");
		}
	}
};
</script>

<i18n>
{
  "en": {
    "Continue": "Continue",
    "Cancel": "Cancel"
  }
}
</i18n>
