<template>
  <div>
    <div
      class="slider"
      fluid
      :style="{
        background: 'url(/img/services/valorant-boosting-top-bg.png) top/cover',
      }"
    >
      <v-row justify="center" align="center">
        <v-col md="8" style="text-align: center">
          <p class="text-overline">Valorant Boost</p>
          <p class="font-weight-bold text-h3">Valorant Boosting</p>
          <br />Our premium Valorant Boost service offers an efficient &amp;
          secure option to reach any specific rank or goal.
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
  </div>
</template>

<script>
import Stepper from "~/components/Stepper";

export default {
  name: "valorant-boosting",
  components: {
    Stepper,
  },
  data: () => ({
    game: {
      id: 1,
      name: "Valorant Boosting",
      image: "img/games/valorant.png",
      slug: "valorant-boosting",
    },
  }),
};
</script>
