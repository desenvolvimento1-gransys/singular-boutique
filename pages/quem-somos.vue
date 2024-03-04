<template>
  <span>
    <div class="corpo">
      <h1>Quem somos?</h1>
      <br />
      <div class="texto">
        <p>
          <strong>Seja bem vindo(a)! </strong>
          <br />
          <br />
        </p>
      </div>
    </div>
  </span>
</template>

<script>
export default {};
</script>

<style>
h1 {
  text-align: center;
  color: black;
}
.corpo {
  margin-left: auto;
  margin-right: auto;
  max-width: 1000px;
  height: auto;
  padding: 2%;
  border-radius: 10px;
}

.texto {
  font-family: "Roboto", sans-serif;
  font-size: 18px;
  text-align: justify;
  border: 3px solid pink;
  padding: 30px;
  font-weight: normal;
  border-radius: 10px;
  overflow: hidden;
}

@media only screen and (max-width: 600px) {
  .corpo {
    border-radius: 5px;
    padding: 10%;
    background-color: "white";
  }
  .texto {
    font-size: 14px;
  }
}
</style>