<template>
  <span v-if="config.addCustomerComment">
    <div v-if="list && list.length > 0">
      <div
        v-if="
          $vuetify.breakpoint.name !== 'xs' && $vuetify.breakpoint.name !== 'sm'
        "
      >
        <!-- Desk -->
        <h1 class="txt-center" style="text-align: center">Avaliações</h1>
        <hr style="color: #4b0082; width: 150px; margin: 0 auto" />
        <br />
        <center>
          <!-- <v-container v-for="list"> -->
          <v-row align="center">
            <v-col cols="1" align="left">
              <v-btn
                class="leftset"
                v-if="list.length >= 3"
                icon
                color="white"
                @click="commentCarouselItems('-')"
              >
                <v-icon class="fas fa-chevron-left"></v-icon>
              </v-btn>
            </v-col>

            <v-col
              cols="10"
              align="center"
              class="column"
              style="display: flex; margin: 0 auto !important"
            >
              <v-row
                class="column2"
                v-for="item in arr"
                :key="item"
                style="margin: 0 auto !important"
              >
                <v-col align-self="center">
                  <v-card class="card-comments" elevation="0">
                    <br />
                    <h3 class="name" style="text-align: center">
                      {{ list[item].name }}
                    </h3>
                    <p class="address" style="text-align: center">
                      {{ list[item].address }}
                    </p>
                    <br />

                    <p class="message">{{ list[item].message }}</p>
                    <br />
                  </v-card>
                  <!-- <hr class="hrr" /> -->
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="1" align="right">
              <v-btn
                class="rightset"
                v-if="list.length >= 3"
                icon
                color="white"
                @click="commentCarouselItems('+')"
              >
                <v-icon class="fas fa-chevron-right"></v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </center>
      </div>

      <!-- Mobile -->
      <div v-else>
        <h2 style="text-align: center">Avaliações</h2>
        <hr style="color: #4b0082; width: 150px; margin: 0 auto" />
        <br />
        <v-carousel hide-delimiters height="210px">
          <v-carousel-item v-for="item in list" :key="item">
            <v-card
              elevation="2"
              class="card-comments-mobile"
              style="margin: 0 auto !important"
            >
              <br />
              <p class="name-mobile" style="text-align: center">
                {{ item.name }}
              </p>
              <p class="address-mobile" style="text-align: center">
                {{ item.address }}
              </p>

              <p class="message-mobile">{{ item.message }}</p>
            </v-card>
          </v-carousel-item>
        </v-carousel>
      </div>
    </div>
    <center>
      <v-btn
        v-if="
          $vuetify.breakpoint.name !== 'xs' && $vuetify.breakpoint.name !== 'sm'
        "
        class="btn-depoimento"
        to="/depoimentos"
        >Deixe seu depoimento</v-btn
      >

      <v-btn v-else class="btn-depoimento-mobile" to="/depoimentos"
        >Deixe seu depoimento</v-btn
      >
    </center>
  </span>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  data: function () {
    return {
      carouselComment: 0,
      index: 0,
      arr: [0, 1, 2],
      disable: false,
    };
  },
  methods: {
    ...mapActions("CustomerComments", ["showComments"]),
    ...mapActions("CustomerComments", ["cleanStateComments"]),

    commentCarouselItems(value) {
      if (value == "+") {
        if (parseInt(this.arr[2]) + 1 < this.list.length) {
          this.$forceUpdate((this.arr[0] = parseInt(this.arr[0] + 1)));
          this.$forceUpdate((this.arr[1] = parseInt(this.arr[1] + 1)));
          this.$forceUpdate((this.arr[2] = parseInt(this.arr[2] + 1)));

          // console.log(this.arr);
        } else {
          this.$forceUpdate(
            (this.arr[0] = parseInt(this.arr[0] - this.arr[0]))
          );
          this.$forceUpdate(
            (this.arr[1] = parseInt(this.arr[1] - this.arr[1] + 1))
          );
          this.$forceUpdate(
            (this.arr[2] = parseInt(this.arr[2] - this.arr[2] + 2))
          );

          // console.log("Último Item");
        }
        // this.carouselComment++;
      }

      if (value == "-") {
        if (parseInt(this.arr[0]) - 1 >= 0) {
          this.$forceUpdate((this.arr[0] = parseInt(this.arr[0] - 1)));
          this.$forceUpdate((this.arr[1] = parseInt(this.arr[1] - 1)));
          this.$forceUpdate((this.arr[2] = parseInt(this.arr[2] - 1)));

          // console.log(this.arr);
        } else {
          this.$forceUpdate(
            (this.arr[0] = parseInt(this.arr[0] + this.list.length - 3))
          );
          this.$forceUpdate(
            (this.arr[1] = parseInt(this.arr[1] + this.list.length - 3))
          );
          this.$forceUpdate(
            (this.arr[2] = parseInt(this.arr[2] + this.list.length - 3))
          );
          // console.log("Primeiro Item", this.arr, this.list.length);
        }
        // this.carouselComment++;
      }
    },
  },
  computed: {
    ...mapState("CustomerComments", ["list"]),
    ...mapState("Layouts", ["layout", "config"]),
  },

  beforeDestroy() {
    this.cleanStateComments();
  },
  mounted() {
    this.showComments();
    // this.commentCarouselItems();
  },
  watch: {
    list: function () {
      if (this.list && this.list.length > 0) {
        if (this.list.length == 1) {
          return (this.arr = [0]);
        } else if (this.list.length == 2) {
          return (this.arr = [0, 1]);
        }
      }
    },
  },
};
</script>

