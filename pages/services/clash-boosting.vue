<template>
	<v-row>
		<v-col cols="12" sm="6" md="7">
			<v-card raised class="mb-4 pa-4">
				<v-card-title>{{ tier.label.slice(5) }} Current Tier</v-card-title>
				<v-card-subtitle>Please select your Current Tier</v-card-subtitle>
				<v-select :items="tiers" v-model="tier" item-text="label" item-value="price" return-object></v-select>
				<v-select :items="servers" v-model="server"></v-select>
			</v-card>
			<slider title="Select Your Number Of Games" :showQueue="false" />
			<boosters-slider @changeprice="changePrice" />
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
		tier: {},
		tiers: [
			{
				label: "Tier I",
				price: 12,
			},
			{
				label: "Tier II",
				price: 9,
			},
			{
				label: "Tier III",
				price: 7.5,
			},
			{
				label: "Tier IV",
				price: 6.2,
			},
		],
		servers: servers,
		server: "EU-West",
	}),
	watch: {
		tier() {
			this.changePrice();
		},
	},
	methods: {
		changePrice() {
			// Get the amount of boosters selected from the boosters_slider store
			// Multiply that amount by the tier price
			let boosters_selected = this.$store.state.boosters_slider.amount;
			this.$store.commit(
				"price/changePrice",
				this.tier.price * boosters_selected
			);
		},
	},
	created() {
		this.tier = _.find(this.tiers, ["label", "Tier III"]);
	},
	mounted() {
		setTimeout(() => {
			this.$store.commit("slider/changeAmount", 4);
		}, 300);
	},
};
</script>
