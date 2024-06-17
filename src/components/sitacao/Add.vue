<template>
    <div class="submit-form">
      <div v-if="!submitted">       

       
        <div class="form-group">
            <label for="inputID">ID:</label>
            <input type="text" v-model="sitacao.id" class="form-control" id="inputID">
        </div>            
        <div class="form-group">
                <label for="inputDescricao">Descricao:</label>
                <input type="text" v-model="sitacao.descricao" class="form-control" id="inputDescricao">
        </div>    
  
        <button @click="saveSitacao" class="btn btn-success">Salvar</button>
        <router-link to="/sitacoes" class="btn btn-success">Voltar</router-link>                

      </div>
  
      <div v-else>
        <h4>Dados enviados com sucesso !</h4>
        <button class="btn btn-success" @click="newSitacao">Novo</button>
        <router-link to="/sitacoes" class="btn btn-success">Voltar</router-link>
      </div>
    </div>
  </template>

<script>

import SitacaoDataService from '../../services/SitacaoDataService';

    export default {
        name: "addSitacao",
        data(){
            return {
                sitacao: {indice: '', 
                                  
                                    id: '',
                                    descricao: ''},
                submitted: false,
            }            
        },
        methods: {

            saveSitacao(){

                var st = jQuery.extend({}, this.sitacao);//clona o this.sitacao e armazena na variavel sitacao. dessa forma alteracoes em this.novo_sitacao nao irao refletir em sitacao.
                delete st.id
                if (st.id.trim().length > 0 && st.descricao.trim().length > 0) {
                
                    SitacaoDataService.create(st)
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
            newSitacao(){

                this.submitted = false;
                this.sitacao = {};
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