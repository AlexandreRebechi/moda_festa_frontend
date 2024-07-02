<template>
 <div class="submit-form">
        <div v-if="!submitted">
    <form class="was-validated">
            <div class="mb-3">
                <label for="inputID">ID:</label>
                <input type="number" v-model="parcelamento.id" class="form-control is-invalid" id="inputID" placeholder="ID" disabled required>
            </div>
            <div class="mb-3">
                <label for="inputNumeroParcela">Numero Parcela:</label>
                <input type="number" v-model="parcelamento.numero_parcela" class="form-control is-invalid" id="inputNumeroParcela" placeholder="Numero Parcela" required>
            </div>
            <div class="mb-3">
                <label for="inputDataPrevisaoPagamento">Data de Previsão de Pagamento:</label>
                <input type="date" v-model="parcelamento.data_previsao_pagamento" class="form-control is-invalid" id="inputDataPrevisaoPagamento" placeholder="Data de Previsão de Pagamento" required>
            </div>
            <div class="mb-3">
                <label for="inputDataPagamento">Data Pagamento:</label>
                <input type="date" v-model="parcelamento.data_pagamento" class="form-control is-invalid" id="inputDataPagamento" placeholder="Data Pagamento" required>
            </div>
            <div class="mb-3">
                <label for="inputValorTotal">Valor Total:</label>
                <input type="number" v-model="parcelamento.valor_total" class="form-control is-invalid" id="inputValorTotal" placeholder="Valor Total" required>
            </div>
            <div class="mb-3">
                <label for="inputValorPago">Valor Pago:</label>
                <input type="number" v-model="parcelamento.valor_pago" class="form-control is-invalid" id="inputValorPago" placeholder="Valor Pago" required>
            </div>
            <div class="mb-3">
                <label for="inputLocacaoID">Locacao ID:</label>
                <input type="number" v-model="parcelamento.locacao_id" class="form-control is-invalid" id="inputLocacaoID" placeholder="Locacao ID" required>
            </div>
        </form>
            <b-button @click="saveParcelamento" class="btn btn-success">Salvar</b-button>
            <router-link to="/parcelamentos" class="btn btn-success">Voltar</router-link>

        </div>

        <div v-else>
            <h4>Dados enviados com sucesso !</h4>
            <b-button class="btn btn-success" @click="newParcelamento">Novo</b-button>
            <router-link to="/parcelamentos" class="btn btn-success">Voltar</router-link>
        </div>
    </div>
</template>

<script>
import ParcelamentoDataService from '../../services/ParcelamentoDataService'


export default {
    name: "addparcelamento",
    data() {
        return {
            parcelamento: {indice: '',
                                id: 0,
                                numero_parcela: '',
                                data_previsao_pagamento: '',
                                data_pagamento: '',
                                valor_total: '',
                                valor_pago: '',
                                locacao_id: ''
                               
            },
            submitted: false,

        }
    },
    methods: {

        saveParcelamento() {

            var par = jQuery.extend({}, this.parcelamento);//clona o this.novo_cliente e armazena na variavel cliente. dessa forma alteracoes em this.novo_cliente nao irao refletir em cliente.

            if (par.id.trim().length > 0) {
                ParcelamentoDataService.create(par)
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
        newParcelamento() {

            this.submitted = false;
            this.parcelamento = {};
        },
    

    },
    mounted() {
      

    }

}
</script>

<style>
.submit-form {
    max-width: 300px;
    margin: auto;
}
</style>