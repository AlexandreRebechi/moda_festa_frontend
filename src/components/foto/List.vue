x<template>
    <div id="tab_aut">
        <div class="col-md-6">
            <h4>Listagem de Fotos</h4>
            <table class="table table-striped table-inverse table-responsive-sm table-danger">
                <thead class="thead-inverse">
                    <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Descricao</th>
                    <th scope="col">B64</th>
                    </tr>
                    </thead>
                    <tbody>
                        <tr  v-for="(f, indice) in fotos" :key ="f.id" :class="{ active: indice == currentIndex }">
              
                            <td>{{f.id}}</td>
                            <td>{{f.descricao}}</td>
                            <td>{{f.b64}}</td>
                            <td><b-button v-on:click="setCurrentFoto(f, indice)" class="btn" type="button">Alterar</b-button></td>
                            <td><b-button v-on:click="remFoto(f, indice)" class="btn" type="button">Remover</b-button></td>
                        </tr>
                    </tbody>
            </table>
            
     
        </div>

        <div class="col-md-6">
            <div v-if="currentFoto">
                    <h4>Foto</h4>
                    <div>
                    <label><strong>ID:</strong></label> {{ currentFoto.id }}
                    </div>
                    <div>
                    <label><strong>Descricao:</strong></label> {{ currentFoto.descricao }}
                    </div>

                    <a class="badge badge-warning"
                    :href="'/foto/' + currentFoto.id"
                    >
                    Edit
                    </a>
            </div>
            <div v-else>
                <br />
                <p>Please click on a Player...</p>
                <router-link to="/addFoto" class="badge badge-success">Novo</router-link>                

            </div>
        </div>

                                          
    </div>
 </template>
 <script>
 
      
    import FotoDataService from '../../services/FotoDataService';

     export default{
      name:'listFotos',
      data() {
             return {
                 fotos: [],
                 currentFoto: null,
                 currentIndex: -1
             }
         },
         methods: {
            listarFotos(){

                FotoDataService.list().then(response =>{

                    console.log("Retorno do seviço authenticateFoto", response.status);

                   this.fotos = response.data;

                }).catch(response => {

                    // error callback
                    alert('Não conectou no serviço listarFotos');
                    console.log(response);
                });
            },
            setCurrentFoto(foto, index){

                this.currentFoto = foto;
                this.currentIndex = index;
            },
            remFoto(foto, index){

                FotoDataService.delete(foto.id)
                .then(response => {
                    console.log(response.data);
                    this.refreshList();
                })
                .catch(e => {
                    console.log(e);
                });

            },
            refreshList() {
                this.listarFotos();
                this.currentTutorial = null;
                this.currentIndex = -1;
            }

         },
         mounted() {
            this.listarFotos();
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