<template>
    <div class="submit-form">
        <div v-if="!submitted">
            <form class="was-validated">

                <div class="mb-3">
                    <label for="inputID">ID:</label>
                    <input type="text" v-model="funcionalidade.id" class="form-control is-invalid" id="inputID"
                        placeholder="ID" disabled required>
                </div>
                <div class="mb-3">
                    <label for="inputDescricao">Descricao:</label>
                    <input type="text" v-model="funcionalidade.descricao" class="form-control is-invalid"
                        id="inputDescricao" placeholder="Descricao" required>
                </div>
            </form>
            <b-button @click="saveFuncionalidade" class="btn btn-success">Salvar</b-button>
            <router-link to="/funcinalidades" class="btn btn-success">Voltar</router-link>

        </div>

        <div v-else>
            <h4>Dados enviados com sucesso !</h4>
            <b-button class="btn btn-success" @click="newFuncionalidade">Novo</b-button>
            <router-link to="/funcinalidades" class="btn btn-success">Voltar</router-link>
        </div>
    </div>
</template>

<script>

import FuncionalidadeDataService from '../../services/FuncionalidadeDataService';


export default {
    name: "addFuncinalidade",
    data() {
        return {
            funcionalidade: {
                indice: '',

                id: '',
                descricao: ''
            },
            submitted: false,
        }
    },
    methods: {

        saveFuncionalidade() {

            var ft = jQuery.extend({}, this.funcionalidade);//clona o this.funcionalidade e armazena na variavel funcionalidade. dessa forma alteracoes em this.novo_funcionalidade nao irao refletir em funcionalidade.
            delete ft.id
            if (ft.id.trim().length > 0 && ft.descricao.trim().length > 0) {

                FuncionalidadeDataService.create(ft)
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
        newFuncionalidade() {

            this.submitted = false;
            this.funcionalidade = {};
        },


    },
    mounted() {


    }

}

</script>

<style>
.submit-form {
    max-width: 300px;
    margin: auto;
}
</style>