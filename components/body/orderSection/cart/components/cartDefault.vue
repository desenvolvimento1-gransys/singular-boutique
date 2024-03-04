<template>
  <div :style="layout.cart.cartScreen.mainStyle">
    <v-container>
      <v-btn
        @click="closeOrder()"
        v-if="layout.cart.cartScreen.btnTop.show && totalAmountInCart > 0"
        :style="layout.cart.cartScreen.btnTop.style"
        >Continuar</v-btn
      >
      <p
        :style="layout.cart.cartScreen.title.style"
        :class="layout.cart.cartScreen.title.class"
      >
        {{ layout.cart.cartScreen.title.name }}
      </p>

      <div v-if="totalAmountInCart > 0">
        <span v-for="(item, index) in productsWithImgUrl" :key="index">
          <router-link
            :to="`/produto/${item.id}/${convertToLink(item.name)}`"
            style="text-decoration: none; color: inherit"
            class="no-decoration"
          >
            <v-row
              :class="layout.cart.cartScreen.list.row.class"
              :style="layout.cart.cartScreen.list.row.style"
              align="center"
            >
              <v-col
                :style="layout.cart.cartScreen.list.img.colStyle"
                :cols="layout.cart.cartScreen.list.img.cols"
                :sm="layout.cart.cartScreen.list.img.sm"
              >
                <v-img
                  contain
                  :style="layout.cart.cartScreen.list.img.imgStyle"
                  :src="item.imgUrl"
                  alt="Imagem do produto no carrinho"
                ></v-img>
              </v-col>
              <v-col
                :align-self="layout.cart.cartScreen.list.name.alignSelf"
                :cols="layout.cart.cartScreen.list.name.cols"
                :sm="layout.cart.cartScreen.list.name.sm"
                :md="layout.cart.cartScreen.list.name.md"
                :style="layout.cart.cartScreen.list.name.colStyle"
              >
                <p
                  :style="layout.cart.cartScreen.list.name.title.style"
                  :class="layout.cart.cartScreen.list.name.title.class"
                >
                  {{ item.name }}
                </p>
                <span class="d-block d-md-none">
                  <p
                    v-show="item.size !== 'N/A'"
                    :style="layout.cart.cartScreen.list.info.size.style"
                    :class="layout.cart.cartScreen.list.info.size.class"
                  >
                    Tamanho:
                    <span style="text-transform: uppercase">
                      {{ item.size }}
                    </span>
                  </p>
                  <p
                    v-show="item.color !== 'N/A'"
                    :style="layout.cart.cartScreen.list.info.color.style"
                    :class="layout.cart.cartScreen.list.info.color.class"
                  >
                    Cor: {{ item.color }}
                  </p>
                </span>
                <p v-if="item.balance < 1" style="color: red">
                  Produto Indisponível
                </p>
              </v-col>
              <v-col
                class="d-none d-md-block"
                :align-self="layout.cart.cartScreen.list.info.alignSelf"
                :cols="layout.cart.cartScreen.list.info.cols"
                :sm="layout.cart.cartScreen.list.info.sm"
                :md="layout.cart.cartScreen.list.info.md"
              >
                <v-row no-gutters align="center">
                  <v-col
                    :align-self="
                      layout.cart.cartScreen.list.info.color.alignSelf
                    "
                    :cols="layout.cart.cartScreen.list.info.color.cols"
                    :md="layout.cart.cartScreen.list.info.color.md"
                    :style="layout.cart.cartScreen.list.info.color.colStyle"
                  >
                    <p
                      v-show="item.color !== 'N/A'"
                      :style="layout.cart.cartScreen.list.info.color.style"
                      :class="layout.cart.cartScreen.list.info.color.class"
                    >
                      Cor: {{ item.color }}
                    </p>
                  </v-col>
                  <v-col
                    :align-self="
                      layout.cart.cartScreen.list.info.size.alignSelf
                    "
                    :cols="layout.cart.cartScreen.list.info.size.cols"
                    :md="layout.cart.cartScreen.list.info.size.md"
                    :style="layout.cart.cartScreen.list.info.size.colStyle"
                  >
                    <p
                      v-show="item.size !== 'N/A'"
                      :style="layout.cart.cartScreen.list.info.size.style"
                      :class="layout.cart.cartScreen.list.info.size.class"
                    >
                      Tamanho:
                      <span style="text-transform: uppercase">
                        {{ item.size }}
                      </span>
                    </p>
                  </v-col>
                </v-row>
              </v-col>
              <v-col
                :cols="layout.cart.cartScreen.list.amount.cols"
                :sm="layout.cart.cartScreen.list.amount.sm"
                :md="layout.cart.cartScreen.list.amount.md"
                align="center"
                @click.prevent
              >
                <p :style="layout.cart.cartDialog.list.qtd.labelStyle">Qtd</p>
                <v-text-field
                  dense
                  readonly
                  flat
                  solo
                  :hide-details="true"
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
                :align="layout.cart.cartScreen.list.price.colAlign"
                :cols="layout.cart.cartScreen.list.price.cols"
                :sm="layout.cart.cartScreen.list.price.sm"
                :md="layout.cart.cartScreen.list.price.md"
                @click.prevent
              >
                <p
                  :style="layout.cart.cartScreen.list.price.totalStyle"
                  :class="layout.cart.cartScreen.list.price.totalClass"
                >
                  R$
                  {{
                    (item.amount * item.price).toLocaleString("pt-BR", {
                      maximumFractionDigits: 2,
                      minimumFractionDigits: 2,
                    })
                  }}
                </p>
                <p
                  :style="layout.cart.cartScreen.list.price.eachStyle"
                  :class="layout.cart.cartScreen.list.price.eachClass"
                >
                  ( R$
                  {{
                    item.price.toLocaleString("pt-BR", {
                      maximumFractionDigits: 2,
                      minimumFractionDigits: 2,
                    })
                  }}
                  cada)
                </p>
                <button
                  :style="layout.cart.cartScreen.list.removeButton.style"
                  @click="removeItem(index)"
                >
                  Remover
                </button>
              </v-col>
            </v-row>
          </router-link>

          
        </span>
        <span v-if="config.progressiveDiscount">
            <progressive-discount />
          </span>

        <v-row :style="layout.cart.cartScreen.resume.row.style">
          <v-col
            :style="layout.cart.cartScreen.resume.freight.col.style"
            :cols="layout.cart.cartScreen.resume.freight.col.cols"
            :sm="layout.cart.cartScreen.resume.freight.col.sm"
            :align="layout.cart.cartScreen.resume.freight.col.align"
            ><v-row>
              <v-col
                :cols="layout.cart.cartScreen.resume.freight.input.cols"
                :sm="layout.cart.cartScreen.resume.freight.input.sm"
              >
                <delivery></delivery>
              </v-col>
            </v-row>
          </v-col>

          <v-col
            :style="layout.cart.cartScreen.resume.info.col.style"
            :cols="layout.cart.cartScreen.resume.info.col.cols"
            :sm="layout.cart.cartScreen.resume.info.col.sm"
            :align="layout.cart.cartScreen.resume.info.col.align"
          >
            <v-divider class="d-block d-sm-none" />
            <p
              :style="layout.cart.cartScreen.resume.info.resume.style"
              :class="layout.cart.cartScreen.resume.info.resume.class"
            >
              Resumo:
            </p>
            <p
              :style="layout.cart.cartScreen.resume.info.subtotal.style"
              :class="layout.cart.cartScreen.resume.info.subtotal.class"
            >
              Subtotal: R$
              {{
                totalProductsValue.toLocaleString("pt-BR", {
                  maximumFractionDigits: 2,
                  minimumFractionDigits: 2,
                })
              }}
            </p>

            <p
              v-if="config.progressiveDiscount"
              :style="layout.cart.cartScreen.resume.info.subtotal.style"
              :class="layout.cart.cartScreen.resume.info.subtotal.class"
            >
              Desconto: R$
              {{
                calculateProgressiveDiscount.discountValue.toLocaleString(
                  "pt-BR",
                  {
                    maximumFractionDigits: 2,
                    minimumFractionDigits: 2,
                  }
                )
              }}
            </p>

            <span>
              <p
                v-if="this.discountValue > 0"
                style="color: #ffa4d1; font-weight: bold"
                :class="layout.cart.cartScreen.resume.info.total.class"
              >
                À vista no Pix: R$
                {{
                  (this.pricePix =
                    parseFloat(this.totalProductsValue) -
                    this.discountValue).toLocaleString("pt-BR", {
                    maximumFractionDigits: 2,
                    minimumFractionDigits: 2,
                  })
                }}
              </p>
            </span>
            <p
              :style="layout.cart.cartScreen.resume.info.freight.style"
              :class="layout.cart.cartScreen.resume.info.freight.class"
            >
              Frete: R$
              {{
                deliveryPrice.toLocaleString("pt-BR", {
                  maximumFractionDigits: 2,
                  minimumFractionDigits: 2,
                })
              }}
            </p>
            <p
              v-if="config.progressiveDiscount"
              :style="layout.cart.cartScreen.resume.info.total.style"
              :class="layout.cart.cartScreen.resume.info.total.class"
            >
              Total: R$
              {{
                (
                  parseFloat(
                    totalProductsValue -
                      calculateProgressiveDiscount.discountValue
                  ) + parseFloat(deliveryPrice)
                ).toLocaleString("pt-BR", {
                  maximumFractionDigits: 2,
                  minimumFractionDigits: 2,
                })
              }}
            </p>

            <p
              v-else
              :style="layout.cart.cartScreen.resume.info.total.style"
              :class="layout.cart.cartScreen.resume.info.total.class"
            >
              Total: R$
              {{
                (
                  parseFloat(totalProductsValue) + parseFloat(deliveryPrice)
                ).toLocaleString("pt-BR", {
                  maximumFractionDigits: 2,
                  minimumFractionDigits: 2,
                })
              }}
            </p>

            <p
              :style="layout.cart.cartScreen.resume.info.installments.style"
              :class="layout.cart.cartScreen.resume.info.installments.class"
              v-if="layout.cart.cartScreen.resume.info.installments.show"
            >
              ou
              {{ maximumInstallment }}x de R$
              {{ minimumValue }}
            </p>
          </v-col>
        </v-row>
        <v-row justify="end">
          <v-col cols="12" sm="6" md="4">
            <v-btn
              block
              @click="closeOrder()"
              :style="layout.cart.cartScreen.btnBottom.style"
              >Continuar</v-btn
            >
            <!-- <delivery></delivery> -->
          </v-col>
        </v-row>
      </div>

      <div v-else>
        <v-row
          :class="layout.cart.cartScreen.list.row.class"
          :style="layout.cart.cartScreen.list.row.style"
          justify="center"
        >
          <v-col cols="12" align="center">
            <span
              :style="layout.cart.cartScreen.noItemIcon.style"
              :class="layout.cart.cartScreen.noItemIcon.class"
            />
          </v-col>
          <v-col cols="12" align="center">
            <span :style="layout.cart.cartScreen.emptyText.style">{{
              layout.cart.cartScreen.emptyText.text
            }}</span>
          </v-col>
          <v-col cols="12" align="center">
            <v-btn to="/" :style="layout.cart.cartScreen.emptyButton.style">{{
              layout.cart.cartScreen.emptyButton.text
            }}</v-btn>
          </v-col>
        </v-row>
      </div>
    </v-container>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import Delivery from "@/components/body/orderSection/cart/components/delivery";
