<template>
  <div :style="layout.search.accordion.main">
    <v-expansion-panels class="main-panel" v-model="panel" multiple accordion>
      <v-row no-gutters justify="space-around">
        <v-col cols="5" sm="5" md="12" lg="11">
          <v-expansion-panel
            v-if="
              config.search.showSizeFilter && ordenatedSizesFromFilter[0].size
            "
            :style="layout.search.accordion.expPanel"
            class="panel"
          >
            <v-expansion-panel-header
              :style="layout.search.accordion.expHeader"
            >
              Tamanhos
              <template v-slot:actions>
                <v-icon color="white">mdi-menu-down</v-icon>
              </template>
            </v-expansion-panel-header>
            <v-expansion-panel-content
              :style="layout.search.accordion.expContent"
            >
              <span
                v-for="(item, index) in ordenatedSizesFromFilter"
                :key="index"
              >
                <v-checkbox
                  :style="layout.search.accordion.expColorCheckBox"
                  v-model="selectedSizesPage"
                  :value="item.size"
                  :label="item.size"
                  color="#ff9ccd"
                />
              </span>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-col>
        <v-col cols="5" sm="5" md="12" lg="11">
          <v-expansion-panel
            v-if="config.search.showColorFilter && colors[0].color"
            :style="layout.search.accordion.expPanel"
            class="color-panel panel"
          >
            <v-expansion-panel-header
              :style="layout.search.accordion.expHeader"
            >
              Cores
              <template v-slot:actions>
                <v-icon color="white">mdi-menu-down</v-icon>
              </template>
            </v-expansion-panel-header>
            <v-expansion-panel-content
              :style="layout.search.accordion.expContent"
            >
              <span v-for="(item, index) in colors" :key="index">
                <v-checkbox
                  :style="layout.search.accordion.expSizeCheckBox"
                  v-model="selectedColorsPage"
                  :label="item.color"
                  :value="item.color"
                  color="#ff9ccd"
                />
              </span>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-col>
        <!-- <v-col cols="12" lg="10">
          <v-container>
            Preço
            <v-row>
              <v-col cols="6">
                <v-text-field :color="layout.search.accordion.valueInput.color">
                  <template v-slot:prepend>
                    <small>Min.</small>
                  </template>
                </v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field :color="layout.search.accordion.valueInput.color">
                  <template v-slot:prepend>
                    <small>Max.</small>
                  </template>
                </v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-col> -->
      </v-row>
    </v-expansion-panels>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";

export default {
  data: function () {
    return {
      panel: [0, 1],
      selectedSizesPage: [],
      selectedColorsPage: [],
    };
  },
  watch: {
    selectedSizesPage: function () {
      this.setSelectedSizes(this.selectedSizesPage);
      this.defaultSearch();
    },
    selectedColorsPage: function () {
      this.setSelectedColors(this.selectedColorsPage);
      this.defaultSearch();
    },
  },
  computed: {
    ...mapState("Search", [
      "colors",
      "sizes",
      "selectedSizes",
      "selectedColors",
    ]),
    ...mapGetters("Search", ["ordenatedSizesFromFilter"]),
    ...mapState("Layouts", ["layout", "config"]),
  },
  methods: {
    ...mapActions("Search", [
      "setSelectedColors",
      "setSelectedSizes",
      "defaultSearch",
      "cleanSelectedColors",
      "cleanSelectedSizes",
      "cleanSizes",
      "cleanColors",
    ]),

    checkSize() {
      // if (window.innerWidth <= 960) {
      this.panel = null;
      // } else {
      // this.panel = [0, 1];
      // }
    },
  },
  mounted() {
    if (process.client) {
      window.addEventListener("resize", this.checkSize);
      this.checkSize();
    }
  },
  destroyed() {
    this.cleanSelectedColors();
    this.cleanSelectedSizes();
    this.cleanSizes();
    this.cleanColors();
  },
};
</script>

<style scoped>
.main-panel {
  z-index: 2;
  width: 100%;
}

.color-panel >>> .v-label {
  text-transform: capitalize;
}
</style>