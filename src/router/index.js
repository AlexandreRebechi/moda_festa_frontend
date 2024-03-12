import Vue from 'vue'
import Router from 'vue-router'

import login from  '@/components/Login'
import home from  '@/components/Home'
import listClientes from '../components/cliente/List.vue'
import editCliente   from  '@/components/cliente/Edit'
import novoCliente from  '@/components/cliente/Add'
import listFuncionario from '@/components/funcionario/List'
import editFuncionario from '@/components/funcionario/Edit'
import novoFuncionario from '@/components/funcionario/Add'

Vue.use(Router)

const router = new Router({
  mode: "history",
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/clientes',
      name: 'clientes-list',
      component: listClientes    
    },
    {
      path: '/cliente/:id',
      name: "cliente-edit",
      component: editCliente
    },
    {
      path: '/addcliente',
      name: "cliente-add",
      component: novoCliente
    },
    {
      path: '/funcionario',
      name: 'funcionario-list',
      component: listFuncionario  
    },
    {
      path: '/funcionario/:id',
      name: 'funcionario-edit',
      component: editFuncionario  
    },
    {
      path: '/addfuncionario',
      name: 'funcionario-add',
      component: novoFuncionario  
    }

   /* {
      path: '/patentes',
      name: 'patentes-list',
      component: listPatentes    
    },
    {
      path: '/addpatente',
      name: "patente-add",
      component: novoPatente
    },
    {
      path: '/patente/:id',
      name: "patente-edit",
      component: editPatente
    }*/
  ]
})

router.beforeEach((to, from, next) => {
    
  if (to.name !== 'login' && !localStorage.getItem('authUser')){
     next({name: 'login'})
  } else {
     next()
  }
  
})

export default router;