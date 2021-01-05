<template>
  <section class="customers-voice">
    <v-row class="section-title flex-center">
      <h1>Customers voice</h1>
    </v-row>
    <v-row class="perfect-rating flex-center">
      <h2>Perfect Rating</h2>
    </v-row>
    <v-row class="flex-center">
      <h1>
        <span>{{ totalRating }}</span
        >/5.0
      </h1>
    </v-row>
    <v-row class="flex-center">
      <h5>
        <span>{{ totalReviews }}</span> reviews
      </h5>
    </v-row>
    <v-row class="mt-16 mb-16 pl-8 pr-8">
      <v-col v-for="(rating, index) in ratings" :key="index" xs="12" md="4">
        <v-card>
          <v-card-title>
            <h5 class="pl-8 pr-8">{{ rating.fullName }}</h5>
          </v-card-title>
          <v-card-text>
            <p class="pl-12 pr-12">{{ rating.description }}</p>
          </v-card-text>
          <v-card-actions class="v-card-actions">
            <v-rating
              color="#7854c5"
              half-increments
              length="5"
              readonly
              size="32"
              :value="rating.stars"
            ></v-rating>
            <span class="mr-4">{{ rating.date }}</span>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </section>
</template>

<script>
export default {
  data: () => ({
    ratings: [
      {
        fullName: "Jhon smith",
        description:
          "Best boosting game I've ever tried, I highly recommend it.",
        stars: 5,
        date: "1 days ago",
      },
      {
        fullName: "Jhon whick",
        description:
          "Best boosting game I've ever tried, I highly recommend it.",
        stars: 5,
        date: "3 days ago",
      },
      {
        fullName: "Jhonas brothers",
        description:
          "Best boosting game I've ever tried, I highly recommend it.",
        stars: 4.5,
        date: "3 days ago",
      },
    ],
    totalRating: 4.5,
    totalReviews: 1041,
  }),
};
</script>

<style scoped>
.flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}
section {
  position: relative;
  font-family: Evogria !important;
  height: 100vh;
  width: 100vw;
  box-sizing: border-box;
  padding: 0 1em;
}
.section-title {
  font-size: 2.3em !important;
}
.perfect-rating {
  color: #7854c5;
  font-size: 1.4em !important;
}
.v-card {
  background: rgba(0, 0, 0, 0.6);
}
.v-card-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
