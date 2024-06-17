x<template>
    <div id="tab_aut">
     

        <div class="col-md-6">
            <h4>Listagem de Tipos Produto</h4>
            <table class="table table-striped" >
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Nome</th>
                </tr>                     
                <tbody>
                    <tr v-for="(tp, indice) in tiposprodutos" :key ="tp.id" :class="{ active: indice == currentIndex }">
                            <td>{{tp.id}}</td>
                            <td>{{tp.nome}}</td>
                            <td><button v-on:click="setCurrentTiposProduto(tp, indice)" class="btn" type="button">Alterar</button></td>
                            <td><button v-on:click="remTiposProduto(tp, indice)" class="btn" type="button">Remover</button></td>
                    </tr>
                </tbody>
            </table>
     
        </div>

        <div class="col-md-6">
            <div v-if="currentTiposProduto">
                    <h4>Tipos Produto</h4>
                    <div>
                    <label><strong>ID:</strong></label> {{ currentTiposProduto.id }}
                    </div>
                    <div>
                    <label><strong>Nome:</strong></label> {{ currentTiposProduto.nome }}
                    </div>

                    <a class="badge badge-warning"
                    :href="'/tiposprotudo/' + currentTiposProduto.id"
                    >
                    Edit
                    </a>
            </div>
            <div v-else>
                <br />
                <p>Please click on a Player...</p>
                <router-link to="/addtiposprotudo" class="badge badge-success">Novo</router-link>                

            </div>
        </div>

                                          
    </div>
 </template>
 <script>
 
      
    import TiposProdutoDataService from '../../services/TiposProdutoDataService';
     export default{
      name:'listTiposProdutos',
      data() {
             return {
                 tiposprodutos: [],
                 currentTiposProduto: null,
                 currentIndex: -1
             }
         },
         methods: {
            listarTiposProduto(){

                TiposProdutoDataService.list().then(response =>{

                    console.log("Retorno do seviço authenticateTiposProduto", response.status);

                   this.tiposprodutos = response.data;

                }).catch(response => {

                    // error callback
                    alert('Não conectou no serviço listarTiposProduto');
                    console.log(response);
                });
            },
            setCurrentTiposProduto(tiposproduto, index){

                this.currentTiposProduto = tiposproduto;
                this.currentIndex = index;
            },
            remTiposProduto(tiposproduto, index){

                TiposProdutoDataService.delete(tiposproduto.id)
                .then(response => {
                    console.log(response.data);
                    this.refreshList();
                })
                .catch(e => {
                    console.log(e);
                });

            },
            refreshList() {
                this.listarTiposProduto();
                this.currentTutorial = null;
                this.currentIndex = -1;
            }

         },
         mounted() {
            this.listarTiposProduto();
         }
 
     }
 </script>
    
 <style scoped>

    .list {
    text-align: left;
    max-width: 750px;
    margin: auto;
    }

     
 </style>