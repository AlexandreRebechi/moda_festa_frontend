<template>
    <div id="tab_aut">

        <div v-if="currentAcompanhamento" class="edit-form">
            <h3>Acompanhamento</h3>
            <form class="was-validated">
                <div class="mb-3">
                    <label for="inputID">ID:</label>
                    <input type="number" v-model="currentAcompanhamento.id" class="form-control is-invalid" id="inputID" placeholder="ID"
                        disabled required>
                </div>
                <div class="mb-3">
                    <label for="inputSequenciaPasso">Sequencia Passo:</label>
                    <input type="number" v-model="currentAcompanhamento.sequencia_passo" class="form-control is-invalid" id="inputSequenciaPasso" placeholder="Sequencia Passo" required>
                          
                </div>
                <div class="mb-3">
                    <label for="inputData">Data:</label>
                    <input type="date" v-model="currentAcompanhamento.data" class="form-control is-invalid" id="inputData" placeholder="Data" required>
                    
                </div>
                <div class="mb-3">
                    <label for="inputObservacoes">Observacoes:</label>
                    <input type="text" v-model="currentAcompanhamento.observacoes" class="form-control is-invalid" id="inputObservacoes" placeholder="Observacoes" required>
                    
                </div>
                <div class="mb-3">
                    <label for="inputLocacaoID">Locacao ID:</label>
                    <input type="number" v-model="currentAcompanhamento.locacao_id" class="form-control is-invalid" id="inputLocacaoID" placeholder="Locacao ID"
                        disabled required>
                      
                </div>

                <div class="mb-3">
                    <label for="inputSitacaoID">Sitacao ID:</label>
                    <input type="number" v-model="currentAcompanhamento.sitacao_id" class="form-control is-invalid" id="inputSitacaoID" placeholder="Sitacao ID"
                        disabled required>
                       

                </div>
            </form>
            <b-button class="badge badge-success" @click="updateAcompanhamento">Salvar</b-button>
            <b-button class="badge badge-danger mr-2" @click="deleteAcompanhamento">Delete</b-button>
            <b-button class="badge badge-danger mr-2" @click="voltar">Voltar</b-button>


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