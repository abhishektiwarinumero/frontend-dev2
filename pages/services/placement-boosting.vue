<template>
	<v-row>
		<v-col cols="12" sm="6" md="7">
			<select-current-league showServerSelection title="Preseason's league" :tiers="tiers" />
			<slider title="Select Your Number Of Games" />
		</v-col>
		<v-col cols="6" md="5">
			<checkout :options="options" />
			<boost-me />
		</v-col>
	</v-row>
</template>

<script>
import tiers from "~/assets/js/placement-boosting/tiers";

export default {
	layout: "order",
	data: () => ({
		tiers: tiers,
		options: [
			{
				checked: false,
				icon: "mdi-account-plus",
				title: "Play with booster at",
				percentage: 35,
				tip:
					"The assigned booster will play with you from an other account, so you can keep playing on your own while being boosted.",
			},
			{
				checked: false,
				icon: "mdi-account-remove",
				title: "Appear offline on chat",
				percentage: 0,
				tip:
					"This option will make your account offline in the League Client chat, therefore your friends won't see when the booster is playing on your account",
			},
			{
				checked: false,
				icon: "mdi-account-group",
				title: "Specific champions/roles",
				percentage: 0,
				tip:
					"You may determine what role(s) your booster will queue up for while playing on your account. For additional costs, you may also determine what champions he should play.",
			},
			{
				checked: false,
				icon: "mdi-flash",
				title: "Priority order at",
				percentage: 20,
				tip:
					"This option ensures that your order will be treated with a higher priority, thus resulting in a faster completion.",
			},
			{
				checked: false,
				icon: "mdi-video",
				title: "With Streaming at",
				percentage: 15,
				tip:
					"Your assigned booster will record/live stream all the games, depending on your requirements.",
			},
		],
	}),
	computed: {
		tier() {
			return _.find(this.tiers, ["id", this.$store.state.league.tier]);
		},
		division() {
			return _.find(this.tier.divisions, [
				"id",
				this.$store.state.league.division,
			]);
		},
	},
	methods: {
		changePrice() {
			this.$store.commit("price/changePrice", this.division.price);
		},
		sendOrder(token) {
			// Gather selected server
			let server = this.$store.state.league.server;
			// Get selected number of games
			let games = this.$store.state.slider.amount;
			// Gather game queue (solo/duo)
			this.$store.commit(
				"checkout/addOption",
				this.$store.state.slider.queue
			);
			// Gather extra options
			let options = this.$store.state.checkout.options;
			// Gather discount code
			let discountCode = this.$store.state.checkout.discountCode;
			// Gather price
			let price = this.$store.getters["price/price"];
			// Construct the purchase string
			// Purchase here is "2 games in Gold IV"
			let purchase = `${games} games in ${this.tier.name} ${this.division.name}`;
			// Gather in-game-nickname (summoner name)
			let nickname = this.$store.state.order.nickname;
			// Gather selected booster
			let booster = this.$store.state.order.booster;
			// Gather Comment
			let comment = this.$store.state.order.comment;
			// Get all data from store and post them to DB
			this.$axios
				.post("orders", {
					purchase,
					service: "Ranked Win boosting",
					server,
					options,
					price,
					discountCode,
					nickname,
					booster,
					comment,
					token,
				})
				.then((response) => {
					this.$notify(response.data.message, "success");
					setTimeout(() => {
						window.location = `${process.env.HOST_URL}/resources/orders/${response.data.order_id}`;
					}, 4000);
					// Actually just close the dialog, semantics ¯\_(ツ)_/¯
					this.cancel();
				})
				.catch((errors) => {
					this.$notify(errors.response.data.error, "error");
				});
		},
	},
	mounted() {
		setTimeout(() => {
			this.$store.commit("slider/changeAmount", 10);
			this.changePrice();
			this.$root.$on("sendOrder", (token) => this.sendOrder(token));
		}, 300);
	},
};
</script>
