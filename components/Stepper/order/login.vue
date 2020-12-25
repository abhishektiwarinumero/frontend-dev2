<template>
  <v-row>
    <v-col>
      <LoginForm @close="nextStep" @cancel="cancel"></LoginForm>
    </v-col>
    <v-col cols="4">
      <SocialLogin></SocialLogin>
    </v-col>
  </v-row>
</template>

<script>
export default {
  methods: {
    nextStep() {
      this.$emit("next", 1);
    },
    cancel() {
      this.$emit("cancel");
    },
  },
};
</script>
