<template>
  <div>
    <div class="title">
      <div class="title-id">
        <h2>3</h2>
      </div>
      <h2 class="title-txt">Checkout</h2>
    </div>
    <v-card raised class="mb-4">
      <v-container>
        <v-row>
          <v-col md="10">
            <div v-for="(checkbox, index) in checkboxes" :key="index">
              <v-tooltip top color="primary" max-width="350">
                <template v-slot:activator="{ on, attrs }">
                  <v-switch
                    v-model="checkbox.checked"
                    @change="checkOption(checkbox)"
                  >
                    <template v-slot:label>
                      <div v-bind="attrs" v-on="on">
                        <v-icon color="#673ab7" class="mr-1">
                          {{ checkbox.icon }}
                        </v-icon>
                        <v-badge
                          :color="checkbox.percentage ? 'primary' : 'green'"
                          :content="
                            checkbox.percentage
                              ? `+${checkbox.percentage}%`
                              : 'Free'
                          "
                          class="text-uppercase"
                        >
                          {{ checkbox.title }}
                        </v-badge>
                      </div>
                    </template>
                  </v-switch>
                </template>
                <span>
                  {{ checkbox.tip }}
                </span>
              </v-tooltip>
            </div>
            <h5>Approximate completion time: {{ eta }}</h5>
          </v-col>
          <v-col class="input" md="8">
            <v-text-field
              label="Discount Code"
              v-model="discountCode"
              outlined
              clearable
              dark
              append-icon="mdi-check"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </div>
</template>

<script>
export default {
  data: () => ({
    discountCode: "",
    checkboxes: [
      {
        checked: false,
        icon: "mdi-account-remove",
        title: "Appear offline on chat",
        percentage: 0,
        tip:
          "This option will make your account offline in the League Client chat, therefore your friends won't see when the booster is playing on your account",
      },
      {
        checked: false,
        icon: "mdi-account-group",
        title: "Specific champions",
        percentage: 0,
        tip:
          "You may determine what role(s) your booster will queue up for while playing on your account. For additional costs, you may also determine what champions he should play.",
      },
      {
        checked: false,
        icon: "mdi-flash",
        title: "Priority order (2x speed) at",
        percentage: 20,
        tip:
          "This option ensures that your order will be treated with a higher priority, thus resulting in a faster completion.",
      },
      {
        checked: false,
        icon: "mdi-video",
        title: "With Streaming at",
        percentage: 15,
        tip:
          "Your assigned booster will record/live stream all the games, depending on your requirements.",
      },
      {
        checked: false,
        icon: "mdi-plus",
        title: "+1 Win in desired rank",
        // This needs to be dynamic, based on the desired rank selected
        percentage: 0,
        tip:
          "By selecting this option, you'll receive an additional net win once your desired rank was reached.",
      },
    ],
  }),
  computed: {
    eta() {
      let wins = this.$store.state.wins.wins;
      let days = parseInt(wins / 2);
      return `${days} - ${days + 1} Days`;
    },
  },
  watch: {
    discountCode(value) {
      this.$store.commit("checkout/changeDiscountCode", value);
    },
  },
  methods: {
    checkOption(checkbox) {
      if (checkbox.checked) {
        this.$store.commit("checkout/addOption", checkbox.title);
        this.$store.commit("checkout/addPercent", checkbox.percentage);
      } else {
        this.$store.commit("checkout/removeOption", checkbox.title);
        this.$store.commit("checkout/substractPercent", checkbox.percentage);
      }
    },
  },
  mounted() {
    this.$store.commit("checkout/clearOptions");
  },
};
</script>

<style scoped>
.align-center-to-left {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}

p {
  margin-bottom: 0;
  margin-left: 10px;
}

h5 {
  margin-bottom: 0;
  margin-right: 15px;
}

h2 {
  margin: 0;
}

.title {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
}

.title-txt {
  margin-left: 20px;
}

.title .title-id {
  color: #181818;
}

.title-id {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(#673ab7, #9c27b0);
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
