import { mapActions, mapState } from "vuex";

export default {
  computed: {
    ...mapState("Settings", ["navBarList", "routeSearchSettings"]),
    ...mapState("Layouts", ["layout"]),
  },
  data: function () {
    return {
      dialog: false,
      menu: false,
    };
  },
};