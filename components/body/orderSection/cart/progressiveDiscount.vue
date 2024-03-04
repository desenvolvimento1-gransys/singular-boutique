<template>
  <div>
    <div
      v-if="$vuetify.breakpoint.name !== 'xs' && calculateProgressiveDiscount"
      style="
        background: black;
        color: white !important;
        margin-top: 35px !important;
      "
      class="blink blink-btn-class"
    >
      <div>
        {{ getQtdProducts() }}
      </div>
      <div class="regra-desk" style="font-size: 14px; margin-top: -20px">
        *Válido apenas para produtos da Black Friday*
      </div>
    </div>

    <div
      v-else-if="calculateProgressiveDiscount"
      style="
        background: black;
        color: white !important;
        margin-top: 35px !important;
      "
      class="blink message-mobile"
    >
      <div>
        {{ getQtdProducts() }}
      </div>
      <div class="regra-mobile" style="font-size: 11px">
        *Válido apenas para produtos da Black Friday*
      </div>
    </div>
  </div>
</template>
  
  <script>
import { mapActions, mapGetters, mapState } from "vuex";
export default {
  computed: {
    ...mapGetters("Cart", [
      "calculateProgressiveDiscount",
      "getProductsWithoutSale",
    ]),
    ...mapState("Layouts", ["layout", "config"]),
  },
  methods: {
    getQtdProducts() {
      let result =
        this.config.qtdProductsForDiscount -
        this.getProductsWithoutSale.totalAmount;
      if (result <= 0) {
        return (
          "Parabéns, você acaba de ganhar " +
          this.calculateProgressiveDiscount.discountRate +
          "% de desconto!!!"
        );
      } else {
        return (
          "Faltam " + result + " produto(s) para você ganhar 40% de desconto"
        );
      }
    },
    calculateDiscount: function () {
      let extra_rules =
        this.calculateProgressiveDiscount.extra_rules.remove_sale;
      if (extra_rules == true) {
        //Remover promocoes
      }
      let discount = this.calculateProgressiveDiscount.rules.map(
        (a) => a.amount == this.totalAmountInCart
      );
      // console.log(discount);
    },
  },
};
</script>
  
  <style scoped>
.blink-btn-class-mobile {
  width: 100% !important;
  margin: 100px 0 0 0 !important;
  font-size: 12px !important;
}
.message-mobile {
  border-radius: 10px;
  padding: 10px;
  text-align: center;
}
.blink-btn-class {
  /* width: 100% !important; */
  /* margin-top: 100px; */
  width: 100% !important;
  margin: 100px 0% 0 0% !important;
  height: 75px !important;
  text-align: center;
  line-height: 50px;
  background-color: #000000;
  border-radius: 5px;
  font-size: 25px;
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
  color: #b96890 !important;
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
  .regra-desk {
    font-size: 12px !important;
  }
}
</style>