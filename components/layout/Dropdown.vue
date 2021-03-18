
<template >
  <v-menu>
    <template v-slot:activator="{ on }">
      <span v-on="on">
        <img width="40px" src="../../static/img/logo/logo.png" /> Admin</span
      >
    </template>
    <ul class="top-box">
      <li>Admin</li>
      <li><nuxt-link to="/privacy"> My Orders </nuxt-link></li>
      <li v-on:click="logout">Logout</li>
    </ul>
  </v-menu>
</template>

<script>
export default {
   data() {
      return {
        users: {}
      }
    },
    //  async fetch() {
    //   this.users = await fetch(
    //     'localhost:8000/api/user'
    //   ).then(res => res.json());
    //   console.log(this.users);
    // },
  methods: {
    mounted() {},
    logout: function (event) {
      localStorage.removeItem("checklogin");
    },
  },
};
</script>

<style scoped>
li {
  list-style: none;
  font-size: 14px;
  padding: 7px;
}

.top-box {
  max-width: 180px;
  height: auto;
  margin-top: 55px;
  margin-right: 30px;
  background: #303030;
  color: white;
}
</style>