<template>
    <div id="tab_aut">

        <div v-if="currentAcompanhamento" class="edit-form">
            <h3>Acompanhamento</h3>
            <form class="was-validated">
                <div class="mb-3">
                    <label for="inputID">ID:</label>
                    <input type="number" v-model="currentAcompanhamento.id" class="form-control is-invalid" id="inputID"
                        placeholder="ID" disabled  required>
                    
                </div>
                <div class="mb-3">
                    <label for="inputSequenciaPasso">Sequencia Passo:</label>
                    <input type="number" v-model="currentAcompanhamento.sequencia_passo" class="form-control is-invalid"
                        id="inputSequenciaPasso" placeholder="Sequencia Passo" required>

                </div>
                <div class="mb-3">
                    <label for="inputData">Data:</label>
                    <input type="date" v-model="currentAcompanhamento.data" class="form-control is-invalid" id="inputData"
                        placeholder="Data" required>

                </div>
                <div class="mb-3">
                    <label for="inputObservacoes">Observacoes:</label>
                    <input type="text" v-model="currentAcompanhamento.observacoes" class="form-control is-invalid"
                        id="inputObservacoes" placeholder="Observacoes" required>

                </div>
                <div class="mb-3">
                    <label for="selectLocacaoID">Locacao ID:</label>
                    <select v-model="currentAcompanhamento.id_locacao" class="form-control is-invalid" id="selectLocacaoID"
                        >
                        <option v-for="l in id_locacao" :key="l.id" v-bind:value="l">
                            {{ l.observacoes }}
                        </option>
                    </select>

                </div>
                <div class="mb-3">
                    <label for="selectSituacaoID">Situacao ID:</label>
                    <select v-model="currentAcompanhamento.id_situacao" class="form-control is-invalid" id="selectSituacaoID"
                        >
                        <option v-for="s in id_situacao" :key="s.id" v-bind:value="s">
                            {{ s.descricao }}
                        </option>
                    </select>

                </div>
            </form>
            <button class="badge badge-success" @click="updateAcompanhamento">Salvar</button>
            <button class="badge badge-danger mr-2" @click="deleteAcompanhamento">Delete</button>
            <button class="badge badge-danger mr-2" @click="voltar">Voltar</button>


            <p>{{ message }}</p>

        </div>
        <div v-else>
            <br />
            <p>Please click on a Acompanhamento...</p>
        </div>


    </div>
</template>
<script>

import AcompanhamentoDataService from '../../services/AcompanhamentoDataService';
import LocacaoDateService from '../../services/LocacaoDateService';
import SituacaoDataService from '../../services/SituacaoDataService';


export default {
    name: 'editAcompanhamento',
    data() {
        return {
            currentAcompanhamento: null,
            message: '',
            id_locacao: [],
            id_situacao: []
        }
    },
    methods: {

        getAcompanhamento(id) {
      
            AcompanhamentoDataService.get(id)
                .then(response => {
                    console.log('response.data: '+ response.data);
                    this.currentAcompanhamento = response.data;
                    
                })
                .catch(e => {
                    console.log(e);
                })
        },
        updateAcompanhamento() {
            alert(this.currentAcompanhamento.id);
            this.currentAcompanhamento.sequencia_passo = 1
            this.currentAcompanhamento.id = 8
            
            AcompanhamentoDataService.update(this.currentAcompanhamento)
                .then(response => {
                    console.log('AcompanhamentoDataService.update');
                    this.message = 'Acompanhamento alterado com sucesso !';
                })
                .catch(e => {
                    console.log(e);
                })
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
        deleteAcompanhamento() {

            AcompanhamentoDataService.delete(this.currentAcompanhamento.id)
                .then(response => {
                    console.log(response.data);
                    this.$router.push({ name: "acompanhamento-list" });
                })
                .catch(e => {
                    console.log(e);
                });
        },
        voltar() {
            this.$router.push({ name: "acompanhamento-list" });
        }
    },
    mounted() {

        this.message = '';
        
        this.getAcompanhamento(this.$route.params.id);
        this.listLocacao();
        this.listSituacao();
    }
}
</script>

<style scoped>
.edit-form {
    max-width: 300px;
    margin: auto;
}
</style>