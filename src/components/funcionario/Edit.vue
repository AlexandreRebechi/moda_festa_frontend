<template>
    <div id="tab_aut">

        <div v-if="currentJogador" class="edit-form">
            <h3>Cliente</h3>
            <form class="was-validated">
                <div class="mb-3">
                    <label for="inputCPF">CPF:</label>
                    <input type="text" v-model="currentFuncionario.cpf" class="form-control is-invalid" id="inputCPF"
                        placeholder="CPF" required>

                </div>
                <div class="mb-3">
                    <label for="inputNome">Nome:</label>
                    <input type="text" v-model="currentFuncionario.nome" class="form-control is-invalid" id="inputNome"
                        placeholder="Nome" required>

                </div>
                <div class="mb-3">
                    <label for="inputEmail">Email:</label>
                    <input type="text" v-model="currentFuncionario.email" class="form-control is-invalid" id="inputEmail"
                        placeholder="Email" required>

                </div>
                <div class="mb-3">
                    <label for="inputTelefone">Telefone:</label>
                    <input type="text" v-model="currentFuncionario.telefone" class="form-control is-invalid" id="inputTelefone"
                        placeholder="Telefone" required>

                </div>
                <div class="mb-3">
                    <label for="inputCEP">CEP:</label>
                    <input type="text" v-model="currentFuncionario.cep" class="form-control is-invalid" id="inputCEP"
                        placeholder="CEP" required>

                </div>
                <div class="mb-3">
                    <label for="inputLogradouro">Logradouro:</label>
                    <input type="text" v-model="currentFuncionario.logradouro" class="form-control is-invalid" id="inputLogradouro"
                        placeholder="Logradouro" required>

                </div>
                <div class="mb-3">
                    <label for="inputBairro">Bairro:</label>
                    <input type="text" v-model="currentFuncionario.bairro" class="form-control is-invalid" id="inputBairro"
                        placeholder="Bairro" required>

                </div>
                <div class="mb-3">
                    <label for="inputNumero">Numero:</label>
                    <input type="text" v-model="currentFuncionario.numero" class="form-control is-invalid" id="inputNumero"
                        placeholder="Numero" required>

                </div>
                <div class="mb-3">
                    <label for="inputComplemento">Complemento:</label>
                    <input type="text" v-model="currentFuncionario.complemento" class="form-control is-invalid"
                        id="inputComplemento" placeholder="Complemento" required>

                </div>
                <div class="mb-3">
                    <label for="inputObservacoes">Observacoes:</label>
                    <input type="text" v-model="currentFuncionario.observacoes" class="form-control is-invalid"
                        id="inputObservacoes" placeholder="Observacoes" required>

                </div>
                <div class="mb-3">
                    <label for="inputdatacadastro">Data Cadastro:</label>
                    <input type="date" v-model="currentFuncionario.data_cadastro" class="form-control is-invalid"
                        id="inputdatacadastro" placeholder="Data Cadastro" required>

                </div>
                <div class="mb-3">
                    <label for="inputUsername">Username:</label>
                    <input type="text" v-model="currentFuncionario.username" class="form-control is-invalid" id="inputUsername"
                        placeholder="Username" required>

                </div>
                <div class="mb-3">
                    <label for="inputPassword">Password:</label>
                    <input type="password" v-model="currentFuncionario.password" class="form-control is-invalid" id="inputPassword"
                        placeholder="Password" required>

                </div>
                <div class="mb-3">
                    <label for="inputDataUltimoLogin">Data Ultimo Login:</label>
                    <input type="date" v-model="currentFuncionario.data_ultimo_login" class="form-control is-invalid"
                        id="inputDataUltimoLogin" placeholder="Data Ultimo Login" required>

                </div>
                <div class="mb-3">
                    <label for="inputNumeroCtps">Numero CTPS:</label>
                    <input type="text" v-model="currentFuncionario.funcionario.numero_ctps" class="form-control is-invalid"
                        id="inputNumeroCtps" placeholder="Numero CTPS" required>
                </div>
                <div class="mb-3">
                    <label for="inputDataContratacao">Data Contratacao:</label>
                    <input type="text" v-model="currentFuncionario.funcionario.data_contratacao" class="form-control is-invalid"
                        id="inputDataContratacao" placeholder="Data Contratacao" required>
                </div>

                <div class="mb-3">
                    <label for="inputDataDemissao">Data Demissao:</label>
                    <input type="text" v-model="currentFuncionario.funcionario.data_demissao" class="form-control is-invalid"
                        id="inputDataDemissao" placeholder="Data Demissao" required>
                </div>

                <div class="mb-3">
                    <label for="selectPerfil">Perfil:</label>
                    <select v-model="currentFuncionario.funcionario.perfil" class="form-control is-invalid" id="selectPerfil"
                         required>
                        <option v-for="p in perfil" :key="p.id" v-bind:value="p">
                            {{ p.descricao }}
                        </option>
                    </select>


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
            message: '',
            perfil: []
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
        this.listPerfil();
    }
}
</script>
    
<style scoped>
.edit-form {
    max-width: 300px;
    margin: auto;
}
</style>