<template>
	<div>
		<div class="title">
			<div class="title-id">
				<h2>1</h2>
			</div>
			<h2 class="title-txt">Season End Rank</h2>
			<h3 class="title-txt">Please select your Season End Rank and Division</h3>
		</div>
		<v-card raised class="mb-4" :style="{ boxShadow: rank.box_shadow }">
			<v-container>
				<v-row align="center" justify="center">
					<v-col md="3">
						<img :src="division.image" :alt="rank.name" loading="lazy" width="170" />
					</v-col>
					<v-col md="9" class="have-selectors">
						<v-row>
							<v-col>
								<v-select :items="ranks" label="Current rank" dense solo v-model="selectedrankID" item-text="name" item-value="id"></v-select>
							</v-col>
							<v-col>
								<v-select :items="rank.divisions" label="Current division" dense solo v-model="selectedDivisionID" item-text="name" item-value="id"></v-select>
							</v-col>
						</v-row>
						<v-row>
							<v-col>
								<v-select :items="servers" v-model="server" label="Select your server" dense solo></v-select>
							</v-col>
						</v-row>
					</v-col>
				</v-row>
			</v-container>
		</v-card>
	</div>
</template>

<script>
import ranks from "~/assets/js/ranks";
import servers from "~/assets/js/servers";

export default {
	data: () => ({
		ranks: ranks,
		servers: servers,
	}),
	computed: {
		selectedrankID: {
			get() {
				return this.$store.state.valorant.placement_matches.current
					.rank;
			},
			set(id) {
				this.$store.commit(
					"valorant/placement_matches/current/changerank",
					id
				);
				this.selectedDivisionID = this.rank.divisions[2].id;
			},
		},
		selectedDivisionID: {
			get() {
				return this.$store.state.valorant.placement_matches.current
					.division;
			},
			set(id) {
				this.$store.commit(
					"valorant/placement_matches/current/changeDivision",
					id
				);
			},
		},
		server: {
			get() {
				return this.$store.state.valorant.placement_matches.current
					.server;
			},
			set(server) {
				this.$store.commit(
					"valorant/placement_matches/current/changeServer",
					server
				);
			},
		},
		rank() {
			let index = this.$store.state.valorant.placement_matches.current
				.rank;
			return _.find(this.ranks, ["id", index]);
		},
		division() {
			return _.find(this.rank.divisions, ["id", this.selectedDivisionID]);
		},
	},
};
</script>

<style scoped>
.have-selectors {
	padding-right: 20px;
	padding-left: 20px;
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
.v-text-field {
	padding-top: 0px;
}
</style>
