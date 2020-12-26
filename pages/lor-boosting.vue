<template>
  <div>
    <div
      class="slider"
      fluid
      :style="{
        background: 'url(/img/services/lor-boosting-top-bg.png) top/cover',
      }"
    >
      <v-row justify="center" align="center">
        <v-col md="8" style="text-align: center">
          <p class="text-overline">LOR Boosting</p>
          <p class="font-weight-bold text-h3">
            League Of Runeterra Boost - LoR Boosting
          </p>
          <br />Reach the highest ranks in Runeterra by hiring challenger pros
          to boost your tier in Runeterra.
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
      name: "LOR BOOSTING",
      slug: "lor-boosting",
      image: "img/circles/5.png",
    },
  }),
};
</script>
