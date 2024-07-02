<template>
    <div id="tab_aut">
     
       <div v-if="currentSitacao" class="edit-form">
            <h3>Sitacao</h3>
            <form class="was-validated">
        <div class="mb-3">
            <label for="inputID">ID:</label>
            <input type="text" v-model="currentSitacao.id" class="form-control is-invalid" id="inputID" placeholder="ID" disabled required>
        </div>            
        <div class="mb-3">
                <label for="inputDescricao">Descricao:</label>
                <input type="text" v-model="currentSitacao.descricao" class="form-control is-invalid" id="inputDescricao" placeholder="Descricao" required>
        </div>  
                           
            </form>
            <b-button class="badge badge-success" @click="updateSitacao">Salvar</b-button>
            <b-button class="badge badge-danger mr-2" @click="deleteSitacao">Delete</b-button>
            <b-button class="badge badge-danger mr-2" @click="voltar">Voltar</b-button>

            
            <p>{{ message }}</p>

       </div>
       <div v-else>
            <br />
            <p>Please click on a Sitacao...</p>
        </div>

                                          
    </div>
 </template>
 <script>
 
 import SitacaoDataService from '../../services/SitacaoDataService';

 
     export default{
      name:'editSitacaos',
      data() {
             return {                
                 currentSitacao: null,
                 message: ''
             }
         },
         methods: {

            getSitacao(id){

                SitacaoDataService.get(id)
                .then(response => {
                    console.log(response.data);
                    this.currentSitacao = response.data;
                    
                })
                .catch(e=> {
                    console.log(e);
                })
            },
            updateSitacao(){

                SitacaoDataService.update(this.currentSitacao)
                .then(response => {
                    console.log('SitacaoDataService.update');
                    this.message = 'Sitacao alterada com sucesso !';
                })
                .catch(e =>{
                    console.log(e);
                })
            },
            deleteSitacao(){

                SitacaoDataService.delete(this.currentSitacao.id)
                .then(response => {
                    console.log(response.data);
                    this.$router.push({ name: "sitacoes-list" });
                })
                .catch(e => {
                console.log(e);
                });
            },
            voltar(){
                this.$router.push({ name: "sitacoes-list" });
            }
         },
         mounted() {
            
            this.message = '';
            this.getSitacao(this.$route.params.id);
         }
     }
 </script>
    
 <style scoped>

    .edit-form {
    max-width: 300px;
    margin: auto;
    }
     
 </style>