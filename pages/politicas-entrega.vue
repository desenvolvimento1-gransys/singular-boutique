<template>
  <span>
    <div class="corpo">
      <h1>Política de Entrega</h1>
      <br />
      <div class="texto">
        <p>
          <br />
          <strong>Preço e prazo</strong> <br />

          O preço do envio varia de região e quantidade de peças, para consultar
          o valor basta colocar qualquer produto no carrinho de compras e
          informar o seu CEP na área “opções de frete”, o próprio site já te
          dirá o preço e prazo de acordo com o CORREIOS . <br />
          O envio é feito por PAC ou SEDEX. Nesse caso você receberá um código
          de rastreamento em que poderá acompanhar o status do pedido, situação
          e data de postagem e entrega. <br />
          O prazo de postagem é de até 2 dias uteis após aprovação do pedido e
          pagamento (prazo de até 24hs para aprovação do pagamento).
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