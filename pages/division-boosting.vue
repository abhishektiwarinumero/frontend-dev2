<template>
  <div>
    <div
      class="slider"
      fluid
      :style="{
        background: `url(/img/backgrounds/services/division-boosting-top-bg.png) top/cover`,
      }"
    >
      <v-row justify="center" align="center">
        <v-col md="8" style="text-align: center">
          <p class="text-overline">LOL ELO boost</p>
          <p class="font-weight-bold text-h3">
            Tier &amp; Division League Boosting
          </p>
          <br />Our league Boost service can help you reach your desired tier
          and division in LoL.
        </v-col>
        <games-slider />
      </v-row>
    </div>
    <v-container>
      <game-services :services="gameServices"></game-services>
      <v-row>
        <v-col md="8">
          <v-form ref="order">
            <select-current-league />
            <select-desired-league />
            <checkout />
            <boost-me />
          </v-form>
        </v-col>
        <v-col md="4"></v-col>
      </v-row>
    </v-container>
    <how-it-works />
  </div>
</template>

<script>
import games from "~/assets/js/games";
import services from "~/assets/js/services";
export default {
  transition: "slide-bottom",
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
  mounted() {
    this.$store.commit("wins/changeNumberOfWins", 1);
  },
};
</script>
