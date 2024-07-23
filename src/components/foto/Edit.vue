<template>
    <div id="tab_aut">

        <div v-if="currentFoto" class="edit-form">
            <h3>Foto</h3>
            <form class="was-validated">
                <div class="md-3">
                    <label for="inputID">ID:</label>
                    <input type="text" v-model="currentFoto.id" class="form-control is-invalid" id="inputID"
                        placeholder="ID" disabled required>
                </div>
                <div class="md-3">
                    <label for="inputDescricao">Descricao:</label>
                    <input type="text" v-model="currentFoto.descricao" class="form-control is-invalid"
                        id="inputDescricao" placeholder="Descricao" required>
                </div>

                <div class="md-3">
                    <label for="inputB64">B64:</label>
                    <input type="text" v-model="currentFoto.b64" class="form-control is-invalid" id="inputB64"
                        placeholder="B64" required>
                </div>

                <div class="mb-3">
                    <label for="selectProduto">Produto:</label>
                    <select v-model="currentFoto.produto_id" class="form-control is-invalid" id="selectProduto">
                        <option v-for="p in produto_id" :key="p.id" v-bind:value="p">
                            {{ p.descricao }}
                        </option>
                    </select>

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
import ProdutoDataService from '../../services/ProdutoDataService';


export default {
    name: 'editfotos',
    data() {
        return {
            currentFoto: null,
            message: '',
            produto_id: []
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
        listProdutos() {

            ProdutoDataService.list().then(response => {

                console.log("Retorno do seviço ProdutoDataService.list", response.status);

                for (let p of response.data) {

                    this.produto_id.push(p);
                }

            }).catch(response => {

                // error callback
                alert('Não conectou no serviço ProdutoDataService.list');
                console.log(response);
            });
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
        this.listProdutos();
    }
}
</script>

<style scoped>
.edit-form {
    max-width: 300px;
    margin: auto;
}
</style>