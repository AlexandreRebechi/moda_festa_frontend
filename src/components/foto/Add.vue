<template>
    <div class="submit-form">
        <div v-if="!submitted">
            <form class="was-validated">

                <div class="md-3">
                    <label for="inputID">ID:</label>
                    <input type="text" v-model="foto.id" class="form-control is-invalid" id="inputID" placeholder="ID"
                        disabled required>
                </div>
                <div class="md-3">
                    <label for="inputDescricao">Descricao:</label>
                    <input type="text" v-model="foto.descricao" class="form-control is-invalid" id="inputDescricao"
                        placeholder="Descricao" required>
                </div>

                <div class="md-3">
                    <label for="inputB64">B64:</label>
                    <input type="text" v-model="foto.b64" class="form-control is-invalid" id="inputB64"
                        placeholder="B64" required>
                </div>

                <div class="mb-3">
                    <label for="selectProduto">Produto:</label>
                    <select v-model="foto.produto_id" class="form-control is-invalid" id="selectProduto">
                        <option v-for="p in produto_id" :key="p.id" v-bind:value="p">
                            {{ p.descricao }}
                        </option>
                    </select>

                </div>

            </form>

            <button @click="saveFoto" class="btn btn-success">Salvar</button>
            <router-link to="/fotos" class="btn btn-success">Voltar</router-link>

        </div>

        <div v-else>
            <h4>Dados enviados com sucesso !</h4>
            <button class="btn btn-success" @click="newFoto">Novo</button>
            <router-link to="/fotos" class="btn btn-success">Voltar</router-link>
        </div>
    </div>
</template>

<script>

import FotoDataService from '../../services/FotoDataService';
import ProdutoDataService from '../../services/ProdutoDataService';


export default {
    name: "addfoto",
    data() {
        return {
            foto: {
                indice: '',

                id: '',
                descricao: '',
                b64: '',
                produto_id: []
            },
            submitted: false,
            produto_id: []
        }
    },
    methods: {

        saveFoto() {

            var ft = jQuery.extend({}, this.foto);//clona o this.foto e armazena na variavel funcionalidade. dessa forma alteracoes em this.novo_foto nao irao refletir em foto.
            delete ft.id
            if (ft.descricao.trim().length > 0) {

                FotoDataService.create(ft)
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

        newFoto() {

            this.submitted = false;
            this.foto = {};
        },


    },
    mounted() {
        this.listProdutos();

    }

}

</script>

<style>
.submit-form {
    max-width: 300px;
    margin: auto;
}
</style>