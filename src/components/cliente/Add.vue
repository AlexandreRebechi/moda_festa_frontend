<template>
    <div class="submit-form">
        <div v-if="!submitted">

            <div class="form-group">
                <label for="inputCPF">CPF:</label>
                <input type="text" v-model="pessoa.cpf" class="form-control" id="inputCPF">
            </div>
            <div class="form-group">
                <label for="inputNome">Nome:</label>
                <input type="text" v-model="pessoa.nome" class="form-control" id="inputNome">
            </div>
            <div class="form-group">
                <label for="inputEmail">Email:</label>
                <input type="text" v-model="pessoa.email" class="form-control" id="inputEmail">
            </div>

            <div class="form-group">
                <label for="inputTelefone">Telefone:</label>
                <input type="text" v-model="pessoa.telefone" class="form-control" id="inputTelefone">
            </div>
            <div class="form-group">
                <label for="inputCEP">CEP:</label>
                <input type="text" v-model="pessoa.cep" class="form-control" id="inputCEP">
            </div>

            <div class="form-group">
                <label for="inputLogradouro">Logradouro:</label>
                <input type="text" v-model="pessoa.logradouro" class="form-control" id="inputLogradouro">
            </div>
            <div class="form-group">
                <label for="inputBairro">bairro:</label>
                <input type="text" v-model="pessoa.bairro" class="form-control" id="inputBairro">
            </div>
            
            <div class="form-group">
                <label for="inputNumero">Numero:</label>
                <input type="text" v-model="pessoa.numero" class="form-control" id="inputNumero">
            </div>
            <div class="form-group">
                <label for="inputComplemento">Complemento:</label>
                <input type="text" v-model="pessoa.complemento" class="form-control" id="inputComplemento">
            </div>
            <div class="form-group">
                <label for="inputObservacoes">Observacoes:</label>
                <input type="text" v-model="pessoa.observacoes" class="form-control" id="inputObservacoes">
            </div>
            
            <div class="form-group">
                <label for="inputdatacadastro">Data Cadastro:</label>
                <input type="date" v-model="pessoa.data_cadastro" class="form-control" id="inputdatacadastro">
            </div>
            <div class="form-group">
                <label for="inputUsername">Username:</label>
                <input type="text" v-model="pessoa.username" class="form-control" id="inputUsername">
            </div>
          
            <div class="form-group">
                <label for="inputPassword">Password:</label>
                <input type="password" v-model="pessoa.password" class="form-control" id="inputPassword">
            </div>

            <div class="form-group">
                <label for="inputDataUltimoLogin">Data Ultimo Login:</label>
                <input type="date" v-model="pessoa.data_ultimo_login" class="form-control" id="inputDataUltimoLogin">
            </div>
            
            <div class="form-group">
                <label for="inputRG">RG:</label>
                <input type="text" v-model="pessoa.cliente.rg" class="form-control" id="inputRG">
            </div>

            <div class="form-group">
                <label for="inputCNPJ">CNPJ:</label>
                <input type="text" v-model="pessoa.cliente.cnpj" class="form-control" id="inputCNPJ">
            </div>

            <div class="form-group">
                <label for="inputIE">IE:</label>
                <input type="text" v-model="pessoa.cliente.ie" class="form-control" id="inputIE">
            </div>




            <button @click="savecliente" class="btn btn-success">Salvar</button>
            <router-link to="/pessoas" class="btn btn-success">Voltar</router-link>

        </div>

        <div v-else>
            <h4>Dados enviados com sucesso !</h4>
            <button class="btn btn-success" @click="newcliente">Novo</button>
            <router-link to="/pessoas" class="btn btn-success">Voltar</router-link>
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
            pessoa: {indice: '',
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
                                cliente: {rg: '', cnpj: '', ie: '', tipo: true }
            },
            submitted: false,

        }
    },
    methods: {
        erroCliente(){
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