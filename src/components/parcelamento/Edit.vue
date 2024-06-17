<template>
    <div id="tab_aut">

        <div v-if="currentParcelamento" class="edit-form">
            <h3>Parcelamento</h3>
            <form>
                <div class="form-group">
                <label for="inputID">ID:</label>
                <input type="number" v-model="parcelamento.id" class="form-control" id="inputID" disabled>
            </div>
            <div class="form-group">
                <label for="inputNumeroParcela">Numero Parcela:</label>
                <input type="number" v-model="parcelamento.numero_parcela" class="form-control" id="inputNumeroParcela">
            </div>
            <div class="form-group">
                <label for="inputDataPrevisaoPagamento">Data de Previsão de Pagamento:</label>
                <input type="date" v-model="parcelamento.data_previsao_pagamento" class="form-control" id="inputDataPrevisaoPagamento">
            </div>
            <div class="form-group">
                <label for="inputDataPagamento">Data Pagamento:</label>
                <input type="date" v-model="parcelamento.data_pagamento" class="form-control" id="inputDataPagamento">
            </div>
            <div class="form-group">
                <label for="inputValorTotal">Valor Total:</label>
                <input type="number" v-model="parcelamento.valor_total" class="form-control" id="inputValorTotal">
            </div>
            <div class="form-group">
                <label for="inputValorPago">Valor Pago:</label>
                <input type="number" v-model="parcelamento.valor_pago" class="form-control" id="inputValorPago">
            </div>
            <div class="form-group">
                <label for="inputLocacaoID">Locacao ID:</label>
                <input type="number" v-model="acompanhamento.locacao_id" class="form-control" id="inputLocacaoID" disabled>
            </div>
            </form>
            <button class="badge badge-success" @click="updateParcelamento">Salvar</button>
            <button class="badge badge-danger mr-2" @click="deleteParcelamento">Delete</button>
            <button class="badge badge-danger mr-2" @click="voltar">Voltar</button>


            <p>{{ message }}</p>

        </div>
        <div v-else>
            <br />
            <p>Please click on a Parcelamento...</p>
        </div>


    </div>
</template>
<script>

import ParcelamentoDataService from '../../services/ParcelamentoDataService'

export default {
    name: 'editParcelamento',
    data() {
        return {
            currentParcelamento: null,
            message: '',
            
        }
    },
    methods: {

        getParcelamento(id) {

            ParcelamentoDataService.get(id)
                .then(response => {
                    console.log(response.data);
                    this.currentParcelamento = response.data;

                })
                .catch(e => {
                    console.log(e);
                })
        },
        updateParcelamento() {
            alert(this.currentParcelamento.parcelamento);
            ParcelamentoDataService.update(this.currentParcelamento)
                .then(response => {
                    console.log('ParcelamentoDataService.update');
                    this.message = 'Parcelamento alterado com sucesso !';
                })
                .catch(e => {
                    console.log(e);
                })
        },
        deleteParcelamento() {

            ParcelamentoDataService.delete(this.currentParcelamento.id)
                .then(response => {
                    console.log(response.data);
                    this.$router.push({ name: "parcelamento-list" });
                })
                .catch(e => {
                    console.log(e);
                });
        },
        voltar() {
            this.$router.push({ name: "parcelamentos-list" });
        }
    },
    mounted() {

        this.message = '';
        this.getParcelamento(this.$route.params.id);
    }
}
</script>

<style scoped>
.edit-form {
    max-width: 300px;
    margin: auto;
}
</style>