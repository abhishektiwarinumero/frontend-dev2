<template>
	<div>
		<div class="title">
			<div class="title-id">
				<h2>1</h2>
			</div>
			<h2 class="title-txt">Select Your Current League</h2>
		</div>
		<v-card raised class="mb-4" :style="{boxShadow: tier.box_shadow}">
			<v-container>
				<v-row align="center" justify="center">
					<v-col md="3">
						<img :src="division.image || tier.image" :alt="tier.name" loading="lazy" width="200" />
					</v-col>
					<v-col md="9" class="have-selectors">
						<v-container>
							<v-row>
								<v-col>
									<v-select
										:items="tiers"
										:label="$t('Current tier')"
										dense
										solo
										v-model="selectedTierID"
										item-text="name"
										item-value="id"
									></v-select>
								</v-col>
								<v-col v-if="hasDivisions">
									<v-select
										:items="divisions"
										:label="$t('Current division')"
										dense
										solo
										v-model="selectedDivisionID"
										item-text="name"
										item-value="id"
									></v-select>
								</v-col>
							</v-row>
							<v-select
								:items="servers"
								:label="$t('Select your server')"
								dense
								solo
								v-model="selectedServerID"
								item-text="region"
								item-value="id"
							></v-select>
						</v-container>
					</v-col>
				</v-row>
			</v-container>
		</v-card>
	</div>
</template>

