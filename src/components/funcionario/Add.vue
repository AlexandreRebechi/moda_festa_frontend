<template>
    <div class="submit-form">
        <div v-if="!submitted">
            <form>
                
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
                    <input type="date" v-model="cliente.endereco.DataCadastro" class="form-control"
                        id="inputDataCadastro">
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
                    <input type="date" v-model="pessoa.DataUltimoLogin" class="form-control" id="inputDataUltimoLogin">
                </div>
                <div class="form-group">
                    <label for="inputNumeroCtps">Numero CTPS:</label>
                    <input type="text" v-model="pessoa.funcionario.numero_ctps" class="form-control"
                        id="inputNumeroCtps">
                </div>
                <div class="form-group">
                    <label for="inputDataContratacao">Data Contratacao:</label>
                    <input type="text" v-model="pessoa.funcionario.dataContratacao" class="form-control"
                        id="inputDataContratacao">
                </div>

                <div class="form-group">
                    <label for="inputDataDemissao">Data Demissao:</label>
                    <input type="text" v-model="pessoa.funcionario.dataDemissao" class="form-control"
                        id="inputDataDemissao">
                </div>

                <div class="form-group">
                    <label for="inputPerfil">Perfil:</label>
                    <input type="text" v-model="pessoa.funcionario.perfil" class="form-control" id="inputPerfil">
                </div>

            </form>



            <button @click="savefuncionario" class="btn btn-success">Salvar</button>
            <router-link to="/funcionarios" class="btn btn-success">Voltar</router-link>

        </div>

        <div v-else>
            <h4>Dados enviados com sucesso !</h4>
            <button class="btn btn-success" @click="newfuncionario">Novo</button>
            <router-link to="/funcionarios" class="btn btn-success">Voltar</router-link>
        </div>
    </div>
</template>

<script>

import FuncionarioDataService from '../../services/FuncionarioDataService';
//import PatenteDataService from '../../services/PatenteDataService'

export default {
    name: "addFuncionario",
    data() {
        return {
            pessoa: {
                indice: '',
                id: '',
                nome: '',
                telefone: '',
                cep: '',
                logradouro: '',
                bairro: '',
                complemento: '',
                observacoes: '',
                dataCadastro: '',
                username: '',
                password: '',
                dataUltimoLogin: '',
                funcionario: { numero_ctps: '', dataContratacao: '', dataDemissao: '', perfil: '' },
            },
            submitted: false,

        }
    },
    methods: {

        savefuncionario() {

            var jgd = jQuery.extend({}, this.pessoa);//clona o this.novo_pessoa e armazena na variavel cliente. dessa forma alteracoes em this.novo_cliente nao irao refletir em cliente.
            var end = jQuery.extend({}, this.pessoa.funcionario);//clona o this.novo_pessoa.funcionario                        
            jgd.cliente = end;

            if (jgd.username.trim().length > 0 && jgd.password.trim().length > 0) {

                FuncionarioDataService.create(jgd)
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
        newfuncionario() {

            this.submitted = false;
            this.funcionario = {};
        },
        listPatentes() {

            PatenteDataService.list().then(response => {

                console.log("Retorno do seviço PatenteDataService.list", response.status);

                for (let j of response.data) {

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