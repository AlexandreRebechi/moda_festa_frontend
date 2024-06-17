<template>
    <div class="submit-form">
        <div v-if="!submitted">
            <div class="form-group">
                <label for="inputID">ID:</label>
                <input type="number" v-model="perfil.id" class="form-control" id="inputID" disabled>
            </div>

            <div class="form-group">
                <label for="inputDescricao">descricao</label>
                <input type="text" v-model="perfil.descricao" class="form-control" id="inputDescricao">
            </div>

            <div class="form-group">
                <label for="selectFuncinalidade">Funcinalidade:</label>
                <select v-model="perfil.funcinalidades" class="form-control" id="selectFuncinalidade" multiple>
                    <option v-for="f in funcinalidades" :key="f.id" v-bind:value="f">
                        {{ f.descricao }}
                    </option>
                </select>

            </div>

            <button @click="savePerfil" class="btn btn-success">Salvar</button>
            <router-link to="/perfis" class="btn btn-success">Voltar</router-link>

        </div>

        <div v-else>
            <h4>Dados enviados com sucesso !</h4>
            <button class="btn btn-success" @click="newPerfil">Novo</button>
            <router-link to="/perfis" class="btn btn-success">Voltar</router-link>
        </div>
    </div>
</template>

<script>
import PerfilDataService from '../../services/PerfilDataService';
import FuncionalidadeDataService from '../../services/FuncionalidadeDataService';


export default {
    name: "addPerfil",
    data() {
        return {
            perfil: {
                indice: '',
                id: '',
                descricao: '',
                funcinalidades: []
            },
            submitted: false,
            funcinalidades: []
        }
    },
    methods: {

        savePerfil() {

            var jgd = jQuery.extend({}, this.perfil);//clona o this.novo_perfil e armazena na variavel perfil. dessa forma alteracoes em this.novo_perfil nao irao refletir em perfil.                                                              

            if (jgd.descricao.trim().length > 0) {

                PerfilDataService.create(jgd)
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
        newPerfil() {

            this.submitted = false;
            this.perfil = {};
        },
        listFuncinalidades() {

            FuncionalidadeDataService.list().then(response => {

                console.log("Retorno do seviço FuncionalidadeDataService.list", response.status);

                for (let f of response.data) {

                    this.funcinalidades.push(f);
                }

            }).catch(response => {

                // error callback
                alert('Não conectou no serviço FuncionalidadeDataService.list');
                console.log(response);
            });
        }

    },
    mounted() {
        this.listFuncinalidades();

    }

}

</script>

<style>
.submit-form {
    max-width: 300px;
    margin: auto;
}
</style>