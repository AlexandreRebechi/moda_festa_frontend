<template>
    <div id="tab_aut">

        <div v-if="currentcurrentLocacao" class="edit-form">
            <h3>Locação</h3>
            <form class="was-validated">
                <div class="mb-3">
                <label for="inputID">ID:</label>
                <input type="number" v-model="currentLocacao.id" class="form-control is-invalid is-invalid" id="inputID" placeholder="ID" disabled required>
            </div>

            <div class="mb-3">
                <label for="inputDataRetirada">Data Retirada:</label>
                <input type="date" v-model="currentLocacao.data_retirada" class="form-control is-invalid is-invalid" id="inputDataRetirada" placeholder="Data Retirada" required>
            </div>
            
            <div class="mb-3">
                <label for="inputDataPrevisaoEntrega">Data Previsao Entrega:</label>
                <input type="date" v-model="currentLocacao.data_previsao_entrega" class="form-control is-invalid" id="inputDataPrevisaoEntrega" placeholder="Data Previsao Entrega" required>
            </div>
            <div class="mb-3">
                <label for="inputDataEntrega">Data Entrega:</label>
                <input type="date" v-model="currentLocacao.data_entrega" class="form-control is-invalid" id="inputDataEntrega" placeholder="Data Entrega" required>
            </div>
            <div class="mb-3">
                <label for="inputDataPrevisaoPagamento">Data Previsao Pagamento:</label>
                <input type="date" v-model="currentLocacao.data_previsao_pagamento" class="form-control is-invalid" id="inputDataPrevisaoPagamento" placeholder="Data Previsao Pagamento" required>
            </div>
            <div class="mb-3">
                <label for="inputValorTotal">Valor Total:</label>
                <input type="number" v-model="currentLocacao.valor_total" class="form-control is-invalid" id="inputValorTotal" placeholder="Valor Total" required>
            </div>
            <div class="mb-3">
                <label for="inputValorPago">Valor Pago:</label>
                <input type="number" v-model="currentLocacao.valor_pago" class="form-control is-invalid" id="inputValorPago" placeholder="Valor Pago" required>
            </div>
            <div class="mb-3">
                <label for="inputValorObservacoes">Observações:</label>
                <input type="text" v-model="currentLocacao.observacoes" class="form-control is-invalid" id="inputValorObservacoes" placeholder="Observacoes" required>
            </div>
            
            <div class="mb-3">
                    <label for="selectFuncionario">Funcionario:</label>
                    <select v-model="currentLocacao.funcionario" class="form-control is-invalid" id="selectFuncionario"
                        multiple>
                        <option v-for="f in funcionario" :key="f.cpf_pessoa" v-bind:value="f">
                            {{ f.nome }}
                        </option>
                    </select>

                </div>
            <div class="mb-3">
                    <label for="selectTiposPagamento">Tipos Pagamento:</label>
                    <select v-model="currentLocacao.tipos_pagamento" class="form-control is-invalid" id="selectTiposPagamento"
                        multiple>
                            <option value="NA_RETIRADA">NA_RETIRADA</option>
                            <option value="ENTREGA_DEVOLUCAO">ENTREGA_DEVOLUCAO</option>
                            <option value="PARCELADO">PARCELADO</option>
                    </select>

                </div>
            <div class="mb-3">
                <label for="selectReserva">Reserva:</label>
                <select v-model="currentLocacao.reservas" class="form-control is-invalid" id="selectReserva" multiple required>
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


import currentLocacaoDateService from '../../services/LocacaoDateService';
import ReservaDataService from '../../services/ReservaDataService'

export default {
    name: 'editLoacacao',
    data() {
        return {
            currentcurrentLocacao: null,
            message: '',
            reservas: []
        }
    },
    methods: {

        getcurrentLocacao(id) {

            currentLocacaoDateServiceeService.get(id)
                .then(response => {
                    console.log(response.data);
                    this.currentcurrentLocacao = response.data;

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
        listFuncionario() {
            FuncionarioDataService.list().then(response => {

                console.log("Retorno do seviço FuncionarioDataService.list", response.status);

                for (let f of response.data) {

                    this.funcionario.push(f);
                }
            }).catch(response => {

                // error callback
                alert('Não conectou no serviço ProdutoDataService.list');
                console.log(response);
            });
        },
        updatecurrentLocacao() {
            alert(this.currentcurrentLocacao.reservas);
            currentLocacaoDateService.update(this.currentcurrentLocacao)
                .then(response => {
                    console.log('currentLocacaoDateService.update');
                    this.message = 'Locacão alterado com sucesso !';
                })
                .catch(e => {
                    console.log(e);
                })
        },
        deletecurrentLocacao() {

            currentLocacaoDateService.delete(this.currentcurrentLocacao.id)
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
        this.getcurrentLocacao(this.$route.params.id);
        this.listFuncionario();
    }
}
</script>

<style scoped>
.edit-form {
    max-width: 300px;
    margin: auto;
}
</style>