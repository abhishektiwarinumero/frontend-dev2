<template>
  <v-stepper-content key="2-content" step="2">
    <v-form v-model="valid">
      <v-container>
        <v-row>
          <!-- Summoner -->
          <v-col cols="12" md="6">
            <v-text-field
              v-model="nickname"
              label="Nickname *"
              :rules="nicknameRules"
              required
              placeholder="Your in-game name"
            ></v-text-field>
          </v-col>
          <!-- Select Booster -->
          <v-col class="d-flex" cols="12" sm="6">
            <v-select
              :items="boosters"
              label="Your Booster"
              :loading="boostersLoading"
              v-model="booster"
            ></v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="comment"
              label="Comments NOT REQUIRED"
              placeholder="Your comments"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="6">
            <v-checkbox
              label="Appear Offline on Chat"
              prepend-icon="mdi-account"
              v-model="offline"
            ></v-checkbox>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="6">
            <v-icon>mdi-information-outline</v-icon>
            <span> Further information will be requested after payment </span>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
    <v-btn color="primary" @click="nextStep" :disabled="!valid">Next</v-btn>
  </v-stepper-content>
</template>

<script>
export default {
  data: () => ({
    valid: false,
    boosters: [],
    boostersLoading: true,
    booster: "",
    comment: "",
    nickname: "",
    nicknameRules: [
      (v) => !!v || "Nickname is required",
      (v) => v.length >= 3 || "Please insert a valid nickname",
    ],
    offline: false,
  }),
  methods: {
    getBoostersList() {
      this.$axios
        .get("getBoostersNames")
        .then((response) => {
          this.boosters = response.data;
          this.boostersLoading = false;
        })
        .catch((error) => {
          this.$notify("Could not connect to server", "error");
        });
    },
    nextStep() {
      this.$store.commit("order/changeNickname", this.nickname);
      this.$store.commit("order/changeBooster", this.booster);
      this.$store.commit("order/changeComment", this.comment);
      this.$store.commit("order/changeChatMode", this.offline);
      this.$emit("next");
    },
  },
  mounted() {
    this.getBoostersList();
  },
};
</script>
