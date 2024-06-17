<template>
    <div id="tab_aut">

        <div v-if="currentFoto" class="edit-form">
            <h3>Foto</h3>
            <form>
                <div class="form-group">
                    <label for="inputId">ID:</label>
                    <input type="number" v-model="currentFoto.id" class="form-control" id="inputId" disabled>
                </div>
                <div class="form-group">
                    <label for="inputDescricao">Descricao:</label>
                    <input type="text" v-model="currentFoto.descricao" class="form-control" id="inputDescricao">
                </div>
                <div class="form-group">
                    <label for="inputB64">B64:</label>
                    <input type="text" v-model="currentFoto.b64" class="form-control" id="inputB64">
                </div>

            </form>
            <button class="badge badge-success" @click="updateFoto">Salvar</button>
            <button class="badge badge-danger mr-2" @click="deleteFoto">Delete</button>
            <button class="badge badge-danger mr-2" @click="voltar">Voltar</button>


            <p>{{ message }}</p>

        </div>
        <div v-else>
            <br />
            <p>Please click on a foto...</p>
        </div>


    </div>
</template>
<script>

import FotoDataService from '../../services/FotoDataService';


export default {
    name: 'editFotos',
    data() {
        return {
            currentFoto: null,
            message: ''
        }
    },
    methods: {

        getFoto(id) {

            FotoDataService.get(id)
                .then(response => {
                    console.log(response.data);
                    this.currentFoto = response.data;

                })
                .catch(e => {
                    console.log(e);
                })
        },
        updateFoto() {

            FotoDataService.update(this.currentFoto)
                .then(response => {
                    console.log('FotoDataService.update');
                    this.message = 'Foto alterada com sucesso !';
                })
                .catch(e => {
                    console.log(e);
                })
        },
        deleteFoto() {

            FotoDataService.delete(this.currentFoto.id)
                .then(response => {
                    console.log(response.data);
                    this.$router.push({ name: "fotos-list" });
                })
                .catch(e => {
                    console.log(e);
                });
        },
        voltar() {
            this.$router.push({ name: "fotos-list" });
        }
    },
    mounted() {

        this.message = '';
        this.getFoto(this.$route.params.id);
    }
}
</script>

<style scoped>
.edit-form {
    max-width: 300px;
    margin: auto;
}
</style>