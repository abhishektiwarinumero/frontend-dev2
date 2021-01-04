<template>
  <div class="why-us">
    <div class="section-name mt-12 mb-4">
      <h1 class="text-h2 mt-4">Why Us ?</h1>
    </div>
    <v-container>
      <v-row class="inner-container">
        <v-col
          sm="12"
          md="6"
          class="v-card-container"
          v-for="(priority, index) in priorities"
          :key="index"
        >
          <v-card
            align-self="center"
            :class="!(index % 3) ? 'bg-dark' : 'bg-white'"
          >
            <v-row v-if="!(index % 2)">
              <v-col sm="10" md="12">
                <v-card-title class="title flex-center">
                  <h2>{{ priority.title }}</h2>
                </v-card-title>
              </v-col>
              <v-col md="2" class="flex-center">
                <v-icon>{{ icons[index] }}</v-icon>
              </v-col>
              <v-col sm="12" md="10" class=".p0">
                <v-card-text class="p0">
                  <p class="desc">{{ priority.description }}</p>
                </v-card-text>
              </v-col>
            </v-row>
            <v-row v-if="index % 2">
              <v-col sm="10" md="12">
                <v-card-title class="title flex-center">
                  <h2>{{ priority.title }}</h2>
                </v-card-title>
              </v-col>
              <v-col sm="12" md="10" class=".p0">
                <v-card-text class="p0">
                  <p class="desc">{{ priority.description }}</p>
                </v-card-text>
              </v-col>
              <v-col md="2" class="flex-center">
                <v-icon>{{ icons[index] }}</v-icon>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  data: () => ({
    priorities: [
      {
        icon: "/nothing.png",
        title: "+5 Years of Expertise in LOL boosting",
        description:
          "KingBoosting has been operating in the lol elo boost market for more than five years. Throughout this time the company amassed an incredible amount of experience in elo boosting. We continue to gather experience to this day and continue to improve our lol boost services to stay ahead of the competition in all aspects of the services that we provide. Every new buyer and new order adds to this experience and helps our organization to grow and perform even better in the future. Staying customer oriented and being agile to the different changes in the lol elo boosting environment is a crucial factor for our success.",
      },
      {
        icon: "/nothing.png",
        title: "Challenger LOL ELO boosting team",
        description:
          "The company is known for employing the top LoL boosters, who are playing at the highest levels of the game. The minimum requirement to boost at BoostRoyal, is reaching the challenger tier and high prior experience in lol boosting. By employing and managing the best lol boosting team available, we are able to provide the highest win-rates and top quality performances. To make this possible, we never stop manage our lol boosters, who have to go through a strict selection process. By having increased control over the lol elo booster team, it allows us to get the most performance out of our players and provide a seamless boosting experience for all of our users.",
      },
      {
        icon: "/nothing.png",
        title: "Best & Highly Customizable ELO boosting experience",
        description:
          "We provide the widest range of lol elo boosting related services in the boosting industry. Our service portfolio is designed with the ultimate goal of providing maximum user satisfaction. We believe, that having a high number of services are required in the field of lol elo boosting as each LoL player has different goals in the game. To help in reaching these goals, BoostRoyal does not only offer a high selection of different lol elo boosting methods, such as solo queue, duoe queue or placement matches, but additional customizability features for each of these boost types. We offer add-on options, such as priority delivery or specific champions",
      },
    ],
    icons: ["mdi-school", "mdi-google-circles-communities", "mdi-chart-bubble"],
  }),
};
</script>

<style scoped>
.section-name {
  display: flex;
  justify-content: center;
}
.text-h2 {
  font-size: 3.3em !important;
}
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}
.inner-container {
  margin: 0 -5em;
}
.v-card-container {
  box-sizing: border-box;
  padding: 1em;
}
.v-card {
  box-sizing: border-box;
  padding: 0 2em;
}
.title {
  font-size: 1em !important;
  text-align: center;
}
.desc {
  font-size: 0.9em;
  line-height: 1.5em;
}
.bg-white {
  background: rgba(255, 255, 255, 0.2);
}
.bg-dark {
  background: rgba(0, 0, 0, 0.6);
}
.flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}
.ml0 {
  margin-left: 0;
}
.mr0 {
  margin-right: 0;
}
.v-icon {
  font-size: 5.5em !important;
}
.p0 {
  padding: 0;
}
</style>
