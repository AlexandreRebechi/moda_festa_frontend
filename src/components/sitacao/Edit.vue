<template>
    <div id="tab_aut">
     
       <div v-if="currentSitacao" class="edit-form">
            <h3>Sitacao</h3>
            <form>
                <div class="form-group">
                    <label for="inputId">ID:</label>
                    <input type="number" v-model="currentSitacao.id" class="form-control" id="inputId" disabled>
                </div>
                <div class="form-group">
                    <label for="inputDescricao">Descricao:</label>
                    <input type="text" v-model="currentSitacao.descricao" class="form-control" id="inputDescricao">
                </div>
                           
            </form>
            <button class="badge badge-success" @click="updateSitacao">Salvar</button>
            <button class="badge badge-danger mr-2" @click="deleteSitacao">Delete</button>
            <button class="badge badge-danger mr-2" @click="voltar">Voltar</button>

            
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