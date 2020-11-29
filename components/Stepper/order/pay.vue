<template>
	<v-stepper-content key="3-content" step="3">
		<v-card class="mb-12" color="grey lighten-1" height="200px"></v-card>
		<v-btn color="primary" @click="sendOrder">Continue</v-btn>
		<v-btn text @click="cancel">Cancel</v-btn>
	</v-stepper-content>
</template>

<script>
export default {
	methods: {
		sendOrder() {
			// Gather current service, get slug from url (pure JS)
			let service = document.location.pathname.replace("/", "");
			// Gather current tier and division
			let tier = this.$store.state.league.tier.name;
			let division = this.$store.state.league.division.name;
			// Gather selected server
			let server = this.$store.state.league.server;
			// Gather number of wins
			let wins = this.$store.state.wins.wins;
			// Gather game mode (solo/duo)
			let mode = this.$store.state.league.mode;
			// Gather extra features
			let extraFeatures = this.$store.state.league.options;
			const specific_champions = Boolean(
				extraFeatures.find((e) => e.startsWith("Specific"))
			);
			const priority = Boolean(
				extraFeatures.find((e) => e.startsWith("Priority"))
			);
			const streaming = Boolean(
				extraFeatures.find((e) => e.startsWith("With"))
			);
			// Gather price
			let price = this.$store.getters.price;
			// Gather discount code
			let discountCode = this.$store.state.league.discountCode;
			// Gather in-game-nickname
			let nickname = this.$store.state.league.nickname;
			// Gather selected booster
			let booster = this.$store.state.league.booster;
			// Gather Comments
			let comments = this.$store.state.league.comments;
			// Gather (appear offline in chat)
			let offline = this.$store.state.league.offline;
			// Get all data from store and post them to DB
			this.$axios
				.$post("/api/orders", {
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
					offline,
				})
				.then((reponse) => {});
		},
		cancel() {
			this.$emit("cancel");
		},
	},
};
</script>
