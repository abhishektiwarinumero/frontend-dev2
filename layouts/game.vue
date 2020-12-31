<template>
  <default-layout>
    <div
      fluid
      :style="{
        background: `url(/img/backgrounds/services/${this.$route.name}-top-bg.png) top/cover`,
      }"
    >
      <v-row justify="center" align="center">
        <v-col md="8" style="text-align: center">
          <nuxt />
        </v-col>
        <games-slider />
      </v-row>
    </div>
    <v-container>
      <game-services :services="gameServices"></game-services>
      <v-row>
        <v-col md="8">
          <Stepper />
        </v-col>
        <v-col md="4"></v-col>
      </v-row>
    </v-container>
    <how-to-buy />
  </default-layout>
</template>

<script>
import games from "~/assets/js/games";
import services from "~/assets/js/services";
import DefaultLayout from "~/layouts/default.vue";
export default {
  transition: "slide-bottom",
  components: {
    DefaultLayout,
  },
  data: () => ({
    games: games,
    services: services,
  }),
  computed: {
    game() {
      // How do we get the game
      // Router name is a service slug
      // Get that service game
      let service = _.find(this.services, ["slug", this.$route.name]);
      return _.find(this.games, ["name", service.game]);
    },
    gameServices() {
      return _.filter(this.services, ["game", this.game.name]);
    },
  },
};
</script>
