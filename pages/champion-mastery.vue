<template>
	<v-layout column full fill-height class="page">
		<v-container>
			<v-row class="flex-center">
				<img src="/img/logo/logo.png" width="700" />
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
								<v-card raised>
									<v-container>
										<v-row>
											<v-col md="3">1. Champion</v-col>
											<v-col md="3">2. Current tier</v-col>
											<v-col md="3">3. Desired tier</v-col>
											<v-col md="3">4. Token remaining</v-col>
										</v-row>
										<v-row justify="center" align="center">
											<v-col>
												<v-avatar size="128">
													<v-img :src="`/img/champions/${champion}.png`"></v-img>
												</v-avatar>
											</v-col>
											<v-col>
												<v-avatar size="128">
													<v-img :src="`/img/tiers/${currentTier}.png`"></v-img>
												</v-avatar>
											</v-col>
											<v-col>
												<v-avatar size="128">
													<v-img :src="`/img/tiers/${desiredTier}.png`"></v-img>
												</v-avatar>
											</v-col>
											<v-col>
												<span v-text="token" class="text-h1 purple--text"></span>
											</v-col>
										</v-row>
										<v-row>
											<v-col>
												<v-select v-model="champion" :items="champions" item-text="name" item-value="name"></v-select>
											</v-col>
											<v-col>
												<v-select v-model="currentTier" :items="[0,1,2,3,4,5,6]"></v-select>
											</v-col>
											<v-col>
												<v-select v-model="desiredTier" :items="[1,2,3,4,5,6,7]"></v-select>
											</v-col>
											<v-col>
												<v-select v-model="token" :items="[1,2,3,4,5]"></v-select>
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
import services from "~/assets/js/services";
import champions from "~/assets/js/champions";
export default {
	transition: "slide-bottom",
	data: () => ({
		games: games,
		// We need all services in order to grab the first one of each game
		// Then we use that to define the link of the first service in a game
		services: services,
		champions: champions,
		champion: "Aatrox",
		currentTier: 5,
		desiredTier: 7,
		token: 5,
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
		this.$store.commit("wins/changeNumberOfWins", 1);
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
