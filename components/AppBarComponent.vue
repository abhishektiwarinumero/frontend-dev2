<template>
  <v-app-bar app flat prominent>
    <div id="particles-js"></div>
    <nuxt-link to="/">
      <logo-component :width="300" :height="300" viewBox="30 0 60 70">
      </logo-component>
    </nuxt-link>

    <v-tabs centered class="ml-n9" color="grey darken-1" optional>
      <v-tab v-for="link in links" :key="link.title" nuxt :to="link.url">
        {{ link.title }}
      </v-tab>
    </v-tabs>
    <LoginComponent class="header_logo"></LoginComponent>
  </v-app-bar>
</template>

<script>
if (process.client) {
  require("particles.js");
}
export default {
  data: () => ({
    links: [
      { title: "Boosting", url: "division-boosting" },
      { title: "Coaching", url: "coaching" },
      { title: "Lol Accounts", url: "lol-accounts" },
      { title: "Boosters", url: "boosters" },
      { title: "Apply", url: "apply" },
      { title: "More*", url: "" },
    ],
  }),
  mounted() {
    particlesJS.load("particles-js", "/particlesjs-config.json");
  },
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
