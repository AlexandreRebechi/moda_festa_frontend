<template>
    <div class="submit-form">
        <div v-if="!submitted">
            <form class="was-validated">
                <div class="mb-3">
                    <label for="inputID">ID:</label>
                    <input type="number" v-model="acompanhamento.id" class="form-control is-invalid" id="inputID" placeholder="ID"
                        disabled required>
                </div>
                <div class="mb-3">
                    <label for="inputSequenciaPasso">Sequencia Passo:</label>
                    <input type="number" v-model="acompanhamento.sequencia_passo" class="form-control is-invalid" id="inputSequenciaPasso" placeholder="Sequencia Passo" required>
                          
                </div>
                <div class="mb-3">
                    <label for="inputData">Data:</label>
                    <input type="date" v-model="acompanhamento.data" class="form-control is-invalid" id="inputData" placeholder="Data" required>
                    
                </div>
                <div class="mb-3">
                    <label for="inputObservacoes">Observacoes:</label>
                    <input type="text" v-model="acompanhamento.observacoes" class="form-control is-invalid" id="inputObservacoes" placeholder="Observacoes" required>
                    
                </div>
                <div class="mb-3">
                    <label for="inputLocacaoID">Locacao ID:</label>
                    <input type="number" v-model="acompanhamento.locacao_id" class="form-control is-invalid" id="inputLocacaoID" placeholder="Locacao ID"
                        disabled required>
                      
                </div>

                <div class="mb-3">
                    <label for="inputSitacaoID">Sitacao ID:</label>
                    <input type="number" v-model="acompanhamento.sitacao_id" class="form-control is-invalid" id="inputSitacaoID"  placeholder="Sitacao ID"
                        disabled required>
                       

                </div>

                
                <b-button @click="saveAcompanhamento" class="btn btn-success">Salvar</b-button>
                <router-link to="/acompanhamentos" class="btn btn-success">Voltar</router-link>

            </form>
        </div>

        <div v-else>
            <h4>Dados enviados com sucesso !</h4>
            <b-button class="btn btn-success" @click="newAcompanhamento">Novo</b-button>
            <router-link to="/acompanhamentos" class="btn btn-success">Voltar</router-link>
        </div>

    </div>
</template>

<script>

import AcompanhamentoDataService from '../../services/AcompanhamentoDataService';

export default {
    name: "addacompanhamento",
    data() {
        return {
            acompanhamento: {
                indice: '',
                id: 0,
                sequencia_passo: '',
                data: '',
                observacoes: '',
                locacao_id: '',
                sitacao_id: '',

            },
            submitted: false,

        }
    },
    methods: {

        saveAcompanhamento() {

            var agd = jQuery.extend({}, this.acompanhamento);//clona o this.novo_cliente e armazena na variavel cliente. dessa forma alteracoes em this.novo_cliente nao irao refletir em cliente.

            if (agd.username.trim().length > 0 && agd.password.trim().length > 0) {
                AcompanhamentoDataService.create(agd)
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
        newAcompanhamento() {

            this.submitted = false;
            this.acompanhamento = {};
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