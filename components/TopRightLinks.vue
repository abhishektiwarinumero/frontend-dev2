<template>
  <div>
    <span>
      <v-icon color="white">mdi-cellphone-iphone</v-icon>
      <a href="/pay-with-mobile">Mobile Pay</a>
    </span>
    <span>
      <a href="/contact">Contact</a>
    </span>
    <span>
      <a href="/loyalty-program">Loyalty Program</a>
    </span>
    <span v-if="this.$auth.loggedIn">
      <v-btn @click="logout">Logout</v-btn>
    </span>
  </div>
</template>

<script>
export default {
  methods: {
    async logout() {
      await this.$auth.logout();
      this.$root.$emit("logout");
    },
  },
};
</script>

<style scoped>
a {
  text-decoration: none;
  transition: all 500ms ease;
}

a:hover {
  color: #472783 !important;
}

span {
  padding-right: 10px;
}
</style>
