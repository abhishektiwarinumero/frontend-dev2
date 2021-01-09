<template>
	<section class="services">
		<v-img aspect-ratio="1.8" src="/img/indexAssets/services.png" class="bg" />
		<v-container>
			<div ref="servicesViewPort" class="servicesViewPort"></div>
			<v-row class="section-title flex-center mb-10">
				<h1>Our Services</h1>
			</v-row>
			<div class="services-top">
				<div class="img-top-container" v-for="(service, index) in services_top" :key="index" :style="{ transitionDelay: `${0.3 * (index + 1)}s` }" :class="isVisible ? 'service-top-animate' : ''">
					<img class="img-top" :src="service.image" />
				</div>
			</div>
			<div class="services-bottom mt-10 mb-10">
				<div class="img-bottom-container" v-for="(service, index) in services_bottom" :key="index" :style="{ transitionDelay: `${0.3 * (services_top.length + 1)}s` }" :class="isVisible ? 'service-bottom-animate' : ''">
					<img class="img-bottom" :src="`/img/games/${service}`" />
				</div>
			</div>
		</v-container>
	</section>
</template>

<script>
import games from "~/assets/js/games";

export default {
	data: () => ({
		services_top: games,
		services_bottom: [
			"unranked_smurf.png",
			"coaching.png",
			"account_market.png",
		],
		isVisible: false,
	}),
	methods: {
		isInViewport(element) {
			const rect = element.getBoundingClientRect();
			return (
				rect.top + rect.height > 0 && rect.top - window.innerHeight < 0
			);
		},
		handleAnimations() {
			let isInViewport = this.isInViewport(this.$refs.servicesViewPort);
			if (isInViewport && !this.isVisible) {
				this.isVisible = true;
			}
		},
	},
	mounted() {
		window.addEventListener("scroll", this.handleAnimations);
		window.addEventListener("resize", this.handleAnimations);
		this.handleAnimations();
	},
	beforeDestroy() {
		window.removeEventListener("scroll", this.handleAnimations);
		window.addEventListener("resize", this.handleAnimations);
	},
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
	margin-top: -80px;
}
.bg {
	position: absolute;
	width: 100%;
	filter: contrast(50%);
	z-index: 1;
}
.container {
	position: relative;
	z-index: 3;
}
.section-title {
	font-size: 24px;
	margin-top: 80px;
}
.services-top {
	width: 100%;
	display: grid;
	grid-template-columns: repeat(5, 1fr);
	box-sizing: border-box;
}
.img-top-container {
	width: 100%;
	height: 100%;
	transition-duration: 0.3s;
	transition-timing-function: cubic-bezier(0.895, 0.03, 0.685, 0.22);
	transform: scale(1.2) rotateY(90deg);
}
.img-top {
	width: 100%;
	filter: grayscale(100%);
	transition-duration: 0.15s;
}
.img-top:hover {
	filter: grayscale(0%);
	transform: scale(1.05);
	cursor: pointer;
}
.services .service-top-animate {
	transform: scale(1.2) rotateY(0deg);
}
.services-bottom {
	width: 100%;
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	grid-gap: 40px;
	gap: 40px;
	box-sizing: border-box;
	padding: 0 32px;
}
.img-bottom-container {
	width: 100%;
	height: 100%;
	transition-duration: 0.3s;
	transition-timing-function: cubic-bezier(0.895, 0.03, 0.685, 0.22);
	transform: rotateX(90deg);
}
.img-bottom {
	width: 100%;
	filter: grayscale(100%);
	transition-duration: 0.15s;
}
.img-bottom:hover {
	filter: grayscale(0%);
	transform: scale(1.05);
	cursor: pointer;
}
.services .service-bottom-animate {
	transform: scale(1.05) rotateX(0deg);
}
.servicesViewPort {
	position: absolute;
	top: 40%;
	width: 100%;
	height: 20%;
	z-index: 5;
}
@media only screen and (max-width: 1600px) {
	section {
		margin-top: -160px;
	}
}
@media only screen and (max-width: 1200px) {
	.bg {
		width: inherit;
		height: 100%;
	}
}
</style>
