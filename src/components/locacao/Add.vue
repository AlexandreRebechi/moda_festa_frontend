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
                    <label for="selectFuncionario">Funcionario:</label>
                    <select v-model="locacao.funcionario" class="form-control is-invalid" id="selectFuncionario"
                        >
                        <option v-for="f in funcionario" :key="f.cpf_pessoa" v-bind:value="f">
                            {{ f.nome }}
                        </option>
                    </select>

                </div>
         
            <div class="mb-3">
                    <label for="selectTiposPagamento">Tipos Pagamento:</label>
                    <select v-model="locacao.tipos_pagamento" class="form-control is-invalid" id="selectTiposPagamento"
                        >
                            <option value="NA_RETIRADA">NA_RETIRADA</option>
                            <option value="ENTRADA_DEVOLUCAO">ENTRADA_DEVOLUCAO</option>
                            <option value="PARCELADO">PARCELADO</option>
                    </select>

                </div>
            <div class="mb-3">
                <label for="selectReserva">Reserva:</label>
                <select v-model="locacao.reservas" class="form-control is-invalid" id="selectReserva"  required>
                    <option v-for="r in reservas" :key="r.id" v-bind:value="r">
                        {{ r.observacoes }}
                    </option>
                </select>

            </div>
        </form>
            <button @click="saveLocacao" class="btn btn-success">Salvar</button>
            <router-link to="/locacoes" class="btn btn-success">Voltar</router-link>

        </div>

        <div v-else>
            <h4>Dados enviados com sucesso !</h4>
            <button class="btn btn-success" @click="newLocacao">Novo</button>
            <router-link to="/locacoes" class="btn btn-success">Voltar</router-link>
        </div>
    </div>
</template>

<script>

import FuncionarioDataService from '../../services/FuncionarioDataService';
import ReservaDataService from '../../services/ReservaDataService';
import LocacaoDateService from '../../services/LocacaoDateService';


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
                    funcionario: [],
                    tipos_pagamento: [],
                    reservas: []
            },
            submitted: false,
            reservas: [],
            funcionario: []
        }
    },
    methods: {

        saveLocacao() {

            var L = jQuery.extend({}, this.locacao);//clona o this.novo_Locacao e armazena na variavel Locacao. dessa forma alteracoes em this.novo_Locacao nao irao refletir em Locacao.                                                              

            if (L.observacoes.trim().length > 0) {

                LocacaoDateService.create(L)
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
        this.listFuncionario();
    }

}

</script>

<style>
.submit-form {
    max-width: 300px;
    margin: auto;
}
</style>