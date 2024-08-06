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
                    <select v-model="acompanhamento.id_locacao" class="form-control is-invalid" id="selectLocacaoID"
                        >
                        <option v-for="l in id_locacao" v-bind:key="l.id" v-bind:value="l">
                            {{ l.observacoes }}
                        </option>
                    </select>

                </div>
                <div class="mb-3">
                    <label for="selectSituacaoID">Situacao ID:</label>
                    <select v-model="acompanhamento.id_situacao" class="form-control is-invalid" id="selectSituacaoID"
                        >
                        <option v-for="s in id_situacao" v-bind:key="s.id" v-bind:value="s">
                            {{ s.descricao }}
                        </option>
                    </select>

                </div>
            </form>
                <button @click="saveAcompanhamento" class="btn btn-success">Salvar</button>
                <router-link to="/acompanhamentos" class="btn btn-success">Voltar</router-link>

            
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
                id_locacao: [],
                id_situacao: [],

            },
            submitted: false,
            id_locacao: [],
            id_situacao: [],

        }
    },
    methods: {

        saveAcompanhamento() {

            var agd = jQuery.extend({}, this.acompanhamento);//clona o this.novo_cliente e armazena na variavel cliente. dessa forma alteracoes em this.novo_cliente nao irao refletir em cliente.

            if (agd.observacoes.trim().length > 0) {
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

                    this.id_locacao.push(l);
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

                    this.id_situacao.push(s);
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