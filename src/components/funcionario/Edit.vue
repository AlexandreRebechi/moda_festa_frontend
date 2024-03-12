<template>
    <div id="tab_aut">

        <div v-if="currentJogador" class="edit-form">
            <h3>Cliente</h3>
            <form>
                <div class="form-group">
                    <label for="inputNickname">Nickname:</label>
                    <input type="text" v-model="pessoa.nickname" class="form-control" id="inputNickname">
                </div>
                <div class="form-group">
                    <label for="inputSenha">Senha:</label>
                    <input type="password" v-model="pessoa.senha" class="form-control" id="inputSenha">
                </div>
                <div class="form-group">
                    <label for="inputID">ID:</label>
                    <input type="number" v-model="pessoa.id" class="form-control" id="inputID">
                </div>
                <div class="form-group">
                    <label for="inputNome">Nome:</label>
                    <input type="text" v-model="pessoa.nome" class="form-control" id="inputNome">
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
                    <label for="inputCom">Complemento:</label>
                    <input type="text" v-model="pessoa.complemento" class="form-control" id="inputComplemento">
                </div>
                <div class="form-group">
                    <label for="inputObservacoes">Observacoes:</label>
                    <input type="text" v-model="pessoa.observacoes" class="form-control" id="inputObservacoes">
                </div>

                <div class="form-group">
                    <label for="inputDataCadastro">Data Cadastro:</label>
                    <input type="date" v-model="cliente.endereco.DataCadastro" class="form-control" id="inputDataCadastro">
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
                    <input type="date" v-model="pessoa.DataUltimoLogin" class="form-control"
                        id="inputDataUltimoLogin">
                </div>
                <div class="form-group">
                    <label for="inputNumeroCtps">Numero CTPS:</label>
                    <input type="text" v-model="pessoa.funcionario.numero_ctps" class="form-control" id="inputNumeroCtps">
                </div>
                <div class="form-group">
                    <label for="inputDataContratacao">Data Contratacao:</label>
                    <input type="text" v-model="pessoa.funcionario.dataContratacao" class="form-control" id="inputDataContratacao">
                </div>

                <div class="form-group">
                    <label for="inputDataDemissao">Data Demissao:</label>
                    <input type="text" v-model="pessoa.funcionario.dataDemissao" class="form-control" id="inputDataDemissao">
                </div>

                <div class="form-group">
                    <label for="inputPerfil">Perfil:</label>
                    <input type="text" v-model="pessoa.funcionario.perfil" class="form-control" id="inputPerfil">
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
//import PatenteDataService from '../../services/PatenteDataService'

export default {
    name: 'editFuncionario',
    data() {
        return {
            currentFuncionario: null,
            message: ''
           // patentes: []
        }
    },
    methods: {

        getCliente(id) {

            FuncionarioDataService.get(id)
                .then(response => {
                    console.log(response.data);
                    this.currentFuncionario = response.data;

                })
                .catch(e => {
                    console.log(e);
                })
        },
        /*listPatentes() {

            PatenteDataService.list().then(response => {

                console.log("Retorno do seviço PatenteDataService.list", response.status);

                this.patentes = response.data;

            }).catch(response => {

                // error callback
                alert('Não conectou no serviço PatenteDataService.list');
                console.log(response);
            });
        },*/
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

            FuncionarioDataService.delete(this.currentFuncionario.id)
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
        this.listPatentes();
        this.getFuncionario(this.$route.params.id);
    }
}
</script>
    
<style scoped>
.edit-form {
    max-width: 300px;
    margin: auto;
}
</style>