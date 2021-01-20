<template>
	<v-row>
		<v-col cols="12" sm="6" md="7">
			<v-card raised>
				<v-container>
					<v-row>
						<v-col md="3">1. Champion</v-col>
						<v-col md="3">2. Current tier</v-col>
						<v-col md="3">3. Desired tier</v-col>
						<v-col md="3">4. Token remaining</v-col>
					</v-row>
					<v-row justify="center" align="center">
						<v-col>
							<v-avatar size="128">
								<v-img :src="`https://ddragon.leagueoflegends.com/cdn/8.18.2/img/champion/${champion}.png`"></v-img>
							</v-avatar>
						</v-col>
						<v-col>
							<v-avatar size="128">
								<v-img :src="`/img/tiers/${currentTier}.png`"></v-img>
							</v-avatar>
						</v-col>
						<v-col>
							<v-avatar size="128">
								<v-img :src="`/img/tiers/${desiredTier}.png`"></v-img>
							</v-avatar>
						</v-col>
						<v-col v-if="currentTier >= 5">
							<span v-text="token" class="text-h1 purple--text"></span>
						</v-col>
					</v-row>
					<v-row>
						<v-col>
							<v-select v-model="champion" :items="champions" item-text="name" item-value="name"></v-select>
						</v-col>
						<v-col>
							<v-select v-model="currentTier" :items="[0,1,2,3,4,5,6]"></v-select>
						</v-col>
						<v-col>
							<v-select v-model="desiredTier" :items="tiers" item-value="level" item-text="level"></v-select>
						</v-col>
						<v-col v-if="currentTier >= 5">
							<v-select v-model="token" :items="tokens"></v-select>
						</v-col>
					</v-row>
				</v-container>
			</v-card>
		</v-col>
		<v-col cols="6" md="5">
			<checkout :options="options" />
			<boost-me />
		</v-col>
	</v-row>
</template>

<script>
import champions from "~/assets/js/champions";

export default {
	layout: "order",
	data: () => ({
		champions: champions,
		champion: "Aatrox",
		currentTier: 5,
		desiredTier: 7,
		token: 5,
		maxTokens: 5,
		tiers: [
			{
				level: 0,
				price: 0,
			},
			{
				level: 1,
				price: 2.8,
			},
			{
				level: 2,
				price: 5.2,
			},
			{
				level: 3,
				price: 10,
			},
			{
				level: 4,
				price: 15.5,
			},
			{
				level: 5,
				price: 20.35,
			},
			{
				level: 6,
				price: 15,
			},
			{
				level: 7,
				price: 14,
			},
		],
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
		tokens() {
			// + 1 because lodash range behaves that way
			if (this.currentTier == 5 && this.desiredTier == 7) {
				return _.range(4, 6);
			}
			return _.range(this.startingRange, this.maxTokens + 1);
		},
	},
	watch: {
		currentTier() {
			this.changeMaxTokensRemainingAvailable();
			this.changePrice();
		},
		desiredTier() {
			this.changeMaxTokensRemainingAvailable();
			this.changePrice();
		},
		token() {
			this.changePrice();
		},
	},
	methods: {
		changeMaxTokensRemainingAvailable() {
			if (this.currentTier == 5 && this.desiredTier == 6) {
				this.maxTokens = 2;
				this.token = 2;
			} else if (this.currentTier == 6 && this.desiredTier == 7) {
				this.maxTokens = 3;
				this.token = 3;
			} else if (this.currentTier == 5 && this.desiredTier == 7) {
				// We need to change the tokens array to only include either 4 or 5
				this.token = 5;
			} else {
				this.token = 1;
			}
		},
		changePrice() {
			let filteredTiers = _.filter(this.tiers, (tier) =>
				// This is a whereIn replacement
				_.range(this.desiredTier, this.currentTier).includes(tier.level)
			);
			// Sum up their prices using JS reduce
			let total = filteredTiers.reduce((sum, tier) => {
				return sum + tier.price;
			}, 0);
			if (this.currentTier == 5 && this.desiredTier == 7) {
				total = 10;
			}
			// Load price of (get it from currently selected desired division)
			this.$store.commit("price/changePrice", total * this.token);
		},
		sendOrder(token) {
			// Construct the purchase string
			// Purchase here is "current (tier & division) to desired (tier & division)"
			let purchase = `Tier ${this.currentTier} to Tier ${this.desiredTier}`;
			// Gather selected server
			let server = this.$store.state.league.server;
			// Push the selected champion to the order's checkout options
			this.$store.commit("checkout/addOption", this.champion);
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
					service: "Champion Mastery Boosting",
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
