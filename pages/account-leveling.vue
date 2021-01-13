<template>
	<v-layout column full fill-height class="page">
		<v-container>
			<v-row class="flex-center">
				<img src="/img/logo/logo.png" width="700" />
			</v-row>
			<games-slider />
			<v-row class="flex-center mb-4">
				<h1>Account Leveling</h1>
			</v-row>
			<game-services :services="gameServices" />
			<v-row class="flex-center">
				<v-row class="order-form">
					<v-form ref="order">
						<v-row>
							<v-col cols="12" sm="6" md="7">
								<v-card raised class="mb-4">
									<v-container class="container">
										<!-- First we need to divide a row into two columns -->
										<v-row>
											<v-col>
												<v-btn color="primary" elevation="24" icon outlined x-large @click="currentLevel--">
													<v-icon>mdi-minus</v-icon>
												</v-btn>
												{{ currentLevel }}
												<v-btn color="primary" elevation="24" icon outlined x-large @click="currentLevel++">
													<v-icon>mdi-plus</v-icon>
												</v-btn>
											</v-col>
											<v-col>
												<v-btn color="primary" elevation="24" icon outlined x-large @click="desiredLevel--">
													<v-icon>mdi-minus</v-icon>
												</v-btn>
												{{ desiredLevel }}
												<v-btn color="primary" elevation="24" icon outlined x-large @click="desiredLevel++">
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
import servers from "~/assets/js/servers";
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
		currentLevel: 30,
		desiredLevel: 50,
	}),
	computed: {
		gameServices() {
			return _.filter(this.services, [
				"game",
				_.find(this.services, ["slug", this.$route.name]).game,
			]);
		},
	},
	mounted() {
		this.$store.commit("slider/changeAmount", 4);
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
