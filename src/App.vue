<template>



  <div id="app">

    <!--navbar-->
    <nav class="navbar navbar-expand-sm navbar-dark bg-primary">
      <a class="navbar-brand" href="#">Vestidos Noivas</a>
      <button class="navbar-toggler d-lg-none" type="button" data-toggle="collapse" data-target="#collapsibleNavId"
        aria-controls="collapsibleNavId" aria-expanded="false" aria-label="Toggle navigation"></button>
      <div class="collapse navbar-collapse" id="collapsibleNavId">
        <template>
        <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
          
          <li class="nav-item active">
            <a class="nav-link"   v-show="showMenu() && statusShowMenu()" href="#">Home <span class="sr-only">(current)</span></a>
          </li>
          <li class="nav-item">
            <a class="nav-link"  v-show="showMenu() && statusShowMenu()" href="#">Link</a>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle"  v-show="showMenu()" href="#" id="dropdownId" data-toggle="dropdown" aria-haspopup="true"
              aria-expanded="false">Classes</a>
            <div class="dropdown-menu" aria-labelledby="dropdownId">
          <li class="nav-item">

            <router-link class="dropdown-item" to="/clientes"
              v-show="showMenu() && statusShowMenu()">Cliente</router-link>
          </li>
          <li class="nav-item">
            <router-link class="dropdown-item" to="/funcionarios"
              v-show="showMenu() && statusShowMenu()">Funcionario</router-link>
          </li>
          <li class="nav-item">
            <router-link class="dropdown-item" to="/perfis" v-show="showMenu() && statusShowMenu()">Perfil</router-link>
          </li>
          <li class="nav-item">
            <router-link class="dropdown-item" to="/funcinalidades"
              v-show="showMenu() && statusShowMenu()">Funcionalidade</router-link>
          </li>
          <li class="nav-item">
            <router-link class="dropdown-item" to="/reservas" v-show="showMenu()">Reservas</router-link>
          </li>
          <li class="nav-item">
            <router-link class="dropdown-item" to="/produtos"
              v-show="showMenu() && statusShowMenu()">Produto</router-link>
          </li>
          <li class="nav-item">
            <router-link class="dropdown-item" to="/fotos" v-show="showMenu() && statusShowMenu()">Foto</router-link>
          </li>
          <li class="nav-item">
            <router-link class="dropdown-item" to="/tiposprodutos" v-show="showMenu() && statusShowMenu()">Tipos
              Produto</router-link>
          </li>
          <li class="nav-item">
            <router-link class="dropdown-item" to="/locacoes"
              v-show="showMenu() && statusShowMenu()">Locacao</router-link>
          </li>
          <li class="nav-item">
            <router-link class="dropdown-item" to="/acompanhamentos"
              v-show="showMenu() && statusShowMenu()">Acompanhamento</router-link>
          </li>
          <li class="nav-item">
            <router-link class="dropdown-item" to="/situacoes"
              v-show="showMenu() && statusShowMenu()">Sitacao</router-link>
          </li>
          <li class="nav-item">
            <router-link class="dropdown-item" to="/parcelamentos"
              v-show="showMenu() && statusShowMenu()">Parcelamento</router-link>
          </li>


          <li class="nav-item">
            <router-link class="dropdown-item" to="/" v-on:click.native="logout()" v-show="showMenu()"
              replace>Logout</router-link>
          </li>

      </div>
      </li>
      </ul>
    </template>
      <ul v-show="showMenu()">
        <form class="form-inline my-2 my-lg-0">
          <input class="form-control mr-sm-2" type="text" placeholder="Search">
          <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </form>
      </ul>

  </div>
  </nav>

  <div class="container mt-3">
    <router-view />
  </div>

  </div>
</template>

<script>

import Login from './components/Login.vue';
import LoginDataService from './services/LoginDataService';
import ClienteDataService from './services/ClienteDataService';
import PessoaDataService from './services/PessoaDataService';
import FuncionarioDataService from './services/FuncionarioDataService';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';






export default {
  name: "App",
  data() {
    return {
      pessoas: [],
      currentLogin: null,
      autenthicate: false
    }
  },
  methods: {

    setCurrentLogin(pessoa, index) {

      this.currentLogin = pessoa;
      this.currentIndex = index;
    },
    logout() {
      localStorage.removeItem('authUser');
      this.$router.push({ name: "login" });
    },
    statusShowMenu() {
      let aux = localStorage.getItem('authUser', this.pessoas.tipo)
      if (aux.includes('F')) {
        return true
      } else {
        return false
      }

    },
    showMenu() {

      if (localStorage.getItem('authUser')) {

        return this.autenthicate = true;


      } else {

        return this.autenthicate = false;
      }

    }

  },
  mounted() {
 
  }

}

</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
   
  
}
</style>
