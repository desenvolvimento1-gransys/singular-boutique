<template>
  <v-footer elevation="0" :style="layout.footer.mainStyle" translate="no">
    <v-row>
      <v-col :align="layout.footer.list.align" cols="12" md="2">
        <p :style="layout.footer.titleStyle">Institucional</p>
        <span
          v-for="(item, index) in layout.footer.institucionalList"
          :key="index"
        >
          <a :style="item.style" :href="item.route">{{ item.name }}</a>
          <br />
        </span>
      </v-col>
      <v-col :align="layout.footer.list.align" cols="12" md="2">
        <p :style="layout.footer.titleStyle">Contato</p>
        <span v-for="(item, index) in layout.footer.contactList" :key="index">
          <i :style="item.iconStyle" v-if="item.icon" :class="item.icon"></i
          ><span :style="item.style" :href="item.route">{{ item.name }}</span>
          <br />
        </span>
      </v-col>
      <v-col :align="layout.footer.paymentSession.align" cols="12" md="4">
        <h4 :style="layout.footer.titleStyle">Pagamentos</h4>
        <payment-div />
      </v-col>
      <v-col
        md="4"
        :style="layout.footer.logoSession.style"
        :align="layout.footer.logoSession.align"
        cols="12"
      >
        <span>
          <img
            :style="layout.footer.logoSession.logoStyle"
            :src="layout.footer.logoSession.logoSrc"
            alt="Logo do footer"
          />
          <br />
          <span
            v-for="(item, index) in layout.footer.logoSession.midiaLinks"
            :key="index"
          >
            <a :href="item.href">
              <i :style="item.iconStyle" :class="item.icon"></i>
            </a>
          </span>
        </span>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script src='./footerjs'></script>