<script>
export default {
	data() {
		return {
			// We should use the index in the array instead of the ID
			tiers: [
				{
					id: 1,
					name: "Iron",
					box_shadow:
						"inset 60px 0 120px rgba(152,129,108,.2), 0 0 9px 0 rgba(0,0,0,.6)",
					divisions: [
						{
							id: 1,
							image: "/img/divisions/iron/IV.webp",
							price: 1.9,
							name: "IV"
						},
						{
							id: 2,
							image: "/img/divisions/iron/III.png",
							price: 1.9,
							name: "III"
						},
						{
							id: 3,
							image: "/img/divisions/iron/II.png",
							price: 1.9,
							name: "II"
						},
						{
							id: 4,
							image: "/img/divisions/iron/I.png",
							price: 1.9,
							name: "I"
						}
					]
				},
				{
					id: 2,
					name: "Bronze",
					box_shadow:
						"inset 60px 0 120px rgba(89,60,28,.2), 0 0 9px 0 rgba(0,0,0,.6)",
					divisions: [
						{
							id: 5,
							image: "/img/divisions/bronze/IV.png",
							price: 1.9,
							name: "IV"
						},
						{
							id: 6,
							image: "/img/divisions/bronze/III.png",
							price: 1.9,
							name: "III"
						},
						{
							id: 7,
							image: "/img/divisions/bronze/II.png",
							price: 1.9,
							name: "II"
						},
						{
							id: 8,
							image: "/img/divisions/bronze/I.png",
							price: 1.9,
							name: "I"
						}
					]
				},
				{
					id: 3,
					name: "Silver",
					box_shadow:
						"inset 60px 0 120px rgba(119,134,131,.2), 0 0 9px 0 rgba(0,0,0,.6)",
					divisions: [
						{
							id: 9,
							image: "/img/divisions/silver/IV.webp",
							price: 1.9,
							name: "IV"
						},
						{
							id: 10,
							image: "/img/divisions/silver/III.webp",
							price: 2.9,
							name: "III"
						},
						{
							id: 11,
							image: "/img/divisions/silver/II.webp",
							price: 2.9,
							name: "II"
						},
						{
							id: 12,
							image: "/img/divisions/silver/I.webp",
							price: 3.9,
							name: "I"
						}
					]
				},
				{
					id: 4,
					name: "Gold",
					box_shadow:
						"inset 60px 0 120px rgba(228,189,62,.2), 0 0 9px 0 rgba(0,0,0,.6)",
					divisions: [
						{
							id: 13,
							image: "/img/divisions/gold/IV.webp",
							price: 3.9,
							name: "IV"
						},
						{
							id: 14,
							image: "/img/divisions/gold/III.webp",
							price: 4.9,
							name: "III"
						},
						{
							id: 15,
							image: "/img/divisions/gold/II.webp",
							price: 4.9,
							name: "II"
						},
						{
							id: 16,
							image: "/img/divisions/gold/I.webp",
							price: 5.9,
							name: "I"
						}
					]
				},
				{
					id: 5,
					name: "Platinum",
					box_shadow:
						"inset 60px 0 120px rgba(57,123,135,.2), 0 0 9px 0 rgba(0,0,0,.6)",
					divisions: [
						{
							id: 17,
							image: "/img/divisions/platinum/IV.webp",
							price: 6.9,
							name: "IV"
						},
						{
							id: 18,
							image: "/img/divisions/platinum/III.webp",
							price: 6.9,
							name: "III"
						},
						{
							id: 19,
							image: "/img/divisions/platinum/II.webp",
							price: 7.9,
							name: "II"
						},
						{
							id: 20,
							image: "/img/divisions/platinum/I.webp",
							price: 9.9,
							name: "I"
						}
					]
				},
				{
					id: 6,
					name: "Diamond",
					box_shadow:
						"inset 60px 0 120px rgba(48,113,222,.2), 0 0 9px 0 rgba(0,0,0,.6)",
					divisions: [
						{
							id: 21,
							image: "/img/divisions/diamond/IV.webp",
							price: 12.9,
							name: "IV"
						},
						{
							id: 22,
							image: "/img/divisions/diamond/III.webp",
							price: 16.9,
							name: "III"
						},
						{
							id: 23,
							image: "/img/divisions/diamond/II.webp",
							price: 21.9,
							name: "II"
						},
						{
							id: 24,
							image: "/img/divisions/diamond/I.webp",
							price: 22.9,
							name: "I"
						}
					]
				},
				{
					id: 7,
					name: "Master",
					box_shadow:
						"inset 60px 0 120px rgba(128,29,161,.2), 0 0 9px 0 rgba(0,0,0,.6)",
					image: "/img/divisions/master.webp",
					price: 26.9
				},
				{
					id: 8,
					name: "Grandmaster",
					box_shadow:
						"inset 60px 0 120px rgba(161,29,29,.2), 0 0 9px 0 rgba(0,0,0,.6)",
					image: "/img/divisions/grandmaster.webp",
					price: 29.9
				},
				{
					id: 9,
					name: "Challenger",
					box_shadow:
						"inset 60px 0 120px rgba(161,113,29,.2), 0 0 9px 0 rgba(0,0,0,.6)",
					image: "/img/divisions/challenger.webp",
					price: 32.9
				}
			],
			tier: { wins: [] }, // Currently selected tier, wins is an empty array because it's used in template
			selectedTierID: 3, // Silver
			divisions: [],
			selectedDivisionID: 12, // Silver I
			division: {}, // Currently selected division
			hasDivisions: true,
			selectedServerID: 2,
			servers: []
		};
	},
	watch: {
		selectedTierID(tierId) {
			this.tier = _.find(this.tiers, ["id", tierId]);
			this.$store.commit("league/changeTier", this.tier);
			// Get max num of wins and commit it to store
			let max = _.maxBy(this.tier.wins, "wins").wins;
			this.$store.commit("wins/changeMaxNumberOfWins", max);
			if (!_.isEmpty(this.tier.divisions)) {
				// Divisions not empty, therefor less than master
				this.hasDivisions = true;
				this.divisions = this.tier.divisions;
				this.selectedDivisionID = this.tier.divisions[0].id;
			} else {
				// Set division to an empty object with null image to pass coalesce in template
				this.division = { image: null };
				// Remove the divisions select from the DOM
				this.hasDivisions = false;
				this.$store.commit("league/changeBasePrice", this.tier.price);
			}
		},
		selectedDivisionID(divisionId) {
			this.division = _.find(this.tier.divisions, ["id", divisionId]);
			this.$store.commit("league/changeDivision", this.division);
			this.$store.commit("league/changeBasePrice", this.division.price);
		},
		selectedServerID(value) {
			let server = _.find(this.servers, ["id", value]);
			this.$store.commit("league/changeServer", server.region);
		}
	},
	methods: {
		async getTiers() {
			const response = await this.$axios.post("/tiers", {
				service: document.location.pathname
			});
			// The tiers array is that list
			this.tiers = response.data;
			// The silver tier (default)
			this.tier = _.find(this.tiers, ["id", this.selectedTierID]);
			this.$store.commit("league/changeTier", this.tier);
			// Divisions of the first tier
			this.divisions = this.tier.divisions;
			// Division I
			this.division = _.find(this.divisions, [
				"id",
				this.selectedDivisionID
			]);
			this.$store.commit("league/changeDivision", this.division);
		}
	},
	mounted() {
		// this.getTiers();
		// this.$axios.$get("/servers").then(servers => (this.servers = servers));
	}
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
</style>

<i18n>
{
	"en": {
		"Current tier": "Current tier",
		"Current division": "Current division",
		"Select your server": "Select your server"
	}
}
</i18n>
