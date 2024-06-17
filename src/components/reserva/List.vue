<template>
    <div id="tab_aut">
     

        <div class="col-md-6">
            <h4>Listagem de Reservas</h4>
            <table class="table table-striped" >
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Descricao</th>
                </tr>                     
                <tbody>
                    <tr v-for="(r, indice) in reservas" :key ="r.id" :class="{ active: indice == currentIndex }">
                            <td>{{r.id}}</td>
                            <td>{{r.data_inicio | formataData}}</td>
                            <td>{{r.data_fim | formataData}}</td>
                            <td>{{r.valor}}</td>
                            <td>{{r.valor_entrega}}</td>
                            <td>{{r.valor_total}}</td>
                            <td>{{r.observacoes}}</td>
                            <td>{{r.cliente}}</td>
                            <td>{{r.funcionario}}</td>
                            <td>{{r.status_reserva}}</td>
                            <td><button v-on:click="setCurrentReserva(r, indice)" class="btn" type="button">Alterar</button></td>
                            <td><button v-on:click="remReserva(r, indice)" class="btn" type="button">Remover</button></td>
                    </tr>
                </tbody>
            </table>
     
        </div>

        <div class="col-md-6">
            <div v-if="currentReserva">
                    <h4>Reserva</h4>
                    <div>
                    <label><strong>ID:</strong></label> {{ currentReserva.id }}
                    </div>
                    <div>
                    <label><strong>Observacoes:</strong></label> {{ currentReserva.descricao }}
                    </div>

                    <a class="badge badge-warning"
                    :href="'/reserva/' + currentReserva.id"
                    >
                    Edit
                    </a>
            </div>
            <div v-else>
                <br />
                <p>Please click on a Player...</p>
                <router-link to="/addreserva" class="badge badge-success">Novo</router-link>                

            </div>
        </div>

                                          
    </div>
 </template>
 <script>
 
     import ReservaDataService from '../../services/ReservaDataService'     
 
     export default{
      name:'listReservas',
      data() {
             return {
                 reservas: [],
                 currentReserva: null,
                 currentIndex: -1
             }
         },
         methods: {
            listarReservas(){

                ReservaDataService.list().then(response =>{

                    console.log("Retorno do seviço authenticateReserva", response.status);

                   this.reservas = response.data;

                }).catch(response => {

                    // error callback
                    alert('Não conectou no serviço listarReserva');
                    console.log(response);
                });
            },
            setCurrentReserva(reserva, index){

                this.currentReserva = reserva;
                this.currentIndex = index;
            },
            remReserva(reserva, index){

                ReservaDataService.delete(reserva.id)
                .then(response => {
                    console.log(response.data);
                    this.refreshList();
                })
                .catch(e => {
                    console.log(e);
                });

            },
            refreshList() {
                this.listarReservas();
                this.currentTutorial = null;
                this.currentIndex = -1;
            }

         },
         mounted() {
            this.listarReservas();
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