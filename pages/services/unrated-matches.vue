<template>
	<v-row>
		<v-col cols="12" sm="6" md="7">
			<slider title="Select Your Number Of Games" :showQueue="false" :image="image" :max="30" />
		</v-col>
		<v-col cols="6" md="5">
			<checkout :options="options" />
			<boost-me />
		</v-col>
	</v-row>
</template>

<script>
import options from "~/assets/js/unrated-matches/options";

export default {
	layout: "order",
	data: () => ({
		image: "/img/divisions/valorant/unranked.png",
		options: options,
	}),
	mounted() {
		// So price doesn't get multiplied, because there are no wins in division boosting
		this.$store.commit("slider/changeAmount", 5);
		this.$store.commit("valorant/current/changeDivision", 9);
	},
	beforeDestroy() {
		this.$store.commit("slider/changeAmount", 1);
	},
};
</script>
