<template>
  <v-snackbar v-model="snackbar" right top :color="mode" :timeout="3000">
    <p class="black--text">{{ text }}</p>
    <ul v-if="errors">
      <li v-for="(error, index) in errors" :key="index">
        {{ index }}
        <ul>
          <li v-for="(err, i) in error" :key="i">{{ err }}</li>
        </ul>
      </li>
    </ul>
    <v-btn color="black" text @click="snackbar = false">Close</v-btn>
  </v-snackbar>
</template>

<script>
export default {
  computed: {
    snackbar: {
      get() {
        return this.$store.state.notification.isOpen;
      },
      set() {
        this.$store.commit("notification/close");
      },
    },
    text() {
      return this.$store.state.notification.text;
    },
    mode() {
      return this.$store.state.notification.mode;
    },
    errors() {
      return this.$store.state.notification.errors;
    },
  },
};
</script>
