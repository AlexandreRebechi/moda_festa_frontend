<template>
    <div id="tab_aut">

        <div v-if="currentJogador" class="edit-form">
            <h3>Jogador</h3>
            <form>
                <div class="form-group">
                    <label for="inputNickname">Nickname:</label>
                    <input type="text" v-model="jogador.nickname" class="form-control" id="inputNickname">
                </div>
                <div class="form-group">
                    <label for="inputSenha">Senha:</label>
                    <input type="password" v-model="jogador.senha" class="form-control" id="inputSenha">
                </div>
                <div class="form-group">
                    <label for="inputDescricao">descricao</label>
                    <input type="number" v-model="jogador.descricao" class="form-control" id="inputDescricao">
                </div>

                <div class="form-group">
                    <label for="selectFuncinalidade">Funcinalidade:</label>
                    <select v-model="perfil.funcinalidade" class="form-control" id="selectFuncinalidade" multiple>
                        <option v-for="f in funcinalidades" :key="f.id" v-bind:value="f">
                            {{ p.nome }}
                        </option>
                    </select>

                </div>
            </form>
            <button class="badge badge-success" @click="updatePerfil">Salvar</button>
            <button class="badge badge-danger mr-2" @click="deletePerfil">Delete</button>
            <button class="badge badge-danger mr-2" @click="voltar">Voltar</button>


            <p>{{ message }}</p>

        </div>
        <div v-else>
            <br />
            <p>Please click on a Perfil...</p>
        </div>


    </div>
</template>
<script>

import JogadorDataService from '../../services/JogadorDataService'
import PerfilDataService from '../../services/PerfilDataService'
import PatenteDataService from '../../services/PatenteDataService'
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
                    this.currentJogador = response.data;

                })
                .catch(e => {
                    console.log(e);
                })
        },
        listFuncionalidade() {

            FuncionalidadeDataService.list().then(response => {

                console.log("Retorno do seviço FuncionalidadeDataService.list", response.status);

                this.patentes = response.data;

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
        this.listPatentes();
        this.getJogador(this.$route.params.id);
    }
}
</script>

<style scoped>
.edit-form {
    max-width: 300px;
    margin: auto;
}
</style>