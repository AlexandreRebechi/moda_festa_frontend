<template>
    <div class="submit-form">
      <div v-if="!submitted">       

        <div class="form-group">
            <label for="inputNickname">Nickname:</label>
            <input type="text" v-model="cliente.nickname" class="form-control" id="inputNickname">
        </div>
        <div class="form-group">
            <label for="inputSenha">Senha:</label>
            <input type="password" v-model="cliente.senha" class="form-control" id="inputSenha">
        </div>
        <div class="form-group">
            <label for="inputID">ID:</label>
            <input type="number" v-model="cliente.id" class="form-control" id="inputID">
        </div>
        <div class="form-group">
            <label for="inputNome">Nome:</label>
            <input type="text" v-model="cliente.nome" class="form-control" id="inputNome">
        </div>
        <div class="form-group">
            <label for="inputTelefone">Telefone:</label>
            <input type="text" v-model="cliente.telefone" class="form-control" id="inputTelefone">
        </div>           
        <div class="form-group">
            <label for="inputCEP">CEP:</label>
            <input type="text" v-model="cliente.cep" class="form-control" id="inputCEP">
        </div>
        
        <div class="form-group">
                <label for="inputLogradouro">Logradouro:</label>
                <input type="text" v-model="cliente.logradouro" class="form-control" id="inputLogradouro">
        </div>
        <div class="form-group">
            <label for="inputBairro">bairro:</label>
            <input type="text" v-model="cliente.bairro" class="form-control" id="inputBairro">
        </div>
        <div class="form-group">
            <label for="inputCom">Complemento:</label>
            <input type="text" v-model="cliente.endereco.complemento" class="form-control" id="inputComplemento">
        </div>
        <div class="form-group">
            <label for="inputObservacoes">Observacoes:</label>
            <input type="text" v-model="cliente.endereco.observacoes" class="form-control" id="inputObservacoes">
        </div>

        <div class="form-group">
            <label for="inputDataCadastro">Data Cadastro:</label>
            <input type="date" v-model="cliente.endereco.DataCadastro" class="form-control" id="inputDataCadastro">
        </div>
        <div class="form-group">
            <label for="inputUsername">Username:</label>
            <input type="text" v-model="cliente.endereco.DataCadastro" class="form-control" id="inputUsername">
        </div>
        <div class="form-group">
            <label for="inputPassword">Password:</label>
            <input type="password" v-model="cliente.endereco.password" class="form-control" id="inputPassword">
        </div>

        <div class="form-group">
            <label for="inputDataUltimoLogin">Data Ultimo Login:</label>
            <input type="date" v-model="cliente.endereco.DataUltimoLogin" class="form-control" id="inputDataUltimoLogin">
        </div>
        <div class="form-group">
            <label for="inputCPF">CPF:</label>
            <input type="text" v-model="cliente.endereco.cpf" class="form-control" id="inputCPF">
        </div>
        <div class="form-group">
            <label for="inputRG">RG:</label>
            <input type="text" v-model="cliente.endereco.cpf" class="form-control" id="inputRG">
        </div>

        <div class="form-group">
            <label for="inputCNPJ">CNPJ:</label>
            <input type="text" v-model="cliente.endereco.cnpj" class="form-control" id="inputCNPJ">
        </div>

        <div class="form-group">
            <label for="inputIE">IE:</label>
            <input type="text" v-model="cliente.endereco.ie" class="form-control" id="inputIE">
        </div>

        
        
  
        <button @click="savecliente" class="btn btn-success">Salvar</button>
        <router-link to="/clientees" class="btn btn-success">Voltar</router-link>                

      </div>
  
      <div v-else>
        <h4>Dados enviados com sucesso !</h4>
        <button class="btn btn-success" @click="newcliente">Novo</button>
        <router-link to="/clientees" class="btn btn-success">Voltar</router-link>
      </div>
    </div>
  </template>

<script>

    import clienteDataService from '../../services/ClienteDataService'
    //import PatenteDataService from '../../services/PatenteDataService'

    export default {
        name: "addcliente",
        data(){
            return {
                pessoa: {indice: '', 
                                    id: '', 
                                    nome: '',
                                    telefone: '', 
                                    cep: '',
                                    logradouro: '',
                                    bairro: '',
                                    complemento: '',
                                    observacoes: '',
                                    DataCadastro: '',
                                    username: '',
                                    password: '',
                                    DataUltimoLogin: '',                                                                  
                                    situacao: true,  
                                    cliente: { cpf: '',rg: '', cnpj: '', ie: ''},
                                   },
                submitted: false,
                
            }            
        },
        methods: {

            savecliente(){

                var jgd = jQuery.extend({}, this.pessoa);//clona o this.novo_cliente e armazena na variavel cliente. dessa forma alteracoes em this.novo_cliente nao irao refletir em cliente.
                var end = jQuery.extend({}, this.pessoa.cliente);//clona o this.novo_cliente.endereco                        
                jgd.cliente = end;                                                

                if (jgd.username.trim().length > 0 && jgd.password.trim().length > 0 ) {
                
                    clienteDataService.create(jgd)
                    .then(response => {
                        
                        this.submitted = true;
                    })
                    .catch(e => {                        
                        alert("Erro ao tentar cadastrar. !!! " + e.message);

                    })

                }else{
                    alert('Formulário incompleto !!!');
                }

            },
            newcliente(){

                this.submitted = false;
                this.cliente = {};
            },
            listPatentes(){

                PatenteDataService.list().then(response =>{

                console.log("Retorno do seviço PatenteDataService.list", response.status);

                for(let j of response.data){

                    this.patentes.push(j);
                }                  

                }).catch(response => {

                // error callback
                alert('Não conectou no serviço PatenteDataService.list');
                console.log(response);
                });               
            }

        },
        mounted() {                        
            this.listPatentes();
            
         }

    }

</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>