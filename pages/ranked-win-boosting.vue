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
						<checkout />
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
		this.$store.commit("wins/changeNumberOfWins", 1);
	},
};
</script>
