<template>
  <div :style="layout.cart.cartDialog.card.style">
    <modal-spinner>
      <cart-dialog />
      <div v-if="totalAmountInCart > 0" style="overflow: scroll !important">
        <!-- <div class="blink blink-btn-class">
          <span
            class="txt-discount"
            style=""
            v-if="calculateProgressiveDiscount"
            >{{ getQtdProducts() }}</span
          >
        </div> -->
        <span v-for="(item, index) in productsWithImgUrl" :key="index">
          <router-link
            :to="`/produto/${item.id}/${convertToLink(item.name)}`"
            style="text-decoration: none; color: inherit"
            class="no-decoration"
          >
            <v-row
              align="center"
              class="pl-5"
              :class="layout.cart.cartDialog.list.rowClass"
              :style="layout.cart.cartDialog.list.rowStyle"
            >
              <v-col
                :style="layout.cart.cartDialog.list.img.colStyle"
                :cols="layout.cart.cartDialog.list.img.cols"
                :sm="layout.cart.cartDialog.list.img.sm"
              >
                <v-img
                  contain
                  :style="layout.cart.cartDialog.list.img.imgStyle"
                  :src="item.imgUrl"
                ></v-img>
              </v-col>
              <v-col cols="12" sm="10" class="pr-5">
                <v-row no-gutters>
                  <v-col cols="12">
                    <span
                      :style="layout.cart.cartDialog.list.information.nameStyle"
                      class="nameText"
                      v-show="item.color !== 'N/A'"
                    >
                      {{ item.name }}
                      <br />
                    </span>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col
                    :cols="layout.cart.cartDialog.list.information.cols"
                    :md="layout.cart.cartDialog.list.information.md"
                  >
                    <small>
                      <span
                        :style="
                          layout.cart.cartDialog.list.information.colorStyle
                        "
                        class="text"
                      >
                        <strong>Cor: </strong>{{ item.color }}
                        <br />
                      </span>
                      <span
                        :style="
                          layout.cart.cartDialog.list.information.sizeStyle
                        "
                        class="text"
                      >
                        <strong>Tamanho: </strong>
                        <span style="text-transform: uppercase">
                          {{ item.size }}
                        </span>
                        <br />
                      </span>
                      <span
                        :style="
                          layout.cart.cartDialog.list.information.qtdStyle
                        "
                        class="text"
                        v-if="!layout.cart.cartDialog.list.qtd.input"
                      >
                        <strong>Qtd </strong>{{ parseInt(item.amount) }}
                      </span>
                      <span v-if="item.balance < 1" style="color: red">
                        <br />
                        Produto Indisponível
                      </span>
                    </small>
                  </v-col>
                  <v-col
                    v-if="layout.cart.cartDialog.list.qtd.input"
                    :cols="layout.cart.cartDialog.list.qtd.cols"
                    :md="layout.cart.cartDialog.list.qtd.md"
                    align="center"
                  >
                    <span :style="layout.cart.cartDialog.list.qtd.labelStyle"
                      >Qtd</span
                    >
                    <br />
                    <v-text-field
                      dense
                      readonly
                      flat
                      solo
                      v-model="item.amount"
                      label="QTD"
                      type="text"
                      :style="layout.cart.cartDialog.list.qtd.inputStyle"
                      class="qtd-input"
                      :disabled="item.balance < 1"
                      ><v-icon
                        small
                        :disabled="item.amount < 2"
                        @click="
                          changeItemAmount({
                            index: index,
                            amount: item.amount - 1,
                          })
                        "
                        slot="prepend"
                        color="black"
                      >
                        mdi-minus-circle
                      </v-icon>
                      <v-icon
                        small
                        @click="
                          changeItemAmount({
                            index: index,
                            amount: item.amount + 1,
                          })
                        "
                        slot="append-outer"
                        color="black"
                        :disabled="item.balance < 1"
                      >
                        mdi-plus-circle
                      </v-icon>
                    </v-text-field>
                  </v-col>
                  <v-col
                    :align="layout.cart.cartDialog.list.price.colAlign"
                    :cols="layout.cart.cartDialog.list.price.cols"
                    :md="layout.cart.cartDialog.list.price.md"
                  >
                    <span
                      v-show="item.size !== 'N/A'"
                      :style="layout.cart.cartDialog.list.price.totalStyle"
                      class="priceText"
                    >
                      R$
                      {{
                        (item.amount * item.price).toLocaleString("pt-BR", {
                          maximumFractionDigits: 2,
                          minimumFractionDigits: 2,
                        })
                      }}
                      <br />
                    </span>
                    <span
                      :style="layout.cart.cartDialog.list.price.eachStyle"
                      class="text"
                    >
                      ( R$
                      {{
                        item.price.toLocaleString("pt-BR", {
                          maximumFractionDigits: 2,
                          minimumFractionDigits: 2,
                        })
                      }}
                      cada)
                      <br />
                    </span>
                    <span @click.prevent>
                      <button
                        :style="layout.cart.cartDialog.list.removeButton.style"
                        @click="removeItem(index)"
                      >
                        Remover
                      </button>
                    </span>
                  </v-col>
                </v-row>
              </v-col>
              <hr style="color: lightgrey; width: 100%" />
            </v-row>
          </router-link>
        </span>
      </div>
      <v-container v-else>
        <v-row no-gutters justify="center">
          <v-col cols="12" align="center">
            <v-img
              :style="layout.cart.cartDialog.noItemIcon.style"
              src="/empty-bag.svg"
            />
          </v-col>
          <v-col cols="12" align="center">
            <h3 :style="layout.cart.cartDialog.emptyText.style">
              {{ layout.cart.cartDialog.emptyText.text }}
            </h3>
          </v-col>
          <!-- <v-col cols="12" align="center">
          <v-btn
            @click="setCartModal(false)"
            :style="layout.cart.cartDialog.emptyButton.style"
            >{{ layout.cart.cartDialog.emptyButton.text }}</v-btn
          >
        </v-col> -->
        </v-row>
      </v-container>
      <v-container> </v-container>
    </modal-spinner>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import ModalSpinner from "@/components/utils/modalSpinner";
