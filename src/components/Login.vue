<template>
    <div id="tab_aut">
        <nav class="navbar navbar-expand-sm navbar-dark bg-primary">
            <a class="navbar-brand" href="#">Autenticacação</a>
            <button class="navbar-toggler d-lg-none" type="button" data-toggle="collapse"
                data-target="#collapsibleNavId" aria-controls="collapsibleNavId" aria-expanded="false"
                aria-label="Toggle navigation"></button>
            <div class="collapse navbar-collapse" id="collapsibleNavId">
                <form class="form-inline my-2 my-lg-0">
                    <label class="form-label" for="inputANickname">CPF:</label>
                    <input class="form-control" type="text" v-model="pessoas.cpf" id="inputANickname">
                </form>
                <form class="form-inline my-2 my-lg-0">
                    <label class="form-label" for="inputpassword">Password:</label>
                    <input class="form-control" type="password" v-model="pessoas.password" id="inputpassword">
                </form>
                <form class="form-inline my-2 my-lg-0">
                    <label class="form-label" for="inputtipo">Tipo:</label>
                    <input class="form-control" type="text" v-model="pessoas.tipo" id="inputtipo">
                </form>
                <button class="btn btn-primary" @click='createLoginForm()' type="button">Autenticar</button>
                <button class="btn btn-primary" @click='clearForm()' type="button">Limpar</button>
            </div>
        </nav>
       
    </div>
</template>
<script>

import LoginDataService from '../services/LoginDataService';
import App from '../App.vue';


export default {
    name: 'login',
    data() {
        return {
            pessoas: { cpf: '', password: '', tipo: '' }
        }
    },
    methods: {
        createLoginForm() {

            console.log('chamou o createLoginForm');

            const p = {
                cpf: this.pessoas.cpf,
                password: this.pessoas.password,
                tipo: (this.pessoas.tipo).toUpperCase()

            }


            LoginDataService.authenticate(p).then(response => {
                console.log("Retorno do seviço authenticate", response.status);
                if (response.status == 201 || response.status == 200) {

                    alert('Login 1: ' + response.data.cpf + ' authenticate com sucesso');
                    const auxtipo = p.tipo
                    console.log('auxtipo: ' + auxtipo)
                    this.setAuthenticated({ auxtipo })


                    this.$router.push({ name: "home" });

                } else if (response.status == 400) {

                    alert('cpf ou password invalidos!')

                }

                this.clearForm();
            }

            ).catch(response => {

                // error callback
                alert('Não conectou no serviço authenticate ' + response);
                // console.log(response);
            });


        },



        clearForm() {
            this.pessoas.cpf = "";
            this.pessoas.password = "";
            this.pessoas.tipo = "";


        },

        setAuthenticated(pessoas) {

            localStorage.setItem('authUser', JSON.stringify(pessoas));

        },


    }

}
</script>

<style scoped>

</style>