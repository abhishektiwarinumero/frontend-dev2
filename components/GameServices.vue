<template>
	<v-row class="services">
		<v-tabs grow centered color="primary" slider-size="5">
			<v-tab v-for="(service, index) in services" :key="index" class="service" nuxt :to="service.slug">
				<img class="service-img" :src="`/img/services/${service.slug}.png`" />
			</v-tab>
		</v-tabs>
	</v-row>
</template>

<script>
export default {
	props: {
		services: {
			type: Array,
			required: true,
		},
	},
};
</script>

<style scoped>
.services {
	margin: 1em -1.5em !important;
}

.service {
	width: 10em;
	padding: 0;
	background: #222;
	margin: 0 0.2em;
}

.service-img {
	width: 100%;
}
</style>
