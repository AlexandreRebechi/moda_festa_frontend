<template>
    <div class="submit-form">
        
        <div v-if="!submitted">
            <form class="was-validated">
           <div class="mb-3">
                <label for="inputID">ID:</label>
                <input type="number" v-model="reserva.id" class="form-control is-invalid" id="inputID" placeholder="ID" disabled required>
            </div>

            <div class="mb-3">
                <label for="inputDataInicio">Data Inicio:</label>
                <input type="date" v-model="reserva.data_inicio" class="form-control is-invalid" id="inputDataInicio" placeholder="Data Inicio" required>
            </div>
            
            <div class="mb-3">
                <label for="inputDataFim">Data Fim:</label>
                <input type="date" v-model="reserva.data_fim" class="form-control is-invalid" id="inputDataFim" placeholder="Data Fim" required>
            </div>
            <div class="mb-3">
                <label for="inputValor">Valor:</label>
                <input type="number" v-model="reserva.valor" class="form-control is-invalid" id="inputValor" placeholder="Valor" required>
            </div>
            <div class="mb-3">
                <label for="inputValorEntrega">Valor Entrega:</label>
                <input type="number" v-model="reserva.valor_entrega" class="form-control is-invalid" id="inputValorEntrega" placeholder="Valor Entrega" required>
            </div>
            <div class="mb-3">
                <label for="inputValorTotal">Valor Total:</label>
                <input type="number" v-model="reserva.total" class="form-control is-invalid" id="inputValorTotal" placeholder="Valor Total" required>
            </div>
            <div class="mb-3">
                <label for="inputValorObservacoes">Observações:</label>
                <input type="text" v-model="reserva.observacoes" class="form-control is-invalid" id="inputValorObservacoes" placeholder="Observações" required>
            </div>
            <div class="mb-3">
                <label for="inputCliente">Cliente:</label>
                <input type="text" v-model="reserva.cliente" class="form-control is-invalid" id="inputCliente" placeholder="Cliente" required>
            </div>
            <div class="mb-3">
                <label for="inputFuncionario">Funcionario:</label>
                <input type="text" v-model="reserva.funcionario" class="form-control is-invalid" id="inputFuncionario" placeholder="Funcionario" required>
            </div>
            <div class="mb-3">
                <label for="inputStatusReserva">Status Reserva:</label>
                <input type="text" v-model="reserva.status_reserva" class="form-control is-invalid" id="inputStatusReserva" placeholder="Status Reserva" required>
            </div>
           
            <div class="mb-3">
                <label for="selectProduto">Produto:</label>
                <select v-model="reserva.produtos" class="form-control is-invalid" id="selectProduto" multiple>
                    <option v-for="p in produtos" :key="p.id" v-bind:value="p">
                        {{ p.descricao }}
                    </option>
                </select>

            </div>
        </form>
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
        
            if (rgd.observacoes.trim().length > 0) {
                console.log("rgd: "+rgd)
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