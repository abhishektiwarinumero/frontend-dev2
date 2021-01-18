<template>
	<v-row>
		<v-col cols="12" sm="6" md="7">
			<season-end-rank />
			<slider title step :showMode="false" :max="3" />
		</v-col>
		<v-col cols="6" md="5">
			<checkout :options="options" />
			<boost-me />
		</v-col>
	</v-row>
</template>

<script>
export default {
	layout: "order",
	data: () => ({
		options: [
			{
				checked: false,
				icon: "mdi-account-remove",
				title: "Appear offline on chat",
				percentage: 0,
				tip:
					"This option will make your account offline in the League Client chat, therefore your friends won't see when the booster is playing on your account",
			},
			{
				checked: false,
				icon: "mdi-account-group",
				title: "Specific agents",
				percentage: 0,
				tip:
					"You may determine what agents your assigned booster will be playing with, while boosting your account.",
			},
			{
				checked: false,
				icon: "mdi-account-plus",
				title: "Play with booster at",
				percentage: 50,
				tip:
					"The assigned booster will play with you from an other account, so you can keep playing on your own while being boosted.",
			},
			{
				checked: false,
				icon: "mdi-flash",
				title: "Priority order at",
				percentage: 20,
				tip:
					"This option ensures that your order will be treated with a higher priority, thus resulting in a faster completion.",
			},
			{
				checked: false,
				icon: "mdi-video",
				title: "With Streaming at",
				percentage: 15,
				tip:
					"Your assigned booster will record/live stream all the games, depending on your requirements.",
			},
		],
	}),
	mounted() {
		this.$store.commit("slider/changeAmount", 3);
	},
};
</script>
