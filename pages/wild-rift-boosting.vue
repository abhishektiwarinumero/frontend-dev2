<template>
  <div>
    <div
      class="slider"
      fluid
      :style="{
        background:
          'url(/img/services/wild-rift-boosting-top-bg.png) top/cover',
      }"
    >
      <v-row justify="center" align="center">
        <v-col md="8" style="text-align: center">
          <p class="text-overline">Wild Rift Boosting</p>
          <p class="font-weight-bold text-h3">LoL Wild Rift Boost</p>
          <br />Our premium LoL Wild Rift Boost service offers an easy and
          secure solution to reach any rank or goal.
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
      name: "Wild Rift Boosting",
      slug: "wild-rift-boosting",
      image: "img/games/wild-rift.png",
    },
  }),
};
</script>
