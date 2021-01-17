<template>
	<v-app dark>
		<notification-component></notification-component>
		<v-system-bar lights-out app height="20">
			<social-component></social-component>
			<v-spacer></v-spacer>
			<top-right-links></top-right-links>
		</v-system-bar>
		<app-bar-component></app-bar-component>
		<v-main>
			<v-container fluid>
				<nuxt v-if="!$slots.default" />
				<slot />
			</v-container>
		</v-main>
		<app-footer />
	</v-app>
</template>

<script>
export default {
	name: "Default",
};
</script>

<style scoped>
.container {
	padding: 0px;
}
</style>