import cartDialog from "@/components/body/orderSection/cart/components/cartDialogFretch";

export default {
  components: {
    ModalSpinner,
    cartDialog,
  },
  data: function () {
    return {};
  },
  computed: {
    ...mapState("Cart", ["cartDialog", "cartData"]),
    ...mapGetters("Cart", [
      "productsWithImgUrl",
      "totalAmountInCart",
      "totalProductsValue",
      "calculateProgressiveDiscount",
      "getProductsWithoutSale",
    ]),
    ...mapState("Layouts", ["layout", "config"]),
  },
  methods: {
    ...mapActions("Cart", [
      "setCartModal",
      "showCartItems",
      "changeItemAmount",
      "removeItem",
    ]),

    getQtdProducts() {
      let result =
        this.config.qtdProductsForDiscount -
        this.getProductsWithoutSale.totalAmount;
      if (result <= 0) {
        return (
          "Parabéns, você ganhou " +
          this.calculateProgressiveDiscount.discountRate +
          "% de desconto"
        );
      } else {
        return (
          "Falta " + result + " produto(s) para você ganhar 40% de desconto"
        );
      }
    },

    convertToLink(value) {
      let response = value
        .replace(/_|\/|\s/g, "-")
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
      return response;
    },
  },
};
</script>
<style scoped>
.nameText {
  font-size: 14px !important;
}

.text {
  font-size: 12px;
}

.priceText {
  font-size: 16px;
}

.subtotal {
  font-size: 18px;
}

.qtd-input >>> input {
  text-align: center;
}

.cartBtn {
  font-size: 12px;
}
.message-discount {
  background-color: #d7aac1;
  text-align: center;

  color: white;
}

.blink-btn-class {
  /* width: 100% !important; */
  /* margin-top: 100px; */
  width: 100% !important;
  height: auto !important;
  line-height: 30px;
  text-align: center;
  background-color: #b96890;
  font-size: 14px;
}

.line-desc {
  border: 2px red solid;
  border-top-left-radius: 200px;
  border-bottom-left-radius: 200px;
  width: 350px;
  margin: 20px 0 20px 0;
}

@keyframes blinker {
  from {
    opacity: 0.6;
  }
  to {
    opacity: 1;
  }
}
@-webkit-keyframes blinker {
  from {
    opacity: 0.6;
  }
  to {
    opacity: 1;
  }
}
.blink {
  color: #ffffff !important;
  text-decoration: blink;
  animation-name: blinker;
  animation-duration: 1s;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
  animation-direction: alternate;
  -webkit-text-decoration: blink;
  -webkit-animation-name: blinker;
  -webkit-animation-duration: 3s;
  -webkit-animation-iteration-count: infinite;
  -webkit-animation-timing-function: ease-in-out;
  -webkit-animation-direction: alternate;
}

@media screen and (max-width: 1263px) {
  .blink-btn-class {
    font-size: 16px;
  }
}

@media only screen and (max-width: 600px) {
  .nameText {
    font-size: 12px !important;
  }

  .text {
    font-size: 10px !important;
  }

  .priceText {
    font-size: 14px;
  }

  .subtotal {
    font-size: 14px;
  }

  .v-dialog__content >>> .v-dialog {
    margin: 10px !important;
    max-height: 99vh !important;
  }

  .cartBtn {
    font-size: 10px;
  }
}

@media only screen and (max-width: 458px) {
  .txt-discount {
    font-size: 12px;
  }
}
</style>