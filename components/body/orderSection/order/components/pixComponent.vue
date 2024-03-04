<template>
  <div>
    <v-card color="#00BDAE" width="500" style="padding: 40px">
      <v-row>
        <v-col cols="12">
          <!-- <h2 class="mb-5 text-center">
        <span class="mdi mdi-cash" />
        Pix
      </h2> -->
          <div
            style="
              background-color: aliceblue;
              max-width: 340px;
              border-radius: 5px;
            "
          >
            <v-img src="/pix.png" contain height="120" />
          </div>
        </v-col>

        <v-col cols="12" style="color: white">
          <p>
            <strong> Nossa Chave Pix</strong>
          </p>

          <v-row
            align="center"
            style="width: 300px; outline: 2px white solid; border-radius: 5px"
          >
            <v-col cols="9" align="center">
              <p style="margin: 0 !important">
                {{ config.pixKeys.keys }}
              </p>
            </v-col>
            <v-col cols="3" align="center">
              <!-- <a @click="handleCopy(config.pixKeys.cnpj)">copiar chave pix</a> -->
              <v-btn icon @click="copyToClip(config.pixKeys.keys)">
                <v-icon color="white">mdi mdi-content-copy </v-icon>
              </v-btn>
            </v-col>
          </v-row>

          <p
            style="
              margin: 20px 0 0 0 !important;
              padding: 0 !important;
              font-size: 20px;
              text-decoration: underline;
            "
          >
            Valor: R$
            <strong style="font-size: 22px">
              {{
                buyValue.toLocaleString("pt-BR", {
                  maximumFractionDigits: 2,
                  minimumFractionDigits: 2,
                })
              }}</strong
            >
          </p>
        </v-col>
        <v-col cols="12">
          <div class="alert">
            <p
              class="red--text"
              style="margin: 0 !important; padding: 0 !important"
            >
              <strong>
                <v-icon color="red"> mdi mdi-alert </v-icon> Atenção:
              </strong>
              Após fazer o pagamento do pedido, clicar no botão CONTINUAR
              abaixo, caso esse procedimento não seja feito, podemos não
              visualizar seu pagamento
            </p>
          </div>
        </v-col>
      </v-row>
    </v-card>
    <v-row>
      <v-col cols="12">
        <v-text-field
          v-model="discountCoupon"
          :color="layout.payment.input.color"
          label="Cupom de Desconto"
          style="margin: 0 30px"
        ></v-text-field>
      </v-col>
      <v-col cols="12">
        <p v-if="couponError" class="red--text">{{ couponError }}</p>
        <v-btn
          v-if="!discountCoupon"
          @click="pixPayment({ buy_id: $route.params.orderId })"
          color="green"
          class="white--text mb-5"
          >Continuar</v-btn
        >
        <v-btn
          @click="
            addDiscountToBuy({
              code: discountCoupon,
            })
          "
          color="green"
          class="white--text mb-5"
          v-else
          >Calcular Desconto</v-btn
        >
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  components: {},
  computed: {
    ...mapState("Layouts", ["layout", "config"]),
    ...mapState("Payment", ["couponError", "buyValue"]),
    discountCoupon: {
      get() {
        return this.$store.state.Payment.discountCoupon;
      },
      set(value) {
        this.$store.commit("Payment/SET_DISCOUNTCOUPON", value);
      },
    },
  },
  methods: {
    ...mapActions("Payment", ["addDiscountToBuy", "pixPayment"]),
    async handleCopy(cnpj) {
      // Removes everything from the string, except the numbers.
      cnpj = cnpj;
      await navigator.clipboard.writeText(cnpj);
    },

    copyToClip(key) {
      navigator.clipboard.writeText(key);
      alert("Copiado !");
    },
  },
};
</script>

<style>
.alert {
  max-width: 500px;
  padding: 10px;

  border-radius: 5px;

  animation: blinker 3s ease 0s infinite normal forwards;
}

@keyframes blinker {
  0% {
    outline: rgb(255, 78, 78) solid 2px;
    box-shadow: 2px 2px 10px rgb(255, 78, 78);
  }
  50% {
    outline: rgba(255, 0, 0, 0) solid 2px;
    box-shadow: 0px 0px 0px rgba(255, 78, 78, 0);
  }
  100% {
    outline: rgb(255, 78, 78) solid 2px;
    box-shadow: 2px 2px 10px rgb(255, 78, 78);
  }
}
</style>