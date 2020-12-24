<template>
  <v-sheet max-width="1600" color="transparent" class="mx-auto">
    <v-slide-group
      v-model="model"
      center-active
      active-class="current"
      mandatory
      show-arrows
    >
      <v-slide-item
        v-for="(game, index) in games"
        :key="index"
        v-slot:default="{ active }"
      >
        <v-card
          color="transparent"
          :class="{ active: active }"
          flat
          :ripple="false"
          nuxt
          :to="game.slug"
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
  computed: {
    model: {
      get() {
        return this.game.id;
      },
      set() {
        return this.game.id;
      },
    },
  },
};
</script>
