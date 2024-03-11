<template>
  <span :style="layout.topBar.main">
    <v-row :style="layout.topBar.sizes" justify="center">
      <v-col cols="2" class="mr-5 psb-3" align="center">
        <router-link to="/">
          <img
            :style="layout.topBar.topBarLogoImg"
            :src="layout.topBar.logoUrl"
            alt="Logo da topBar"
          />
        </router-link>
      </v-col>
      <v-col cols="6" align="center" align-self="center">
        <v-text-field
          flat
          solo
          hide-details
          v-model="searchText"
          v-on:keydown.enter="search()"
          :style="layout.topBar.searchInput"
          placeholder="O quê você procura?"
        >
          <template v-slot:append>
            <v-btn icon @click="search()" :style="layout.topBar.searchInputBtn">
              <i class="mdi mdi-magnify"></i>
            </v-btn>
          </template>
        </v-text-field>
      </v-col>
      <v-col cols="3" class="icons">
        <v-row no-gutters>
          <v-col cols="4" align="center" align-self="center" class="conta">
            <router-link
              style="text-decoration: none"
              to="/conta/minha-conta"
              v-if="user.id"
            >
              <i
                style="margin-top: 6px"
                class="far fa-user user-icon"
                :style="layout.topBar.icons"
              >
              </i>
              <span :style="layout.topBar.iconsText"> Conta </span>
            </router-link>
            <router-link v-else style="text-decoration: none" to="/login">
              <i
                style="margin-top: 6px"
                class="far fa-user user-icon"
                :style="layout.topBar.icons"
              >
              </i>
              <span :style="layout.topBar.iconsText"> Entrar </span>
            </router-link>
          </v-col>
          <v-col
            cols="6"
            align="center"
            align-self="center"
            style="margin-top: 5px"
          >
            <router-link style="text-decoration: none" :to="checkUser()">
              <i class="far fa-clipboard" :style="layout.topBar.icons"></i>
              <span :style="layout.topBar.iconsText"> Meus Pedidos </span>
            </router-link>
          </v-col>
          <v-col cols="2" align="right" style="margin-top: 5px" class="cart">
            <button @click="showCart()">
              <i
                :class="layout.topBar.cartIcon.class"
                :style="layout.topBar.cartIcon.style"
              ></i>
              <span style="font-size: 14px" :style="layout.topBar.cartText">{{
                totalAmountInCart
              }}</span>
            </button>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </span>
  <!-- <h1>teste</h1> -->
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";

export default {
  data: function () {
    return {
      searchText: "",
    };
  },
  computed: {
    ...mapState("Layouts", ["layout", "config"]),
    ...mapState("User", ["user"]),
    ...mapGetters("Cart", ["totalAmountInCart"]),
  },
  methods: {
    ...mapActions("Cart", ["setCartModal"]),
    search() {
      if (this.searchText && this.searchText.length > 0) {
        $nuxt.$router.push(`/busca/texto/${this.searchText}`);
        this.searchText = "";
      }
    },
    checkUser() {
      if (this.user.id) {
        return "/conta/pedidos";
      } else {
        return "/login";
      }
    },
    showCart() {
      if (this.config.showModalInClickCartIcon) {
        this.setCartModal(true);
      } else {
        $nuxt.$router.push({ path: "/carrinho" });
      }
    },
  },
};
</script>

<style scoped>
.cart-icon {
  font-size: 29px;
}

.user-icon {
  font-size: 17px;
}

.order-class {
  font-size: 19px;
}

@media screen and (max-width: 1140px) {
  .icons i {
    font-size: 18px !important;
  }
  .icons span {
    font-size: 14px !important;
  }
  .cart button {
    height: 20px;
  }
}

@media screen and (max-width: 1008px) {
  .icons i {
    font-size: 16px !important;
  }
  .conta i {
    margin-top: 8px !important;
  }
  .cart i {
    margin-top: 8px !important;
    font-size: 18px !important;
  }
  .icons span {
    font-size: 13px !important;
  }
}
</style>