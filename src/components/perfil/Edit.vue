<template>
    <div id="tab_aut">

        <div v-if="currentPerfil" class="edit-form">
            <h3>Perfil</h3>
            <form class="was-validated">
                <div class="mb-3">
                <label for="inputID">ID:</label>
                <input type="number" v-model="currentPerfil.id" class="form-control is-invalid" id="inputID" placeholder="ID" disabled required>
            </div>

            <div class="mb-3">
                <label for="inputDescricao">Descricao</label>
                <input type="text" v-model="currentPerfil.descricao" class="form-control is-invalid" id="inputDescricao" placeholder="Descricao" required>
            </div>

            <div class="mb-3">
                <label for="selectFuncinalidade">Funcinalidade:</label>
                <select v-model="currentPerfil.funcinalidades" class="form-control is-invalid" id="selectFuncinalidade" multiple required>
                    <option v-for="f in funcinalidades" :key="f.id" v-bind:value="f">
                        {{ f.descricao }}
                    </option>
                </select>

            </div>
            </form>
            <b-button class="badge badge-success" @click="updatePerfil">Salvar</b-button>
            <b-button class="badge badge-danger mr-2" @click="deletePerfil">Delete</b-button>
            <b-button class="badge badge-danger mr-2" @click="voltar">Voltar</b-button>


            <p>{{ message }}</p>

        </div>
        <div v-else>
            <br />
            <p>Please click on a Perfil...</p>
        </div>


    </div>
</template>
<script>

import PerfilDataService from '../../services/PerfilDataService'
import FuncionalidadeDataService from '../../services/FuncionalidadeDataService'
export default {
    name: 'editPefil',
    data() {
        return {
            currentPerfil: null,
            message: '',
            funcinalidades: []
        }
    },
    methods: {

        getPerfil(id) {

            PerfilDataService.get(id)
                .then(response => {
                    console.log(response.data);
                    this.currentPerfil = response.data;

                })
                .catch(e => {
                    console.log(e);
                })
        },
        listFuncionalidade() {

            FuncionalidadeDataService.list().then(response => {

                console.log("Retorno do seviço FuncionalidadeDataService.list", response.status);

                this.funcinalidades = response.data;

            }).catch(response => {

                // error callback
                alert('Não conectou no serviço FuncionalidadeDataService.list');
                console.log(response);
            });
        },
        updatePerfil() {
            alert(this.currentPerfil.funcinalidades);
            FuncionalidadeDataService.update(this.currentPerfil)
                .then(response => {
                    console.log('PerfilDataService.update');
                    this.message = 'Perfil alterado com sucesso !';
                })
                .catch(e => {
                    console.log(e);
                })
        },
        deletePerfil() {

            PerfilDataService.delete(this.currentPerfil.id)
                .then(response => {
                    console.log(response.data);
                    this.$router.push({ name: "perfis-list" });
                })
                .catch(e => {
                    console.log(e);
                });
        },
        voltar() {
            this.$router.push({ name: "perfis-list" });
        }
    },
    mounted() {

        this.message = '';
        this.listFuncionalidade();
        this.getPerfil(this.$route.params.id);
    }
}
</script>

<style scoped>
.edit-form {
    max-width: 300px;
    margin: auto;
}
</style>