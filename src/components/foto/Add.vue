<template>
    <div class="submit-form">
      <div v-if="!submitted">       

       
        <div class="form-group">
            <label for="inputID">ID:</label>
            <input type="text" v-model="foto.id" class="form-control" id="inputID">
        </div>            
        <div class="form-group">
                <label for="inputDescricao">Descricao:</label>
                <input type="text" v-model="foto.descricao" class="form-control" id="inputDescricao">
        </div>    

        <div class="form-group">
                <label for="inputB64">B64:</label>
                <input type="text" v-model="foto.b64" class="form-control" id="inputB64">
        </div>

        <div class="form-group">
            <label for="inputProdutoID">Produto ID:</label>
            <input type="text" v-model="foto.produto_id" class="form-control" id="inputProdutoID">
        </div>      

  
        <button @click="saveFoto" class="btn btn-success">Salvar</button>
        <router-link to="/funcinalidades" class="btn btn-success">Voltar</router-link>                

      </div>
  
      <div v-else>
        <h4>Dados enviados com sucesso !</h4>
        <button class="btn btn-success" @click="newFoto">Novo</button>
        <router-link to="/fotos" class="btn btn-success">Voltar</router-link>
      </div>
    </div>
  </template>

<script>

    import FotoDataService from '../../services/FotoDataService';


    export default {
        name: "addFoto",
        data(){
            return {
                foto: {indice: '', 
                                  
                                    id: '',
                                    descricao: '',
                                    b64: '',
                                    produto_id: ''
                                },
                submitted: false,
            }            
        },
        methods: {

            saveFoto(){

                var ft = jQuery.extend({}, this.foto);//clona o this.foto e armazena na variavel funcionalidade. dessa forma alteracoes em this.novo_foto nao irao refletir em foto.
                delete ft.id
                if (ft.id.trim().length > 0 && pt.descricao.trim().length > 0) {
                
                    FotoDataService.create(ft)
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
            newFoto(){

                this.submitted = false;
                this.foto = {};
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