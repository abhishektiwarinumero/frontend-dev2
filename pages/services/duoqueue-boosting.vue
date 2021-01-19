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
				icon: "mdi-school",
				title: "With coaching at",
				percentage: 30,
				tip:
					"This option allows you to be in a voice call with our booster during and in between the games so he may give you tips and ideas for your improvement.",
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
				icon: "mdi-finance",
				title: "HIGH-MMR account at",
				percentage: 20,
				tip:
					"Your assigned booster will play with you from a high MMR account.",
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

			total = total * 1.5;

			// Load price of (get it from currently selected desired division)
			this.$store.commit(
				"price/changePrice",
				total + mmr_total - tier.lp
			);
		},
		sendOrder(token) {
			// Gather current tier and division
			let currentTier = _.find(this.tiers, [
				"id",
				this.$store.state.league.tier,
			]);
			let division = _.find(currentTier.divisions, [
				"id",
				this.$store.state.league.division,
			]).name;
			// Gather desired tier and division
			let desiredTier = _.find(this.tiers, [
				"id",
				this.$store.state.desired.tier,
			]);
			let desiredDivision = _.find(desiredTier.divisions, [
				"id",
				this.$store.state.desired.division,
			]).name;
			let mmr = _.find(currentTier.mmrs, [
				"id",
				this.$store.state.league.mmr,
			]);
			// Hydrate the tiers names
			currentTier = currentTier.name;
			desiredTier = desiredTier.name;
			// Gather LP
			this.$store.commit(
				"checkout/addOption",
				// We shouldn't send the value of the LP, but the rank name and suffix it with LP
				this.$store.state.league.lp + " LP"
			);
			// Gather MMR
			this.$store.commit(
				"checkout/addOption",
				// Same thing goes for MMR as stated above
				`+${mmr.range} LP`
			);
			// Construct the purchase string
			// Purchase here is "current (tier & division) to desired (tier & division)"
			let purchase = `${currentTier} ${division} to ${desiredTier} ${desiredDivision}`;
			// Gather selected server
			let server = this.$store.state.league.server;
			// Gather game queue (solo/duo)
			this.$store.commit(
				"checkout/addOption",
				this.$store.state.desired.queue
			);
			// Gather extra options
			let options = this.$store.state.checkout.options;
			// Gather price
			let price = this.$store.getters["price/price"];
			// Gather discount code
			let discountCode = this.$store.state.checkout.discountCode;
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
					service: "DuoQueue Division Boosting",
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
		this.changePrice();
		this.$root.$on("sendOrder", (token) => this.sendOrder(token));
	},
};
</script>
