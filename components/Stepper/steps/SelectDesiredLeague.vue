<template>
  <div>
    <div class="title">
      <div class="title-id">
        <h2>2</h2>
      </div>
      <h2 class="title-txt">Select Desired League</h2>
    </div>
    <v-card raised class="mb-4" :style="{ boxShadow: tier.box_shadow }">
      <v-container>
        <v-row align="center" justify="center">
          <v-col md="3">
            <img
              :src="division.image || tier.image"
              :alt="tier.name"
              loading="lazy"
              width="170"
            />
          </v-col>
          <v-col md="9" class="have-selectors">
            <v-container>
              <v-row>
                <v-col>
                  <v-select
                    :items="tiers"
                    label="Current tier"
                    dense
                    solo
                    v-model="selectedTierID"
                    item-text="name"
                    item-value="id"
                  ></v-select>
                </v-col>
                <v-col v-if="hasDivisions">
                  <v-select
                    :items="tier.divisions"
                    label="Current division"
                    dense
                    solo
                    v-model="selectedDivisionID"
                    item-text="name"
                    item-value="id"
                  ></v-select>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-select
                    :items="servers"
                    label="Select your server"
                    dense
                    solo
                    v-model="selectedServerID"
                    item-text="region"
                    item-value="id"
                  ></v-select>
                </v-col>
                <v-col>
                  <v-radio-group
                    class="radio-group"
                    v-model="mode"
                    dark
                    mandatory
                    row
                  >
                    <v-radio label="Solo/Duo" value="Solo/Duo"></v-radio>
                    <v-radio label="Flex 5v5" value="Flex"></v-radio>
                  </v-radio-group>
                </v-col>
              </v-row>
            </v-container>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import tiers from "~/assets/js/tiers";
export default {
  data: () => ({
    mode: "Solo/Duo",
    tiers: tiers,
    selectedTierID: 4, // Gold
    selectedDivisionID: 13, // Gold IV
    selectedServerID: "EU-West",
    servers: [
      "North America",
      "EU-West",
      "EU-Nordic & East",
      "Turkey",
      "Russia",
      "Brazil",
      "Latin America North",
      "Latin America South",
      "Oceania",
      "PBE",
    ],
  }),
  computed: {
    tier() {
      let index = this.$store.state.desired.tier;
      return _.find(this.tiers, ["id", index]);
    },
    division() {
      if (this.hasDivisions) {
        return _.find(this.tier.divisions, ["id", this.selectedDivisionID]);
      }
      return { image: null };
    },
    hasDivisions() {
      return !_.isEmpty(this.tier.divisions);
    },
  },
  watch: {
    selectedTierID(id) {
      this.$store.commit("desired/changeTier", id);
      if (this.hasDivisions) {
        this.selectedDivisionID = this.tier.divisions[3].id;
      }
    },
  },
};
</script>

<style scoped>
.have-selectors {
  padding-right: 20px;
  padding-left: 20px;
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

.v-input--selection-controls {
  margin-top: 0px;
}
.v-input--radio-group.v-input--radio-group--row .v-radio {
  margin-right: 2px;
}
</style>
