<template>
	<v-row>
		<v-col cols="12" sm="6" md="7">
			<v-card raised class="mb-4 pa-4">
				<v-card-title>{{ label }} Current Tier</v-card-title>
				<v-card-subtitle>Please select your Current Tier</v-card-subtitle>
				<v-select :items="tiers" v-model="tier"></v-select>
				<v-select :items="servers" v-model="server"></v-select>
			</v-card>
			<slider title="Select Your Number Of Games" :showQueue="false" />
			<slider title="Select Your Number Of Boosters" :showQueue="false" :stepNumber="3" />
		</v-col>
		<v-col cols="6" md="5">
			<checkout :options="[]" />
			<boost-me />
		</v-col>
	</v-row>
</template>

<script>
import servers from "~/assets/js/servers";

export default {
	layout: "order",
	data: () => ({
		tier: "Tier III",
		tiers: ["Tier I", "Tier II", "Tier III", "Tier IV"],
		servers: servers,
		server: "EU-West",
	}),
	computed: {
		label() {
			return this.tier.slice(5);
		},
	},
	mounted() {
		this.$store.commit("slider/changeAmount", 4);
	},
};
</script>
