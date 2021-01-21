<template>
	<v-row>
		<v-col cols="12" sm="6" md="7">
			<v-card raised class="mb-4">
				<v-container class="container">
					<!-- First we need to divide a row into two columns -->
					<v-row>
						<v-col>
							<v-btn color="primary" elevation="24" icon outlined x-large @click="decreaseCurrent">
								<v-icon>mdi-minus</v-icon>
							</v-btn>
							{{ currentLevel }}
							<v-btn color="primary" elevation="24" icon outlined x-large @click="increaseCurrent">
								<v-icon>mdi-plus</v-icon>
							</v-btn>
						</v-col>
						<v-col>
							<v-btn color="primary" elevation="24" icon outlined x-large @click="decreaseDesired">
								<v-icon>mdi-minus</v-icon>
							</v-btn>
							{{ desiredLevel }}
							<v-btn color="primary" elevation="24" icon outlined x-large @click="increaseDesired">
								<v-icon>mdi-plus</v-icon>
							</v-btn>
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
import levels from "~/assets/js/levels";

export default {
	layout: "order",
	data: () => ({
		levels: levels,
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
			{
				checked: false,
				icon: "mdi-plus",
				title: "I will pprovide XP boost for each game at",
				percentage: -10,
				tip:
					"If you will provide XP boost for every game, select this option for a cheaper price.",
			},
		],
		currentLevel: 2,
		desiredLevel: 30,
	}),
	watch: {
		currentLevel() {
			this.changePrice();
		},
		desiredLevel() {
			this.changePrice();
		},
	},
	methods: {
		increaseCurrent() {
			if (this.currentLevel >= 29) return;
			this.currentLevel++;
		},
		decreaseCurrent() {
			if (this.currentLevel <= 2) return;
			this.currentLevel--;
		},
		increaseDesired() {
			if (this.desiredLevel >= 30) return;
			this.desiredLevel++;
		},
		decreaseDesired() {
			if (this.desiredLevel <= 3) return;
			this.desiredLevel--;
		},
		changePrice() {
			let filteredLevels = _.filter(this.levels, (level) =>
				// This is a whereIn replacement
				_.range(this.desiredLevel, this.currentLevel).includes(
					level.level
				)
			);
			// Sum up their prices using JS reduce
			let total = filteredLevels.reduce((sum, level) => {
				return sum + level.price;
			}, 0);
			// Get the current level and desired level
			// Accumulate the prices based on the range from lodash
			this.$store.commit("price/changePrice", total);
		},
	},
	mounted() {
		this.changePrice();
	},
};
</script>
