<template>
  <div style="max-width: 1000px; margin: auto">
    <v-row justify="center">
      <v-col
        justify="center"
        v-if="paymentMethod == 'pix'"
        cols="12"
        align="center"
      >
        <finish-pix-payment />
      </v-col>
      <v-col
        v-if="paymentMethod !== 'pix' && paymentMethod !== 'boleto'"
        align="center"
        cols="12"
      >
        <div class="successfull-payment-div">
          <span id="successfull-payment" v-if="statusPaymentResponse == 2">
            <v-row justify="center">
              <v-col align="center" cols="12">
                <i class="fas fa-check-circle check-payment-succesfull"></i>
                <!-- <i class="fas fa-check"></i> -->
                <h1>Seu pagamento foi efetuado com sucesso !!!</h1>
                <h2 class="mt-5 mb-5">
                  O número do Pedido é : #{{ this.$route.params.buyId }}
                </h2>
                <p class="mb-5 mt-5">
                  Estamos trabalhando na separação da sua encomenda ...
                </p>
                <i style="font-size: 50px" class="fas fa-box-open mb-5"></i>
                <br />
                <v-btn
                  to="/"
                  :style="layout.payment.backToBuys.style"
                  :class="layout.payment.backToBuys.class"
                  >Voltar à Loja</v-btn
                >
              </v-col>
            </v-row>
          </span>
          <div id="payment-in-analyse" v-if="statusPaymentResponse == 1">
            <v-row justify="center">
              <v-col align="center" cols="12">
                <i class="far fa-clock check-payment-succesfull"></i>
                <!-- <i class="fas fa-check"></i> -->
                <h1>Seu pagamento esta em Análise !!!</h1>
                <h2 class="mt-5 mb-5">
                  O número do Pedido é : #{{ this.$route.params.buyId }}
                </h2>
                <p class="mb-5 mt-5">
                  Assim que for confirmado o pagamento, sua encomenda será
                  postada ...
                </p>
                <!-- <i style="font-size: 50px;" class="fas fa-box-open mb-5"></i> -->
                <br />
                <v-btn
                  to="/"
                  :style="layout.payment.backToBuys.style"
                  :class="layout.payment.backToBuys.class"
                  >Voltar à Loja</v-btn
                >
              </v-col>
            </v-row>
          </div>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import finishPixPayment from "@/components/body/orderSection/order/components/finishPixPayment";

export default {
  components: {
    finishPixPayment,
  },
  data: function () {
    return {};
  },
  computed: {
    ...mapState("Payment", [
      "statusPaymentResponse",
      "paymentSlipUrl",
      "paymentMethod",
    ]),
    ...mapState("Layouts", ["layout"]),
  },
  methods: {
    ...mapActions("Payment", ["cleanPaymentStatus", "checkStatusPayment"]),
  },
  mounted: function () {
    this.checkStatusPayment({ buy_id: this.$route.params.buyId });
  },
  beforeDestroy: function () {
    this.cleanPaymentStatus();
  },
};
</script>

<style scoped>
.check-payment-succesfull {
  margin: 15px 0 30px 0;
  font-size: 110px !important;
  color: green !important;
}

.successfull-payment-div {
  border: solid black 1px;
  margin: 40px;
  padding: 0 0 50px 0;
}
@media only screen and (max-width: 600px) {
  /* .check-payment-succesfull{
  
} */
  .successfull-payment-div {
    border: solid black 1px;
    margin: 5px;
    padding: 0 0 50px 0;
  }

  .successfull-payment-div h1 {
    font-size: 22px;
  }

  .successfull-payment-div h2 {
    font-size: 18px;
  }
}
</style>