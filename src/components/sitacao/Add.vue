<template>
    <div class="submit-form">
      <div v-if="!submitted">       

       <form class="was-validated">
        <div class="mb-3">
            <label for="inputID">ID:</label>
            <input type="text" v-model="sitacao.id" class="form-control is-invalid" id="inputID" placeholder="ID" disabled required>
        </div>            
        <div class="mb-3">
                <label for="inputDescricao">Descricao:</label>
                <input type="text" v-model="sitacao.descricao" class="form-control is-invalid" id="inputDescricao" placeholder="Descricao" required>
        </div>    
    </form>
        <b-button @click="saveSitacao" class="btn btn-success">Salvar</b-button>
        <router-link to="/sitacoes" class="btn btn-success">Voltar</router-link>                

      </div>
  
      <div v-else>
        <h4>Dados enviados com sucesso !</h4>
        <b-button class="btn btn-success" @click="newSitacao">Novo</b-button>
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