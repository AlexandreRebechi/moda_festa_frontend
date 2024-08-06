<template>
    <div id="tab_aut">

        <div v-if="currentLocacao" class="edit-form">
            <h3>Locação</h3>
            <form class="was-validated">
                <div class="mb-3">
                    <label for="inputID">ID:</label>
                    <input type="number" v-model="currentLocacao.id" class="form-control is-invalid is-invalid" id="inputID"
                        placeholder="ID" disabled required>
                </div>

                <div class="mb-3">
                    <label for="inputDataRetirada">Data Retirada:</label>
                    <input type="date" v-model="currentLocacao.data_retirada" class="form-control is-invalid is-invalid"
                        id="inputDataRetirada" placeholder="Data Retirada" required>
                </div>

                <div class="mb-3">
                    <label for="inputDataPrevisaoEntrega">Data Previsao Entrega:</label>
                    <input type="date" v-model="currentLocacao.data_previsao_entrega" class="form-control is-invalid"
                        id="inputDataPrevisaoEntrega" placeholder="Data Previsao Entrega" required>
                </div>
                <div class="mb-3">
                    <label for="inputDataEntrega">Data Entrega:</label>
                    <input type="date" v-model="currentLocacao.data_entrega" class="form-control is-invalid"
                        id="inputDataEntrega" placeholder="Data Entrega" required>
                </div>
                <div class="mb-3">
                    <label for="inputDataPrevisaoPagamento">Data Previsao Pagamento:</label>
                    <input type="date" v-model="currentLocacao.data_previsao_pagamento" class="form-control is-invalid"
                        id="inputDataPrevisaoPagamento" placeholder="Data Previsao Pagamento" required>
                </div>
                <div class="mb-3">
                    <label for="inputValorTotal">Valor Total:</label>
                    <input type="number" v-model="currentLocacao.valor_total" class="form-control is-invalid"
                        id="inputValorTotal" placeholder="Valor Total" required>
                </div>
                <div class="mb-3">
                    <label for="inputValorPago">Valor Pago:</label>
                    <input type="number" v-model="currentLocacao.valor_pago" class="form-control is-invalid"
                        id="inputValorPago" placeholder="Valor Pago" required>
                </div>
                <div class="mb-3">
                    <label for="inputValorObservacoes">Observações:</label>
                    <input type="text" v-model="currentLocacao.observacoes" class="form-control is-invalid"
                        id="inputValorObservacoes" placeholder="Observacoes" required>
                </div>

                <div class="mb-3">
                    <label for="selectFuncionario">Funcionario:</label>
                    <select v-model="currentLocacao.funcionario" class="form-control is-invalid" id="selectFuncionario">
                        <option v-for="f in funcionario" v-bind:key="f.cpf" v-bind:value="f.cpf">
                            {{ f.nome }}
                        </option>
                    </select>

                </div>
                <div class="mb-3">
                    <label for="selectTiposPagamento">Tipos Pagamento:</label>
                    <select v-model="currentLocacao.tipos_pagamento" class="form-control is-invalid"
                        id="selectTiposPagamento">
                        <option value="NA_RETIRADA">NA_RETIRADA</option>
                        <option value="ENTREGA_DEVOLUCAO">ENTREGA_DEVOLUCAO</option>
                        <option value="PARCELADO">PARCELADO</option>
                    </select>

                </div>
                <div class="mb-3">
                    <label for="selectReserva">Reserva:</label>
                    <select v-model="currentLocacao.reservas" class="form-control is-invalid" id="selectReserva" required multiple>
                        <option v-for="r in reservas" v-bind:key="r.id" v-bind:value="r.id">
                            {{ r.observacoes }}
                        </option>
                    </select>

                </div>

            </form>
            <button class="badge badge-success" @click="updateLocacao">Salvar</button>
            <button class="badge badge-danger mr-2" @click="deleteLocacao">Delete</button>
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


import ReservaDataService from '../../services/ReservaDataService'
import LocacaoDateService from '../../services/LocacaoDateService'
import FuncionarioDataService from '../../services/FuncionarioDataService'
export default {
    name: 'editloacacao',
    data() {
        return {
            currentLocacao: null,
            message: '',
            reservas: [],
            funcionario: []
        }
    },
    methods: {

        getLocacao(id) {

            LocacaoDateService.get(id)
                .then(response => {

                    this.currentLocacao = response.data;
                    console.log(response.data.data_retirada);
                })
                .catch(e => {
                    console.log(e);
                })
        },
        listReserva() {

            ReservaDataService.list().then(response => {

                console.log("Retorno do seviço ReservaDataService.list", response.status);
                for (let r of response.data) {

                    this.reservas.push(r);
                }

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
                alert('Não conectou no serviço FuncionarioDataService.list');
                console.log(response);
            });
        },
        updateLocacao() {
     
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
        this.listFuncionario();
        this.getLocacao(this.$route.params.id);

    }
}
</script>

<style scoped>.edit-form {
    max-width: 300px;
    margin: auto;
}</style>