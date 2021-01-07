<template>
  <section class="flex-center">
    <v-card elevation="3">
      <v-card-title class="title flex-center">
        <h1>How KingBoosting Works ?</h1>
      </v-card-title>
      <v-container>
        <v-row>
          <v-col class="steps" sm="12" md="7">
            <v-row v-for="(step, index) in steps" :key="index">
              <p class="step">{{ step }}</p>
            </v-row>
          </v-col>
          <v-col sm="12" md="5">
            <div class="image">
              <div id="laptop" class="flex-center">
                <div class="laptop-top">
                  <div class="laptop-screen">
                    <v-icon class="play">mdi-play-box-outline</v-icon>
                    <v-icon class="list">mdi-format-list-text</v-icon>
                    <v-icon class="cred">mdi-credit-card-outline</v-icon>
                    <v-icon class="account">mdi-card-account-details</v-icon>
                  </div>
                </div>
                <div class="laptop-bottom"></div>
              </div>
              <div id="tablet" class="flex-center">
                <div class="tablet-screen">
                  <v-icon class="cog-sm">mdi-cog</v-icon>
                  <v-icon class="cog-lg-w">mdi-cog</v-icon>
                  <v-icon class="cog-lg-p">mdi-cog</v-icon>
                </div>
                <div class="tablet-btn"></div>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </section>
</template>

<script>
export default {
  data: () => ({
    steps: [
      "Select the game you wish to be boosted on.",
      "The select the type of services you wish to purchase and your order details.",
      "By clicking the 'Purchase' button, you will be redirected to choose payment gateway, you can either continue as a guest or as returning customer.",
      "In the members area you can track your order, spectate, pause or chat live with your booster!",
    ],
    icons: [
      { name: "phone_iphone", color: "#7854c5" },
      { name: "settings", color: "#7854c5" },
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
section {
  /* height: 100vh; */
  width: 100vw;
  box-sizing: border-box;
  padding: 0 1em;
}
.v-card {
  width: 100%;
  background: rgba(59, 38, 89, 0.8);
  box-sizing: border-box;
  padding: 2em;
}
.container {
  box-sizing: border-box;
  padding: 2em 0;
}
.title {
  font-size: 2.3em !important;
}
.steps {
  border-left: 0.8em solid white;
  box-sizing: border-box;
  padding-left: 2.5em;
}
.step {
  font-size: 1.6em !important;
}

.image {
  position: relative;
  width: 100%;
  height: 100%;
}
#tablet {
  position: absolute;
  top: 0;
  right: 0;
  width: 12em;
  height: 17em;
  background: #7854c5;
  border-radius: 0.5em;
  box-sizing: border-box;
  padding: 1em;
  padding-bottom: 3em;
}
.tablet-screen {
  width: 100%;
  height: 100%;
  background: #2d1d50;
}
.cog-sm {
  position: absolute;
  font-size: 3em;
  top: 1.1em;
  left: 1.1em;
  animation: rotate-counter-clock 4s linear infinite;
}
.cog-lg-w {
  position: absolute;
  top: 1.4em;
  left: 0.3em;
  font-size: 5em;
  animation: rotate-counter-clock 4s linear infinite;
}
.cog-lg-p {
  position: absolute;
  top: 1em;
  right: 0.3em;
  font-size: 5em;
  color: #7854c5;
  animation: rotate-clock 4s linear infinite;
}

@keyframes rotate-clock {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes rotate-counter-clock {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(-360deg);
  }
}
.tablet-btn {
  position: absolute;
  bottom: 1em;
  background: #2d1d50;
  width: 1.5em;
  height: 1.5em;
  border-radius: 3em;
}
#laptop {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 23em;
  height: 15em;
}
.laptop-top {
  position: absolute;
  top: 0%;
  background: #7854c5;
  margin: auto;
  width: 90%;
  height: 96.5%;
  border-radius: 0.5em;
  box-sizing: border-box;
  padding: 1em;
}
.laptop-screen {
  position: relative;
  width: 100%;
  height: 100%;
  background: #2d1d50;
}
.play {
  position: absolute;
  bottom: 0;
  right: 0;
  font-size: 7em;
}
.list {
  position: absolute;
  top: 0;
  left: 0;
  font-size: 9em;
}
.account {
  position: absolute;
  bottom: 0em;
  left: 0.55em;
  font-size: 8em;
  color: #7854c5;
}
.cred {
  position: absolute;
  top: 0;
  right: 0;
  font-size: 6em;
}
.laptop-bottom {
  position: absolute;
  bottom: 0;
  background: #7854c5;
  width: 100%;
  height: 3.5%;
  border-radius: 0.1em 0.1em 0.3em 0.3em;
}
.icon {
  color: #7854c5aa;
}
</style>;
