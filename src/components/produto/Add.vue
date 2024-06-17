<template>
    <div class="submit-form">
        <div v-if="!submitted">
            <div class="form-group">
                <label for="inputID">ID:</label>
                <input type="number" v-model="produto.id" class="form-control" id="inputID" disabled>
            </div>

            <div class="form-group">
                <label for="inputDescricao">Descrição:</label>
                <input type="text" v-model="produto.descricao" class="form-control" id="inputDescricao">
            </div>
            
            <div class="form-group">
                <label for="inputObservacoes">Observações</label>
                <input type="text" v-model="produto.observacoes" class="form-control" id="inputObservacoes">
            </div>
            <div class="form-group">
                <label for="inputValorCusto">Valor Custo:</label>
                <input type="number" v-model="produto.valor_custo" class="form-control" id="inputValorCusto">
            </div>
            <div class="form-group">
                <label for="inputValorAluguel">Valor Aluguel:</label>
                <input type="number" v-model="produto.valor_aluguel" class="form-control" id="inputValorAluguel">
            </div>
            <div class="form-group">
                <label for="inputValorVenda">Valor Venda:</label>
                <input type="number" v-model="produto.valor_venda" class="form-control" id="inputValorVenda">
            </div>
            <div class="form-group">
                <label for="inputTiposProduto">Tipos Produto:</label>
                <input type="number" v-model="produto.tipo_produto" class="form-control" id="inputTiposProduto" >
            </div>
          

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
                tipo_produto: ''
            },
            submitted: false,
          
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
        newProduto() {

            this.submitted = false;
            this.produto = {};
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