<template>
  <div>
    <div
      class="slider"
      fluid
      :style="{
        background: 'url(/img/services/tft-boosting-top-bg.png) top/cover',
      }"
    >
      <v-row justify="center" align="center">
        <v-col md="8" style="text-align: center">
          <p class="text-overline">TFT Boosting</p>
          <p class="font-weight-bold text-h3">Teamfight Tactics Ranked Boost</p>
          <br />TFT Boost service allows you to boost your ranking in TFT with
          the help of our challenger employees.
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
  components: {
    Stepper,
  },
  data: () => ({
    game: {
      id: 1,
      name: "TFT BOOSTING",
      slug: "tft-boosting",
      image: "img/circles/4.png",
    },
  }),
};
</script>
