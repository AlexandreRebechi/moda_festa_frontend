<template>
    <div class="submit-form">
      <div v-if="!submitted">       

        <div class="form-group">
            <label for="inputNickname">Nickname:</label>
            <input type="text" v-model="jogador.nickname" class="form-control" id="inputNickname">
        </div>
        <div class="form-group">
            <label for="inputSenha">Senha:</label>
            <input type="password" v-model="jogador.senha" class="form-control" id="inputSenha">
        </div>            
        <div class="form-group">
                <label for="inputDescricao">descricao</label>
                <input type="number" v-model="jogador.descricao" class="form-control" id="inputDescricao">
        </div>
      
        <div class="form-group">
            <label for="selectFuncinalidade">Funcinalidade:</label>
            <select v-model="perfil.funcinalidade" class="form-control" id="selectFuncinalidade" multiple>                                
                <option v-for="f in funcinalidades" :key ="f.id" v-bind:value="f">
                    {{ p.nome }}
                    </option>
            </select>
            
        </div>     
  
        <button @click="savePerfil" class="btn btn-success">Salvar</button>
        <router-link to="/perfis" class="btn btn-success">Voltar</router-link>                

      </div>
  
      <div v-else>
        <h4>Dados enviados com sucesso !</h4>
        <button class="btn btn-success" @click="newJogador">Novo</button>
        <router-link to="/perfis" class="btn btn-success">Voltar</router-link>
      </div>
    </div>
  </template>

<script>

    import JogadorDataService from '../../services/PerfilDataService'
    import PatenteDataService from '../../services/FuncionalidadeDataService'

    export default {
        name: "addJogador",
        data(){
            return {
                jogador: {indice: '', 
                                    nickname: '', 
                                    senha: '',
                                    descricao: '', 
                                    funcinalidade: []},
                submitted: false,
                funcinalidades: []
            }            
        },
        methods: {

            saveJogador(){

                var jgd = jQuery.extend({}, this.perfil);//clona o this.novo_jogador e armazena na variavel jogador. dessa forma alteracoes em this.novo_jogador nao irao refletir em jogador.
                var end = jQuery.extend({}, this.perfil);//clona o this.novo_jogador.endereco                        
                jgd.endereco = end;                                                

                if (jgd.nickname.trim().length > 0 && jgd.senha.trim().length > 0 && 
                        jgd.descricao > -1 ) {
                
                    PerfilDataService.create(jgd)
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
            newPerfil(){

                this.submitted = false;
                this.perfil = {};
            },
            listFuncinalidades(){

                FuncionalidadeDataService.list().then(response =>{

                console.log("Retorno do seviço FuncionalidadeDataService.list", response.status);

                for(let f of response.data){

                    this.funcinalidades.push(f);
                }                  

                }).catch(response => {

                // error callback
                alert('Não conectou no serviço FuncionalidadeDataService.list');
                console.log(response);
                });               
            }

        },
        mounted() {                        
            this.listFuncinalidades();
            
         }

    }

</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>