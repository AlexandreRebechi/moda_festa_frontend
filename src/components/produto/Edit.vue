<template>
    <div id="tab_aut">

        <div v-if="currentProduto" class="edit-form">
            <h3>Produto</h3>
            <form class="was-validated">
            <div class="mb-3">
                <label for="inputID">ID:</label>
                <input type="number" v-model="currentProduto.id" class="form-control is-invalid" id="inputID" placeholder="ID" disabled required>
            </div>

            <div class="mb-3">
                <label for="inputDescricao">Descrição:</label>
                <input type="text" v-model="currentProduto.descricao" class="form-control is-invalid" id="inputDescricao" placeholder="Descrição" required>
            </div>
            
            <div class="mb-3">
                <label for="inputObservacoes">Observações:</label>
                <input type="text" v-model="currentProduto.observacoes" class="form-control is-invalid" id="inputObservacoes" placeholder="Observações" required>
            </div>
            <div class="mb-3">
                <label for="inputValorCusto">Valor Custo:</label>
                <input type="number" v-model="currentProduto.valor_custo" class="form-control is-invalid" id="inputValorCusto" placeholder="Valor Custo" required>
            </div>
            <div class="mb-3">
                <label for="inputValorAluguel">Valor Aluguel:</label>
                <input type="number" v-model="currentProduto.valor_aluguel" class="form-control is-invalid" id="inputValorAluguel" placeholder="Valor Aluguel" required>
            </div>
            <div class="mb-3">
                <label for="inputValorVenda">Valor Venda:</label>
                <input type="number" v-model="currentProduto.valor_venda" class="form-control is-invalid" id="inputValorVenda" placeholder="Valor Venda" required>
            </div>
            <div class="mb-3">
                    <label for="selectTiposProduto">Tipos Produto:</label>
                    <select v-model="currentProduto.tipo_produto" class="form-control is-invalid" id="selectTiposProduto"
                        >
                        <option v-for="tp in tipo_produto" :key="tp.tipo_produto" v-bind:value="tp">
                            {{ tp.nome }}
                        </option>
                    </select>

                </div>
            </form>
            <button class="badge badge-success" @click="updateProduto">Salvar</button>
            <button class="badge badge-danger mr-2" @click="deleteProduto">Delete</button>
            <button class="badge badge-danger mr-2" @click="voltar">Voltar</button>


            <p>{{ message }}</p>

        </div>
        <div v-else>
            <br />
            <p>Please click on a Produto...</p>
        </div>


    </div>
</template>
<script>

import ProdutoDataService from '../../services/ProdutoDataService';
import TiposProdutoDataService from '../../services/TiposProdutoDataService';


export default {
    name: 'editProduto',
    data() {
        return {
            currentProduto: null,
            message: '',
            tipo_produto: []
            
        }
    },
    methods: {

        getProduto(id) {

            ProdutoDataService.get(id)
                .then(response => {
                    console.log(response.data);
                    this.currentProduto = response.data;

                })
                .catch(e => {
                    console.log(e);
                })
        },
        updateProduto() {
            alert(this.currentProduto.id);
            ProdutoDataService.update(this.currentProduto)
                .then(response => {
                    console.log('ProdutoDataService.update');
                    this.message = 'Produto alterado com sucesso !';
                })
                .catch(e => {
                    console.log(e);
                })
        },
        listTipoProtudo() {
            TiposProdutoDataService.list().then(response => {

                console.log("Retorno do seviço TiposProdutoDataService.list", response.status);

                for (let tp of response.data) {

                    this.tipo_produto.push(tp);
                }
            }).catch(response => {

                // error callback
                alert('Não conectou no serviço ProdutoDataService.list');
                console.log(response);
            });
        },
        deleteProduto() {

            ProdutoDataService.delete(this.currentProduto.id)
                .then(response => {
                    console.log(response.data);
                    this.$router.push({ name: "produtos-list" });
                })
                .catch(e => {
                    console.log(e);
                });
        },
        voltar() {
            this.$router.push({ name: "produtos-list" });
        }
    },
    mounted() {

        this.message = '';
        this.getProduto(this.$route.params.id);
        this.listTipoProtudo();
    }
}
</script>

<style scoped>
.edit-form {
    max-width: 300px;
    margin: auto;
}
</style>