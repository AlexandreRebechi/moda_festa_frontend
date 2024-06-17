<template>
    <div id="tab_aut">

        <div v-if="currentCliente" class="edit-form">
            <h3>Cliente</h3>
            <form>
                <div class="form-group">
                <label for="inputCPF">CPF:</label>
                <input type="text" v-model="currentCliente.cpf" class="form-control" id="inputCPF">
            </div>
            <div class="form-group">
                <label for="inputNome">Nome:</label>
                <input type="text" v-model="currentCliente.nome" class="form-control" id="inputNome">
            </div>
            <div class="form-group">
                <label for="inputEmail">Email:</label>
                <input type="text" v-model="currentCliente.email" class="form-control" id="inputEmail">
            </div>

            <div class="form-group">
                <label for="inputTelefone">Telefone:</label>
                <input type="text" v-model="currentCliente.telefone" class="form-control" id="inputTelefone">
            </div>
            <div class="form-group">
                <label for="inputCEP">CEP:</label>
                <input type="text" v-model="currentCliente.cep" class="form-control" id="inputCEP">
            </div>

            <div class="form-group">
                <label for="inputLogradouro">Logradouro:</label>
                <input type="text" v-model="currentCliente.logradouro" class="form-control" id="inputLogradouro">
            </div>
            <div class="form-group">
                <label for="inputBairro">bairro:</label>
                <input type="text" v-model="currentCliente.bairro" class="form-control" id="inputBairro">
            </div>
            
            <div class="form-group">
                <label for="inputNumero">Numero:</label>
                <input type="text" v-model="currentCliente.numero" class="form-control" id="inputNumero">
            </div>
            <div class="form-group">
                <label for="inputComplemento">Complemento:</label>
                <input type="text" v-model="currentCliente.complemento" class="form-control" id="inputComplemento">
            </div>
            <div class="form-group">
                <label for="inputObservacoes">Observacoes:</label>
                <input type="text" v-model="currentCliente.observacoes" class="form-control" id="inputObservacoes">
            </div>
            
            <div class="form-group">
                <label for="inputDataCadastro">Data Cadastro:</label>
                <input type="date" v-model="currentCliente.data_cadastro" class="form-control" id="inputDataCadastro">
            </div>
            <div class="form-group">
                <label for="inputUsername">Username:</label>
                <input type="text" v-model="currentCliente.username" class="form-control" id="inputUsername">
            </div>
            <div class="form-group">
                <label for="inputPassword">Password:</label>
                <input type="password" v-model="currentCliente.password" class="form-control" id="inputPassword">
            </div>

            <div class="form-group">
                <label for="inputDataUltimoLogin">Data Ultimo Login:</label>
                <input type="date" v-model="currentCliente.data_ultimo_login" class="form-control" id="inputDataUltimoLogin">
            </div>
           
           
            <div class="form-group">
                <label for="inputRG">RG:</label>
                <input type="text" v-model="currentCliente.rg" class="form-control" id="inputRG">
            </div>

            <div class="form-group">
                <label for="inputCNPJ">CNPJ:</label>
                <input type="text" v-model="currentCliente.cnpj" class="form-control" id="inputCNPJ">
            </div>

            <div class="form-group">
                <label for="inputIE">IE:</label>
                <input type="text" v-model="currentCliente.ie" class="form-control" id="inputIE">
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
    name: 'editCliente',
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
        deleteCliente() {

            ClienteDataService.delete(this.currentCliente.id)
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