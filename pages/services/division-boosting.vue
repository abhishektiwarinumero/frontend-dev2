<template>
	<v-row>
		<v-col cols="12" sm="6" md="7">
			<current title="Current League" description="Please select your Current Rank and Division" :tiers="tiers" suffix="Current LP" showPointsSelection lpTooltip="Your current Rank Rating amount." @divisionChanged="changePrice" @lpchanged="changePrice" @mmrchanged="changePrice" />
			<desired title="Desired League" description="Please select your Desired Rank and Division" :tiers="tiers" @divisionChanged="changePrice" />
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
						return _.map(tier.divisions, (division) => {
							return { id: division.id, price: division.price };
						});
					} else {
						return tier.price;
					}
				})
			);
			let fromId;
			let currentTier = this.$store.state.current.tier;
			if (currentTier.divisions) {
				fromId = this.$store.state.current.division.id;
			} else {
				fromId = currentTier.id;
			}
			let toId;
			let desiredTier = this.$store.state.desired.tier;
			if (desiredTier.divisions) {
				toId = this.$store.state.desired.division.id;
			} else {
				toId = desiredTier.id;
			}
			let filteredPrices = _.filter(allPrices, (price) =>
				// This is a whereIn replacement
				_.range(fromId + 1, toId + 1).includes(price.id)
			);
			// Sum up their prices using JS reduce
			let total = filteredPrices.reduce((sum, price) => {
				return sum + price.price;
			}, 0);
			// Get the MMR from the VueX store
			// We need to get its price from the currently selected division
			let filtered_mmrs = _.filter(currentTier.mmrs, (mmr) =>
				_.range(this.$store.state.current.mmr.id, 1).includes(mmr.id)
			);

			let mmr_total = filtered_mmrs.reduce((sum, mmr) => {
				return sum + mmr.price;
			}, 0);

			// Load price of (get it from currently selected desired division)
			this.$store.commit(
				"price/changePrice",
				total + mmr_total - currentTier.lp
			);
		},
		sendOrder(token) {
			// Gather current tier and division
			let currentTier = this.$store.state.current.tier;
			let currentDivision = this.$store.state.current.division;
			// Gather desired tier and division
			let desiredTier = this.$store.state.desired.tier;
			let desiredDivision = this.$store.state.desired.division;
			let mmr = this.$store.state.current.mmr;
			// Gather LP
			this.$store.commit(
				"checkout/addOption",
				// We shouldn't send the value of the LP, but the rank name and suffix it with LP
				this.$store.state.current.lp + " LP"
			);
			// Gather MMR
			this.$store.commit(
				"checkout/addOption",
				// Same thing goes for MMR as stated above
				`+${mmr.range} LP`
			);
			// Construct the purchase string
			// Purchase here is "current (tier & division) to desired (tier & division)"
			let purchase = `${currentTier.name} ${currentDivision.name} to ${desiredTier.name} ${desiredDivision.name}`;
			// Gather game queue (solo/duo)
			this.$store.commit(
				"checkout/addOption",
				this.$store.state.desired.queue
			);
			// Get all data from store and post them to DB
			this.$axios
				.post("orders", {
					purchase,
					service: "Division Boosting",
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
