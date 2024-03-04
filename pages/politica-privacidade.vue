<template>
  <span>
    <div class="corpo">
      <h1>Políticas de Privacidade</h1>
      <br />
      <div class="texto">
        <p>
          Os dados coletados e a forma de coleta podem variar de acordo com a
          forma que o usuário interage com nosso site. O usuário é responsável
          pela veracidade dos dados fornecidos. Qualquer prejuízo causado pelo
          uso de informações falsas ou desatualizadas é de responsabilidade do
          usuário.
          <br />
          <br />
          <strong>Formas de Coleta:</strong>
        </p>

        <hr />
        <br />
        <ul>
          <li>Preenchimento de formulários.</li>
          <li>Pesquisas feitas na barra de busca do site.</li>
          <li>Interação com as páginas do site.</li>
          <br />
        </ul>
        <strong>Dados que podem ser coletados:</strong>
        <hr />
        <br />
        <ul>
          <li>Nome completo</li>
          <li>Nome fantasia</li>
          <li>Senha</li>
          <li>Telefone</li>
          <li>CPF</li>
          <li>CNPJ</li>
          <li>Data de nascimento</li>
          <li>E-mail</li>
          <li>Endereço completo</li>
          <li>Preferencias de navegação no site</li>
          <li>Informações da compra</li>
          <li>Dados relacionados à forma de pagamento</li>
          <li>Comportamento de navegação no site</li>
          <li>Pesquisas na barra de busca</li>
        </ul>
        <br />
        <strong>Armazenamento dos Dados</strong>
        <hr />
        <br />
        <p>
          Os dados são armazenados em nosso banco de dados de maneira segura,
          através de criptografia. Os dados do cartão de crédito não serão
          armazenados. Não nos responsabilizamos por falhas de segurança que
          possam ocorrer em seus dispositivos.
        </p>
        <br />
        <strong>Como seus dados são utilizados</strong>
        <hr />
        <br />
        <p>
          Seus dados são necessários para identificá-lo, tornando possível a
          compra, pagamento e entrega dos produtos de maneira correta. Os dados
          armazenados visam também melhorar sua experiência na utilização de
          nosso site.
        </p>
        <br />
        <strong>Cookies</strong>
        <hr />
        <br />
        <p>
          Utilizamos cookies para reconhecer um visitante e melhorar sua
          experiência em nossa página.
        </p>
        <br />
        <strong>Divulgação de dados</strong>
        <hr />
        <br />
        <p>Não forneceremos seus dados a terceiros, a menos que:</p>

        <ul>
          <li>Haja determinação judicial.</li>
          <li>
            A viabilização dos negócios dependa do repasse de dados a parceiros,
            tais como intermediadores de pagamento e/ou intermediadores de
            envio.
          </li>
          <li>
            Haja necessidade de identificar os dados do cliente que esteja
            utilizando o site com objetivos ilícitos (com intenção ou não).
          </li>
        </ul>
        <br />
        <strong>Alteração da política de privacidade</strong>
        <hr />
        <br />
        <p>
          Nos reservamos o direito de alterar nossas políticas a qualquer
          momento, cabendo ao usuário verificá-la sempre que acessar nosso site.
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
  border: 3px solid black;
  padding: 30px;
  border-radius: 10px;
  overflow: hidden;
  font-weight: normal !important;
}

@media only screen and (max-width: 600px) {
  .corpo {
    border-radius: 5px;
    padding: 6%;
    background-color: "white";
  }
  .texto {
    font-size: 14px;
  }
}

@media only screen and (max-width: 400px) {
  .corpo {
    border-radius: 5px;
    padding: 10px;
  }
  .texto {
    font-size: 13px;
  }
}
</style> 