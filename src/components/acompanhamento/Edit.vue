<template>
    <div id="tab_aut">

        <div v-if="currentAcompanhamento" class="edit-form">
            <h3>Acompanhamento</h3>
            <form>
                <div class="form-group">
                <label for="inputID">ID:</label>
                <input type="number" v-model="currentAcompanhamento.id" class="form-control" id="inputID" disabled>
            </div>
            <div class="form-group">
                <label for="inputSequenciaPasso">Sequencia Passo:</label>
                <input type="number" v-model="currentAcompanhamento.sequencia_passo" class="form-control" id="inputSequenciaPasso">
            </div>
            <div class="form-group">
                <label for="inputData">Data:</label>
                <input type="date" v-model="currentAcompanhamento.data" class="form-control" id="inputData">
            </div>
            <div class="form-group">
                <label for="inputObservacoes">Observacoes:</label>
                <input type="text" v-model="currentAcompanhamento.observacoes" class="form-control" id="inputObservacoes">
            </div>
            <div class="form-group">
                <label for="inputLocacaoID">Locacao ID:</label>
                <input type="number" v-model="currentAcompanhamento.locacao_id" class="form-control" id="inputLocacaoID" disabled>
            </div>

            <div class="form-group">
                <label for="inputSitacaoID">Sitacao ID:</label>
                <input type="number" v-model="currentAcompanhamento.sitacao_id" class="form-control" id="inputSitacaoID" disabled>
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


export default {
    name: 'editAcompanhamento',
    data() {
        return {
            currentAcompanhamento: null,
            message: '',
            
        }
    },
    methods: {

        getAcompanhamento(id) {

            AcompanhamentoDataService.get(id)
                .then(response => {
                    console.log(response.data);
                    this.currentAcompanhamento = response.data;

                })
                .catch(e => {
                    console.log(e);
                })
        },
        updateAcompanhamento() {
            alert(this.currentAcompanhamento.acompanhamento);
            AcompanhamentoDataService.update(this.currentAcompanhamento)
                .then(response => {
                    console.log('AcompanhamentoDataService.update');
                    this.message = 'Acompanhamento alterado com sucesso !';
                })
                .catch(e => {
                    console.log(e);
                })
        },
        deleteAcompanhamento() {

            AcompanhamentoDataService.delete(this.currentAcompanhamento.id)
                .then(response => {
                    console.log(response.data);
                    this.$router.push({ name: "acompanhamentos-list" });
                })
                .catch(e => {
                    console.log(e);
                });
        },
        voltar() {
            this.$router.push({ name: "acompanhamentos-list" });
        }
    },
    mounted() {

        this.message = '';
        this.getAcompanhamento(this.$route.params.id);
    }
}
</script>

<style scoped>
.edit-form {
    max-width: 300px;
    margin: auto;
}
</style>