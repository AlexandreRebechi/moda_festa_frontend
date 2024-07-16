<template>
    <div id="tab_aut">
     

        <div class="col-md-6">
            <h4>Listagem de Parcelamento</h4>
            <table class="table table-striped table-inverse table-responsive-sm table-danger">
                <thead class="thead-inverse">
                    <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Numero Parcela</th>
                    <th scope="col">Data de Previsão de Pagamento</th>
                    <th scope="col">Data Pagamento</th>
                    <th scope="col">Valor Total</th>
                    <th cope="col">Valor Pago</th> 
                    <th scope="col">Locacao ID</th>
                    </tr>
                    </thead>
                    <tbody>
                  
                            <tr v-for="(p, indice) in parcelamentos" :key ="p.id" :class="{ active: indice == currentIndex }">
                            <td>{{p.id}}</td>
                            <td>{{p.numero_parcela}}</td>
                            <td>{{p.data_previsao_pagamento}}</td>
                            <td>{{p.data_pagamento}}</td>
                            <td>{{p.valor_total}}</td>
                            <th >{{p.valor_pago}}</th>
                            <td>{{p.id_locacao}}</td>
                            <td><button v-on:click="setCurrentParcelamento(a, indice)" class="btn" type="button">Alterar</button></td>
                            <td><button v-on:click="remParcelamento(a, indice)" class="btn" type="button">Remover</button></td>
                    
                        </tr>
                        
                    </tbody>
            </table>
           
     
        </div>

        <div class="col-md-6">
            <div v-if="currentParcelamento">
                    <h4>Parcelamento</h4>
                    <div>
                    <label><strong>ID:</strong></label> {{ currentParcelamento.id }}
                    </div>
                    <div>
                    <label><strong>Observacoes:</strong></label> {{ currentParcelamento.observacoes }}
                    </div>

                    <a class="badge badge-warning"
                    :href="'/parcelamento/' + currentParcelamento.id"
                    >
                    Edit
                    </a>
            </div>
            <div v-else>
                <br />
                <p>Please click on a Player...</p>
                <router-link to="/addparcelamento" class="badge badge-success">Novo</router-link>                

            </div>
        </div>

                                          
    </div>
 </template>
 <script>
 
     import ParcelamentoDataService from '../../services/ParcelamentoDataService';
 
     export default{
      name:'listParcelamentos',
      data() {
             return {
                 parcelamentos: [],
                 currentParcelamento: null,
                 currentIndex: -1
             }
         },
         methods: {
            listarParcelamento(){

                ParcelamentoDataService.list().then(response =>{

                    console.log("Retorno do seviço authenticateParcelamento", response.status);

                   this.parcelamentos = response.data;

                }).catch(response => {

                    // error callback
                    alert('Não conectou no serviço listarParcelamento');
                    console.log(response);
                });
            },
            setCurrentParcelamento(parcelamento, index){

                this.currentParcelamento = parcelamento;
                this.currentIndex = index;
            },
            remParcelamento(parcelamento, index){

                ParcelamentoDataService.delete(parcelamento.id)
                .then(response => {
                    console.log(response.data);
                    this.refreshList();
                })
                .catch(e => {
                    console.log(e);
                });

            },
            refreshList() {
                this.listarParcelamento();
                this.currentTutorial = null;
                this.currentIndex = -1;
            }

         },
         mounted() {
            this.listarParcelamento();
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