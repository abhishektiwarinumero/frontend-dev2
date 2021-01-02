<template>
  <v-layout column fill-height class="hero">
    <v-container fluid>
      <v-row align="center" justify="center" class="mt-16">
        <img src="/img/logo/logo.png" alt="Logo" width="55%" class="mt-16" />
      </v-row>
      <v-row align="center" justify="center" class="mt-16 mb-16">
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
  background: url(/img/backgrounds/overlay_background.png);
  background-position: top;
  background-size: cover;
  background-repeat: no-repeat;
}
</style>
