<template>
  <v-app-bar app flat prominent color="#1e1e1e">
    <div id="particles-js"></div>
    <nuxt-link to="/">
      <img src="/img/logo/nav.png" alt="Logo" width="300" />
    </nuxt-link>

    <v-tabs centered class="ml-n9" color="primary" optional slider-size="5">
      <v-tab
        v-for="link in links"
        :key="link.title"
        nuxt
        :to="link.url"
        class="text-h4"
      >
        {{ link.title }}
      </v-tab>
    </v-tabs>
    <members-area></members-area>
  </v-app-bar>
</template>

<script>
export default {
  data: () => ({
    links: [
      { title: "Elo Boosting", url: "division-boosting" },
      { title: "Coaching", url: "coaching" },
      { title: "Account Market", url: "lol-accounts" },
      { title: "More", url: "" },
    ],
  }),
};
</script>

<style scoped>
.header_logo {
  padding-top: 30px;
}
#particles-js canvas {
  display: block;
  transform: scale(1);
  opacity: 1;
  transition: opacity 0.8s ease, transform 1.4s ease;
}

#particles-js {
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: -10;
  top: 0;
  left: 0;
}
</style>
