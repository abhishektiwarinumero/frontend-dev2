<template>
	<v-row>
		<v-col cols="12" sm="6" md="7">
			<current title="Current Rank" description="Please select your Current Rank and Division" :tiers="ranks" suffix="Current RR" showPointsSelection lpTooltip="Your current Rank Rating amount." @divisionChanged="changePrice" @lpchanged="changePrice" />
			<desired title="Desired Rank" description="Please select your Desired Rank and Division" :tiers="ranks" @divisionChanged="changePrice" :showQueue="false" />
		</v-col>
		<v-col cols="6" md="5">
			<checkout :options="options" />
			<boost-me />
		</v-col>
	</v-row>
</template>

<script>
import ranks from "~/assets/js/ranks";

export default {
	layout: "order",
	data: () => ({
		ranks: ranks,
		options: [
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
				title: "Specific champions",
				percentage: 0,
				tip:
					"You may determine what role(s) your booster will queue up for while playing on your account. For additional costs, you may also determine what champions he should play.",
			},
			{
				checked: false,
				icon: "mdi-flash",
				title: "Priority order (2x speed) at",
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
			{
				checked: false,
				icon: "mdi-plus",
				title: "+1 Win in desired rank",
				// This needs to be dynamic, based on the desired rank selected
				percentage: 0,
				tip:
					"By selecting this option, you'll receive an additional net win once your desired rank was reached.",
			},
		],
	}),
	methods: {
		changePrice() {
			let allPrices = _.flatten(
				_.map(this.ranks, (rank) => {
					if (rank.divisions) {
						return _.map(rank.divisions, (division) => {
							return { id: division.id, price: division.price };
						});
					} else {
						return rank.price;
					}
				})
			);
			let fromId;
			let currentRank = this.$store.state.current.tier;
			if (currentRank.divisions) {
				fromId = this.$store.state.current.division.id;
			} else {
				fromId = currentRank.id;
			}
			let toId;
			let desiredRank = this.$store.state.desired.tier;
			if (desiredRank.divisions) {
				toId = this.$store.state.desired.division.id;
			} else {
				toId = desiredRank.id;
			}
			let filteredPrices = _.filter(allPrices, (price) =>
				// This is a whereIn replacement
				_.range(fromId + 1, toId + 1).includes(price.id)
			);
			// Sum up their prices using JS reduce
			let total = filteredPrices.reduce((sum, price) => {
				return sum + price.price;
			}, 0);
			// Load price of (get it from currently selected desired division)
			this.$store.commit("price/changePrice", total);
		},
		sendOrder(token) {
			// Gather current rank and division
			let currentRank = this.$store.state.current.tier.name;
			let currentDivision = this.$store.state.current.division.name;
			// Gather desired rank and division
			let desiredRank = this.$store.state.desired.tier.name;
			let desiredDivision = this.$store.state.desired.division.name;
			// Construct the purchase string
			// Purchase here is "current (rank & division) to desired (rank & division)"
			let purchase = `${currentRank} ${currentDivision} to ${desiredRank} ${desiredDivision}`;
			// Get all data from store and post them to DB
			this.$axios
				.post("orders", {
					purchase,
					service: "Valorant Rank Boosting",
					server: this.$store.state.desired.server,
					options: this.$store.state.checkout.options,
					price: this.$store.getters["price/price"],
					discountCode: this.$store.state.checkout.discountCode,
					nickname: this.$store.state.order.nickname,
					booster: this.$store.state.order.booster,
					comment: this.$store.state.order.comment,
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
		this.changePrice();
		this.$root.$on("sendOrder", (token) => this.sendOrder(token));
	},
};
</script>
