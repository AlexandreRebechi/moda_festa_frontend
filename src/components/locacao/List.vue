<template>
    <div id="tab_aut">


        <div class="col-md-6">
            <h4>Listagem de locacoes</h4>
            <table class="table table-striped table-inverse table-responsive-sm table-danger">
                <thead class="thead-inverse">
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Data Retirada</th>
                        <th scope="col">Data Previsao Entrega</th>
                        <th scope="col">Data Entrega</th>
                        <th scope="col">Data Previsao Pagamento</th>
                        <th scope="col">Valor Total</th>
                        <th scope="col">Valor Pago</th>
                        <th scope="col">Observacoes</th>
                        <th scope="col">Funcionario</th>
                        <th scope="col">tipos_pagamento</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(l, indice) in locacao" :key="l.id" :class="{ active: indice == currentIndex }">
                        <td>{{ l.id }}</td>
                        <td>{{ l.data_retirada | formataData }}</td>
                        <td>{{ l.data_previsao_entrega | formataData }}</td>
                        <td>{{ l.data_entrega | formataData }}</td>
                        <td>{{ l.data_previsao_pagamento | formataData }}</td>
                        <td>{{ l.valor_total }}</td>
                        <td>{{ l.valor_pago }}</td>
                        <td>{{ l.observacoes }}</td>
                        <td>{{ l.funcionario }}</td>
                        <td>{{ l.tipos_pagamento }}</td>
                        <td><b-button v-on:click="setCurrentLocacao(l, indice)" class="btn"
                                type="button">Alterar</b-button></td>
                        <td><b-button v-on:click="remLocacao(l, indice)" class="btn" type="button">Remover</b-button>
                        </td>
                    </tr>

                </tbody>
            </table>


        </div>

        <div class="col-md-6">
            <div v-if="currentLocacao">
                <h4>Locacao</h4>
                <div>
                    <label><strong>ID:</strong></label> {{ currentLocacao.id }}
                </div>
                <div>
                    <label><strong>Observacoes:</strong></label> {{ currentLocacao.descricao }}
                </div>

                <a class="badge badge-warning" :href="'/locacao/' + currentLocacao.id">
                    Edit
                </a>
            </div>
            <div v-else>
                <br />
                <p>Please click on a Player...</p>
                <router-link to="/addlocacao" class="badge badge-success">Novo</router-link>

            </div>
        </div>


    </div>
</template>
<script>


import LocacaoDateService from '../../services/LocacaoDateService';



export default {
    name: 'listLocacao',
    data() {
        return {
            locacao: [],
            currentLocacao: null,
            currentIndex: -1
        }
    },
    methods: {
        listarLocacoes() {

            LocacaoDateService.list().then(response => {

                console.log("Retorno do seviço authenticateLocacao", response.status);

                this.locacao = response.data;

            }).catch(response => {

                // error callback
                alert('Não conectou no serviço listarLocacao');
                console.log(response);
            });
        },
        setCurrentLocacao(locacao, index) {

            this.currentLocacao = locacao;
            this.currentIndex = index;
        },
        remLocacao(reserva, index) {

            LocacaoDateService.delete(locacao.id)
                .then(response => {
                    console.log(response.data);
                    this.refreshList();
                })
                .catch(e => {
                    console.log(e);
                });

        },
        refreshList() {
            this.listarLocacoes();
            this.currentTutorial = null;
            this.currentIndex = -1;
        }

    },
    mounted() {
        this.listarLocacoes();
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