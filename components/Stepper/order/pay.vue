<template>
	<v-stepper-content key="3-content" step="3">
		<form id="payment-form">
			<div id="card-element" class="mb-12"></div>
			<v-btn color="primary" @click="sendOrder" :disabled="!valid">
				Continue
			</v-btn>
			<v-btn text @click="cancel">Cancel</v-btn>
		</form>
	</v-stepper-content>
</template>

<script>
import tiers from "~/assets/js/tiers";
export default {
	data: () => ({
		valid: false,
		// Declared in instance but not referenced during render, just outsourcing scope
		client_secret: "",
		stripeToken: "",
		tiers: tiers,
	}),
	methods: {
		sendOrder() {
			if (!this.valid) {
				return;
			}
			// Gather current service, get slug from url (pure JS)
			let service = document.location.pathname.replace("/", "");
			// Gather current tier and division
			let tier = _.find(this.tiers, [
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
			let options = this.$store.state.checkout.options;
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
					options,
					price, // end of documented
					discountCode,
					nickname,
					booster_id: 0,
					comment,
					offline,
					stripeToken: this.stripeToken,
				})
				.then((response) => {
					this.$store.commit("notification/open", {
						text: response.message,
						mode: "success",
					});
					// Actually just close the dialog, semantics ¯\_(ツ)_/¯
					this.cancel();
				})
				.catch((errors) => {
					this.$store.commit("notification/open", {
						text: errors.response.data.error,
						mode: "error",
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
		confirm(clientSecret, card) {
			(async () => {
				const response = await fetch("/secret");
				const { client_secret: clientSecret } = await response.json();
				// Call stripe.confirmCardPayment() with the client secret.
				this.$stripe
					.confirmCardPayment(clientSecret, {
						payment_method: {
							card: card,
							// Billing details are optional
							// billing_details: {
							// 	name: "Jenny Rosen",
							// },
						},
					})
					.then((result) => {
						if (result.error) {
							// Show error to your customer (e.g., insufficient funds)
							this.$store.commit("notification/open", {
								text: result.error.message,
								mode: "error",
							});
						} else {
							// The payment has been processed!
							if (result.paymentIntent.status === "succeeded") {
								// Show a success message to your customer
								// There's a risk of the customer closing the window before callback
								// execution. Set up a webhook or plugin to listen for the
								// payment_intent.succeeded event that handles any business critical
								// post-payment actions.
								console.log(result);
								this.$store.commit("notification/open", {
									text: result.paymentIntent.status,
									mode: "success",
								});
							}
						}
					});
			})();
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
				this.$stripe.createToken(card).then((result) => {
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
						this.stripeToken = result.token.id;
					}
				});
			} else if (event.error) {
				this.valid = false;
				this.$store.commit("notification/open", {
					text: event.error.message,
					mode: "error",
				});
			} else if (event.empty) {
				this.valid = false;
				this.$store.commit("notification/open", {
					text: "Please enter your credit card number",
					mode: "error",
				});
			}
		});
	},
};
</script>
