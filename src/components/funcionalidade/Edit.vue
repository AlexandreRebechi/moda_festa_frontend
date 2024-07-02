<template>
    <div id="tab_aut">
     
       <div v-if="currentFuncionalidade" class="edit-form">
            <h3>Funcionalidade</h3>
            <form class="was-validated">
                <div class="mb-3">
                    <label for="inputID">ID:</label>
                    <input type="text" v-model="currentFuncionalidade.id" class="form-control is-invalid" id="inputID"
                        placeholder="ID" disabled required>
                </div>
                <div class="mb-3">
                    <label for="inputDescricao">Descricao:</label>
                    <input type="text" v-model="currentFuncionalidade.descricao" class="form-control is-invalid"
                        id="inputDescricao" placeholder="Descricao" required>
                </div>
                           
            </form>
            <b-button class="badge badge-success" @click="updateFuncionalidade">Salvar</b-button>
            <b-button class="badge badge-danger mr-2" @click="deleteFuncionalidade">Delete</b-button>
            <b-button class="badge badge-danger mr-2" @click="voltar">Voltar</b-button>

            
            <p>{{ message }}</p>

       </div>
       <div v-else>
            <br />
            <p>Please click on a Funcionalidade...</p>
        </div>

                                          
    </div>
 </template>
 <script>
 
 import FuncionalidadeDataService from '../../services/FuncionalidadeDataService';

 
     export default{
      name:'editFuncionalidades',
      data() {
             return {                
                 currentFuncionalidade: null,
                 message: ''
             }
         },
         methods: {

            getFuncionalidade(id){

                FuncionalidadeDataService.get(id)
                .then(response => {
                    console.log(response.data);
                    this.currentFuncionalidade = response.data;
                    
                })
                .catch(e=> {
                    console.log(e);
                })
            },
            updateFuncionalidade(){

                FuncionalidadeDataService.update(this.currentFuncionalidade)
                .then(response => {
                    console.log('FuncionalidadeDataService.update');
                    this.message = 'Funcionalidade alterada com sucesso !';
                })
                .catch(e =>{
                    console.log(e);
                })
            },
            deleteFuncionalidade(){

                FuncionalidadeDataService.delete(this.currentFuncionalidade.id)
                .then(response => {
                    console.log(response.data);
                    this.$router.push({ name: "funcionalidades-list" });
                })
                .catch(e => {
                console.log(e);
                });
            },
            voltar(){
                this.$router.push({ name: "funcionalidades-list" });
            }
         },
         mounted() {
            
            this.message = '';
            this.getFuncionalidade(this.$route.params.id);
         }
     }
 </script>
    
 <style scoped>

    .edit-form {
    max-width: 300px;
    margin: auto;
    }
     
 </style>