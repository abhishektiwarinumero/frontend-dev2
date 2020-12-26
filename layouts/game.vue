<template>
  <default-layout>
    <div
      class="slider"
      fluid
      :style="{
        background: `url(/img/services/${this.$route.name}-top-bg.png) top/cover`,
      }"
    >
      <v-row justify="center" align="center">
        <v-col md="8" style="text-align: center">
          <nuxt />
        </v-col>
      </v-row>
      <games-slider :game="game" />
    </div>
    <v-container>
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
import DefaultLayout from "~/layouts/default.vue";
export default {
  transition: "slide-bottom",
  components: {
    DefaultLayout,
  },
  data: () => ({
    games: games,
  }),
  computed: {
    game() {
      return _.find(this.games, ["slug", this.$route.name]);
    },
  },
};
</script>
