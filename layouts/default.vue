<template>
  <v-app dark>
    <notification-component></notification-component>
    <v-system-bar lights-out app>
      <social-component></social-component>
      <v-spacer></v-spacer>
      <top-right-links></top-right-links>
    </v-system-bar>
    <app-bar-component></app-bar-component>
    <v-main>
      <v-container fluid>
        <nuxt v-if="!$slots.default" />
        <slot />
      </v-container>
    </v-main>
    <v-footer class="font-weight-medium">
      <v-container>
        <v-row align="center" justify="center">
          <img src="/img/logo/icon.svg" alt="Logo" />
        </v-row>
        <v-row align="center" justify="center">
          <div class="text-h4 text-uppercase">King Boosting</div>
        </v-row>
        <v-row align="center" justify="center">
          <v-col cols="2">
            Title
            <ul>
              <li>Something</li>
              <li>Something</li>
              <li>Something</li>
              <li>Something</li>
            </ul>
          </v-col>
          <v-col cols="2">
            Title
            <ul>
              <li>Something</li>
              <li>Something</li>
              <li>Something</li>
              <li>Something</li>
            </ul>
          </v-col>
          <v-col cols="2">
            Title
            <ul>
              <li>Something</li>
              <li>Something</li>
              <li>Something</li>
              <li>Something</li>
            </ul>
          </v-col>
          <v-col cols="2">
            Title
            <ul>
              <li>Something</li>
              <li>Something</li>
              <li>Something</li>
              <li>Something</li>
            </ul>
          </v-col>
          <v-col cols="2">
            Title
            <ul>
              <li>Something</li>
              <li>Something</li>
              <li>Something</li>
              <li>Something</li>
            </ul>
          </v-col>
          <v-col cols="2">
            <nuxt-link to="/terms-of-use">Terms of use</nuxt-link>
          </v-col>
        </v-row>
        <v-col class="text-center" cols="12">
          {{ new Date().getFullYear() }} —
          <strong>King Boosting</strong>
        </v-col>
      </v-container>
    </v-footer>
  </v-app>
</template>

<style scoped>
.container {
  padding: 0px;
}
</style>
