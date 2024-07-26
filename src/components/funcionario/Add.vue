<template>
    <div class="submit-form">
        <div v-if="!submitted">
            <form class="was-validated">
                <div class="mb-3">
                    <label for="inputCPF">CPF:</label>
                    <input type="text" v-model="pessoa.cpf" class="form-control is-invalid" id="inputCPF"
                        placeholder="CPF" required>

                </div>
                <div class="mb-3">
                    <label for="inputNome">Nome:</label>
                    <input type="text" v-model="pessoa.nome" class="form-control is-invalid" id="inputNome"
                        placeholder="Nome" required>

                </div>
                <div class="mb-3">
                    <label for="inputEmail">Email:</label>
                    <input type="text" v-model="pessoa.email" class="form-control is-invalid" id="inputEmail"
                        placeholder="Email" required>

                </div>
                <div class="mb-3">
                    <label for="inputTelefone">Telefone:</label>
                    <input type="text" v-model="pessoa.telefone" class="form-control is-invalid" id="inputTelefone"
                        placeholder="Telefone" required>

                </div>
                <div class="mb-3">
                    <label for="inputCEP">CEP:</label>
                    <input type="text" v-model="pessoa.cep" class="form-control is-invalid" id="inputCEP"
                        placeholder="CEP" required>

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
                    <input type="text" v-model="pessoa.complemento" class="form-control is-invalid"
                        id="inputComplemento" placeholder="Complemento" required>

                </div>
                <div class="mb-3">
                    <label for="inputObservacoes">Observacoes:</label>
                    <input type="text" v-model="pessoa.observacoes" class="form-control is-invalid"
                        id="inputObservacoes" placeholder="Observacoes" required>

                </div>
                <div class="mb-3">
                    <label for="inputdatacadastro">Data Cadastro:</label>
                    <input type="date" v-model="pessoa.data_cadastro" class="form-control is-invalid"
                        id="inputdatacadastro" placeholder="Data Cadastro" required>

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
                <div class="mb-3">
                    <label for="inputNumeroCtps">Numero CTPS:</label>
                    <input type="text" v-model="pessoa.numero_ctps" class="form-control is-invalid"
                        id="inputNumeroCtps" placeholder="Numero CTPS" required>
                </div>
                <div class="mb-3">
                    <label for="inputDataContratacao">Data Contratacao:</label>
                    <input type="date" v-model="pessoa.data_contratacao" class="form-control is-invalid"
                        id="inputDataContratacao" placeholder="Data Contratacao" required>
                </div>

                <div class="mb-3">
                    <label for="inputDataDemissao">Data Demissao:</label>
                    <input type="date" v-model="pessoa.data_demissao" class="form-control is-invalid"
                        id="inputDataDemissao" placeholder="Data Demissao" required>
                </div>

              
                <div class="mb-3">
                    <label for="selectPerfil">Perfil:</label>
                    <select v-model="pessoa.perfil" class="form-control is-invalid" id="selectPerfil"
                         required>
                        <option v-for="p in perfil" :key="p.id" v-bind:value="p">
                            {{ p.descricao }}
                        </option>
                    </select>


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
import PerfilDataService from '../../services/PerfilDataService';
//import PatenteDataService from '../../services/PatenteDataService'

export default {
    name: "addfuncionario",
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
                tipo: false,
                funcionario: { numero_ctps: '', data_contratacao: '', data_demissao: '', perfil: [] },
            },
            submitted: false,
            perfil: []

        }
    },
    methods: {

        savefuncionario() {

            var f = jQuery.extend({}, this.pessoa);//clona o this.novo_pessoa e armazena na variavel cliente. dessa forma alteracoes em this.novo_cliente nao irao refletir em cliente.
            var end = jQuery.extend({}, this.pessoa.funcionario);//clona o this.novo_pessoa.funcionario                        
            f.funcionario = end;

            if (f.username.trim().length > 0 && f.password.trim().length > 0) {

                FuncionarioDataService.create(f)
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
        listPerfil() {
            PerfilDataService.list().then(response => {

                console.log("Retorno do seviço PerfilDataService.list", response.status);

                for (let p of response.data) {

                    this.perfil.push(p);
                }
            }).catch(response => {

                // error callback
                alert('Não conectou no serviço PerfilDataService.list');
                console.log(response);
            });
        },
        newfuncionario() {

            this.submitted = false;
            this.funcionario = {};
        },


    },
    mounted() {
       this.listPerfil();
    }

}

</script>

<style>
.submit-form {
    max-width: 300px;
    margin: auto;
}
</style>