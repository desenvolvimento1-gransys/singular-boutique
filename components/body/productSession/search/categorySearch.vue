<template>
  <div :style="layout.search.category.main" translate="no">
    <div class="container-2" style="margin: 0 auto">
      <p
        class="category-responsiv"
        v-show="spinner == false"
        :style="layout.search.category.titleStyle"
        v-if="sectionName"
      >
        {{ sectionName }}
      </p>
      <v-row
        v-show="spinner == false"
        justify="center"
        style="margin-bottom: 80px !important"
      >
        <v-col
          class="category-responsiv"
          align="center"
          :md="layout.search.category.accordion.cols"
          :xl="layout.search.category.accordion.xl"
          cols="12"
          v-if="
            ordenatedSizesFromFilter.length > 0 &&
            colors.length > 0 &&
            (ordenatedSizesFromFilter[0].size != 'N/A' ||
              colors[0].color != 'N/A')
          "
        >
          <accordion-filter-search />
        </v-col>
        <v-col
          class="pt-0"
          :md="layout.search.category.items.cols"
          :xl="layout.search.category.items.xl"
          :xs="layout.search.category.items.xs"
          cols="12"
          align="center"
        >
          <simple-search class="card-category" />
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import SimpleSearch from "@/components/body/productSession/search/components/searchComponents/simpleSearchCoponent";
import { mapState, mapGetters } from "vuex";
import accordionFilterSearch from "@/components/body/productSession/search/components/searchComponents/components/accordionFilterSearch";

export default {
  components: {
    SimpleSearch,
    accordionFilterSearch,
  },
  computed: {
    ...mapState("Search", ["list", "sectionName", "colors"]),
    ...mapState("Layouts", ["layout"]),
    ...mapState("Utils", ["spinner"]),
    ...mapGetters("Search", ["ordenatedSizesFromFilter"]),
  },
  mounted() {
    window.scrollTo(0, 0);
    localStorage.removeItem("scrollPosition");
  },
};
</script>
<style scoped>
.container-2 {
  max-width: 1600px !important;
  width: 95%;
}
.category-responsiv {
  width: 95% !important;
  text-align: left !important;
  margin-top: 15px;
}
@media screen and(max-width: 1502px) {
  .category-responsiv {
    margin-left: 10px !important;
  }
}
@media screen and(max-width: 960px) {
  .category-responsiv {
    display: none !important;
  }
}

.card-category {
  margin: 0 0 0 0 !important;
}
</style>