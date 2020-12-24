<template>
  <div>
    <div
      class="slider"
      fluid
      :style="{
        background: 'url(/img/services/league-boosting-top-bg.png) top/cover',
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
        <games-slider :game="game" />
      </v-row>
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
  name: "lol-boosting",
  components: {
    Stepper,
  },
  data: () => ({
    game: {
      id: 1,
      name: "LOL BOOSTING",
      slug: "lol-boosting",
      image: "img/circles/5.png",
    },
  }),
};
</script>
