<template>
  <div :style="layout.navBar.mobile.main" translate="no">
    <v-container
      :style="layout.navBar.mobile.linkStyle"
      v-if="layout.navBar.mobile.linkList"
    >
      <span v-if="user.id">
        <v-row
          dense
          v-for="(item, index) in layout.navBar.mobile.linkList"
          :key="index"
        >
          <v-col cols="12">
            <v-input hide-details
              ><v-icon :style="item.icon.style">{{ item.icon.class }}</v-icon
              ><router-link :to="item.link" :style="item.style"
                >&nbsp;{{ item.name }}</router-link
              ></v-input
            >
          </v-col>
        </v-row>
      </span>
      <v-row v-else dense>
        <v-col cols="12">
          <v-input hide-details
            ><v-icon :style="layout.navBar.mobile.login.icon.style">{{
              layout.navBar.mobile.login.icon.class
            }}</v-icon
            ><a
              :href="layout.navBar.mobile.login.link"
              :style="layout.navBar.mobile.login.style"
              >&nbsp;{{ layout.navBar.mobile.login.name }}</a
            ></v-input
          >
        </v-col>
      </v-row>
    </v-container>

    <v-container>
      <v-row>
        <v-expansion-panels flat>
          <v-expansion-panel v-for="(items, i) in navBarList" :key="i">
            <v-expansion-panel-header>
              <router-link
                @click.native.stop
                :to="`/busca${items.route}`"
                :style="layout.navBar.mobile.itemStyle"
                >{{ items.name }}
              </router-link>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <div
                style="margin-bottom: 10px"
                v-for="detail in items.childrens"
                :key="detail.name"
              >
                <router-link
                  @click.native.stop
                  :to="`/busca${detail.data.route}`"
                  :style="layout.navBar.mobile.itemStyle"
                >
                  {{ detail.data.name }}
                </router-link>
              </div>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState("Settings", ["navBarList"]),
    ...mapState("User", ["user"]),
    ...mapState("Layouts", ["layout"]),
  },
  data: function () {
    return {};
  },
};
</script>

<style scoped>
.v-menu__content {
  left: 0 !important;
}

.subItem >>> .v-btn__content {
  text-transform: none;
  justify-content: left;
}
</style>