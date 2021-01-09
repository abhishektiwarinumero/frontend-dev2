<template>
	<v-container>
		<div v-if="error.statusCode === 404">
			<v-row align="center" justify="center" class="mt-6 mb-6">
				<h1>Page not found</h1>
			</v-row>
			<v-row align="center" justify="center">
				<img src="/img/404.svg" alt="404" />
			</v-row>
		</div>
		<v-row v-else>
			<h1>{{ otherError }}</h1>
			<NuxtLink to="/">Home page</NuxtLink>
		</v-row>
	</v-container>
</template>

<script>
export default {
	props: {
		error: {
			type: Object,
			default: null,
		},
	},
	data: () => ({
		pageNotFound: "404 Not Found",
		otherError: "An error occurred",
	}),
	head() {
		const title =
			this.error.statusCode === 404 ? this.pageNotFound : this.otherError;
		return {
			title,
		};
	},
};
</script>

<style scoped>
h1 {
	font-size: 20px;
}
</style>
