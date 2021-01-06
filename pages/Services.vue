<template>
  <v-layout column full fill-height class="services">
    <v-row class="flex-center">
      <img src="/img/logo/logo.png" width="700" />
    </v-row>
    <v-container>
      <v-row class="cards mt-n10 mb-5">
        <v-col class="card" v-for="(card, index) in cards" :key="index">
          <div class="card-img-hider">
            <div class="card-img-container flex-center">
              <div class="card-img-bg"></div>
              <img class="card-img" :src="`/img/games/cards/${card}`" />
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
    <v-row class="flex-center mt-16 mb-4">
      <h1>Leage of legonds boosting</h1>
    </v-row>
    <v-container>
      <v-row class="boosters">
        <v-tabs grow centered color="primary" optional slider-size="5">
          <v-tab
            v-for="(booster, index) in boosters"
            :key="index"
            class="booster"
          >
            <img class="booster-img" :src="booster.img" />
            <span class="booster-name">
              {{ booster.name }}
            </span>
          </v-tab>
        </v-tabs>
      </v-row>
      <v-row class="flex-center">
        <v-row class="boosters-tab-content"> </v-row>
      </v-row>
    </v-container>
    <why-us />
    <customers-voice />
  </v-layout>
</template>

<script>
export default {
  data: () => ({
    cards: [
      "lol_boost.png",
      "valorant_boost.png",
      "tft_boost.png",
      "wildrift_boost.png",
      "runeterra_boost.png",
    ],
    boosters: [
      { img: "/img/divisions/challenger.webp", name: "League rank boosting" },
      { img: "/img/games/tft-boosting.png", name: "Ranked wins boosting" },
      { img: "/img/games/lol-boosting.png", name: "Dud queue boosting" },
      { img: "/img/games/buy-smurf-account.png", name: "Placment matches" },
      {
        img: "/img/divisions/champions mastery/7.webp",
        name: "Champion mastery",
      },
      { img: "/img/tft.png", name: "Clash boosting" },
      { img: "/img/divisions/silver/I.webp", name: "Normal matches" },
      { img: "/img/divisions/master.webp", name: "Account leveling" },
    ],
  }),
};
</script>

<style scoped>
.flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}
.services {
  background: url(/img/backgrounds/overlay_background.png);
  background-position: top;
  background-size: cover;
  background-repeat: no-repeat;
  font-family: Evogria !important;
}
.cards {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
}
.card {
  width: 100%;
}
.card-img-hider {
  position: relative;
  overflow: hidden;
  transform: scale(1.2);
  display: flex;
  justify-content: center;
  transition-duration: 0.3s;
}
.card-img-hider:hover .card-border {
  background: #8746d4;
}
.card-img-container {
  position: relative;
  width: 100%;
  height: 420px;
  transform: translateY(5em);
  transition-duration: 0.3s;
  transition-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);
  filter: grayscale(100%);
}
.card-img-container:hover {
  transform: translateY(1em);
  cursor: pointer;
  filter: grayscale(0%);
}
.card-img-bg {
  position: absolute;
  top: 0;
  width: 58%;
  height: 13em;
  margin-top: 1em;
  box-shadow: 0px 0px 22px 0px #28153f77;
}
.card-img-container:hover .card-img-bg {
  box-shadow: 0px 0px 32px 0px #8746d4;
}
.card-img {
  position: absolute;
  top: 0;
  width: 100%;
}
.v-tabs-bar {
  background: #eeea !important;
}
.boosters {
  margin: 1em -1.5em !important;
}
.booster {
  width: 10em;
  padding: 0;
  background: #222;
  margin: 0 0.2em;
}
.booster-img {
  width: 2.3em;
  margin: 0.3em;
}
.booster-name {
  font-size: 0.9em;
  text-align: left;
}
.boosters-tab-content {
  width: 70%;
  height: 40em;
  background: #eeea;
}
</style>
