<template>
    <div id="tab_aut">
     

        <div class="col-md-6">
            <h4>Listagem de Clientes</h4>
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
                    <th scope="col">cpf</th>
                    <th scope="col">rg</th>
                    <th scope="col">cnpj</th>
                    <th scope="col">ie</th>
              
                    
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
                            <td>{{p.cliente.cpf}}</td>
                            <td>{{p.cliente.rg}}</td>
                            <td>{{p.cliente.cnpj}}</td>
                            <td>{{p.cliente.ie}}</td>
                            <td><button v-on:click="setCurrentCliente(p, indice)" class="btn" type="button">Alterar</button></td>
                            <td><button v-on:click="remCliente(p, indice)" class="btn" type="button">Remover</button></td>
                    </tr>
                </tbody>
            </table>
     
        </div>

        <div class="col-md-6">
            <div v-if="currentCliente">
                    <h4>Cliente</h4>
                    <div>
                    <label><strong>Username:</strong></label> {{ currentCliente.username }}
                    </div>
                    <div>
                    <label><strong>Data de Cadastro:</strong></label> {{ currentCliente.datacadastro }}
                    </div>
                    <div>
                    <label><strong>Stituação:</strong></label> {{ currentCliente.situacao == 'A' ? "Ativo" : "Inativo" }}
                    </div>

                    <a class="badge badge-warning"
                    :href="'/cliente/' + currentCliente.id"
                    >
                    Edit
                    </a>
            </div>
            <div v-else>
                <br />
                <p>Please click on a Player...</p>
                <router-link to="/addcliente" class="badge badge-success">Novo</router-link>                

            </div>
        </div>

                                          
    </div>
 </template>
 <script>
 
     import ClienteDataService from '../../services/ClienteDataService';
 
 
     export default{
      name:'listClientes',
      data() {
             return {
                 pessoas: [],
                 currentCliente: null,
                 currentIndex: -1
             }
         },
         methods: {
            listarCliente(){

                ClienteDataService.list().then(response =>{

                    console.log("Retorno do seviço authenticateCliente", response.status);

                   this.pessoas = response.data;

                }).catch(response => {

                    // error callback
                    alert('Não conectou no serviço listCliente');
                    console.log(response);
                });
            },
            setCurrentJogador(pessoas, index){

                this.currentJogador = jogador;
                this.currentIndex = index;
            },
            remCliente(pessoas, index){

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
                this.listarCliente();
                this.currentTutorial = null;
                this.currentIndex = -1;
            }

         },
         mounted() {
            this.listarCliente();
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