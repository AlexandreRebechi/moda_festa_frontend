<template>
   <div id="tab_aut">
            <h3>Autenticacação</h3>
            <form>
                <div class="form-outline mb-4">
                    <label class="form-label" for="inputANickname">Nickname:</label>
                    <input class="form-control" type="text" v-model="usuario.nickname" id="inputANickname">
                    </div>
                
                <div class="form-outline mb-4">
                    <label class="form-label" for="inputASenha">Senha:</label>
                    <input class="form-control" type="password" v-model="usuario.senha" id="inputASenha">
                </div>
                
                <button class="btn btn-primary" @click='createLoginForm()'  type="button">Autenticar</button>
                <button class="btn btn-primary" @click='clearForm()' type="button">Limpar</button>
            </form>                                      
        </div>
</template>
<script>

    import LoginDataService from '../services/LoginDataService';
    import App from '../App.vue';


    export default{
     name:'login',
     data() {
            return {
                usuario: {nickname: '', senha: ''}
            }
        },
        methods: {
            createLoginForm(){

                console.log('chamou o createLoginForm');

                const u = {nickname: this.usuario.nickname,
                           senha: this.usuario.senha
                        }                                    

                LoginDataService.authenticate(u).then(response =>{

                    console.log("Retorno do seviço authenticate", response.status);
                    if(response.status == 201 || response.status == 200){

                        alert('Login '+ response.data.nickname + ' authenticate com sucesso');       
                        
                        this.setAuthenticated({nickname: response.data.nickname})

                        
                        this.$router.push({name: "home"});

                    }else if(response.status == 204){

                        alert('Nickname ou senha inválidos ! ');
                    }

                    this.clearForm();
                }
                ).catch(response => {

                    // error callback
                    alert('Não conectou no serviço authenticate '+ response);
                   // console.log(response);
                });


            },
            clearForm(){
                this.usuario.nickname = "";
                this.usuario.senha = "";
            },
            setAuthenticated(usuario){

                localStorage.setItem('authUser', JSON.stringify(usuario));
                
            }

        }

    }
</script>
   
<style scoped>
    
</style>