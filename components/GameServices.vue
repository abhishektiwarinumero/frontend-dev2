<template>
  <v-bottom-navigation height="90" v-model="url" color="primary">
    <v-btn
      :value="service.slug"
      v-for="(service, index) in services"
      :key="index"
      nuxt
      :to="service.slug"
    >
      <span>{{ service.name }}</span>

      <v-img
        max-height="60"
        max-width="60"
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
