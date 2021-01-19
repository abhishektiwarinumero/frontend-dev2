<template>
	<v-row>
		<v-col cols="12" sm="6" md="7">
			<select-current-league />
			<select-desired-league />
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
				icon: "mdi-school",
				title: "With coaching at",
				percentage: 30,
				tip:
					"This option allows you to be in a voice call with our booster during and in between the games so he may give you tips and ideas for your improvement.",
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
				icon: "mdi-finance",
				title: "HIGH-MMR account at",
				percentage: 20,
				tip:
					"Your assigned booster will play with you from a high MMR account.",
			},
		],
	}),
};
</script>
