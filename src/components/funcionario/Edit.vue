<template>
    <div id="tab_aut">

        <div v-if="currentJogador" class="edit-form">
            <h3>Cliente</h3>
            <form>
                
                <div class="form-group">
                <label for="inputcpf">CPF:</label>
                <input type="text" v-model="currentFuncionario.cpf" class="form-control" id="inputcpf" >
            </div>
                <div class="form-group">
                    <label for="inputNome">Nome:</label>
                    <input type="text" v-model="currentFuncionario.nome" class="form-control" id="inputNome">
                </div>
                <div class="form-group">
                    <label for="inputEmail">Email:</label>
                    <input type="text" v-model="currentFuncionario.email" class="form-control" id="inputEmail">
                </div>
                <div class="form-group">
                    <label for="inputTelefone">Telefone:</label>
                    <input type="text" v-model="currentFuncionario.telefone" class="form-control" id="inputTelefone">
                </div>
                <div class="form-group">
                    <label for="inputCEP">CEP:</label>
                    <input type="text" v-model="currentFuncionario.cep" class="form-control" id="inputCEP">
                </div>

                <div class="form-group">
                    <label for="inputLogradouro">Logradouro:</label>
                    <input type="text" v-model="currentFuncionario.logradouro" class="form-control" id="inputLogradouro">
                </div>
                <div class="form-group">
                    <label for="inputBairro">bairro:</label>
                    <input type="text" v-model="currentFuncionario.bairro" class="form-control" id="inputBairro">
                </div>
                <div class="form-group">
                    <label for="inputNumero">Numero:</label>
                    <input type="text" v-model="currentFuncionario.numero" class="form-control" id="inputNumero">
                </div>
                <div class="form-group">
                    <label for="inputCom">Complemento:</label>
                    <input type="text" v-model="currentFuncionario.complemento" class="form-control" id="inputComplemento">
                </div>
                <div class="form-group">
                    <label for="inputObservacoes">Observacoes:</label>
                    <input type="text" v-model="currentFuncionario.observacoes" class="form-control" id="inputObservacoes">
                </div>

                <div class="form-group">
                    <label for="inputDataCadastro">Data Cadastro:</label>
                    <input type="date" v-model="currentFuncionario.data_cadastro" class="form-control" id="inputDataCadastro">
                </div>
                <div class="form-group">
                    <label for="inputUsername">Username:</label>
                    <input type="text" v-model="currentFuncionario.username" class="form-control" id="inputUsername">
                </div>
                <div class="form-group">
                    <label for="inputPassword">Password:</label>
                    <input type="password" v-model="currentFuncionario.password" class="form-control" id="inputPassword">
                </div>

                <div class="form-group">
                    <label for="inputDataUltimoLogin">Data Ultimo Login:</label>
                    <input type="date" v-model="currentFuncionario.data_ultimo_login" class="form-control"
                        id="inputDataUltimoLogin">
                </div>
                <div class="form-group">
                    <label for="inputTipo">Tipo:</label>
                    <input type="text" v-model="currentFuncionario.tipo" class="form-control" id="inputTipo">
                </div>
                <div class="form-group">
                    <label for="inputNumeroCtps">Numero CTPS:</label>
                    <input type="text" v-model="currentFuncionario.funcionario.numero_ctps" class="form-control" id="inputNumeroCtps">
                </div>
                <div class="form-group">
                    <label for="inputDataContratacao">Data Contratacao:</label>
                    <input type="text" v-model="currentFuncionario.funcionario.dataContratacao" class="form-control" id="inputDataContratacao">
                </div>

                <div class="form-group">
                    <label for="inputDataDemissao">Data Demissao:</label>
                    <input type="text" v-model="currentFuncionario.funcionario.dataDemissao" class="form-control" id="inputDataDemissao">
                </div>

                <div class="form-group">
                    <label for="inputPerfil">Perfil:</label>
                    <input type="text" v-model="currentFuncionario.funcionario.perfil" class="form-control" id="inputPerfil">
                </div>

            </form>
            <button class="badge badge-success" @click="updateFuncionario">Salvar</button>
            <button class="badge badge-danger mr-2" @click="deleteFuncionario">Delete</button>
            <button class="badge badge-danger mr-2" @click="voltar">Voltar</button>


            <p>{{ message }}</p>

        </div>
        <div v-else>
            <br />
            <p>Please click on a Funcionario...</p>
        </div>


    </div>
</template>
<script>


import FuncionarioDataService from '../../services/FuncionarioDataService';


export default {
    name: 'editFuncionario',
    data() {
        return {
            currentFuncionario: null,
            message: ''

        }
    },
    methods: {

        getFuncionario(cpf) {

            FuncionarioDataService.get(cpf)
                .then(response => {
                    console.log(response.data);
                    this.currentFuncionario = response.data;

                })
                .catch(e => {
                    console.log(e);
                })
        },
        updateFuncionario() {
            alert(this.currentFuncionario);
            FuncionarioDataService.update(this.currentFuncionario)
                .then(response => {
                    console.log('FuncionarioDataService.update');
                    this.message = 'funcionario alterado com sucesso !';
                })
                .catch(e => {
                    console.log(e);
                })
        },
        deleteFuncionario() {

            FuncionarioDataService.delete(this.currentFuncionario.cpf)
                .then(response => {
                    console.log(response.data);
                    this.$router.push({ name: "funcionarios-list" });
                })
                .catch(e => {
                    console.log(e);
                });
        },
        voltar() {
            this.$router.push({ name: "funcionarios-list" });
        }
    },
    mounted() {

        this.message = '';
        this.getFuncionario(this.$route.params.cpf);
    }
}
</script>
    
<style scoped>
.edit-form {
    max-width: 300px;
    margin: auto;
}
</style>