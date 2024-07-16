<template>

  <div class="submit-form">
    <div v-if="!submitted">
      <form class="was-validated">
        <div class="mb-3">
          <label for="inputCPF">CPF:</label>
          <input type="text" v-model="pessoa.cpf" class="form-control is-invalid" id="inputCPF" placeholder="CPF"
            required>

        </div>
        <div class="mb-3">
          <label for="inputNome">Nome:</label>
          <input type="text" v-model="pessoa.nome" class="form-control is-invalid" id="inputNome" placeholder="Nome"
            required>

        </div>
        <div class="mb-3">
          <label for="inputEmail">Email:</label>
          <input type="email" v-model="pessoa.email" class="form-control is-invalid" id="inputEmail" placeholder="Email"
            required>

        </div>
        <div class="mb-3">
          <label for="inputTelefone">Telefone:</label>
          <input type="text" v-model="pessoa.telefone" class="form-control is-invalid" id="inputTelefone"
            placeholder="Telefone" required>

        </div>
        <div class="mb-3">
          <label for="inputCEP">CEP:</label>
          <input type="text" v-model="pessoa.cep" class="form-control is-invalid" id="inputCEP" placeholder="CEP"
            required>

        </div>
        <div class="mb-3">
          <label for="inputLogradouro">Logradouro:</label>
          <input type="text" v-model="pessoa.logradouro" class="form-control is-invalid" id="inputLogradouro"
            placeholder="Logradouro" required>

        </div>
        <div class="mb-3">
          <label for="inputBairro">Bairro:</label>
          <input type="text" v-model="pessoa.bairro" class="form-control is-invalid" id="inputBairro"
            placeholder="Bairro" required>

        </div>
        <div class="mb-3">
          <label for="inputNumero">Numero:</label>
          <input type="text" v-model="pessoa.numero" class="form-control is-invalid" id="inputNumero"
            placeholder="Numero" required>

        </div>
        <div class="mb-3">
          <label for="inputComplemento">Complemento:</label>
          <input type="text" v-model="pessoa.complemento" class="form-control is-invalid" id="inputComplemento"
            placeholder="Complemento" required>

        </div>
        <div class="mb-3">
          <label for="inputObservacoes">Observacoes:</label>
          <input type="text" v-model="pessoa.observacoes" class="form-control is-invalid" id="inputObservacoes"
            placeholder="Observacoes" required>

        </div>
        <div class="mb-3">
          <label for="inputdatacadastro">Data Cadastro:</label>
          <input type="date" v-model="pessoa.data_cadastro" class="form-control is-invalid" id="inputdatacadastro"
            placeholder="Data Cadastro" required>

        </div>
        <div class="mb-3">
          <label for="inputUsername">Username:</label>
          <input type="text" v-model="pessoa.username" class="form-control is-invalid" id="inputUsername"
            placeholder="Username" required>

        </div>
        <div class="mb-3">
          <label for="inputPassword">Password:</label>
          <input type="password" v-model="pessoa.password" class="form-control is-invalid" id="inputPassword"
            placeholder="Password" required>

        </div>
        <div class="mb-3">
          <label for="inputDataUltimoLogin">Data Ultimo Login:</label>
          <input type="date" v-model="pessoa.data_ultimo_login" class="form-control is-invalid"
            id="inputDataUltimoLogin" placeholder="Data Ultimo Login" required>
        </div>
        <div class="col-md-6">
          <label for="inputTipoPessoa">Tipo Pessoa:</label>
          <input type="text" v-model="pessoa.cliente.tipo" class="form-control is-invalid" id="inputTipoPessoa"
            placeholder="Tipo Pessoa" required>
        </div>


        <div class="mb-3">
          <div v-if="pessoaFisica()">
            <div class="mb-3">
              <label for="inputRG">RG:</label>
              <input type="text" v-model="pessoa.cliente.rg" class="form-control is-invalid" id="inputRG"
                placeholder="RG" required>

            </div>


          </div>
          <div v-if="pessoaJuritica()">
            <div class="mb-3">
              <label for="inputCNPJ">CNPJ:</label>
              <input type="text" v-model="pessoa.cliente.cnpj" class="form-control is-invalid" id="inputCNPJ"
                placeholder="CNPJ" required>

            </div>
          </div>

        </div>
        <div class="mb-3">
          <label for="inputIE">IE:</label>
          <input type="text" v-model="pessoa.cliente.ie" class="form-control is-invalid" id="inputIE" placeholder="IE"
            required>

        </div>

      </form>
      <button @click="savecliente" class="btn btn-success">Salvar</button>
      <router-link to="/clientes" class="btn btn-success">Voltar</router-link>

    </div>

    <div v-else>
      <h4>Dados enviados com sucesso !</h4>
      <button class="btn btn-success" @click="newcliente">Novo</button>
      <router-link to="/clientes" class="btn btn-success">Voltar</router-link>
    </div>
  </div>

</template>

<script>

import ClienteDataService from '../../services/ClienteDataService';
//import PatenteDataService from '../../services/PatenteDataService'

export default {
  name: "addcliente",
  data() {
    return {
      pessoa: {
        indice: '',
        cpf: '',
        nome: '',
        email: '',
        telefone: '',
        cep: '',
        logradouro: '',
        bairro: '',
        numero: '',
        complemento: '',
        observacoes: '',
        data_cadastro: '',
        username: '',
        password: '',
        data_ultimo_login: '',
        tipo: true,
        cliente: { rg: '', cnpj: '', ie: '', tipo: '' }
      },
      submitted: false,

    }
  },
  computed: {
    validation() {
      return this.pessoa.cpf.length > 1 && this.pessoa.cpf.length < 15
    }
  },
  methods: {
    pessoaFisica() {
      if (this.pessoa.cliente.tipo == 'F') {
        return true
      }else {
        return false
      }




    },
    pessoaJuritica() {
      if (this.pessoa.cliente.tipo == 'J') {
        return true
      }else {
        return false
      }
    },
    erroCliente() {
      ClienteDataService.get


    },
    savecliente() {

      var jgd = jQuery.extend({}, this.pessoa);//clona o this.novo_cliente e armazena na variavel cliente. dessa forma alteracoes em this.novo_cliente nao irao refletir em cliente.
      var end = jQuery.extend({}, this.pessoa.cliente);//clona o this.novo_cliente.endereco                        
      jgd.cliente = end;

      if (jgd.cpf.trim().length > 0 && jgd.password.trim().length > 0) {
        ClienteDataService.create(jgd)
          .then(response => {

            this.submitted = true;
          })
          .catch(e => {
            alert("Erro ao tentar cadastrar. !!! " + e.message);

          })

      } else {
        alert('Formulário incompleto !!!');
      }

    },
    newcliente() {

      this.submitted = false;
      this.cliente = {};
    },


  },
  mounted() {


  }

}

</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>