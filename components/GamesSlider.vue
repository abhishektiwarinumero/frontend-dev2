<template>
	<v-slide-group v-model="currentGameIndex" mandatory show-arrows>
		<v-slide-item v-for="(game, index) in games" :key="index" v-slot="{ active, toggle }">
			<!-- Get first service, use its slug as a link -->
			<v-card :class="{ selectedGame: active }" @click="toggle" color="transparent" flat :ripple="false" nuxt :to="slug(game.name)">
				<v-img :src="game.image" :alt="game.name"></v-img>
				<v-card-title class="font-weight-bold text-overline text-center" style="display: block">{{ game.name }}</v-card-title>
			</v-card>
		</v-slide-item>
	</v-slide-group>
</template>

<script>
import games from "~/assets/js/games";
import services from "~/assets/js/services";
export default {
	data: () => ({
		currentGameIndex: 0,
		games: games,
		// We need all services in order to grab the first one of each game
		// Then we use that to define the link of the first service in a game
		services: services,
	}),
	methods: {
		slug(game) {
			let filteredServices = _.filter(this.services, ["game", game]);
			return _.first(filteredServices).slug;
		},
	},
	mounted() {
		// set initial value of currentGameIndex
		// Should be index of current service's game in the games array
		let service = _.find(this.services, ["slug", this.$route.name]);
		let gameName = service.game;
		let gameIndex = _.findIndex(this.games, ["name", gameName]);
		this.currentGameIndex = gameIndex;
	},
};
</script>
