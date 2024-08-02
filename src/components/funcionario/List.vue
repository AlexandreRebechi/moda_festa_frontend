<template>
    <div id="tab_aut">


        <div class="col-md-6">
            <h4>Listagem de Funcionarios</h4>
            <table class="table table-striped table-inverse table-responsive table-danger">
                <thead class="thead-inverse">
                    <tr>
                        <th scope="col">cpf</th>
                        <th scope="col">nome</th>
                        <th scope="col">email</th>
                        <th scope="col">telefone</th>
                        <th scope="col">cep</th>
                        <th scope="col">logradouro</th>
                        <th scope="col">bairro</th>
                        <th scope="col">numero</th>
                        <th scope="col">complemento</th>
                        <th scope="col">data_cadastro</th>
                        <th scope="col">username</th>
                        <th scope="col">password</th>
                        <th scope="col">data_ultimo_login</th>
                        <th scope="col">Tipo</th>
                        <th scope="col">numero_ctps</th>
                        <th scope="col">dataContratacao</th>
                        <th scope="col">dataDemissao</th>
                        <th scope="col">perfil</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(p, indice) in pessoas" :key="p.cpf" :class="{ active: indice == currentIndex }">
                        <td>{{ p.cpf }}</td>
                        <td>{{ p.nome }}</td>
                        <td>{{ p.email }}</td>
                        <td>{{ p.telefone }}</td>
                        <td>{{ p.cep }}</td>
                        <td>{{ p.logradouro }}</td>
                        <td>{{ p.bairro }}</td>
                        <td>{{ p.numero }}</td>
                        <td>{{ p.complemento }}</td>
                        <td>{{ p.data_cadastro | formataData}}</td>
                        <td>{{ p.username }}</td>
                        <td>{{ p.password }}</td>
                        <td>{{ p.data_ultimo_login | formataData}}</td>
                        <td>{{ p.tipo }}</td>
                        <td>{{ p.numero_ctps }}</td>
                        <td>{{ p.data_contratacao | formataData}}</td>
                        <td>{{ p.data_demissao | formataData}}</td>
                        <td>{{ p.perfil }}</td>
                        <td><button v-on:click="setCurrentFuncionario(p, indice)" class="btn"
                                type="button">Alterar</button></td>
                        <td><button v-on:click="remFuncionario(p, indice)" class="btn"
                                type="button">Remover</button></td>
                    </tr>

                </tbody>
            </table>

        </div>

        <div class="col-md-6">
            <div v-if="currentFuncinario">
                <h4>Funcionario</h4>
                <div>
                    <label><strong>Username:</strong></label> {{ currentFuncinario.username }}
                </div>
                <div>
                    <label><strong>Data de Cadastro:</strong></label> {{ currentFuncinario.data_cadastro | formataData }}
                </div>
                <div>
                    <label><strong>Observacoes:</strong></label> {{ currentFuncinario.observacoes }}
                </div>

                <a class="badge badge-warning" :href="'/funcionario/' + currentFuncinario.cpf">
                    Edit
                </a>
            </div>
            <div v-else>
                <br />
                <p>Please click on a Player...</p>
                <router-link to="/addfuncionario" class="badge badge-success">Novo</router-link>

            </div>
        </div>


    </div>
</template>
<script>


import FuncionarioDataService from '../../services/FuncionarioDataService';


export default {
    name: 'listFuncionarios',
    data() {
        return {
            pessoas: [],
            currentFuncinario: null,
            currentIndex: -1
        }
    },
    methods: {
        listarFuncinario() {

            FuncionarioDataService.list().then(response => {

                console.log("Retorno do seviço authenticateFuncionario", response.status);

                this.pessoas = response.data;

            }).catch(response => {

                // error callback
                alert('Não conectou no serviço listFuncinario');
                console.log(response);
            });
        },
        setCurrentFuncionario(pessoas, index) {

            this.currentFuncinario = pessoas;
            this.currentIndex = index;
        },
        remFuncionario(pessoas, index) {

            ClienteDataService.delete(this.pessoas.cpf)
                .then(response => {
                    console.log(response.data);
                    this.refreshList();
                })
                .catch(e => {
                    console.log(e);
                });

        },
        refreshList() {
            this.listarFuncinario();
            this.currentTutorial = null;
            this.currentIndex = -1;
        }

    },
    mounted() {
        this.listarFuncinario();
    }

}
</script>

<style scoped>
.list {
    text-align: left;
    max-width: 750px;
    margin: auto;
}
</style>