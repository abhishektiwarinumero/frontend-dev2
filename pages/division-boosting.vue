<template>
	<v-row>
		<v-col cols="12" sm="6" md="7">
			<select-current-league @divisionChanged="changePrice" @lpchanged="changePrice" @mmrchanged="changePrice" showPointsSelection />
			<select-desired-league @divisionChanged="changePrice" />
		</v-col>
		<v-col cols="6" md="5">
			<checkout :options="options" />
			<boost-me />
		</v-col>
	</v-row>
</template>

<script>
import tiers from "~/assets/js/tiers";

export default {
	layout: "order",
	data: () => ({
		tiers: tiers,
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
				_.map(this.tiers, (tier) => {
					if (tier.divisions) {
						return _.map(tier.divisions, (division) => [
							division.id,
							division.price,
						]);
					} else {
						return tier.price;
					}
				})
			);
			let filteredPrices = _.filter(allPrices, (price) =>
				// This is a whereIn replacement
				_.range(
					this.$store.state.desired.division,
					this.$store.state.league.division
				).includes(price[0])
			);
			// Sum up their prices using JS reduce
			let total = filteredPrices.reduce((sum, price) => {
				return sum + price[1];
			}, 0);
			// Get the MMR from the VueX store
			// We need to get its price from the currently selected division
			let tier = _.find(this.tiers, [
				"id",
				this.$store.state.league.tier,
			]);

			let filtered_mmrs = _.filter(tier.mmrs, (mmr) =>
				_.range(this.$store.state.league.mmr, 1).includes(mmr.id)
			);

			let mmr_total = filtered_mmrs.reduce((sum, mmr) => {
				return sum + mmr.price;
			}, 0);

			// Load price of (get it from currently selected desired division)
			this.$store.commit(
				"price/changePrice",
				total + mmr_total - tier.lp
			);
		},
	},
	mounted() {
		// So price doesn't get multiplied, because there are no wins in division boosting
		this.$store.commit("slider/changeAmount", 1);
		this.changePrice();
	},
};
</script>
