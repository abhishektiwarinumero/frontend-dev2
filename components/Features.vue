<template>
	<section class="features-section">
		<v-img src="/img/indexAssets/features.png" class="bg" />
		<v-row class="section-title flex-center mb-10">
			<h1>Features</h1>
		</v-row>
		<v-row v-for="(feature, index) in features" :key="index">
			<v-col class="feature" offset="3">
				<v-card :class="index % 2 ? 'bg-dark' : 'bg-white'" elevation="24">
					<v-row>
						<v-col xs="1" sm="2" class="icon-container" align-self="center">
							<v-icon v-if="!(index % 2)">{{ feature.icon }}</v-icon>
						</v-col>
						<v-col xs="10" sm="8">
							<p class="feature-title">{{ feature.title }}</p>
							<p class="feature-desc">{{ feature.description }}</p>
						</v-col>
						<v-col xs="1" sm="2" class="icon-container" align-self="center">
							<v-icon v-if="index % 2">{{ feature.icon }}</v-icon>
						</v-col>
					</v-row>
				</v-card>
			</v-col>
		</v-row>
		<v-img aspect-ratio="1.4" src="/img/indexAssets/featuresWhyUs.png" class="bg-fill" />
	</section>
</template>

<script>
export default {
	data: () => ({
		features: [
			{
				icon: "mdi-shield-account",
				title: "VPN Protection",
				description:
					"To offer the safest lol elo boost on the market, KingBoosting provides VPN protection on every order as a standard. The VPN feature helps to manage the IP address of the booster while boosting on the buyer’s account so the lol boosting process can stay undetected by RIOT.",
			},
			{
				icon: "mdi-incognito",
				title: "Privacy & Appear Offline",
				description:
					"We offer the appear offline feature for players who are looking to have a private boosting experience. This feature can be selected at checkout, and it assures 100% privacy, as the boosted LoL account shows as offline in the friend list while the lol boosting process lasts.",
			},
			{
				icon: "mdi-timer",
				title: "Finish in time guarantee",
				description:
					"KingBoosting is making sure that your lol elo boost is finished in time. Each submitted order is given a specific deadline and the booster’s goal is to meet this deadline in the fastest possible manner. The length of the boosting process depends on the details of the purchase, and the maximum time limit is indicated when selecting a lol boost.",
			},
			{
				icon: "mdi-target-account",
				title: "Order tracking",
				description:
					"KingBoosting has a built-in order tracking system for each purchased lol elo boost in the member’s area. The system offers different methods of order following, including a chart of the live match history of the LoL account that is being boosted, and a spectate button to watch the booster’s performance.",
			},
			{
				icon: "mdi-hours-24",
				title: "24/7 Live Customer Service & Support",
				description:
					"Kingboosting's help center includes 24/7 live chat support and phone assistance, offering any help related to your ELO boost.",
			},
			{
				icon: "mdi-seal",
				title: "Get to choose your champions & roles for free",
				description: "",
			},
		],
	}),
};
</script>

<style scoped>
.flex-center {
	display: flex;
	justify-content: center;
	align-items: center;
}
section {
	position: relative;
	width: 100%;
	box-sizing: border-box;
	margin-bottom: 80px;
}
.bg {
	position: absolute;
	width: 100%;
	filter: contrast(50%);
	z-index: 1;
}
.bg-fill {
	position: absolute;
	width: 100%;
	filter: contrast(50%);
	margin-top: -80px;
	z-index: 0;
}
.section-title {
	position: relative;
	font-size: 24px;
	margin-top: 7%;
	z-index: 3;
}
.feature {
	position: relative;
	z-index: 3;
	padding: 0 !important;
}
.bg-white {
	background: rgba(255, 255, 255, 0.2) !important;
}
.bg-dark {
	background: rgba(0, 0, 0, 0.6) !important;
}
.feature-desc {
	font-size: 14px !important;
	line-height: 18px !important;
}
.icon-container {
	display: flex;
	justify-content: center;
	align-items: center;
}
.v-icon {
	font-size: 80px !important;
}
@media only screen and (max-width: 1600px) {
	section {
		margin-top: -80px;
	}
}
@media only screen and (max-width: 1200px) {
	.bg {
		width: inherit;
		height: 100%;
	}
}
</style>
