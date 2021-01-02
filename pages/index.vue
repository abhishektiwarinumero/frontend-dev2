<template>
  <v-layout column fill-height class="hero">
    <v-container fluid>
      <v-row align="center" justify="center" class="mt-16">
        <img src="/img/logo/logo.png" alt="Logo" width="55%" class="mt-16" />
      </v-row>
      <v-row align="end" justify="center" class="mt-16 mb-16">
        <v-btn-toggle rounded v-model="undefined">
          <v-btn x-large class="text-h4" color="black" style="padding: 40px"
            >Get Boosted</v-btn
          >
          <v-btn x-large class="text-h4" color="black" style="padding: 40px"
            >Get Coached</v-btn
          >
          <v-btn x-large class="text-h4" color="black" style="padding: 40px"
            >Buy an account</v-btn
          >
        </v-btn-toggle>
      </v-row>
      <v-row justify="center" align="center" class="mt-16 mb-16">
        <p class="text-h2 mt-16">Our Services</p>
      </v-row>
      <!-- 5 games here -->
      <v-row
        justify="center"
        align="center"
        class="mt-16 mb-16"
        dense
        no-gutters
      >
        <v-col class="lg5-custom">
          <v-img src="/img/games/cards/lol_boost.png"></v-img>
        </v-col>
        <v-col class="lg5-custom">
          <v-img src="/img/games/cards/valorant_boost.png"></v-img>
        </v-col>
        <v-col class="lg5-custom">
          <v-img src="/img/games/cards/tft_boost.png"></v-img>
        </v-col>
        <v-col class="lg5-custom">
          <v-img src="/img/games/cards/wildrift_boost.png"></v-img>
        </v-col>
        <v-col class="lg5-custom">
          <v-img src="/img/games/cards/runeterra_boost.png"></v-img>
        </v-col>
      </v-row>
      <v-row justify="center" align="center" class="mt-16 mb-16">
        <v-col sm="4" md="4" lg="4">
          <v-img src="/img/games/cards/unranked_smurf.png"></v-img>
        </v-col>
        <v-col sm="4" md="4" lg="4">
          <v-img src="/img/games/cards/coaching.png"></v-img>
        </v-col>
        <v-col sm="4" md="4" lg="4">
          <v-img src="/img/games/cards/account_market.png"></v-img>
        </v-col>
      </v-row>
    </v-container>
    <features />
    <customer-voice />
    <how-to-buy />
    <WhyUs />
  </v-layout>
</template>

<style scoped>
.hero {
  background: url(/img/backgrounds/overlay_background.png);
  background-position: top;
  background-size: cover;
  background-repeat: no-repeat;
}
</style>
