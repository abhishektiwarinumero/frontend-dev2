<template>
  <v-layout column fill-height>
    <v-container fluid class="hero">
      <v-row align="center" justify="center" class="mt-16 mb-16 pt-16 pm-16">
        <img
          src="/img/logo/1000x400_transparent_bg_dark.png"
          alt="Logo"
          class="mt-16 mb-16 pt-16 pm-16"
        />
      </v-row>
      <v-row align="center" justify="center" class="mt-16 mb-16 pt-16 pm-16">
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
  background: url(/img/backgrounds/wallpaper.png);
  background-position: top;
  background-size: contain;
  background-repeat: no-repeat;
}
</style>
