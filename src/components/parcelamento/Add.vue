<template>
 <div class="submit-form">
        <div v-if="!submitted">

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
                <input type="number" v-model="parcelamento.locacao_id" class="form-control" id="inputLocacaoID" disabled>
            </div>

            <button @click="saveParcelamento" class="btn btn-success">Salvar</button>
            <router-link to="/parcelamentos" class="btn btn-success">Voltar</router-link>

        </div>

        <div v-else>
            <h4>Dados enviados com sucesso !</h4>
            <button class="btn btn-success" @click="newParcelamento">Novo</button>
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