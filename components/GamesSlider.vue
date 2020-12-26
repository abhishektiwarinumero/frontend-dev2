<template>
  <v-sheet max-width="1600" color="transparent" class="mx-auto">
    <v-slide-group mandatory show-arrows>
      <v-slide-item v-for="(game, index) in games" :key="index">
        <v-card
          color="transparent"
          flat
          :ripple="false"
          nuxt
          :to="game.slug"
          active-class="selectedGame"
        >
          <v-img :src="game.image" :alt="game.name"></v-img>
          <v-card-title
            class="font-weight-bold text-overline text-center"
            style="display: block"
          >
            {{ game.name }}
          </v-card-title>
        </v-card>
      </v-slide-item>
    </v-slide-group>
  </v-sheet>
</template>

<script>
import games from "~/assets/js/games";
export default {
  props: {
    game: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    games: games,
  }),
};
</script>
