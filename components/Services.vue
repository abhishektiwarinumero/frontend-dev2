<template>
  <section class="services">
    <div ref="servicesViewPort" class="servicesViewPort"></div>
    <v-row class="section-title flex-center text-h4">Our Services</v-row>
    <div class="services-top">
      <div
        class="img-top-container"
        v-for="(service, index) in services_top"
        :key="index"
        :style="{ transitionDelay: `${0.3 * (index + 1)}s` }"
        :class="isVisible ? 'service-top-animate' : ''"
      >
        <img class="img-top" :src="`/img/games/cards/${service}`" />
      </div>
      <div class="services-bottom mt-10 mb-10">
        <div
          class="img-bottom-container"
          v-for="(service, index) in services_bottom"
          :key="index"
          :style="{ transitionDelay: `${0.3 * services_top.length + 1}s` }"
          :class="isVisible ? 'service-bottom-animate' : ''"
        >
          <img class="img-bottom" :src="`/img/games/cards/${service}`" />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data: () => ({
    services_top: [
      "lol_boost.png",
      "valorant_boost.png",
      "tft_boost.png",
      "wildrift_boost.png",
      "runeterra_boost.png",
    ],
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
      return rect.top + rect.height > 0 && rect.top - window.innerHeight < 0;
    },
    handleScroll() {
      let isInViewport = this.isInViewport(this.$refs.servicesViewPort);
      if (isInViewport && !this.isVisible) {
        this.isVisible = true;
      } else if (!isInViewport && this.isVisible) {
        this.isVisible = false;
      }
    },
  },
  beforeMount() {
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
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
  width: 100vw;
  box-sizing: border-box;
  padding: 0 1em;
}
.section-title {
  height: 17%;
}
.services-top {
  width: 100%;
  height: 43%;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  box-sizing: border-box;
  padding: 0 1em;
}
.img-top-container {
  width: 100%;
  height: 100%;
  transition-duration: 0.3s;
  transition-timing-function: ease;
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
  height: 40%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 2.5em;
  gap: 2.5em;
  box-sizing: border-box;
}
.img-bottom-container {
  width: 100%;
  height: 100%;
  transition-duration: 0.3s;
  transition-timing-function: ease;
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
  top: 40vh;
  width: 100%;
  height: 20vh;
  z-index: 0;
}
</style>
