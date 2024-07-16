<template>
    <div class="submit-form">
        <div v-if="!submitted">
            <form class="was-validated">
                <div class="mb-3">
                    <label for="inputID">ID:</label>
                    <input type="number" v-model="acompanhamento.id" class="form-control is-invalid" id="inputID"
                        placeholder="ID" disabled required>
                </div>
                <div class="mb-3">
                    <label for="inputSequenciaPasso">Sequencia Passo:</label>
                    <input type="number" v-model="acompanhamento.sequencia_passo" class="form-control is-invalid"
                        id="inputSequenciaPasso" placeholder="Sequencia Passo" required>

                </div>
                <div class="mb-3">
                    <label for="inputData">Data:</label>
                    <input type="date" v-model="acompanhamento.data" class="form-control is-invalid" id="inputData"
                        placeholder="Data" required>

                </div>
                <div class="mb-3">
                    <label for="inputObservacoes">Observacoes:</label>
                    <input type="text" v-model="acompanhamento.observacoes" class="form-control is-invalid"
                        id="inputObservacoes" placeholder="Observacoes" required>

                </div>
                <div class="mb-3">
                    <label for="selectLocacaoID">Locacao ID:</label>
                    <select v-model="acompanhamento.locacao_id" class="form-control is-invalid" id="selectLocacaoID"
                        multiple>
                        <option v-for="l in locacao_id" :key="l.id" v-bind:value="l">
                            {{ l.observacoes }}
                        </option>
                    </select>

                </div>
                <div class="mb-3">
                    <label for="selectLocacaoID">Situacao ID:</label>
                    <select v-model="acompanhamento.situacao_id" class="form-control is-invalid" id="selectLocacaoID"
                        multiple>
                        <option v-for="s in locacao_id" :key="s.id" v-bind:value="s">
                            {{ s.descricao }}
                        </option>
                    </select>

                </div>

                <button @click="saveAcompanhamento" class="btn btn-success">Salvar</button>
                <router-link to="/acompanhamentos" class="btn btn-success">Voltar</router-link>

            </form>
        </div>

        <div v-else>
            <h4>Dados enviados com sucesso !</h4>
            <button class="btn btn-success" @click="newAcompanhamento">Novo</button>
            <router-link to="/acompanhamentos" class="btn btn-success">Voltar</router-link>
        </div>

    </div>
</template>

<script>

import AcompanhamentoDataService from '../../services/AcompanhamentoDataService';
import LocacaoDateService from '../../services/LocacaoDateService';
import SituacaoDataService from '../../services/SituacaoDataService';

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
                locacao_id: [],
                situacao_id: [],

            },
            submitted: false,
            locacao_id: [],
            situacao_id: [],

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
        listLocacao() {
            LocacaoDateService.list().then(response => {

                console.log("Retorno do seviço LocacaoDateService.list", response.status);

                for (let l of response.data) {

                    this.locacao_id.push(l);
                }
            }).catch(response => {

                // error callback
                alert('Não conectou no serviço LocacaoDateService.list');
                console.log(response);
            });

        },
        listSituacao() {
            SituacaoDataService.list().then(response => {

                console.log("Retorno do seviço SituacaoDataService.list", response.status);

                for (let s of response.data) {

                    this.situacao_id.push(s);
                }
            }).catch(response => {

                // error callback
                alert('Não conectou no serviço SituacaoDataService.list');
                console.log(response);
            });
        },
        newAcompanhamento() {

            this.submitted = false;
            this.acompanhamento = {};
        },


    },
    mounted() {
        this.listLocacao();
        this.listSituacao();

    }

}

</script>

<style>
.submit-form {
    max-width: 300px;
    margin: auto;
}
</style>