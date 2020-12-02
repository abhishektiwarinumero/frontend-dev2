<template>
	<v-stepper-content key="3-content" step="3">
		<div id="card-element" class="mb-12"></div>
		<v-btn color="primary" @click="sendOrder" :disabled="!valid"
			>Continue</v-btn
		>
		<v-btn text @click="cancel">Cancel</v-btn>
	</v-stepper-content>
</template>

<script>
import tiers from "@/data/tiers";
export default {
	data: () => ({
		valid: false,
	}),
	methods: {
		sendOrder() {
			if (!valid) {
				return;
			}
			console.log(tiers);
			// Gather current service, get slug from url (pure JS)
			let service = document.location.pathname.replace("/", "");
			// Gather current tier and division
			let tier = _.find(tiers.tiers, [
				"id",
				this.$store.state.league.tier,
			]);
			let division = _.find(tier.divisions, [
				"id",
				this.$store.state.league.division,
			]).name;
			tier = tier.name;
			// Gather selected server
			let server = this.$store.state.league.server;
			// Gather number of wins
			let wins = this.$store.state.wins.wins;
			// Gather game mode (solo/duo)
			let mode = this.$store.state.wins.mode;
			// Gather extra features
			let extraFeatures = this.$store.state.checkout.options;
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
			let price = this.$store.getters["price/price"];
			// Gather discount code
			let discountCode = this.$store.state.checkout.discountCode;
			// Gather in-game-nickname
			let nickname = this.$store.state.order.nickname;
			// Gather selected booster
			let booster = this.$store.state.order.booster;
			// Gather Comment
			let comment = this.$store.state.order.comment;
			// Gather (appear offline in chat)
			let offline = this.$store.state.order.chatMode;
			// Get all data from store and post them to DB
			this.$axios
				.$post("https://kingboosting.dev/orders", {
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
					comment,
					offline,
				})
				.then((response) => {
					this.$store.commit("notification/open", {
						text: response.message,
						mode: "success",
					});
				});
		},
		cancel() {
			this.$emit("cancel");
		},
		async tokenize(card) {
			const { token, error } = await this.$stripe.createToken(card);
			return token;
		},
	},
	mounted() {
		const elements = this.$stripe.elements();
		const card = elements.create("card", {
			style: {
				base: {
					iconColor: "#c4f0ff",
					color: "#fff",
					fontWeight: 500,
					fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
					fontSize: "16px",
					fontSmoothing: "antialiased",
					":-webkit-autofill": {
						color: "#fce883",
					},
					"::placeholder": {
						color: "#87BBFD",
					},
				},
				invalid: {
					iconColor: "#FFC7EE",
					color: "#FFC7EE",
				},
			},
		});
		// Add an instance of the card Element into the `card-element` <div>
		card.mount("#card-element");
		card.on("change", (event) => {
			if (event.complete) {
				this.valid = true;
				this.$stripe.createToken(card).then(function (result) {
					if (result.error) {
						this.valid = false;
						this.$store.commit("notification/open", {
							text: "Invalid card",
							mode: "error",
						});
					} else if (result.token) {
						this.valid = true;
						this.$store.commit("notification/open", {
							text: "Valid Card",
							mode: "success",
						});
						console.log(result.token);
					}
				});
			} else if (event.error || event.empty) {
				this.valid = false;
				this.$store.commit("notification/open", {
					text: event.error.message,
					mode: "error",
				});
			}
		});
	},
};
</script>
