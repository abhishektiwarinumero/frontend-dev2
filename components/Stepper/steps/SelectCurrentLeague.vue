<template>
	<div>
		<div class="title">
			<div class="title-id">
				<h2>1</h2>
			</div>
			<h2 class="title-txt">{{ title }}</h2>
		</div>
		<v-card raised class="mb-4" :style="{ boxShadow: tier.box_shadow }">
			<v-container>
				<v-row align="center" justify="center">
					<v-col md="3">
						<img :src="division.image || tier.image" :alt="tier.name" loading="lazy" width="170" />
					</v-col>
					<v-col md="9" class="have-selectors">
						<v-row>
							<v-col>
								<v-select :items="tiers" label="Current tier" dense solo v-model="selectedTierID" item-text="name" item-value="id"></v-select>
							</v-col>
							<v-col v-if="hasDivisions">
								<v-select :items="tier.divisions" label="Current division" dense solo v-model="selectedDivisionID" item-text="name" item-value="id" prefix="Division"></v-select>
							</v-col>
							<!-- if no divisions, points become text field -->
							<v-col v-else>
								<v-text-field v-model="points" hide-details single-line type="number" />
							</v-col>
						</v-row>
						<!-- LP & MMR -->
						<v-row v-if="showPointsSelection">
							<v-col v-if="hasDivisions">
								<!-- LP -->
								<v-tooltip top color="primary" max-width="350">
									<template v-slot:activator="{ on, attrs }">
										<!-- LP lowers the price -->
										<v-select v-bind="attrs" v-on="on" v-model="lp" :items="lps" dense solo suffix="LP"></v-select>
									</template>
									<span>Your current League Points amount</span>
								</v-tooltip>
							</v-col>
							<v-col>
								<v-tooltip top color="primary" max-width="350">
									<template v-slot:activator="{ on, attrs }">
										<!-- MMR increases the price -->
										<v-select v-bind="attrs" v-on="on" v-model="mmr" :items="tier.mmrs" item-text="range" item-value="id" dense solo suffix="MMR"></v-select>
									</template>
									<span>
										Please select the amount of LP you are expected to receive
										per win during the first couple of games of your order. We
										offer a wide variety of options to ensure that you don't pay
										more than, what is fair, but if you gain less LP in one of
										your first games than you declared you'll be asked to pay
										for the adjustment of your order later. Changes to your lp
										gain during the order -either positive or negative will not
										be your responsibility.
									</span>
								</v-tooltip>
							</v-col>
						</v-row>
						<v-select v-if="showServerSelection" :items="servers" label="Select your server" dense solo v-model="server"></v-select>
						<v-select v-if="showMarksSelection" :items="marks" v-model="mark" dense solo></v-select>
					</v-col>
				</v-row>
			</v-container>
		</v-card>
	</div>
</template>

<script>
import tiers from "~/assets/js/tiers";
import servers from "~/assets/js/servers";

export default {
	props: {
		showServerSelection: {
			type: Boolean,
			required: false,
			default: false,
		},
		showPointsSelection: {
			type: Boolean,
			required: false,
			default: false,
		},
		title: {
			type: String,
			required: false,
			default: "Select Your Current League",
		},
		showMarksSelection: {
			type: Boolean,
			required: false,
			default: false,
		},
		tiers: {
			type: Array,
			required: false,
			default: () => tiers,
		},
	},
	data: () => ({
		points: 0,
		lps: ["0-20", "21-40", "41-60", "61-80", "80-100"],
		marks: [
			"0 / 3 Mark Status",
			"1 / 3 Mark Status",
			"2 / 3 Mark Status",
			"3 / 3 Mark Status",
		],
		servers: servers,
	}),
	computed: {
		selectedTierID: {
			get() {
				return this.$store.state.league.tier;
			},
			set(id) {
				this.$store.commit("league/changeTier", id);
				if (this.hasDivisions) {
					this.selectedDivisionID = this.tier.divisions[3].id;
				}
			},
		},
		selectedDivisionID: {
			get() {
				return this.$store.state.league.division;
			},
			set(id) {
				this.$store.commit("league/changeDivision", id);
				this.$emit("divisionChanged");
			},
		},
		lp: {
			get() {
				return this.$store.state.league.lp;
			},
			set(lp) {
				this.$store.commit("league/changeLP", lp);
				this.$emit("lpchanged");
			},
		},
		mmr: {
			get() {
				return this.$store.state.league.mmr;
			},
			set(mmr) {
				this.$store.commit("league/changeMMR", mmr);
				this.$emit("mmrchanged");
			},
		},
		server: {
			get() {
				return this.$store.state.league.server;
			},
			set(server) {
				this.$store.commit("league/changeServer", server);
			},
		},
		mark: {
			get() {
				return this.$store.state.league.mark;
			},
			set(mark) {
				this.$store.commit("league/changeMark", mark);
			},
		},
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
