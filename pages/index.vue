<template>
  <v-layout column fill-height>
    <v-container fluid class="hero">
      <v-row align="center" justify="center" class="mt-16 mb-16">
        <img
          src="/img/logo/1000x400_transparent_bg_dark.png"
          alt="Logo"
          class="mb-16"
        />
      </v-row>
      <v-row align="center" justify="center" class="mt-16 mb-16">
        <p class="font-weight-bold display-2 purple--text">Best ELO Boosting</p>
      </v-row>
      <v-row align="center" justify="center" class="mt-16 mb-16">
        <v-btn class="ma-2" color="purple">Elo Boosting</v-btn>
        <v-btn class="ma-2" color="purple">Unranked Smurf</v-btn>
        <v-btn class="ma-2" color="purple">League Ranked Accounts</v-btn>
      </v-row>
      <video-section class="mt-16 mb-16"></video-section>
    </v-container>
    <services-circle />
    <features />
    <customer-voice />
    <how-to-buy />
    <WhyUs />
  </v-layout>
</template>

<style scoped>
.hero {
  background: url(/img/backgrounds/thresh.jpg);
  background-position: bottom;
  background-size: cover;
  background-repeat: no-repeat;
}
</style>
