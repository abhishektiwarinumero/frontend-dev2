<template>
	<v-row>
		<v-col cols="12" sm="6" md="7">
			<current @divisionChanged="changePrice" @lpchanged="changePrice" @mmrchanged="changePrice" marks :tiers="tiers" />
			<desired @divisionChanged="changePrice" />
		</v-col>
		<v-col cols="6" md="5">
			<checkout :options="options" />
			<boost-me />
		</v-col>
	</v-row>
</template>

<script>
import tiers from "~/assets/js/wild-rift-boosting/tiers";
import options from "~/assets/js/wild-rift-boosting/options";

export default {
	layout: "order",
	data: () => ({
		tiers: tiers,
		options: options,
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
				_.range(
					this.$store.state.desired.division,
					this.$store.state.league.division
				).includes(price[0])
			);
			// Sum up their prices using JS reduce
			let total = filteredPrices.reduce((sum, price) => {
				return sum + price[1];
			}, 0);
			// Get the LP from the VueX store
			let lp = this.$store.state.league.lp;
			// Load price of (get it from currently selected desired division)
			this.$store.commit("price/changePrice", total);
		},
	},
	mounted() {
		// Set Silver Division 1 as the default current
		this.$store.commit("league/changeDivision", 11);
		this.$store.commit("desired/changeDivision", 16);
		this.changePrice();
	},
};
</script>
