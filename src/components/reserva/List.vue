<template>
    <div id="tab_aut">


        <div class="col-md-6">
            <h4>Listagem de Reservas</h4>
            <table class="table table-striped table-inverse table-responsive-sm table-danger text-align">
                <thead class="thead-inverse">
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Data Inicio</th>
                        <th scope="col">Data Fim</th>
                        <th scope="col">Valor</th>
                        <th scope="col">Valor Entrega</th>
                        <th scope="col">Valor Total</th>
                        <th scope="col">Observacoes</th>
                        <th scope="col">Cliente</th>
                        <th scope="col">Funcionario</th>
                        <th scope="col">Status Reserva</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(r, indice) in reservas" :key="r.id" :class="{ active: indice == currentIndex }">
                        <td>{{ r.id }}</td>
                        <td>{{ r.data_inicio }}</td>
                        <td>{{ r.data_fim}}</td>
                        <td>{{ r.valor }}</td>
                        <td>{{ r.valor_entrega }}</td>
                        <td>{{ r.valor_total }}</td>
                        <td>{{ r.observacoes }}</td>
                        <td>{{ r.cliente }}</td>
                        <td>{{ r.funcionario }}</td>
                        <td>{{ r.status_reserva }}</td>
                        <td><button v-on:click="setCurrentReserva(r, indice) && statusShowMenu()" class="btn"
                                type="button">Alterar</button></td>
                        <td><button v-on:click="remReserva(r, indice) && statusShowMenu()" class="btn" type="button">Remover</button>
                        </td>
                    </tr>

                </tbody>
            </table>


        </div>

        <div class="col-md-6" v-show="statusShowMenu()">
            <div v-if="currentReserva">
                <h4>Reserva</h4>
                <div>
                    <label><strong>ID:</strong></label> {{ currentReserva.id }}
                </div>
                <div>
                    <label><strong>Observacoes:</strong></label> {{ currentReserva.descricao }}
                </div>

                <a class="badge badge-warning" :href="'/reserva/' + currentReserva.id">
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

export default {
    name: 'listReservas',
    data() {
        return {
            reservas: [],
            pessoas: [],
            currentReserva: null,
            currentIndex: -1
        }
    },
    methods: {
        listarReservas() {

            ReservaDataService.list().then(response => {

                console.log("Retorno do seviço authenticateReserva", response.status);

                this.reservas = response.data;

            }).catch(response => {

                // error callback
                alert('Não conectou no serviço listarReserva');
                console.log(response);
            });
        },
        setCurrentReserva(reserva, index) {

            this.currentReserva = reserva;
            this.currentIndex = index;
        },
        statusShowMenu() {
      let aux = localStorage.getItem('authUser', this.pessoas.tipo)
      if (aux.includes('F')) {
        return true
      } else {
        return false
      }

    },
    status_cliente(){
        let aux = localStorage.getItem('authUser', this.pessoas)
        console.log('aux: '+aux)
      if (aux == this.reservas.cliente) {
        return true
      } else {
        return false
      }
    },
        remReserva(reserva, index) {

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