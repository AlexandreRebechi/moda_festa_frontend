<template>
    <div class="submit-form">
        <div v-if="!submitted">
            <form class="was-validated">
            <div class="mb-3">
                <label for="inputID">ID:</label>
                <input type="number" v-model="locacao.id" class="form-control is-invalid is-invalid" id="inputID" placeholder="ID" disabled required>
            </div>

            <div class="mb-3">
                <label for="inputDataRetirada">Data Retirada:</label>
                <input type="date" v-model="locacao.data_retirada" class="form-control is-invalid is-invalid" id="inputDataRetirada" placeholder="Data Retirada" required>
            </div>
            
            <div class="mb-3">
                <label for="inputDataPrevisaoEntrega">Data Previsao Entrega:</label>
                <input type="date" v-model="locacao.data_previsao_entrega" class="form-control is-invalid" id="inputDataPrevisaoEntrega" placeholder="Data Previsao Entrega" required>
            </div>
            <div class="mb-3">
                <label for="inputDataEntrega">Data Entrega:</label>
                <input type="date" v-model="locacao.data_entrega" class="form-control is-invalid" id="inputDataEntrega" placeholder="Data Entrega" required>
            </div>
            <div class="mb-3">
                <label for="inputDataPrevisaoPagamento">Data Previsao Pagamento:</label>
                <input type="date" v-model="locacao.data_previsao_pagamento" class="form-control is-invalid" id="inputDataPrevisaoPagamento" placeholder="Data Previsao Pagamento" required>
            </div>
            <div class="mb-3">
                <label for="inputValorTotal">Valor Total:</label>
                <input type="number" v-model="locacao.valor_total" class="form-control is-invalid" id="inputValorTotal" placeholder="Valor Total" required>
            </div>
            <div class="mb-3">
                <label for="inputValorPago">Valor Pago:</label>
                <input type="number" v-model="locacao.valor_pago" class="form-control is-invalid" id="inputValorPago" placeholder="Valor Pago" required>
            </div>
            <div class="mb-3">
                <label for="inputValorObservacoes">Observações:</label>
                <input type="text" v-model="locacao.observacoes" class="form-control is-invalid" id="inputValorObservacoes" placeholder="Observacoes" required>
            </div>
            <div class="mb-3">
                <label for="inputFuncionario">Funcionario:</label>
                <input type="number" v-model="locacao.funcionario" class="form-control is-invalid" id="inputFuncionario" placeholder="Funcionario" required>
            </div>
            <div class="mb-3">
                <label for="inputTiposPagamento">Tipos Pagamento:</label>
                <input type="number" v-model="locacao.tipos_pagamento" class="form-control is-invalid" id="inputTiposPagamento" placeholder="Tipos Pagamento" required>
            </div>
           
            <div class="mb-3">
                <label for="selectReserva">Reserva:</label>
                <select v-model="locacao.reservas" class="form-control is-invalid" id="selectReserva" multiple required>
                    <option v-for="r in reservas" :key="r.id" v-bind:value="r">
                        {{ r.observacoes }}
                    </option>
                </select>

            </div>
        </form>
            <b-button @click="saveLocacao" class="btn btn-success">Salvar</b-button>
            <router-link to="/locacaos" class="btn btn-success">Voltar</router-link>

        </div>

        <div v-else>
            <h4>Dados enviados com sucesso !</h4>
            <b-button class="btn btn-success" @click="newLocacao">Novo</b-button>
            <router-link to="/locacaos" class="btn btn-success">Voltar</router-link>
        </div>
    </div>
</template>

<script>

import ReservaDataService from '../../services/ReservaDataService';



export default {
    name: "addLocacao",
    data() {
        return {
            locacao: {
                indice: '',
                    id: '',
                    data_retirada: '',
                    data_previsao_entrega: '',
                    data_entrega: '',
                    data_previsao_pagamento: '',
                    valor_total: 0,
                    valor_pago: 0,
                    observacoes: '',
                    funcionario: '',
                    tipos_pagamento: '',
                    reservas: []
            },
            submitted: false,
            reservas: []
        }
    },
    methods: {

        saveLocacao() {

            var L = jQuery.extend({}, this.locacao);//clona o this.novo_Locacao e armazena na variavel Locacao. dessa forma alteracoes em this.novo_Locacao nao irao refletir em Locacao.                                                              

            if (L.observacoes.trim().length > 0) {

                LocacaoDataService.create(L)
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
        newLocacao() {

            this.submitted = false;
            this.locacao = {};
        },
        listReservas() {

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
        }

    },
    mounted() {
        this.listReservas();

    }

}

</script>

<style>
.submit-form {
    max-width: 300px;
    margin: auto;
}
</style>