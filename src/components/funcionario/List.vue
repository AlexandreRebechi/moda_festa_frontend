<template>
    <div id="tab_aut">
     

        <div class="col-md-6">
            <h4>Listagem de Funcionarios</h4>
            <table class="table table-striped" >
                <tr>
                    <th scope="col">id</th>
                    <th scope="col">nome</th>
                    <th scope="col">telefone</th>
                    <th scope="col">cep</th> 
                    <th scope="col">logradouro</th>
                    <th scope="col">bairro</th>
                    <th scope="col">complemento</th>
                    <th scope="col">observacoes</th>
                    <th scope="col">data_cadastro</th>
                    <th scope="col">username</th>
                    <th scope="col">password</th>
                    <th scope="col">data_ultimo_login</th>
                    <th scope="col">numero_ctps</th>
                    <th scope="col">dataContratacao</th>
                    <th scope="col">dataDemissao</th>
                    <th scope="col">perfil</th>
              
                    
                </tr>                     
                <tbody>
                    <tr v-for="(p, indice) in pessoas" :key ="p.id" :class="{ active: indice == currentIndex }">
                            <td>{{p.id}}</td>
                            <td>{{p.nome}}</td>
                            <td>{{p.telefone}}</td>
                            <td>{{p.cep}}</td>
                            <td>{{p.logradouro}}</td>
                            <td>{{p.bairro}}</td>
                            <td>{{p.complemento}}</td>
                            <td>{{p.observacoes}}</td>
                            <td>{{p.data_cadastro | formataData}}</td>
                            <td>{{p.username}}</td>
                            <td>{{p.password}}</td>
                            <td>{{p.data_ultimo_login | formataData}}</td>
                            <td>{{p.funcionario.numero_ctps}}</td>
                            <td>{{p.funcionario.dataContratacao}}</td>
                            <td>{{p.cliente.dataDemissao}}</td>
                            <td>{{p.cliente.perfil}}</td>
                            <td><button v-on:click="setCurrentFuncionario(p, indice)" class="btn" type="button">Alterar</button></td>
                            <td><button v-on:click="remFuncionario(p, indice)" class="btn" type="button">Remover</button></td>
                    </tr>
                </tbody>
            </table>
     
        </div>

        <div class="col-md-6">
            <div v-if="currentFuncinario">
                    <h4>Funcionario</h4>
                    <div>
                    <label><strong>Username:</strong></label> {{ currentFuncinario.username }}
                    </div>
                    <div>
                    <label><strong>Data de Cadastro:</strong></label> {{ currentFuncinario.datacadastro }}
                    </div>
                   

                    <a class="badge badge-warning"
                    :href="'/funcionario/' + currentFuncinario.id"
                    >
                    Edit
                    </a>
            </div>
            <div v-else>
                <br />
                <p>Please click on a Player...</p>
                <router-link to="/addfuncionario" class="badge badge-success">Novo</router-link>                

            </div>
        </div>

                                          
    </div>
 </template>
 <script>
 
     
    import FuncionarioDataService from '../../services/FuncionarioDataService';
 
 
     export default{
      name:'listFuncionario',
      data() {
             return {
                 pessoas: [],
                 currentCliente: null,
                 currentIndex: -1
             }
         },
         methods: {
            listarFuncinario(){

                FuncionarioDataService.list().then(response =>{

                    console.log("Retorno do seviço authenticateFuncionario", response.status);

                   this.pessoas = response.data;

                }).catch(response => {

                    // error callback
                    alert('Não conectou no serviço listFuncinario');
                    console.log(response);
                });
            },
            setCurrentFuncionario(pessoas, index){

                this.currentFuncinario = pessoas;
                this.currentIndex = index;
            },
            remFuncionario(pessoas, index){

                ClienteDataService.delete(this.pessoas.id)
                .then(response => {
                    console.log(response.data);
                    this.refreshList();
                })
                .catch(e => {
                    console.log(e);
                });

            },
            refreshList() {
                this.listarFuncinario();
                this.currentTutorial = null;
                this.currentIndex = -1;
            }

         },
         mounted() {
            this.listarFuncinario();
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