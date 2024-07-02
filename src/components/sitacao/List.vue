x<template>
    <div id="tab_aut">


        <div class="col-md-6">
            <h4>Listagem de Sitacao</h4>
            <table class="table table-striped table-inverse table-responsive-sm table-danger text-align">
                <thead class="thead-inverse">
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Descricao</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(s, indice) in sitacoes" :key="s.id" :class="{ active: indice == currentIndex }">
                        <td>{{ s.id }}</td>
                        <td>{{ s.descricao }}</td>
                        <td><b-button v-on:click="setCurrentSitacao(s, indice)" class="btn"
                                type="button">Alterar</b-button></td>
                        <td><b-button v-on:click="remSitacao(s, indice)" class="btn" type="button">Remover</b-button>
                        </td>
                    </tr>

                </tbody>
            </table>
        </div>

        <div class="col-md-6">
            <div v-if="currentSitacao">
                <h4>Sitacao</h4>
                <div>
                    <label><strong>ID:</strong></label> {{ currentSitacao.id }}
                </div>
                <div>
                    <label><strong>Descricao:</strong></label> {{ currentSitacao.descricao }}
                </div>

                <a class="badge badge-warning" :href="'/sitacao/' + currentSitacao.id">
                    Edit
                </a>
            </div>
            <div v-else>
                <br />
                <p>Please click on a Player...</p>
                <router-link to="/addsitacao" class="badge badge-success">Novo</router-link>

            </div>
        </div>


    </div>
</template>
<script>


import SitacaoDataService from '../../services/SitacaoDataService';
export default {
    name: 'listSitacoes',
    data() {
        return {
            sitacoes: [],
            currentSitacao: null,
            currentIndex: -1
        }
    },
    methods: {
        listarSitacao() {

            SitacaoDataService.list().then(response => {

                console.log("Retorno do seviço authenticateSitacao", response.status);

                this.sitacoes = response.data;

            }).catch(response => {

                // error callback
                alert('Não conectou no serviço listarSitacao');
                console.log(response);
            });
        },
        setCurrentSitacao(sitacao, index) {

            this.currentSitacao = sitacao;
            this.currentIndex = index;
        },
        remSitacao(sitacao, index) {

            SitacaoDataService.delete(sitacao.id)
                .then(response => {
                    console.log(response.data);
                    this.refreshList();
                })
                .catch(e => {
                    console.log(e);
                });

        },
        refreshList() {
            this.listarSitacao();
            this.currentTutorial = null;
            this.currentIndex = -1;
        }

    },
    mounted() {
        this.listarSitacao();
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