<template>
  <v-layout column fill-height class="hero">
    <v-row align="center" justify="center" class="mt-5">
      <img src="/img/logo/logo.png" alt="Logo" width="55%" class="mt-15" />
    </v-row>
    <v-row align="end" justify="center" class="mt-7 mb-14">
      <v-btn-toggle
        rounded
        v-model="undefined"
        background-color="transparent"
        class="hero-btn"
      >
        <v-btn x-large>Get Boosted</v-btn>
        <v-btn x-large class="mr-1 ml-1">Get Coached</v-btn>
        <v-btn x-large>Buy an account</v-btn>
      </v-btn-toggle>
    </v-row>
    <services />
    <v-row justify="center" align="center" class="mt-16 mb-16">
      <p class="text-h2 mt-16">Features</p>
    </v-row>
    <v-row v-for="(feature, index) in features" :key="index">
      <v-col class="feature" offset="3">
        <v-card :class="index % 2 ? 'bg-dark' : 'bg-white'" elevation="24">
          <v-row>
            <v-col md="2" class="icon-container" align-self="center">
              <v-icon v-if="!(index % 2)">{{ feature.icon }}</v-icon>
            </v-col>
            <v-col md="8">
              <p class="feature-title">{{ feature.title }}</p>
              <p class="feature-desc">{{ feature.description }}</p>
            </v-col>
            <v-col md="2" class="icon-container" align-self="center">
              <v-icon v-if="index % 2">{{ feature.icon }}</v-icon>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <why-us />
    <how-it-works />
    <customers-voice />
  </v-layout>
</template>

<script>
export default {
  data: () => ({
    features: [
      {
        icon: "mdi-shield-outline",
        title: "VPN Protection",
        description:
          "To offer the safest lol elo boost on the market, KingBoosting provides VPN protection on every order as a standard. The VPN feature helps to manage the IP address of the booster while boosting on the buyer’s account so the lol boosting process can stay undetected by RIOT.",
      },
      {
        icon: "mdi-timer",
        title: "Privacy & Appear Offline",
        description:
          "We offer the appear offline feature for players who are looking to have a private boosting experience. This feature can be selected at checkout, and it assures 100% privacy, as the boosted LoL account shows as offline in the friend list while the lol boosting process lasts.",
      },
      {
        icon: "mdi-monitor",
        title: "Finish in time guarantee",
        description:
          "KingBoosting is making sure that your lol elo boost is finished in time. Each submitted order is given a specific deadline and the booster’s goal is to meet this deadline in the fastest possible manner. The length of the boosting process depends on the details of the purchase, and the maximum time limit is indicated when selecting a lol boost.",
      },
      {
        icon: "mdi-shield-outline",
        title: "Order tracking",
        description:
          "KingBoosting has a built-in order tracking system for each purchased lol elo boost in the member’s area. The system offers different methods of order following, including a chart of the live match history of the LoL account that is being boosted, and a spectate button to watch the booster’s performance.",
      },
    ],
  }),
};
</script>

<style scoped>
.hero {
  background: url(/img/backgrounds/bg.png);
  background-position: center top;
  background-size: 100% auto;
  background-repeat: no-repeat;
}

.hero-btn > button {
  background-color: black !important;
  padding: 40px;
}

.hero-btn > button:hover {
  background-color: #472783 !important;
}

.round-left {
  border-radius: 5rem 0 0 5rem !important;
}
.round-right {
  border-radius: 0 5rem 5rem 0 !important;
}
.mtr-12 {
  margin-top: 12rem;
}
.text-h2 {
  font-size: 3.5em !important;
}
.feature {
  padding: 0 !important;
}
.bg-white {
  background: rgba(255, 255, 255, 0.2) !important;
}
.bg-dark {
  background: rgba(0, 0, 0, 0.6) !important;
}
.feature-desc {
  font-size: 0.9em !important;
  line-height: 1.1em !important;
}
.icon-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
.v-icon {
  font-size: 5em !important;
}
</style>
