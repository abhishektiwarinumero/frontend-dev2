
<template>
  <v-menu >
    <template v-slot:activator="{ on }">
      <span v-on="on">
        <span v-if="user"><i aria-hidden="true" class="v-icon notranslate mdi mdi-account-circle-outline theme--dark white--text" data-v-314f53c6=""></i> {{ user.username }} </span>
        <!-- <img width="40px" src="../../static/img/logo/logo.png" />  -->
      </span>
    </template>
    <ul class="top-box">
      <li v-if="user" class="text-center">  {{ user.username }} </li>
       <li><nuxt-link to="/privacy"><i aria-hidden="true" class="icon-men-col notranslate mdi mdi-cart theme--dark white--text" data-v-314f53c6=""></i>  My Orders </nuxt-link></li>
      <li v-on:click="logout"><i aria-hidden="true" class="icon-men-col notranslate mdi mdi-logout theme--dark white--text" data-v-314f53c6=""></i>  Logout</li>
    </ul>
  </v-menu>
</template>

<script>
export default {
  
     data() {
    return {
      user: this.$auth.user,
   }
   },
  methods: {
    async logout() {
      await this.$auth.logout()
     this.$router.push('/')
       localStorage.removeItem("checklogin");
    },
  },

};
</script>

<style scoped>
li {
  list-style: none;
  font-size: 12px;
  padding: 7px;
   cursor: pointer;
}

.top-box {
    max-width: 180px;
    height: auto;
    margin-top: 29px;
    background: #000000;
    color: white;
    min-width: 120px;
    border: 1px solid #202224;
    border-radius: 4px;
    padding: 10px;
}
.v-menu__content.theme--dark.v-menu__content--fixed.menuable__content__active{
  left:1236px !important;
  top: 50px !important;
}
.icon-men-col{
  color:#999999 !important;
  font-size: 20px;
}
.text-center{
  text-align: center;
}
</style>