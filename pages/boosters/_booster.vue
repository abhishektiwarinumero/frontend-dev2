<template>
  <div>
    <p>Hey Im booster {{ booster }}</p>
  </div>
</template>

<script>
export default {
  data: () => ({
    booster: "",
  }),
  methods: {
    getBooster(id) {
      this.booster = id;
    },
  },
  mounted() {
    this.getBooster(this.$route.params.Booster);
  },
};
</script>
