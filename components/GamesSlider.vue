<template>
	<v-row class="cards">
		<v-col class="card" v-for="(game, index) in games" :key="index">
			<div class="card-img-hider">
				<nuxt-link class="card-img-container flex-center" :to="game.slug" :class="{selectedGame: (index == currentGameIndex)}">
					<div class="card-img-bg"></div>
					<img class="card-img" :src="game.image" />
				</nuxt-link>
			</div>
		</v-col>
	</v-row>
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

<style scoped>
.flex-center {
	display: flex;
	justify-content: center;
	align-items: center;
}

.cards {
	display: grid;
	grid-template-columns: repeat(5, 1fr);
}

.card {
	width: 100%;
}

.card-img-hider {
	position: relative;
	overflow: hidden;
	transform: scale(1.2);
	display: flex;
	justify-content: center;
	transition-duration: 0.3s;
}

.card-img-container {
	position: relative;
	width: 100%;
	height: 320px;
	transform: translateY(5em);
	transition-duration: 0.3s;
	transition-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);
	filter: grayscale(100%);
}

.card-img-container:hover {
	transform: translateY(1em);
	cursor: pointer;
	filter: grayscale(0%);
}

.selectedGame {
	filter: grayscale(0%);
	background: url(/img/backgrounds/active-game-bg.png) no-repeat bottom;
}

.card-img-bg {
	position: absolute;
	top: 0;
	width: 58%;
	height: 12em;
	margin-top: 16px;
	box-shadow: 0px 0px 22px 0px #28153f77;
}

.card-img-container:hover .card-img-bg {
	box-shadow: 0px 0px 32px 0px #8746d4;
}

.card-img {
	position: absolute;
	top: 0;
	width: 100%;
}
</style>
