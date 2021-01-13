<template>
	<v-layout column full fill-height class="page">
		<v-container>
			<v-row class="flex-center">
				<img src="/img/logo/logo.png" width="700" />
			</v-row>
			<games-slider />
			<v-row class="flex-center mb-4">
				<h1>Valorant Boosting</h1>
			</v-row>
			<game-services :services="gameServices" icons />
			<v-row class="flex-center">
				<v-row class="order-form">
					<v-form ref="order">
						<v-row>
							<v-col cols="12" sm="6" md="7">
								<select-current-rank showServerSelection />
								<slider title step :showMode="false" />
							</v-col>
							<v-col cols="6" md="5">
								<checkout :options="options" />
								<boost-me />
							</v-col>
						</v-row>
					</v-form>
				</v-row>
			</v-row>
		</v-container>
		<why-us />
		<customers-voice />
	</v-layout>
</template>

<script>
import games from "~/assets/js/games";
import services from "~/assets/js/services";
export default {
	transition: "slide-bottom",
	data: () => ({
		games: games,
		// We need all services in order to grab the first one of each game
		// Then we use that to define the link of the first service in a game
		services: services,
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
				title: "Specific agents",
				percentage: 0,
				tip:
					"You may determine what agents your assigned booster will be playing with, while boosting your account.",
			},
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
		// So price doesn't get multiplied, because there are no wins in division boosting
		this.$store.commit("slider/changeAmount", 5);
		this.$store.commit("valorant/current/changeDivision", 9);
	},
};
</script>

<style scoped>
.page {
	background: url(/img/backgrounds/order.png);
	background-position: top;
	background-size: cover;
	background-repeat: no-repeat;
}

.flex-center {
	display: flex;
	justify-content: center;
	align-items: center;
}

.order-form {
	padding: 10px;
	background: #eeea;
}
</style>
