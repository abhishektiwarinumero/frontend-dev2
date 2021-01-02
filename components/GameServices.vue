<template>
  <v-bottom-navigation height="200" v-model="url" color="primary" grow>
    <v-btn
      :value="service.slug"
      v-for="(service, index) in services"
      :key="index"
      nuxt
      :to="service.slug"
    >
      <span>{{ service.name }}</span>

      <v-img
        max-height="150"
        max-width="150"
        :src="`/img/services/${service.slug}.png`"
      ></v-img>
    </v-btn>
  </v-bottom-navigation>
</template>

<script>
export default {
  props: {
    services: {
      type: Array,
      required: true,
    },
  },
  data: () => ({
    url: "",
  }),
  mounted() {
    this.url = this.$route.name;
  },
};
</script>
