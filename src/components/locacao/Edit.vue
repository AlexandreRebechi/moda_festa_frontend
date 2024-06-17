<template>
    <div id="tab_aut">

        <div v-if="currentLocacao" class="edit-form">
            <h3>Locação</h3>
            <form>
                <div class="form-group">
                <label for="inputID">ID:</label>
                <input type="number" v-model="currentLocacao.id" class="form-control" id="inputID" disabled>
            </div>

            <div class="form-group">
                <label for="inputDataRetirada">Data Retirada:</label>
                <input type="date" v-model="currentLocacao.data_retirada" class="form-control" id="inputDataRetirada">
            </div>
            
            <div class="form-group">
                <label for="inputDataPrevisaoEntrega">Data Previsao Entrega:</label>
                <input type="date" v-model="currentLocacao.data_previsao_entrega" class="form-control" id="inputDataPrevisaoEntrega">
            </div>
            <div class="form-group">
                <label for="inputDataEntrega">Data Entrega:</label>
                <input type="date" v-model="currentLocacao.data_entrega" class="form-control" id="inputDataEntrega">
            </div>
            <div class="form-group">
                <label for="inputDataPrevisaoPagamento">Data Previsao Pagamento:</label>
                <input type="date" v-model="currentLocacao.data_previsao_pagamento" class="form-control" id="inputDataPrevisaoPagamento">
            </div>
            <div class="form-group">
                <label for="inputValorTotal">Valor Total:</label>
                <input type="number" v-model="currentLocacao.valor_total" class="form-control" id="inputValorTotal">
            </div>
            <div class="form-group">
                <label for="inputValorPago">Valor Pago:</label>
                <input type="number" v-model="currentLocacao.valor_pago" class="form-control" id="inputValorPago">
            </div>
            <div class="form-group">
                <label for="inputValorObservacoes">Observações:</label>
                <input type="text" v-model="currentLocacao.observacoes" class="form-control" id="inputValorObservacoes">
            </div>
            <div class="form-group">
                <label for="inputFuncionario">Funcionario:</label>
                <input type="number" v-model="currentLocacao.funcionario" class="form-control" id="inputFuncionario">
            </div>
            <div class="form-group">
                <label for="inputTiposPagamento">Tipos Pagamento:</label>
                <input type="number" v-model="currentLocacao.tipos_pagamento" class="form-control" id="inputTiposPagamento">
            </div>
           
            <div class="form-group">
                <label for="selectLocacao">Reserva:</label>
                <select v-model="locacao.reservas" class="form-control" id="selectLocacao" multiple>
                    <option v-for="r in reservas" :key="r.id" v-bind:value="r">
                        {{ r.observacoes }}
                    </option>
                </select>

            </div>

            </form>
            <button class="badge badge-success" @click="updateReserva">Salvar</button>
            <button class="badge badge-danger mr-2" @click="deleteReserva">Delete</button>
            <button class="badge badge-danger mr-2" @click="voltar">Voltar</button>


            <p>{{ message }}</p>

        </div>
        <div v-else>
            <br />
            <p>Please click on a Reserva...</p>
        </div>


    </div>
</template>
<script>


import LocacaoDateService from '../../services/LocacaoDateService';
import ReservaDataService from '../../services/ReservaDataService'

export default {
    name: 'editLoacacao',
    data() {
        return {
            currentLocacao: null,
            message: '',
            reservas: []
        }
    },
    methods: {

        getLocacao(id) {

            LocacaoDateServiceeService.get(id)
                .then(response => {
                    console.log(response.data);
                    this.currentLocacao = response.data;

                })
                .catch(e => {
                    console.log(e);
                })
        },
        listReserva() {

            ReservaDataService.list().then(response => {

                console.log("Retorno do seviço ReservaDataService.list", response.status);

                this.reservas = response.data;

            }).catch(response => {

                // error callback
                alert('Não conectou no serviço ReservaDataService.list');
                console.log(response);
            });
        },
        updateLocacao() {
            alert(this.currentLocacao.reservas);
            LocacaoDateService.update(this.currentLocacao)
                .then(response => {
                    console.log('LocacaoDateService.update');
                    this.message = 'Locacão alterado com sucesso !';
                })
                .catch(e => {
                    console.log(e);
                })
        },
        deleteLocacao() {

            LocacaoDateService.delete(this.currentLocacao.id)
                .then(response => {
                    console.log(response.data);
                    this.$router.push({ name: "locacoes-list" });
                })
                .catch(e => {
                    console.log(e);
                });
        },
        voltar() {
            this.$router.push({ name: "locacoes-list" });
        }
    },
    mounted() {

        this.message = '';
        this.listReserva();
        this.getLocacao(this.$route.params.id);
    }
}
</script>

<style scoped>
.edit-form {
    max-width: 300px;
    margin: auto;
}
</style>