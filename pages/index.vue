<template>
  <v-layout column>
    <v-container fluid class="welcome">
      <v-row align="center" justify="center">
        <img src="/img/logo/1000x400_transparent_bg_dark.png" alt="Logo" />
      </v-row>
      <v-row align="center" justify="center">
        <p class="font-weight-bold display-2 purple--text">Best ELO Boosting</p>
      </v-row>
      <v-row align="center" justify="center">
        <v-btn class="ma-2" outlined color="purple">Elo Boosting</v-btn>
        <v-btn class="ma-2" outlined color="purple">Unranked Smurf</v-btn>
        <v-btn class="ma-2" outlined color="purple"
          >League Ranked Accounts</v-btn
        >
      </v-row>
      <v-row style="background: rgba(0, 0, 0, 0.5)">
        <video-section></video-section>
      </v-row>
    </v-container>
    <services-circle />
    <features />
    <customer-voice />
    <how-to-buy />
    <WhyUs />
  </v-layout>
</template>
