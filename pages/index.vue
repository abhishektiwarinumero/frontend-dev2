<template>
	<v-layout column>
		<v-container fluid class="welcome">
			<v-row align="center" justify="center">
				<logo-component></logo-component>
			</v-row>
			<v-row align="center" justify="center">
				<p class="font-weight-bold display-2 purple--text">
					Slogan Here
				</p>
			</v-row>
			<v-row align="center" justify="center">
				<v-btn class="ma-2" outlined color="purple">Elo Boosting</v-btn>
				<v-btn class="ma-2" outlined color="purple"
					>Unranked Smurf</v-btn
				>
				<v-btn class="ma-2" outlined color="purple"
					>League Ranked Accounts</v-btn
				>
			</v-row>
			<v-row style="background: rgba(0, 0, 0, 0.5)">
				<video-section></video-section>
			</v-row>
		</v-container>
		<services-circle />
		<features />
		<customer-voice />
		<how-to-buy />
		<WhyUs />
	</v-layout>
</template>

<script>
import WhyUs from "~/components/WhyUs.vue";
import Features from "~/components/Features.vue";
import HowToBuy from "~/components/HowToBuy.vue";
import CustomerVoice from "~/components/CustomerVoice.vue";
import ServicesCircle from "~/components/ServicesCircle.vue";

export default {
	components: {
		ServicesCircle,
		CustomerVoice,
		HowToBuy,
		WhyUs,
	},
};
</script>
