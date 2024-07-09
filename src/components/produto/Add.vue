<template>
    <div class="submit-form">
        <div v-if="!submitted">
            <form class="was-validated">
                <div class="mb-3">
                    <label for="inputID">ID:</label>
                    <input type="number" v-model="produto.id" class="form-control is-invalid" id="inputID"
                        placeholder="ID" disabled required>
                </div>

                <div class="mb-3">
                    <label for="inputDescricao">Descrição:</label>
                    <input type="text" v-model="produto.descricao" class="form-control is-invalid" id="inputDescricao"
                        placeholder="Descrição" required>
                </div>

                <div class="mb-3">
                    <label for="inputObservacoes">Observações:</label>
                    <input type="text" v-model="produto.observacoes" class="form-control is-invalid"
                        id="inputObservacoes" placeholder="Observações" required>
                </div>
                <div class="mb-3">
                    <label for="inputValorCusto">Valor Custo:</label>
                    <input type="number" v-model="produto.valor_custo" class="form-control is-invalid"
                        id="inputValorCusto" placeholder="Valor Custo" required>
                </div>
                <div class="mb-3">
                    <label for="inputValorAluguel">Valor Aluguel:</label>
                    <input type="number" v-model="produto.valor_aluguel" class="form-control is-invalid"
                        id="inputValorAluguel" placeholder="Valor Aluguel" required>
                </div>
                <div class="mb-3">
                    <label for="inputValorVenda">Valor Venda:</label>
                    <input type="number" v-model="produto.valor_venda" class="form-control is-invalid"
                        id="inputValorVenda" placeholder="Valor Venda" required>
                </div>
                <div class="mb-3">
                    <label for="selectTiposProduto">Tipos Produto:</label>
                    <select v-model="produto.tipo_produto" class="form-control is-invalid" id="selectTiposProduto"
                        multiple>
                        <option v-for="tp in tipo_produto" :key="tp.tipo_produto" v-bind:value="tp">
                            {{ tp.nome }}
                        </option>
                    </select>

                </div>
            </form>
            <button @click="saveProduto" class="btn btn-success">Salvar</button>
            <router-link to="/produtos" class="btn btn-success">Voltar</router-link>

        </div>

        <div v-else>
            <h4>Dados enviados com sucesso !</h4>
            <button class="btn btn-success" @click="newProduto">Novo</button>
            <router-link to="/produtos" class="btn btn-success">Voltar</router-link>
        </div>
    </div>
</template>

<script>


import ProdutoDataService from '../../services/ProdutoDataService'
import TiposProdutoDataService from '../../services/TiposProdutoDataService';



export default {
    name: "addProduto",
    data() {
        return {
            produto: {
                indice: '',
                id: '',
                descricao: '',
                observacoes: '',
                valor_custo: '',
                valor_aluguel: '',
                valor_venda: '',
                tipo_produto: []
            },
            submitted: false,
            tipo_produto: []

        }
    },
    methods: {

        saveProduto() {

            var p = jQuery.extend({}, this.p);//clona o this.novo_produto e armazena na variavel produto. dessa forma alteracoes em this.produto nao irao refletir em produto.                                                              

            if (p.id.trim().length > 0) {

                ProdutoDataService.create(rgd)
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
        listTipoProtudo() {
            TiposProdutoDataService.list().then(response => {

                console.log("Retorno do seviço TiposProdutoDataService.list", response.status);

                for (let tp of response.data) {

                    this.cliente.push(tp);
                }
            }).catch(response => {

                // error callback
                alert('Não conectou no serviço ProdutoDataService.list');
                console.log(response);
            });
        },
        newProduto() {

            this.submitted = false;
            this.produto = {};
        },


    },
    mounted() {
        this.listTipoProtudo();

    }

}

</script>

<style>
.submit-form {
    max-width: 300px;
    margin: auto;
}
</style>