<template>
    <div class="submit-form">
      <div v-if="!submitted">       

       
        <div class="form-group">
            <label for="inputID">ID:</label>
            <input type="text" v-model="funcionalidade.id" class="form-control" id="inputID">
        </div>            
        <div class="form-group">
                <label for="inputDescricao">Descricao:</label>
                <input type="text" v-model="funcionalidade.descricao" class="form-control" id="inputDescricao">
        </div>    
  
        <button @click="saveFuncionalidade" class="btn btn-success">Salvar</button>
        <router-link to="/funcinalidades" class="btn btn-success">Voltar</router-link>                

      </div>
  
      <div v-else>
        <h4>Dados enviados com sucesso !</h4>
        <button class="btn btn-success" @click="newFuncionalidade">Novo</button>
        <router-link to="/funcinalidades" class="btn btn-success">Voltar</router-link>
      </div>
    </div>
  </template>

<script>

    import FuncionalidadeDataService from '../../services/FuncionalidadeDataService';


    export default {
        name: "addFuncinalidade",
        data(){
            return {
                funcionalidade: {indice: '', 
                                  
                                    id: '',
                                    descricao: ''},
                submitted: false,
            }            
        },
        methods: {

            saveFuncionalidade(){

                var ft = jQuery.extend({}, this.funcionalidade);//clona o this.funcionalidade e armazena na variavel funcionalidade. dessa forma alteracoes em this.novo_funcionalidade nao irao refletir em funcionalidade.
                delete ft.id
                if (ft.id.trim().length > 0 && ft.descricao.trim().length > 0) {
                
                    FuncionalidadeDataService.create(ft)
                    .then(response => {
                        
                        this.submitted = true;
                    })
                    .catch(e => {                        
                        alert("Erro ao tentar cadastrar. !!! " + e.message);

                    })

                }else{
                    alert('Formulário incompleto !!!');
                }

            },
            newFuncionalidade(){

                this.submitted = false;
                this.funcionalidade = {};
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