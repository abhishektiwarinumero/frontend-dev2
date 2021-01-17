<template>
	<v-layout column full fill-height class="page">
		<v-container>
			<v-row class="flex-center">
				<v-img src="/img/logo/logo.png" width="700" />
			</v-row>
			<games-slider />
			<v-row class="flex-center mb-4">
				<h1>Win & Division Duo Queue Boosting</h1>
			</v-row>
			<game-services :services="gameServices" />
			<v-row class="flex-center">
				<v-row class="order-form">
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
		gameServices() {
			return _.filter(this.services, [
				"game",
				_.find(this.services, ["slug", this.$route.name]).game,
			]);
		},
	},
	mounted() {
		// So price doesn't get multiplied, because there are no wins in division boosting
		this.$store.commit("slider/changeAmount", 1);
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
