<template>
    <div id="tab_aut">

        <div v-if="currentParcelamento" class="edit-form">
            <h3>Parcelamento</h3>
            <form class="was-validated">
            <div class="mb-3">
                <label for="inputID">ID:</label>
                <input type="number" v-model="currentParcelamento.id" class="form-control is-invalid" id="inputID" placeholder="ID" disabled required>
            </div>
            <div class="mb-3">
                <label for="inputNumeroParcela">Numero Parcela:</label>
                <input type="number" v-model="currentParcelamento.numero_parcela" class="form-control is-invalid" id="inputNumeroParcela" placeholder="Numero Parcela" required>
            </div>
            <div class="mb-3">
                <label for="inputDataPrevisaoPagamento">Data de Previsão de Pagamento:</label>
                <input type="date" v-model="currentParcelamento.data_previsao_pagamento" class="form-control is-invalid" id="inputDataPrevisaoPagamento" placeholder="Data de Previsão de Pagamento" required>
            </div>
            <div class="mb-3">
                <label for="inputDataPagamento">Data Pagamento:</label>
                <input type="date" v-model="currentParcelamento.data_pagamento" class="form-control is-invalid" id="inputDataPagamento" placeholder="Data Pagamento" required>
            </div>
            <div class="mb-3">
                <label for="inputValorTotal">Valor Total:</label>
                <input type="number" v-model="currentParcelamento.valor_total" class="form-control is-invalid" id="inputValorTotal" placeholder="Valor Total" required>
            </div>
            <div class="mb-3">
                <label for="inputValorPago">Valor Pago:</label>
                <input type="number" v-model="currentParcelamento.valor_pago" class="form-control is-invalid" id="inputValorPago" placeholder="Valor Pago" required>
            </div>
            <div class="mb-3">
                <label for="inputLocacaoID">Locacao ID:</label>
                <input type="number" v-model="currentParcelamento.locacao_id" class="form-control is-invalid" id="inputLocacaoID" placeholder="Locacao ID" required>
            </div>
        </form>
            <b-button class="badge badge-success" @click="updateParcelamento">Salvar</b-button>
            <b-button class="badge badge-danger mr-2" @click="deleteParcelamento">Delete</b-button>
            <b-button class="badge badge-danger mr-2" @click="voltar">Voltar</b-button>


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