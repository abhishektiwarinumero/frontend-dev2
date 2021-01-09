<template>
	<div>
		<div class="title">
			<div class="title-id">
				<h2>{{ stepNumber }}</h2>
			</div>
			<h2 class="title-txt">{{ title }}</h2>
		</div>
		<v-card raised class="mb-4">
			<v-container class="container">
				<v-slider v-model="wins" thumb-label="always" min="1" max="10" height="130"></v-slider>
				<v-radio-group class="radio-group" v-model="mode" dark mandatory row v-if="showMode">
					<v-radio label="Solo/Duo" value="Solo/Duo"></v-radio>
					<v-radio label="Flex 5v5" value="Flex"></v-radio>
				</v-radio-group>
			</v-container>
		</v-card>
	</div>
</template>

<script>
export default {
	props: {
		title: {
			type: String,
			required: false,
			default: "Select Your Number Of Wins",
		},
		showMode: {
			type: Boolean,
			required: false,
			default: true,
		},
		stepNumber: {
			type: Number,
			required: false,
			default: 2,
		}
	},
	data: () => ({
		mode: "Solo/Duo",
	}),
	computed: {
		tier() {
			return this.$store.state.league.tier;
		},
		wins: {
			get() {
				return this.$store.state.wins.wins;
			},
			set(value) {
				this.$store.commit("wins/changeNumberOfWins", value);
			},
		},
	},
	watch: {
		mode(value) {
			this.$store.commit("wins/changeGameMode", value);
		},
	},
};
</script>

<style scoped>
.container {
	display: flex;
	flex-direction: column;
	justify-content: center;
}

.radio-group {
	align-self: center;
	margin-top: 40px;
}

.title {
	display: flex;
	flex-direction: row;
	align-items: center;
	margin-bottom: 20px;
}

.title-txt {
	margin-left: 20px;
}

.title .title-id {
	color: #181818;
}

.title-id {
	width: 50px;
	height: 50px;
	border-radius: 50%;
	background: linear-gradient(#673ab7, #9c27b0);
	display: flex;
	align-items: center;
	justify-content: center;
}
</style>
