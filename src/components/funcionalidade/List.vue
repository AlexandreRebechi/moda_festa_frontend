<template>
    <div id="tab_aut">
     

        <div class="col-md-6">
            <h4>Listagem de Funcionalidades</h4>
            <table class="table table-striped" >
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Descricao</th>
                    
                </tr>                     
                <tbody>
                    <tr v-for="(f, indice) in funcinalidades" :key ="f.id" :class="{ active: indice == currentIndex }">
                            <td>{{f.id}}</td>
                            <td>{{f.descricao}}</td>
                            <td><button v-on:click="setCurrentFuncionalidade(f, indice)" class="btn" type="button">Alterar</button></td>
                            <td><button v-on:click="remFuncionalidade(f, indice)" class="btn" type="button">Remover</button></td>
                    </tr>
                </tbody>
            </table>
     
        </div>

        <div class="col-md-6">
            <div v-if="currentFuncionalidade">
                    <h4>Funcionalidade</h4>
                    <div>
                    <label><strong>ID:</strong></label> {{ currentFuncionalidade.id }}
                    </div>
                    <div>
                    <label><strong>Descricao:</strong></label> {{ currentFuncionalidade.descricao }}
                    </div>

                    <a class="badge badge-warning"
                    :href="'/funcionalidade/' + currentFuncionalidade.id"
                    >
                    Edit
                    </a>
            </div>
            <div v-else>
                <br />
                <p>Please click on a Player...</p>
                <router-link to="/addfuncionalidade" class="badge badge-success">Novo</router-link>                

            </div>
        </div>

                                          
    </div>
 </template>
 
 <script>
 
      
     import FuncionalidadeDataService from '../../services/FuncionalidadeDataService';
     export default{
        name:'listFuncionalidades',
      data() {
             return {
                 funcinalidades: [],
                 currentFuncionalidade: null,
                 currentIndex: -1
             }
         },
         methods: {
            listarFuncionalidades(){

                FuncionalidadeDataService.list().then(response =>{

                    console.log("Retorno do seviço authenticateFuncionalidade", response.status);

                   this.funcinalidades = response.data;
                    
                }).catch(response => {

                    // error callback
                    alert('Não conectou no serviço listarFuncionalidades');
                    console.log(response);
                });
            },
            setCurrentFuncionalidade(funcionalidade, index){

                this.currentFuncionalidade = funcionalidade;
                this.currentIndex = index;
            },
            remFuncionalidade(funcionalidade, index){

                FuncionalidadeDataService.delete(funcionalidade.id)
                .then(response => {
                    console.log(response.data);
                    this.refreshList();
                })
                .catch(e => {
                    console.log(e);
                });

            },
            refreshList() {
                this.listarFuncionalidades();
                this.currentTutorial = null;
                this.currentIndex = -1;
            }

         },
         mounted() {
            this.listarFuncionalidades();
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