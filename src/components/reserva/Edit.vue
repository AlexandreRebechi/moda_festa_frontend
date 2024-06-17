<template>
    <div id="tab_aut">

        <div v-if="currentReserva" class="edit-form">
            <h3>Reserva</h3>
            <form>
                <div class="form-group">
                    <label for="inputID">ID:</label>
                    <input type="number" v-model="currentReserva.id" class="form-control" id="inputID" disabled>
                </div>

                <div class="form-group">
                    <label for="inputDataInicio">Data Inicio:</label>
                    <input type="date" v-model="currentReserva.data_inicio" class="form-control" id="inputDataInicio">
                </div>

                <div class="form-group">
                    <label for="inputDataFim">Data Fim:</label>
                    <input type="date" v-model="currentReserva.data_fim" class="form-control" id="inputDataFim">
                </div>
                <div class="form-group">
                    <label for="inputValor">Valor:</label>
                    <input type="number" v-model="currentReserva.valor" class="form-control" id="inputValor">
                </div>
                <div class="form-group">
                    <label for="inputValorEntrega">Valor Entrega:</label>
                    <input type="number" v-model="currentReserva.valor_entrega" class="form-control" id="inputValorEntrega">
                </div>
                <div class="form-group">
                    <label for="inputValorTotal">Valor Total:</label>
                    <input type="number" v-model="currentReserva.total" class="form-control" id="inputValorTotal">
                </div>
                <div class="form-group">
                    <label for="inputValorObservacoes">observacoes:</label>
                    <input type="text" v-model="currentReserva.observacoes" class="form-control" id="inputValorObservacoes">
                </div>
                <div class="form-group">
                    <label for="inputCliente">Cliente:</label>
                    <input type="number" v-model="currentReserva.cliente" class="form-control" id="inputCliente">
                </div>
                <div class="form-group">
                    <label for="inputFuncionario">Funcionario:</label>
                    <input type="number" v-model="currentReserva.funcionario" class="form-control" id="inputFuncionario">
                </div>
                <div class="form-group">
                    <label for="inputStatusReserva">Status Reserva:</label>
                    <input type="number" v-model="currentReserva.status_reserva" class="form-control" id="inputStatusReserva">
                </div>

                <div class="form-group">
                    <label for="selectProduto">Produto:</label>
                    <select v-model="currentReserva.produtos" class="form-control" id="selectProduto" multiple>
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