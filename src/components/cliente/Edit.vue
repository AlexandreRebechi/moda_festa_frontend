<template>
  <div id="tab_aut">

    <div v-if="currentCliente" class="edit-form">
      <form class="was-validated">
        <h3>Cliente</h3>
        <div class="mb-3">
          <label for="inputCPF">CPF:</label>
          <input type="text" v-model="currentCliente.cpf" class="form-control is-invalid" id="inputCPF"
            placeholder="CPF" required>
        </div>
        <div class="mb-3">
          <label for="inputNome">Nome:</label>
          <input type="text" v-model="currentCliente.nome" class="form-control is-invalid" id="inputNome"
            placeholder="Nome" required>

        </div>
        <div class="mb-3">
          <label for="inputEmail">Email:</label>
          <input type="text" v-model="currentCliente.email" class="form-control is-invalid" id="inputEmail"
            placeholder="Email" required>

        </div>
        <div class="mb-3">
          <label for="inputTelefone">Telefone:</label>
          <input type="text" v-model="currentCliente.telefone" class="form-control is-invalid" id="inputTelefone"
            placeholder="Telefone" required>

        </div>
        <div class="mb-3">
          <label for="inputCEP">CEP:</label>
          <input type="text" v-model="currentCliente.cep" class="form-control is-invalid" id="inputCEP"
            placeholder="CEP" required>

        </div>
        <div class="mb-3">
          <label for="inputLogradouro">Logradouro:</label>
          <input type="text" v-model="currentCliente.logradouro" class="form-control is-invalid" id="inputLogradouro"
            placeholder="Logradouro" required>

        </div>
        <div class="mb-3">
          <label for="inputBairro">Bairro:</label>
          <input type="text" v-model="currentCliente.bairro" class="form-control is-invalid" id="inputBairro"
            placeholder="Bairro" required>

        </div>
        <div class="mb-3">
          <label for="inputComplemento">Complemento:</label>
          <input type="text" v-model="currentCliente.complemento" class="form-control is-invalid" id="inputComplemento"
            placeholder="Complemento" required>

        </div>
        <div class="mb-3">
          <label for="inputObservacoes">Observacoes:</label>
          <input type="text" v-model="currentCliente.observacoes" class="form-control is-invalid" id="inputObservacoes"
            placeholder="Observacoes" required>

        </div>
        <div class="mb-3">
          <label for="inputdatacadastro">Data Cadastro:</label>
          <input type="date" v-model="currentCliente.data_cadastro" class="form-control is-invalid"
            id="inputdatacadastro" placeholder="Data Cadastro" required>

        </div>
        <div class="mb-3">
          <label for="inputUsername">Username:</label>
          <input type="text" v-model="currentCliente.username" class="form-control is-invalid" id="inputUsername"
            placeholder="Username" required>

        </div>
        <div class="mb-3">
          <label for="inputPassword">Password:</label>
          <input type="password" v-model="currentCliente.password" class="form-control is-invalid" id="inputPassword"
            placeholder="Password" required>

        </div>
        <div class="mb-3">
          <label for="inputDataUltimoLogin">Data Ultimo Login:</label>
          <input type="date" v-model="currentCliente.data_ultimo_login" class="form-control is-invalid"
            id="inputDataUltimoLogin" placeholder="Data Ultimo Login" required>

        </div>
        <div class="mb-3" v-if="tipoPessoa()">
          <label for="inputRG">RG:</label>
          <input type="text" v-model="currentCliente.cliente.rg" class="form-control is-invalid" id="inputRG"
            placeholder="RG" required>

        </div>
        <div class="mb-3" v-else>
          <label for="inputCNPJ">CNPJ:</label>
          <input type="text" v-model="currentCliente.cliente.cnpj" class="form-control is-invalid" id="inputCNPJ"
            placeholder="CNPJ" required >

        </div>
        <div class="mb-3">
          <label for="inputIE">IE:</label>
          <input type="text" v-model="currentCliente.cliente.ie" class="form-control is-invalid" id="inputIE"
            placeholder="IE" required>
        </div>


      </form>
      <button class="badge badge-success" @click="updateCliente">Salvar</button>
      <button class="badge badge-danger mr-2" @click="deleteCliente">Delete</button>
      <button class="badge badge-danger mr-2" @click="voltar">Voltar</button>


      <p>{{ message }}</p>

    </div>
    <div v-else>
      <br />
      <p>Please click on a Cliente...</p>
    </div>


  </div>
</template>
<script>

import ClienteDataService from '../../services/ClienteDataService';


export default {
  name: 'editcliente',
  data() {
    return {
      currentCliente: null,
      message: ''

    }
  },
  methods: {

    getCliente(cpf) {

      ClienteDataService.get(cpf)
        .then(response => {
          console.log(response.data);
          this.currentCliente = response.data;

        })
        .catch(e => {
          console.log(e);
        })
    },
    updateCliente() {
      alert(this.currentCliente);
      ClienteDataService.update(this.currentCliente)
        .then(response => {
          console.log('ClienteDataService.update');
          this.message = 'cliente alterado com sucesso !';
        })
        .catch(e => {
          console.log(e);
        })
    },
    tipoPessoa(){
      console.log("tipo pessoa: "+this.currentCliente.tipo)
      if (this.currentCliente.tipo == 'F') {
         return true
      } else {
        return false        
      }
    },
    deleteCliente() {

      ClienteDataService.delete(this.currentCliente.cpf)
        .then(response => {
          console.log(response.data);
          this.$router.push({ name: "clientes-list" });
        })
        .catch(e => {
          console.log(e);
        });
    },
    voltar() {
      this.$router.push({ name: "clientes-list" });
    }
  },
  mounted() {

    this.message = '';
    this.getCliente(this.$route.params.id);
  }
}
</script>

<style scoped>
.edit-form {
  max-width: 300px;
  margin: auto;

}
</style>