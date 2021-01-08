<template>
	<div>
		<div class="slider" fluid :style="{background: `url(/img/backgrounds/services/champion-mastery-top-bg.png) top/cover`}">
			<v-row justify="center" align="center">
				<v-col md="8" style="text-align: center">
					<p class="text-overline">LOL ELO boost</p>
					<p class="font-weight-bold text-h3">Win & Division Duo Queue Boosting</p>
					<br />We provide a professional player to play duo queue and help you reach your ranked goals.
				</v-col>
				<games-slider />
			</v-row>
		</div>
		<game-services :services="gameServices"></game-services>
		<v-container>
			<v-form ref="order">
				<v-row>
					<v-col cols="12" sm="6" md="7">
						<select-current-league />
						<select-desired-league />
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
		// So price doesn't get multiplied, because there are no wins in division boosting
		this.$store.commit("wins/changeNumberOfWins", 1);
	},
};
</script>
