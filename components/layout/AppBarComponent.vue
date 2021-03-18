<template>
  <v-app-bar app flat color="#1e1e1e" prominent height="88">
    <div id="particles-js"></div>
    <nuxt-link to="/">
      <v-img src="/img/logo/nav.png" alt="Logo" height="88" />
    </nuxt-link>

    <v-tabs
      centered
      color="primary"
      optional
      slider-size="4"
      class="top-header" >
      <v-tab v-for="link in links" :key="link.title" nuxt :to="link.url">
        <span v-if="link.title === 'More'">
          <v-menu>
            <template v-slot:activator="{ on }">
              <span  v-on="on">more</span>
            </template>
            <ul class="top-box">
                <li><nuxt-link to="/privacy"> Privicy Policy </nuxt-link></li>
                <li><nuxt-link to="/terms-of-use"> Terms </nuxt-link></li>
					      <li><nuxt-link to="/apply"> Jobs </nuxt-link></li>
                    <li><nuxt-link to="/contact"> Contact </nuxt-link></li>
                    <!-- <li>{{$auth.user.name}}<li> -->
                  </ul>

             
          </v-menu>
        </span>
        <span v-else>{{ link.title }}</span>
      </v-tab>
    </v-tabs>

  
      <div v-if="isloginuser">
       
      <v-btn class="profile-btn"> <Dropdown></Dropdown></v-btn>
    
       
      </div>

    <div v-else style="height: inherit; border-bottom: white solid 5px">
      <v-btn
        depressed
        tile
        color="primary"
        :href="url"
        block
        x-large
        class="mr-0"
        style="height: 100%"
        v-if="loggedIn"
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
            >Members Area</v-btn
          >
        </template>
        <v-card class="px-5" color="#303030">
          <v-container>
            <v-row>
              <v-col cols="7">
                <RegisterForm
                  @close="dialog = false"
                  v-if="register"
                ></RegisterForm>
                <LoginForm @close="dialog = false" redirect v-else></LoginForm>
              </v-col>
              <v-col cols="5">
                <SocialLogin></SocialLogin>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-dialog>
    </div>
  </v-app-bar>
</template>

<script>
export default {
  
  data: () => ({
    links: [
      { title: "Elo Boosting", url: "division-boosting" },
      { title: "Coaching", url: "coaching" },
      { title: "Account Market", url: "lol-accounts" },
      { title: "More" },
    ],
    dialog: false,
    register: false,
    isloginuser:String
   
					
  }),
    // ,
    
  
  computed: {
    url() {
      return process.env.HOST_URL;
    },
    loggedIn() {
      return this.$auth.loggedIn;
      console.log($auth.loggedIn);
    },
  },
  mounted() {
    this.$root.$on("openRegisterForm", () => {
      this.register = true;
    });
    this.$root.$on("openLoginForm", () => {
      this.register = false;
    });
    if(this.isloginuser){
      this.isloginuser = JSON.parse(localStorage.getItem("checklogin")) ;
     console.log(this.isloginuser);
    }
    else{
   localStorage.removeItem("checklogin");
     console.log(this.isloginuser);
    }
   
   
  },
};
</script>

<style scoped>
.header_logo {
  padding-top: 30px;
}

.v-btn:hover:before {
  content: none;
}

#particles-js canvas {
  display: block;
  transform: scale(1);
  opacity: 1;
  transition: opacity 0.8s ease, transform 1.4s ease;
}

#particles-js {
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 0;
  top: 0;
  left: 0;
}
li {
  list-style: none;
  font-size: 14px;
  /* padding-right: 80px; */
  padding: 7px;
}

.top-box {
  max-width: 180px;
  height: auto;
  margin-top: 55px;
  margin-right: 40px;
  background: #303030;
  color: white;
}
.profile-btn{
  margin-top: 20px !important;
  margin-right: 50px !important;
   width: 145px !important;
    height: 50px !important;
    background-color: #ff9f1a !important;
    border-radius: 30%;

}

</style>
