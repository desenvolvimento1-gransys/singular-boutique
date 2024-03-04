<template>
  <v-card
    translate="no"
    @click="saveScrollAndPush()"
    color="white"
    class="black--text card-product-class"
    outlined
    :style="layout.search.productCard.mainStyle"
  >
    <v-hover>
      <div slot-scope="{ hover }">
        <v-img
          :style="
            $vuetify.breakpoint.name !== 'xs'
              ? 'height: 380px'
              : 'height: 230px'
          "
          :aspect-ratio="layout.search.productCard.imgAspectRatio"
          v-if="data.product_image[1] && hover"
          :src="`${urlImg + data.product_image[1].img_name}300.jpg`"
          alt="Imagem do produto"
          class="product-image"
        >
          <template v-slot:placeholder>
            <v-skeleton-loader type="image"></v-skeleton-loader>
            <v-skeleton-loader type="image"></v-skeleton-loader>
          </template>
        </v-img>
        <v-img
          style="height: 380px"
          :style="
            $vuetify.breakpoint.name !== 'xs'
              ? 'height: 380px'
              : 'height: 230px'
          "
          :aspect-ratio="layout.search.productCard.imgAspectRatio"
          v-else-if="data.product_image[0]"
          :src="`${urlImg + data.product_image[0].img_name}300.jpg`"
          alt="Imagem do produto"
          class="product-image"
        >
          <template v-slot:placeholder>
            <v-skeleton-loader type="image"></v-skeleton-loader>
            <v-skeleton-loader type="image"></v-skeleton-loader>
          </template>
        </v-img>
        <v-img
          contain
          v-else
          :style="
            $vuetify.breakpoint.name !== 'xs'
              ? 'height: 380px'
              : 'height: 230px'
          "
          :aspect-ratio="layout.search.productCard.imgAspectRatio"
          :src="layout.search.productCard.placeholder"
          alt="Placeholder da imagem do produto"
        />
      </div>
    </v-hover>
    <v-row>
      <v-col align="center" style="height: 75px">
        <p
          :style="layout.search.productCard.nameStyle"
          class="productName"
          translate="no"
        >
          {{ data.product_name }}
        </p>
      </v-col>
    </v-row>
    <v-row
      align="center"
      :style="layout.search.productCard.textArea.style"
      no-gutters
      v-if="data.balance > 0"
    >
      <v-col
        cols="12"
        align="center"
        v-if="data.actived_promotions && data.actived_promotions.length >= 1"
      >
        <div
          :style="layout.search.productCard.discountPriceStyle"
          class="productDiscountPrice"
        >
          R$
          {{
            (
              parseFloat(data.actived_promotions[0].discount_value) +
              parseFloat(data.price)
            ).toLocaleString("pt-BR", {
              maximumFractionDigits: 2,
              minimumFractionDigits: 2,
            })
          }}
        </div>
      </v-col>
      <v-col
        cols="12"
        align="center"
        :style="layout.search.productCard.priceStyle"
        class="productPrice"
      >
        R$
        {{
          parseFloat(data.price).toLocaleString("pt-BR", {
            maximumFractionDigits: 2,
            minimumFractionDigits: 2,
          })
        }}
      </v-col>

      <br />
      <v-col
        cols="12"
        align="center"
        :style="layout.search.productCard.installmentPriceStyle"
        v-if="layout.search.productCard.installmentConfig"
        class="productPriceInstallments"
      >
        ou {{ maximumInstallment }}x R$ {{ minimumValue }}
      </v-col>
    </v-row>
    <v-row
      align="center"
      :style="layout.search.productCard.textArea.style"
      no-gutters
      v-else
    >
      <v-col align="center" cols="12">
        <p
          :style="layout.search.productCard.noBalanceProduct.style"
          :class="layout.search.productCard.noBalanceProduct.class"
        >
          {{ config.productWithoutStockPhrase }}
        </p>
      </v-col>
    </v-row>
    <v-btn
      :style="layout.search.productCard.buttonStyle"
      x-small
      v-if="layout.search.productCard.btnName"
    >
      {{ layout.search.productCard.btnName }}
    </v-btn>

    <hr class="mt-2" :style="layout.search.productCard.hrStyle" />
  </v-card>
</template>

<script>
import { mapGetters, mapActions, mapState } from "vuex";
import { s3Url } from "@/Settings/global";

export default {
  props: {
    data: null,
  },
  computed: {
    ...mapState("Product", ["product"]),
    ...mapState("Layouts", ["layout", "config"]),
    ...mapGetters("Product", ["installmentResult"]),
    ...mapGetters("Cart", [
      "calculateProgressiveDiscount",
      "getProductsWithoutSale",
    ]),
  },
  methods: {
    ...mapActions("Layouts", ["getYPos"]),

    convertToLink(value) {
      let response = value
        .replace(/_|\/|\s/g, "-")
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

      return response;
    },
    saveScrollAndPush() {
      this.getYPos(Math.round(window.scrollY));
      let link =
        "/produto/" +
        this.data.id +
        "/" +
        this.convertToLink(this.data.product_name);
      $nuxt.$router.push({ path: link });
    },
  },
  data: function () {
    return {
      urlImg: s3Url,
      minimumValue: "",
      maximumInstallment: "",
    };
  },
  mounted: function () {
    const installmentArray = this.installmentResult(this.data.price);
    this.maximumInstallment = installmentArray[0];
    this.minimumValue = installmentArray[1];
  },
};
</script>

<style scoped>
@media only screen and (max-width: 600px) {
  .card-product-class {
    padding: 20px 4px 0px 4px !important;
  }
  .productName {
    font-size: 13px !important;
  }

  .productPrice {
    font-size: 13px !important;
  }

  .productDiscountPrice {
    font-size: 12px !important;
    left: 4px !important;
  }

  .productPriceInstallments {
    font-size: 12px !important;
    padding: 0px !important;
    margin: 0px !important;
  }
}
</style>