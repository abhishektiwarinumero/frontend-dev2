<template>
	<div>
		<div class="title">
			<div class="title-id">
				<h2>1</h2>
			</div>
			<h2 class="title-txt">Select Your Current League</h2>
		</div>
		<v-card raised class="mb-4" :style="{ boxShadow: tier.box_shadow }">
			<v-container>
				<v-row align="center" justify="center">
					<v-col md="3">
						<img
							:src="division.image || tier.image"
							:alt="tier.name"
							loading="lazy"
							width="200"
						/>
					</v-col>
					<v-col md="9" class="have-selectors">
						<v-container>
							<v-row>
								<v-col>
									<v-select
										:items="tiers"
										label="Current tier"
										dense
										solo
										v-model="selectedTierID"
										item-text="name"
										item-value="id"
									></v-select>
								</v-col>
								<v-col v-if="hasDivisions">
									<v-select
										:items="tier.divisions"
										label="Current division"
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
								label="Select your server"
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
import tiers from "~/data/tiers";
export default {
	data() {
		return {
			// We should use the index in the array instead of the ID
			tiers: tiers,
			selectedTierID: 3, // Silver
			selectedDivisionID: 12, // Silver I
			selectedServerID: "EU-West",
			servers: [
				"North America",
				"EU-West",
				"EU-Nordic & East",
				"Turkey",
				"Russia",
				"Brazil",
				"Latin America North",
				"Latin America South",
				"Oceania",
				"PBE",
			],
		};
	},
	computed: {
		tier() {
			let index = this.$store.state.league.tier;
			return _.find(this.tiers, ["id", index]);
		},
		division() {
			if (this.hasDivisions) {
				return _.find(this.tier.divisions, [
					"id",
					this.selectedDivisionID,
				]);
			}
			return { image: null };
		},
		hasDivisions() {
			return !_.isEmpty(this.tier.divisions);
		},
	},
	watch: {
		selectedTierID(id) {
			this.$store.commit("league/changeTier", id);
			if (this.hasDivisions) {
				this.selectedDivisionID = this.tier.divisions[3].id;
			}
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
</style>
