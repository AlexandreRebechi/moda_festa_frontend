<template>
    <div class="submit-form">
        <div v-if="!submitted">
            <div class="form-group">
                <label for="inputID">ID:</label>
                <input type="number" v-model="locacao.id" class="form-control" id="inputID" disabled>
            </div>

            <div class="form-group">
                <label for="inputDataRetirada">Data Retirada:</label>
                <input type="date" v-model="locacao.data_retirada" class="form-control" id="inputDataRetirada">
            </div>
            
            <div class="form-group">
                <label for="inputDataPrevisaoEntrega">Data Previsao Entrega:</label>
                <input type="date" v-model="locacao.data_previsao_entrega" class="form-control" id="inputDataPrevisaoEntrega">
            </div>
            <div class="form-group">
                <label for="inputDataEntrega">Data Entrega:</label>
                <input type="date" v-model="locacao.data_entrega" class="form-control" id="inputDataEntrega">
            </div>
            <div class="form-group">
                <label for="inputDataPrevisaoPagamento">Data Previsao Pagamento:</label>
                <input type="date" v-model="locacao.data_previsao_pagamento" class="form-control" id="inputDataPrevisaoPagamento">
            </div>
            <div class="form-group">
                <label for="inputValorTotal">Valor Total:</label>
                <input type="number" v-model="locacao.valor_total" class="form-control" id="inputValorTotal">
            </div>
            <div class="form-group">
                <label for="inputValorPago">Valor Pago:</label>
                <input type="number" v-model="locacao.valor_pago" class="form-control" id="inputValorPago">
            </div>
            <div class="form-group">
                <label for="inputValorObservacoes">Observações:</label>
                <input type="text" v-model="locacao.observacoes" class="form-control" id="inputValorObservacoes">
            </div>
            <div class="form-group">
                <label for="inputFuncionario">Funcionario:</label>
                <input type="number" v-model="locacao.funcionario" class="form-control" id="inputFuncionario">
            </div>
            <div class="form-group">
                <label for="inputTiposPagamento">Tipos Pagamento:</label>
                <input type="number" v-model="locacao.tipos_pagamento" class="form-control" id="inputTiposPagamento">
            </div>
           
            <div class="form-group">
                <label for="selectReserva">Reserva:</label>
                <select v-model="locacao.reservas" class="form-control" id="selectReserva" multiple>
                    <option v-for="r in reservas" :key="r.id" v-bind:value="r">
                        {{ r.observacoes }}
                    </option>
                </select>

            </div>

            <button @click="saveLocacao" class="btn btn-success">Salvar</button>
            <router-link to="/locacaos" class="btn btn-success">Voltar</router-link>

        </div>

        <div v-else>
            <h4>Dados enviados com sucesso !</h4>
            <button class="btn btn-success" @click="newLocacao">Novo</button>
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