<template>
  <div>
    <div class="title">
      <div class="title-id">
        <h2>3</h2>
      </div>
      <h2 class="title-txt">Checkout</h2>
    </div>
    <v-card raised class="mb-4">
      <v-container class="container">
        <v-row>
          <v-col class="left-col">
            <div
              class="align-center-to-left"
              v-for="(checkbox, index) in checkboxes"
              :key="index"
            >
              <v-switch
                v-model="checkbox.checked"
                @change="checkOption(checkbox)"
              >
                <template v-slot:label>
                  <v-icon color="#673ab7" class="mr-1">
                    {{ checkbox.icon }}
                  </v-icon>
                  <v-badge
                    :color="checkbox.percentage ? 'primary' : 'green'"
                    :content="
                      checkbox.percentage ? `+${checkbox.percentage}%` : 'Free'
                    "
                    class="text-uppercase"
                  >
                    {{ checkbox.title }}
                  </v-badge>
                </template>
              </v-switch>
            </div>
          </v-col>
          <v-col class="right-col">
            <h5>Approximate completion time: {{ eta }}</h5>
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
          </v-col>
        </v-row>
      </v-container>
    </v-card>
    <BoostMe />
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
      },
      {
        checked: false,
        icon: "mdi-account-group",
        title: "Specific champions",
        percentage: 0,
      },
      {
        checked: false,
        icon: "mdi-flash",
        title: "Priority order (2x speed) at",
        percentage: 20,
      },
      {
        checked: false,
        icon: "mdi-video",
        title: "With Streaming at",
        percentage: 15,
      },
      {
        checked: false,
        icon: "mdi-plus",
        title: "+1 Win in desired rank",
        // This needs to be dynamic, based on the desired rank selected
        percentage: 0,
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
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

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

.right-col {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
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
