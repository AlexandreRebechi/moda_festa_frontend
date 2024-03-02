<template>
   <div id="tab_aut">
            <h3>Autenticacação</h3>
            <form>
                <div class="form-outline mb-4">
                    <label class="form-label" for="inputANickname">username:</label>
                    <input class="form-control" type="text" v-model="pessoa.id" id="inputANickname">
                    </div>
                
                <div class="form-outline mb-4">
                    <label class="form-label" for="inputASenha">Senha:</label>
                    <input class="form-control" type="password" v-model="pessoa.password" id="inputASenha">
                </div>
                
                <button class="btn btn-primary" @click='createClienteForm()' type="button">Autenticar</button>
                <button class="btn btn-primary" @click='clearForm()' type="button">Limpar</button>
            </form>                                      
        </div>
</template>
<script>

    import ClienteDataService from '../services/ClienteDataService';
    import App from '../App.vue'


    export default{
     name:'login',
     data() {
            return {
                pessoa: {id: '', password: ''}
            }
        },
        methods: {
            createClienteForm(){

                console.log('chamou o createClienteForm');

                const p = {id: this.pessoa.id,
                           senha: this.pessoa.password
                        }                                    

                ClienteDataService.authenticate(p).then(response =>{

                    console.log("Retorno do seviço authenticateCliente", response.status);
                    if(response.status == 201 || response.status == 200){

                        alert('Cliente '+ response.data.id + ' authenticate com sucesso');       
                        
                        this.setAuthenticated({id: response.data.id})

                        
                        this.$router.push({name: "home"});

                    }else if(response.status == 204){

                        alert('Nickname ou senha inválidos ! ');
                    }

                    this.clearForm();
                }
                ).catch(response => {

                    // error callback
                    alert('Não conectou no serviço authenticateCliente '+ response);
                   // console.log(response);
                });


            },
            clearForm(){
                this.pessoa.id = "";
                this.pessoa.password = "";
            },
            setAuthenticated(pessoa){

                localStorage.setItem('authUser', JSON.stringify(pessoa));
                
            }

        }

    }
</script>
   
<style scoped>
    
</style>