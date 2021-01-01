<template>
  <div style="height: inherit; border-bottom: white solid 5px">
    <v-btn
      depressed
      tile
      color="primary"
      :href="url"
      block
      x-large
      class="mr-0"
      style="height: 100%"
      v-if="this.$auth.loggedIn"
      >Members Area</v-btn
    >
    <v-dialog max-width="800px" v-model="dialog" v-else>
      <template v-slot:activator="{ on }">
        <v-btn
          depressed
          tile
          color="primary"
          v-on="on"
          block
          x-large
          class="mr-0"
          style="height: 100%"
        >
          Members Area
        </v-btn>
      </template>
      <v-card class="px-5" color="#303030">
        <v-container>
          <v-row>
            <v-col cols="7">
              <LoginForm @close="dialog = false"></LoginForm>
            </v-col>
            <v-col cols="5">
              <SocialLogin></SocialLogin>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
  }),
  computed: {
    url() {
      return `https://${process.env.HOST_URL}/dashboard`;
    },
  },
};
</script>

<style scoped>
.v-btn:hover:before {
  content: none;
}
</style>
