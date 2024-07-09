import Vue from 'vue'
import Router from 'vue-router'

import login from  '../components/Login'
import home from  '@/components/Home'
import listClientes from '../components/cliente/List.vue'
import editCliente  from  '@/components/cliente/Edit'
import novoCliente from  '@/components/cliente/Add'
import listFuncionarios from '@/components/funcionario/List'
import editFuncionario from '@/components/funcionario/Edit'
import novoFuncionario from '@/components/funcionario/Add'
import listperfil from '@/components/perfil/List'
import editPerfil from '@/components/perfil/Edit'
import novoPerfil from '@/components/perfil/Add'
import listPerfil from '@/components/funcionalidade/List'
import editFuncionalidade from '@/components/funcionalidade/Edit'
import novoFuncionalidade from '@/components/funcionalidade/Add'
import listReservas from '@/components/reserva/List'
import editReserva from '@/components/reserva/Edit'
import novoReserva from '@/components/reserva/Add'
import listProdutos from '@/components/produto/List'
import editProduto from '@/components/produto/Edit'
import novoProduto from '@/components/produto/Add'
import listFotos from '@/components/foto/List'
import editFoto from '@/components/foto/Edit'
import novoFoto from '@/components/foto/Add'
import listTiposProdutos from '@/components/tiposproduto/List' 
import editTiposProduto from '@/components/tiposproduto/Edit'
import novoTiposProduto from '@/components/tiposproduto/Add' 
import listLocacoes from '@/components/locacao/List'
import editLocacao from '@/components/locacao/Edit'
import novoLocacao from '@/components/locacao/Add'
import listAcompanhamentos from '@/components/acompanhamento/List'
import editAcompanhamento from '@/components/acompanhamento/Edit'
import novoAcompanhamento from '@/components/acompanhamento/Add'
import listSitacoes from '@/components/sitacao/List'
import editSitacao from '@/components/sitacao/Edit'
import novoSitacao from '@/components/sitacao/Add'
import listParcelamentos from '@/components/parcelamento/List'
import editParcelamento from '@/components/parcelamento/Edit'
import novoParcelamento from '@/components/parcelamento/Add'


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
      path: '/funcionarios',
      name: 'funcionario-list',
      component: listFuncionarios  
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
    },
    {
      path: '/perfis',
      name: 'perfis-list',
      component: listperfil
    },
    {
      path: '/perfil/:id',
      name: 'perfil-edit',
      component: editPerfil
    },
    {
      path: '/addperfil',
      name: 'perfil-add',
      component: novoPerfil
    },
    {
      path: '/funcinalidades',
      name: 'funcionalidades-list',
      component: listPerfil
    },
    {
      path: '/funcinalidade/:id',
      name: 'funcinalidade-edit',
      component: editFuncionalidade
    },
    {
      path: '/addfuncinalidade',
      name: 'funcinalidade-add',
      component: novoFuncionalidade
    },
    {
      path: '/reservas',
      name: 'reservas-list',
      component: listReservas
    },
    {
      path: '/reserva/:id',
      name: 'reserva-edit',
      component: editReserva
    },
    {
      path: '/addreserva',
      name: 'reserva-add',
      component: novoReserva

    },
    {
      path: '/produtos',
      name: 'produtos-list',
      component: listProdutos
    },
    {
      path: '/produto/:id',
      name: 'produto-edit',
      component: editProduto
    },
    {
      path: '/addproduto',
      name: 'produto-add',
      component: novoProduto
    },
    {
      path: '/fotos',
      name: 'fotos-list',
      component: listFotos
    },
    {
      path: '/foto/:id',
      name: 'foto-edit',
      component: editFoto
    },
    {
      path: '/addfoto',
      name: 'foto-add',
      component: novoFoto
    },
    {
      path: '/tiposprodutos',
      name: 'tiposprodutos-list',
      component: listTiposProdutos
    },
    {
      path: '/tiposproduto/:id',
      name: 'tiposproduto-edit',
      component: editTiposProduto
    },
    {
      path: '/addtiposproduto',
      name: 'tiposproduto-add',
      component: novoTiposProduto
    },
    {
      path: '/locacoes',
      name: 'locacao-list',
      component: listLocacoes
    },
    {
      path: '/locacao/:id',
      name: 'locacao-edit',
      component: editLocacao
    },
    {
      path: '/addLocacao',
      name: 'locacao-add',
      component: novoLocacao
    },
    {
      path: '/acompanhamento',
      name: 'acompanhamento-list',
      component: listAcompanhamentos
    },
    {
      path: '/acompanhamento/:id',
      name: 'acompanhamento-edit',
      component: editAcompanhamento
    },
    {
      path: '/addacompanhamento',
      name: 'acompanhamento-add',
      component: novoAcompanhamento
    },
    {
      path: '/sitacao',
      name: 'sitacao-list',
      component: listSitacoes
    },
    {
      path: '/sitacao/:id',
      name: 'sitacao-edit',
      component: editSitacao
    },
    {
      path: '/addsitacao',
      name: 'sitacao-add',
      component: novoSitacao
    },
    {
      path: '/parcelamentos',
      name: 'parcelamento-list',
      component: listParcelamentos
    },
    {
      path: '/parcelamentos/:id',
      name: 'parcelamento-edit',
      component: editParcelamento
    },
    {
      path: '/addparcelamentos',
      name: 'parcelamento-add',
      component: novoParcelamento
    }


  
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