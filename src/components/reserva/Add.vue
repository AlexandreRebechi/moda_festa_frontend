<template>
    <div class="submit-form">
        <div v-if="!submitted">
            <div class="form-group">
                <label for="inputID">ID:</label>
                <input type="number" v-model="reserva.id" class="form-control" id="inputID" disabled>
            </div>

            <div class="form-group">
                <label for="inputDataInicio">Data Inicio:</label>
                <input type="date" v-model="reserva.data_inicio" class="form-control" id="inputDataInicio">
            </div>
            
            <div class="form-group">
                <label for="inputDataFim">Data Fim:</label>
                <input type="date" v-model="reserva.data_fim" class="form-control" id="inputDataFim">
            </div>
            <div class="form-group">
                <label for="inputValor">Valor:</label>
                <input type="number" v-model="reserva.valor" class="form-control" id="inputValor">
            </div>
            <div class="form-group">
                <label for="inputValorEntrega">Valor Entrega:</label>
                <input type="number" v-model="reserva.valor_entrega" class="form-control" id="inputValorEntrega">
            </div>
            <div class="form-group">
                <label for="inputValorTotal">Valor Total:</label>
                <input type="number" v-model="reserva.total" class="form-control" id="inputValorTotal">
            </div>
            <div class="form-group">
                <label for="inputValorObservacoes">Observações:</label>
                <input type="text" v-model="reserva.observacoes" class="form-control" id="inputValorObservacoes">
            </div>
            <div class="form-group">
                <label for="inputCliente">Cliente:</label>
                <input type="number" v-model="reserva.cliente" class="form-control" id="inputCliente">
            </div>
            <div class="form-group">
                <label for="inputFuncionario">Funcionario:</label>
                <input type="number" v-model="reserva.funcionario" class="form-control" id="inputFuncionario">
            </div>
            <div class="form-group">
                <label for="inputStatusReserva">Status Reserva:</label>
                <input type="number" v-model="reserva.status_reserva" class="form-control" id="inputStatusReserva">
            </div>
           
            <div class="form-group">
                <label for="selectProduto">Produto:</label>
                <select v-model="reserva.produtos" class="form-control" id="selectProduto" multiple>
                    <option v-for="p in produtos" :key="p.id" v-bind:value="p">
                        {{ p.descricao }}
                    </option>
                </select>

            </div>

            <button @click="saveReserva" class="btn btn-success">Salvar</button>
            <router-link to="/reservas" class="btn btn-success">Voltar</router-link>

        </div>

        <div v-else>
            <h4>Dados enviados com sucesso !</h4>
            <button class="btn btn-success" @click="newReserva">Novo</button>
            <router-link to="/reservas" class="btn btn-success">Voltar</router-link>
        </div>
    </div>
</template>

<script>

import ReservaDataService from '../../services/ReservaDataService'
import ProdutoDataService from '../../services/ProdutoDataService'



export default {
    name: "addReserva",
    data() {
        return {
            reserva: {
                indice: '',
                id: '',
                data_inicio: '',
                data_fim: '',
                valor: '',
                valor_entrega: '',
                valor_total: '',
                observacoes: '',
                cliente: '',
                funcionario: '',
                status_reserva: '',
                produtos: []
            },
            submitted: false,
            produtos: []
        }
    },
    methods: {

        saveReserva() {

            var rgd = jQuery.extend({}, this.reserva);//clona o this.novo_reserva e armazena na variavel reserva. dessa forma alteracoes em this.novo_reserva nao irao refletir em reserva.                                                              

            if (rgd.id.trim().length > 0) {

                ReservaDataService.create(rgd)
                    .then(response => {

                        this.submitted = true;
                    })
                    .catch(e => {
                        alert("Erro ao tentar cadastrar. !!! " + e.message);

                    })

            } else {
                alert('Formulário incompleto !!!');
            }

        },
        newReserva() {

            this.submitted = false;
            this.reserva = {};
        },
        listProdutos() {

            ProdutoDataService.list().then(response => {

                console.log("Retorno do seviço ProdutoDataService.list", response.status);

                for (let p of response.data) {

                    this.produtos.push(p);
                }

            }).catch(response => {

                // error callback
                alert('Não conectou no serviço ProdutoDataService.list');
                console.log(response);
            });
        }

    },
    mounted() {
        this.listProdutos();

    }

}

</script>

<style>
.submit-form {
    max-width: 300px;
    margin: auto;
}
</style>