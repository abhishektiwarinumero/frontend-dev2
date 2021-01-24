<template>
	<div>
		<div class="title">
			<div class="title-id">
				<h2>1</h2>
			</div>
			<h2 class="title-txt">{{ title }}</h2>
			<h3 class="title-txt" v-if="description">{{ description }}</h3>
		</div>
		<v-card raised class="mb-4" :style="{ boxShadow: tier.box_shadow }">
			<v-container>
				<v-row align="center" justify="center">
					<v-col md="3">
						<v-img :src="image" :alt="tier.name" loading="lazy" width="170" />
					</v-col>
					<v-col md="9" class="have-selectors">
						<v-row>
							<v-col>
								<v-select :items="tiers" label="Current tier" dense solo v-model="tier" item-text="name" item-value="id" return-object></v-select>
							</v-col>
							<v-col v-if="tier.divisions">
								<v-select :items="tier.divisions" label="Current division" dense solo v-model="division" item-text="name" item-value="id" prefix="Division" return-object></v-select>
							</v-col>
							<!-- if no divisions, points become text field -->
							<v-col v-else>
								<v-text-field v-model="points" hide-details single-line type="number" :suffix="suffix" />
							</v-col>
						</v-row>
						<!-- LP & MMR -->
						<v-row v-if="showPointsSelection">
							<v-col v-if="tier.divisions">
								<!-- LP -->
								<v-tooltip top color="primary" max-width="350">
									<template v-slot:activator="{ on, attrs }">
										<!-- LP lowers the price -->
										<v-select v-bind="attrs" v-on="on" v-model="lp" :items="lps" dense solo :suffix="lpSuffix"></v-select>
									</template>
									<span>{{ lpTooltip }}</span>
								</v-tooltip>
							</v-col>
							<v-col v-if="mmrs">
								<v-tooltip top color="primary" max-width="350">
									<template v-slot:activator="{ on, attrs }">
										<!-- MMR increases the price -->
										<v-select v-bind="attrs" v-on="on" v-model="mmr" :items="tier.mmrs" item-text="range" item-value="id" dense solo suffix="MMR" return-object></v-select>
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
						<v-select v-if="showServerSelection" :items="servers" v-model="server" label="Select your server" dense solo></v-select>
						<v-select v-if="showMarksSelection" :items="marks" v-model="mark" dense solo></v-select>
					</v-col>
				</v-row>
			</v-container>
		</v-card>
	</div>
</template>

<script>
import servers from "~/assets/js/servers";

export default {
	props: {
		title: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: false,
			default: null,
		},
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
		// Determine whether or not to show MMR selection
		mmrs: {
			type: Boolean,
			required: false,
			default: false,
		},
		showMarksSelection: {
			type: Boolean,
			required: false,
			default: false,
		},
		tiers: {
			type: Array,
			required: true,
		},
		suffix: {
			type: String,
			required: false,
			default: "LP",
		},
		lpTooltip: {
			type: String,
			required: false,
			default: "Your current current Points amount",
		},
		lpSuffix: {
			type: String,
			required: false,
			default: null,
		},
	},
	data: () => ({
		tier: {},
		division: { image: null },
		points: 0,
		lps: ["0-20", "21-40", "41-60", "61-80", "81-100"],
		marks: [
			"0 / 3 Mark Status",
			"1 / 3 Mark Status",
			"2 / 3 Mark Status",
			"3 / 3 Mark Status",
		],
		servers: servers,
	}),
	computed: {
		lp: {
			get() {
				return this.$store.state.current.lp;
			},
			set(lp) {
				this.$store.commit("current/changeLP", lp);
				this.$emit("lpchanged");
			},
		},
		mmr: {
			get() {
				return this.$store.state.current.mmr;
			},
			set(mmr) {
				this.$store.commit("current/changeMMR", mmr);
				this.$emit("mmrchanged");
			},
		},
		server: {
			get() {
				return this.$store.state.current.server;
			},
			set(server) {
				this.$store.commit("current/changeServer", server);
			},
		},
		mark: {
			get() {
				return this.$store.state.current.mark;
			},
			set(mark) {
				this.$store.commit("current/changeMark", mark);
			},
		},
		image() {
			if (this.tier.divisions) {
				return this.division.image;
			}
			return this.tier.image;
		},
	},
	watch: {
		tier(tier) {
			this.$store.commit("current/changeTier", tier);
			if (this.tier.divisions) {
				this.division = _.find(this.tier.divisions, ["name", "I"]);
			} else {
				this.$emit("divisionChanged");
			}
		},
		division(division) {
			this.$store.commit("current/changeDivision", division);
			this.$emit("divisionChanged");
		},
	},
	created() {
		this.tier = _.find(this.tiers, ["name", "Silver"]);
		this.mmr = _.find(this.tier.mmrs, ["range", "19-21"]);
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
