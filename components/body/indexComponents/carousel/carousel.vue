<template>
  <span
    v-if="layout.index.carousel.items && layout.index.carousel.items.length > 0"
  >
    <simple-carousel />
  </span>
</template>

<script>
import SimpleCarousel from "@/components/body/indexComponents/carousel/components/simpleCarousel";
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState("Layouts", ["layout"]),
  },
  components: {
    SimpleCarousel,
  },
};
</script>

<style>
</style>