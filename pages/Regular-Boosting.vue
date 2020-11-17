<template>
	<div>
		<div
			class="slider"
			fluid
			:style="{background: 'url(/img/services/regular-boosting-top-bg.png) top/cover'}"
		>
			<v-row justify="center" align="center">
				<v-col md="8" style="text-align: center;">
					<p>Regular Boosting</p>
					<br />Regular Boosting allows our customers to buy the desired number of ranked wins. All you have to do is choose how many ranked wins you would like to have on.
				</v-col>
			</v-row>
			<services-slider :service="service" />
		</div>
		<v-container>
			<v-row>
				<v-col md="8">
					<Stepper />
				</v-col>
				<v-col md="4"></v-col>
			</v-row>
		</v-container>
		<how-to-buy />
	</div>
</template>

<script>
import Stepper from "~/components/Stepper";

export default {
	name: "regular-boosting",
	components: {
		Stepper
	},
	data() {
		return {
			slug: "",
			service: {
				id: 1,
				kind_id: 1,
				name: "Regular Boosting",
				image: "img/circles/12.png",
				description:
					"Regular Boosting allows our customers to buy the desired number of ranked wins. All you have to do is choose how many ranked wins you would like to have on.",
				subtitle:
					"Regular Boosting makes it possible to buy a guaranteed number of wins of your choice. We created regular boosting to be fast and easy, providing an efficient but high-quality service.",
				status: "Popular",
				slug: "regular-boosting",
				bg_img: "/img/services/regular-boosting-top-bg.png",
				deleted_at: null,
				created_at: "2020-11-17 19:32:07",
				updated_at: "2020-11-17 19:32:07"
			}
		};
	}
};
</script>
