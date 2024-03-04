<template>
  <span>
      <br>
    <h1 class="txt text-center">Escreva seu Depoimento</h1>
    <center>
      <v-row justify="center" align="center" style="max-width: 550px">
        <v-col align="center" cols="11" style="width: 50vw !important">
          <div class="card-depoiment" style="width: 100% !important">
            <v-form
              style="width: auto"
              ref="form"
              v-model="valid"
              lazy-validation
            >
              <v-text-field
                v-model="formData.name"
                :rules="nameRules"
                label="Nome"
                required
              ></v-text-field>

              <v-text-field
                v-model="formData.address"
                label="Cidade/Estado"
                :rules="cityRules"
                required
              ></v-text-field>
              <!-- <div>
            <h3>Avaliação:</h3>
            <v-radio-group v-model="row" row>
              <v-radio label="Positiva" value="positivo"></v-radio>
              <v-radio label="Negativa" value="negativo"></v-radio>
            </v-radio-group>
          </div> -->
              <div>
                <!-- <h3>Depoimento:</h3> -->
                <v-textarea
                  v-model="formData.message"
                  solo
                  name="text-depoimento"
                  label="Deixe seu depoimento aqui"
                ></v-textarea>
              </div>
              <div style="text-align: center">
                <v-btn
                  :disabled="!valid"
                  color="success"
                  class="btn-enviar"
                  @click="saveComments(formData)"
                >
                  Enviar
                </v-btn>
              </div>
              <div v-if="this.config.sendPicture">
                <input type="file" name="file" multiple ref="files" />
              </div>
            </v-form></div
        ></v-col>
      </v-row>
    </center>
    <v-dialog v-model="modal" max-width="490">
      <v-card>
        <v-card-title class="text-h5"> Comentário Enviado! </v-card-title>
        <v-card-text
          >Seu comentário foi enviado com sucesso! Agradecemos por dar seu
          feedback</v-card-text
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text to="/"> OK </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </span>
</template>


<script>
import { mapActions, mapState } from "vuex";

export default {
  computed: {
    ...mapState("Layouts", ["config"]),
    ...mapState("Layouts", ["config"]),
    ...mapState("CustomerComments", ["modal"]),
  },
  name: "customerComments",
  data: () => ({
    valid: true,
    formData: { name: null, address: null, message: null },
    name: "",
    nameRules: [(v) => !!v || "Nome é obrigatório"],
    cityRules: [(v) => !!v || "Campo cidade é obrigatório"],
  }),

  methods: {
    ...mapActions("CustomerComments", ["saveComments"]),
  },
};
</script>

<style scoped>
.card-depoiment {
  border: solid 1px;
  border-radius: 10px;
  padding: 15px;
  margin: 0 auto !important;
  width: 50vw !important;
  height: auto;
}
.txt {
  font-size: 26px;
  text-align: center;
}
.btn-enviar {
  width: 50%;
}
.form {
  padding: 10px;
}
@media screen and (max-width: 600px) {
  .card-depoiment {
    background: rgb(209, 209, 218);
    border: none;
    margin: 0.5vh;
    width: auto;
    
  }
  .txt {
    font-size: 18px;
  }
  .form {
    padding: 0;
  }
}
</style>
