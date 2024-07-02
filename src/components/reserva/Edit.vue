<template>
    <div id="tab_aut">

        <div v-if="currentReserva" class="edit-form">
            <h3>Reserva</h3>
            <form class="was-validated">
           <div class="mb-3">
                <label for="inputID">ID:</label>
                <input type="number" v-model="reserva.id" class="form-control is-invalid" id="inputID" placeholder="ID" disabled required>
            </div>

            <div class="mb-3">
                <label for="inputDataInicio">Data Inicio:</label>
                <input type="date" v-model="currentReserva.data_inicio" class="form-control is-invalid" id="inputDataInicio" placeholder="Data Inicio" required>
            </div>
            
            <div class="mb-3">
                <label for="inputDataFim">Data Fim:</label>
                <input type="date" v-model="currentReserva.data_fim" class="form-control is-invalid" id="inputDataFim" placeholder="Data Fim" required>
            </div>
            <div class="mb-3">
                <label for="inputValor">Valor:</label>
                <input type="number" v-model="currentReserva.valor" class="form-control is-invalid" id="inputValor" placeholder="Valor" required>
            </div>
            <div class="mb-3">
                <label for="inputValorEntrega">Valor Entrega:</label>
                <input type="number" v-model="currentReserva.valor_entrega" class="form-control is-invalid" id="inputValorEntrega" placeholder="Valor Entrega" required>
            </div>
            <div class="mb-3">
                <label for="inputValorTotal">Valor Total:</label>
                <input type="number" v-model="currentReserva.total" class="form-control is-invalid" id="inputValorTotal" placeholder="Valor Total" required>
            </div>
            <div class="mb-3">
                <label for="inputValorObservacoes">Observações:</label>
                <input type="text" v-model="currentReserva.observacoes" class="form-control is-invalid" id="inputValorObservacoes" placeholder="Observações" required>
            </div>
            <div class="mb-3">
                <label for="inputCliente">Cliente:</label>
                <input type="text" v-model="currentReserva.cliente" class="form-control is-invalid" id="inputCliente" placeholder="Cliente" required>
            </div>
            <div class="mb-3">
                <label for="inputFuncionario">Funcionario:</label>
                <input type="text" v-model="currentReserva.funcionario" class="form-control is-invalid" id="inputFuncionario" placeholder="Funcionario" required>
            </div>
            <div class="mb-3">
                <label for="inputStatusReserva">Status Reserva:</label>
                <input type="text" v-model="currentReserva.status_reserva" class="form-control is-invalid" id="inputStatusReserva" placeholder="Status Reserva" required>
            </div>
           
            <div class="mb-3">
                <label for="selectProduto">Produto:</label>
                <select v-model="currentReserva.produtos" class="form-control is-invalid" id="selectProduto" multiple required>
                    <option v-for="p in produtos" :key="p.id" v-bind:value="p">
                        {{ p.descricao }}
                    </option>
                </select>

            </div>
            </form>
            <button class="badge badge-success" @click="updateReserva">Salvar</button>
            <button class="badge badge-danger mr-2" @click="deleteReserva">Delete</button>
            <button class="badge badge-danger mr-2" @click="voltar">Voltar</button>


            <p>{{ message }}</p>

        </div>
        <div v-else>
            <br />
            <p>Please click on a Reserva...</p>
        </div>


    </div>
</template>
<script>

import ProdutoDataService from '../../services/ProdutoDataService';
import ReservaDataService from '../../services/ReservaDataService'

export default {
    name: 'editReserva',
    data() {
        return {
            currentReserva: null,
            message: '',
            produtos: []
        }
    },
    methods: {

        getReserva(id) {

            ReservaDataService.get(id)
                .then(response => {
                    console.log(response.data);
                    this.currentReserva = response.data;

                })
                .catch(e => {
                    console.log(e);
                })
        },
        listProduto() {

            ProdutoDataService.list().then(response => {

                console.log("Retorno do seviço ProdutoDataService.list", response.status);

                this.produtos = response.data;

            }).catch(response => {

                // error callback
                alert('Não conectou no serviço ProdutoDataService.list');
                console.log(response);
            });
        },
        updateReserva() {
            alert(this.currentReserva.produtos);
            ProdutoDataService.update(this.currentReserva)
                .then(response => {
                    console.log('ReservaDataService.update');
                    this.message = 'Reserva alterado com sucesso !';
                })
                .catch(e => {
                    console.log(e);
                })
        },
        deleteReserva() {

            ReservaDataService.delete(this.currentReserva.id)
                .then(response => {
                    console.log(response.data);
                    this.$router.push({ name: "reservas-list" });
                })
                .catch(e => {
                    console.log(e);
                });
        },
        voltar() {
            this.$router.push({ name: "reservas-list" });
        }
    },
    mounted() {

        this.message = '';
        this.listProduto();
        this.getReserva(this.$route.params.id);
    }
}
</script>

<style scoped>
.edit-form {
    max-width: 300px;
    margin: auto;
}
</style>