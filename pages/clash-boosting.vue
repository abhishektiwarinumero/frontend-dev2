<template>
	<v-layout column full fill-height class="page">
		<v-container>
			<v-row class="flex-center">
				<img src="/img/logo/logo.png" width="700" />
			</v-row>
			<games-slider />
			<v-row class="flex-center mb-4">
				<h1>Lol Clash Boosting</h1>
			</v-row>
			<game-services :services="gameServices" />
			<v-row class="flex-center">
				<v-row class="order-form">
					<v-form ref="order">
						<v-row>
							<v-col cols="12" sm="6" md="7">
								<v-card>
									<v-card-title>{{ label }} Current Tier</v-card-title>
									<v-card-subtitle>Please select your Current Tier</v-card-subtitle>
									<v-select :items="tiers" v-model="tier"></v-select>
									<v-select :items="servers" v-model="server" item-text="region" item-value="region"></v-select>
								</v-card>
								<select-number-of-wins title="Select Your Number Of Games" :showMode="false" />
								<select-number-of-wins title="Select Your Number Of Boosters" :showMode="false" :stepNumber="3" />
							</v-col>
							<v-col cols="6" md="5">
								<checkout :options="[]" />
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
		tier: "Tier III",
		tiers: ["Tier I", "Tier II", "Tier III", "Tier IV"],
		servers: servers,
		server: {
			id: 2,
			region: "EU-West",
		},
	}),
	computed: {
		label() {
			return this.tier.slice(5);
		},
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
