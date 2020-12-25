<template>
  <v-container class="features-section container--fluid">
    <div class="section-name">
      <h1>Features</h1>
    </div>
    <v-row class>
      <v-col md="4" class="relative-box d-flex justify-start align-end">
        <img
          height="auto"
          class="bg-img"
          src="/img/features/bg.png"
          alt="Our Features"
        />
      </v-col>
      <v-col class="fix-index" md="8">
        <v-row>
          <v-col v-for="(feature, index) in features" :key="index" cols="6">
            <h2 class="feature-title">{{ feature.title }}</h2>
            <v-row>
              <v-col cols="2" class="d-flex justify-center align-center">
                <v-icon class="have-linear-gradient icon">{{
                  icons[index]
                }}</v-icon>
              </v-col>
              <v-col cols="10">
                <p class="feature-description">
                  {{ feature.description }}
                </p>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      features: [
        {
          icon: "/nothing.png",
          title: "VPN Protection",
          description:
            "To offer the safest lol elo boost on the market, KingBoosting provides VPN protection on every order as a standard. The VPN feature helps to manage the IP address of the booster while boosting on the buyer’s account so the lol boosting process can stay undetected by RIOT.",
        },
        {
          icon: "/nothing.png",
          title: "Privacy & Appear Offline",
          description:
            "We offer the appear offline feature for players who are looking to have a private boosting experience. This feature can be selected at checkout, and it assures 100% privacy, as the boosted LoL account shows as offline in the friend list while the lol boosting process lasts.",
        },
        {
          icon: "/nothing.png",
          title: "Finish in time guarantee",
          description:
            "KingBoosting is making sure that your lol elo boost is finished in time. Each submitted order is given a specific deadline and the booster’s goal is to meet this deadline in the fastest possible manner. The length of the boosting process depends on the details of the purchase, and the maximum time limit is indicated when selecting a lol boost.",
        },
        {
          icon: "/nothing.png",
          title: "Order tracking",
          description:
            "KingBoosting has a built-in order tracking system for each purchased lol elo boost in the member’s area. The system offers different methods of order following, including a chart of the live match history of the LoL account that is being boosted, and a spectate button to watch the booster’s performance.",
        },
      ],
      icons: ["", "mdi-timer", "mdi-monitor", "mdi-shield-outline"],
    };
  },
};
</script>
<style scoped>
.fix-index {
  z-index: 2;
  padding-right: 60px;
}

.relative-box {
  position: relative;
}

.bg-img {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  max-width: initial;
  z-index: 0;
}

.our-features-button {
  background-image: linear-gradient(to right, #673ab7, #9c27b0);
  padding: 10px 20px;
  z-index: 1;
}

.features-section {
  background-color: #202224;
  padding: 0;
  position: relative;
}

.feature-title {
  font-size: 18px;
  font-weight: bold;
}

.feature-description {
  font-size: 14px;
  color: #76787a;
  font-weight: bold;
  text-align: justify;
}
.section-name {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 200px;
  height: 60px;
  background: linear-gradient(#673ab7, #9c27b0);
  z-index: 1;
  position: absolute;
  top: -30px;
}
.have-linear-gradient {
  background: -webkit-linear-gradient(#673ab7, #9c27b0);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.icon {
  font-size: 80px;
}
</style>