import AtributeComponent from "@/components/body/orderSection/cart/others/cartProductAtribute";
export default {
  components: {
    Delivery,
    AtributeComponent,
  },
  data: function () {
    return {
      maximumInstallment: "",
      minimumValue: "",
      whattsLink: null,
      priceFinal: null,
      pricePix: 0,
      discountValue: 0,
    };
  },
  computed: {
    deliveryType: {
      get() {
        return this.$store.state.Delivery.deliveryType;
      },
      set(value) {
        this.$store.commit("Delivery/SET_DELIVERYTYPE", value);
      },
    },
    ...mapState("Cart", ["cartDialog", "cartData"]),
    ...mapGetters("Cart", [
      "productsWithImgUrl",
      "totalAmountInCart",
      "totalProductsValue",
      "calculateProgressiveDiscount",
    ]),
    ...mapGetters("Delivery", ["deliveryList", "deliveryPrice"]),
    ...mapGetters("Product", ["installmentResult"]),
    ...mapState("Layouts", ["layout", "config", "fobOptions"]),
    ...mapState("Delivery", ["consult"]),
  },
  methods: {
    ...mapActions("Cart", [
      "setCartModal",
      "showCartItems",
      "changeItemAmount",
      "removeItem",
      "closeOrder",
    ]),
    ...mapActions("Delivery", ["checkDelivery", "cleanDeliveryState"]),

    calculateInstallments: function () {
      const installmentArray = this.installmentResult(
        parseFloat(this.totalProductsValue) + parseFloat(this.deliveryPrice)
      );
      this.maximumInstallment = installmentArray[0];
      this.minimumValue = installmentArray[1];
    },

    calculateDiscountPix: function () {
      if (this.paymentRules[0]) {
        this.discountValue =
          parseFloat(this.totalProductsValue) *
          (this.paymentRules[0].rate / 100);
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
  mounted() {
    this.showCartItems();
    this.calculateInstallments();
    this.whattsLink = `${this.layout.floatingIcon.link}&text=Olá, gostaria de confirmar o pagamento do pedido: ${this.$route.params.buyId}`;
  },
  watch: {
    deliveryPrice() {
      this.calculateInstallments();
    },
    totalProductsValue() {
      this.calculateInstallments();
    },
    pricePix() {
      this.calculateDiscountPix();
    },
  },
  beforeDestroy: function () {
    this.cleanDeliveryState();
  },
};
</script>
<style scoped>
.qtd-input >>> input {
  text-align: center;
}

.v-input--selection-controls {
  margin-top: 0 !important;
  padding-top: 0 !important;
}

.txt-freight-buyer {
  color: red;
  font-size: 12px !important;
}

@media screen and (max-width: 959px) {
  .text-FOB {
    top: 75px !important;
  }
}
</style>