<style >
* {
  scrollbar-width: thin;
}
::-webkit-scrollbar {
  width: 1px;
  background: #f4f4f4;
}
.rightset {
  background-color: #b2b2b2;
  margin-right: 35px;
}
.leftset {
  background-color: #b2b2b2;
  margin-left: 35px;
}

.btn-depoimento {
  text-align: center !important;
  align-content: center !important;
  background-color: #000000 !important;
  color: #ffffff !important;
  border-radius: 16px;
  top: 0px !important;
  width: 24vw;
  margin: 20px 0 20px 0;
  font-weight: 600 !important;
}

.btn-depoimento-mobile {
  text-align: center !important;
  background-color: #000000 !important;
  align-content: center !important;
  color: #ffffff !important;
  font-size: 14px !important;
  border-radius: 16px;
  width: 40vw;
  margin: 20px 0 20px 0 !important;
  font-weight: 600 !important;
}
.message {
  font-size: 18px;
  font-family: "Oswald", sans-serif;
  font-weight: 500;
  text-align: center;
}
.message-mobile {
  margin-top: -5px !important;

  font-size: 15px;
  font-family: "Oswald", sans-serif;
  font-weight: 500;
}
.name {
  font-weight: 500;
  font-family: "Oswald", sans-serif;
  font-size: 13.5px;
}
.name-mobile {
  font-weight: 400;
  font-family: "Oswald", sans-serif;
  font-size: 12px;
}
.address {
  font-weight: bold;
  font-family: "Montserrat", sans-serif;
  font-size: 12px;
}
.address-mobile {
  margin-top: -10px !important;
  font-weight: bold;
  font-family: "Montserrat", sans-serif;
  font-size: 11px;
}
.card-comments {
  /* left: -50px; */
  width: 24vw;
  max-width: 360px;
  height: 200px;
  padding: 10px;
  overflow: auto;
  background: white !important;

  border: 2px solid rgba(0, 0, 0, 0.822) !important;
  border-right: 2px solid rgba(27, 23, 26, 0.822) !important;
  border-left: 2px solid rgba(17, 10, 14, 0.822) !important;
  background-repeat: no-repeat !important;
  background-size: 50% auto !important;

  border-radius: 12px !important;
}

.card-comments-mobile {
  padding: 15px;
  width: 65vw;
  max-width: 420px;
  height: 200px;
  overflow: auto;
  background: rgba(236, 235, 235, 0.438) !important;
  border-top: 2px solid rgb(0, 0, 0) !important;
  border-bottom: 2px solid rgb(0, 0, 0) !important;
  color: black !important;
  text-align: center;
  border-radius: 16px !important;
}
@media screen and (max-width: 1250px) {
  .card-comments {
    background-size: 40% auto !important;
    height: 200px;
  }
}

@media screen and (max-width: 1080px) {
  .card-comments {
    margin-left: 10px;
  }
}

@media screen and (max-width: 960px) {
  .btn-depoimento-mobile {
    margin-top: 40px !important;
  }
}
@media screen and (max-width: 600px) {
  .btn-depoimento-mobile {
    font-size: 13px !important;
    width: 50vw;
    margin-top: 40px !important;
  }
}
@media screen and (max-width: 500px) {
  .btn-depoimento-mobile {
    font-size: 12px !important;
    width: 58vw;
  }
}

@media screen and (max-width: 395px) {
  .card-comments-mobile {
    width: 60vw;
    max-width: 230px;
  }
  .btn-depoimento-mobile {
    width: 65vw;
  }
}
</style>