<template>
	<v-layout column>
		<v-container fluid class="welcome">
			<v-row align="center" justify="center">
				<logo-component></logo-component>
			</v-row>
			<slogan-component></slogan-component>
			<v-row align="center" justify="center">
				<v-btn class="ma-2" outlined color="white">Elo Boosting</v-btn>
				<v-btn class="ma-2" outlined color="white">Unranked Smurf</v-btn>
				<v-btn class="ma-2" outlined color="white">League Ranked Accounts</v-btn>
				<v-btn class="ma-2" outlined color="white">Coaching</v-btn>
			</v-row>
			<v-row style="background: rgba(0, 0, 0, 0.5);">
				<video-section></video-section>
			</v-row>
		</v-container>
		<services-circle />
		<features />
		<customer-voice />
		<how-to-buy />
		<WhyUs />
		<!-- <Blogs :firstArticle="firstArticle" :articlesCount="articlesCount" /> -->
	</v-layout>
</template>

<script>
import WhyUs from "~/components/WhyUs.vue";
// import Blogs from "~/components/Blogs.vue";
import Features from "~/components/Features.vue";
import HowToBuy from "~/components/HowToBuy.vue";
import CustomerVoice from "~/components/CustomerVoice.vue";
import ServicesCircle from "~/components/ServicesCircle.vue";

export default {
	async asyncData({ $axios, $sentry }) {
		try {
			const [
				// firstArticle,
				// articlesCount
			] = await Promise.all([
				// $axios.$get("/blog/first"),
				// $axios.$get("/blog/count")
			]);
			return {
				// firstArticle,
				// articlesCount
			};
		} catch (error) {
			$sentry.captureException(error);
		}
	},
	components: {
		ServicesCircle,
		CustomerVoice,
		HowToBuy,
		WhyUs
		// Blogs
	}
};
</script>
