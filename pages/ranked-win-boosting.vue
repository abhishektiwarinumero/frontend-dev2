<template>
	<div>
		<div class="slider" fluid :style="{background: `url(/img/backgrounds/services/division-boosting-top-bg.png) top/cover`}">
			<v-row justify="center" align="center">
				<v-col md="8" style="text-align: center">
					<p class="text-overline">LOL ELO boost</p>
					<p class="font-weight-bold text-h3">Ranked Wins Boosting</p>
					<br />Ranked Wins Boost service lets you buy a specific amount of ranked net
					wins on your LoL account.
				</v-col>
				<games-slider />
			</v-row>
		</div>
		<game-services :services="gameServices"></game-services>
		<v-container>
			<v-form ref="order">
				<v-row>
					<v-col cols="12" sm="6" md="7">
						<select-current-league :showPointsSelection="false" showServerSelection />
						<select-number-of-wins />
					</v-col>
					<v-col cols="6" md="5">
						<checkout :options="options" />
						<boost-me />
					</v-col>
				</v-row>
			</v-form>
		</v-container>
		<how-it-works />
	</div>
</template>

<script>
import games from "~/assets/js/games";
import services from "~/assets/js/services";
export default {
	transition: "slide-bottom",
	data: () => ({
		games: games,
		services: services,
		options: [
			{
				checked: false,
				icon: "mdi-account-plus",
				title: "Play with booster at",
				percentage: 40,
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
				icon: "mdi-finance",
				title: "Games instead of wins at",
				percentage: -30,
				tip:
					"The booster will play games instead of net wins, each game played counts regardless of the outcome of the game.",
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
		game() {
			// How do we get the game
			// Router name is a service slug
			// Get that service game
			let service = _.find(this.services, ["slug", this.$route.name]);
			return _.find(this.games, ["name", service.game]);
		},
		gameServices() {
			return _.filter(this.services, ["game", this.game.name]);
		},
	},
	mounted() {
		this.$store.commit("wins/changeNumberOfWins", 4);
	},
};
</script>
