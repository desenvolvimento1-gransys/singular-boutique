<template>
  <span v-if="resumeList[0]">
    <v-simple-table class="close-order-table">
      <thead>
        <tr>
          <th class="text-left">Qtd</th>
          <th class="text-left">Nome</th>
          <th class="text-left">Valor</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in resumeList" :key="item.name">
          <td>
            {{ item.amount }}
          </td>
          <td>
            <strong> {{ item.name }} <br /> </strong>
            <span v-if="item.order_atribute.length > 0">
              <span
                v-for="(atribute, index) in item.order_atribute"
                :key="index"
              >
                <span v-if="!atribute.typeable">
                  {{ `${atribute.group_name} : ${atribute.name}` }} <br />
                </span>
                <span v-else>
                  {{ `${atribute.name} : ${atribute.typeable}` }} <br />
                </span>
                <!-- <p>Atributos</p> -->
              </span>
            </span>
          </td>
          <td>{{ item.total_price }}</td>
        </tr>
      </tbody>
    </v-simple-table>
    <v-card class="card-order-resume">
      <v-container>
        <v-row align="end">
          <v-col class="no-margin" sm="9" cols="8">
            <strong class="text-sizing">Subtotal: </strong>
          </v-col>
          <v-col class="no-margin" sm="3" cols="4">
            R$
            <span>
              {{
                orderPrices.productsValue.toLocaleString("pt-BR", {
                  maximumFractionDigits: 2,
                  minimumFractionDigits: 2,
                })
              }}
            </span>
          </v-col>
          <v-col
            v-if="orderPrices.paymentDiscountValue > 0"
            class="no-margin text-sizing"
            cols="8"
            sm="9"
          >
            <strong>
              <span v-if="orderPrices.paymentDiscountType == 'discount'">
                Desconto
              </span>
              <span v-if="orderPrices.paymentDiscountType == 'fees'">
                Juros
              </span>

              <span v-if="selectedInstallment == 1"> À Vista</span
              ><span v-else> em {{ selectedInstallment }}x</span>:</strong
            >
          </v-col>
          <v-col
            v-if="orderPrices.paymentDiscountValue > 0"
            class="no-margin"
            cols="4"
            sm="3"
          >
            R$
            <span v-if="orderPrices.paymentDiscountType == 'discount'">
              -
            </span>

            {{
              orderPrices.paymentDiscountValue.toLocaleString("pt-BR", {
                maximumFractionDigits: 2,
                minimumFractionDigits: 2,
              })
            }}
          </v-col>
          <v-col
            v-show="
              resumeList[0].discount_value &&
              parseFloat(resumeList[0].discount_value) > 0
            "
            class="no-margin"
            cols="8"
            sm="9"
          >
            <strong class="text-sizing">Desconto Cupom:</strong>
          </v-col>
          <v-col
            v-show="
              resumeList[0].discount_value &&
              parseFloat(resumeList[0].discount_value) > 0
            "
            class="no-margin"
            cols="4"
            sm="3"
          >
            R$ -{{
              parseFloat(resumeList[0].discount_value).toLocaleString("pt-BR", {
                maximumFractionDigits: 2,
                minimumFractionDigits: 2,
              })
            }}
          </v-col>
          <v-col class="no-margin" cols="8" sm="9">
            <strong v-if="resumeList[0].delivery_price" class="text-sizing"
              >Frete:</strong
            >
          </v-col>
          <v-col
            v-if="resumeList[0].delivery_price"
            class="no-margin"
            cols="4"
            sm="3"
          >
            R$
            {{
              parseFloat(resumeList[0].delivery_price).toLocaleString("pt-BR", {
                maximumFractionDigits: 2,
                minimumFractionDigits: 2,
              })
            }}
          </v-col>
          <v-col class="no-margin" cols="12">
            <p />
            <hr />
            <p />
          </v-col>
          <v-col class="no-margin" cols="8" sm="9">
            <strong class="">Total:</strong>
          </v-col>
          <!-- TODO Aplicar desconto no total de acordo com o parcelamento (1x - 2x) -->
          <v-col class="no-margin" cols="4" sm="3">
            <strong>
              R$
              {{
                orderPrices.total.toLocaleString("pt-BR", {
                  maximumFractionDigits: 2,
                  minimumFractionDigits: 2,
                })
              }}
            </strong>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
    <!-- {{ paymentInformation.rules }} -->
  </span>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";

export default {
  props: {
    buy_id: String,
  },
  data: function () {
    return {
      // headers: [
      //   { text: "Qtd", value: "amount" },
      //   { text: "Nome", value: "name" },
      //   { text: "Valor", value: "total_price" },
      // ],
    };
  },
  computed: {
    ...mapState("Order", ["resumeList"]),
    ...mapState("Payment", ["paymentInformation", "selectedInstallment"]),
    ...mapGetters("Order", ["orderPrices"]),
  },
  methods: {
    applyDiscountRate(value) {
      let self = this;
      if (
        this.paymentInformation.rules.length > 0 &&
        this.selectedInstallment
      ) {
        let response = this.paymentInformation.rules.filter(function (data) {
          return data.installments == self.selectedInstallment;
        });
        if (response[0].rule_type == 0) {
          return {
            value: value - value * (response[0].rate / 100),
            applied: false,
          };
        } else {
          return {
            value: value + value * (response[0].rate / 100),
            applied: false,
          };
        }

        // return response[0];
      } else {
        return { value: value, applied: false };
      }
    },
    ...mapActions("Order", ["cleanOrderResume", "setOrderResume"]),
  },
  mounted() {
    this.setOrderResume({ buy_id: this.buy_id });
  },
  beforeDestroy: function () {
    this.cleanOrderResume();
  },
};
</script>

<style scoped>
.card-order-resume {
  margin-top: 30px;
  padding: 10px !important;
}

@media only screen and (max-width: 600px) {
  .text-sizing {
    font-size: 14px;
  }
}
</style>