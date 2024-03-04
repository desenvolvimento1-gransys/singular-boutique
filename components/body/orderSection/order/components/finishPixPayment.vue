<template>
  <div>
    <!-- <h1>Pix</h1> -->
    <v-row justify="center">
      <v-col align="center" cols="12">
        <div class="successfull-payment-div">
          <v-row justify="center">
            <v-col style="" align="center" cols="12">
              <i class="far fa-clock check-payment-succesfull"></i>
              <!-- <i class="fas fa-check"></i> -->
              <h1>Estamos quase lá !!!</h1>
              <h2 class="mt-5 mb-5 ml-3 mr-3">
                Agora é só nos enviar o comprovante pelo nosso WhatsApp,
                clicando no botão abaixo
                <!-- O número do Pedido é : #{{ this.$route.params.buyId }} -->
              </h2>
              <p class="mb-5 mt-5">
                O número do Pedido é : #{{ this.$route.params.buyId }}
              </p>
              <!-- <i style="font-size: 50px;" class="fas fa-box-open mb-5"></i> -->
              <br />
              <a target="_blank" :href="whattsLink" style="text-decoration: none">
                <v-btn
                  :style="layout.payment.backToBuys.style"
                  :class="layout.payment.backToBuys.class"
                  >Enviar Comprovante</v-btn
                >
              </a>
              <br />
              <a href="/">Voltar a Loja</a>
            </v-col>
          </v-row>
        </div>
      </v-col></v-row
    >
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data: function () {
    return {
      whattsLink: null,
    };
  },
  computed: {
    ...mapState("Layouts", ["layout"]),
  },
  methods: {},
  mounted() {
    this.whattsLink = `${this.layout.floatingIcon.link}&text=Olá, gostaria de confirmar o pagamento do pedido: ${this.$route.params.buyId}`;
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