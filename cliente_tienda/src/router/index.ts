import ArticulosAgregarVue from '@/modulos/articulos/vistas/ArticulosAgregarVue.vue'
import ArticulosEditarVue from '@/modulos/articulos/vistas/ArticulosEditarVue.vue'
import ArticulosEliminarVue from '@/modulos/articulos/vistas/ArticulosEliminarVue.vue'
import ArticulosVue from '@/modulos/articulos/vistas/ArticulosVue.vue'
import ClientesAgregarVue from '@/modulos/clientes/vistas/ClientesAgregarVue.vue'
import ClientesEditarVue from '@/modulos/clientes/vistas/ClientesEditarVue.vue'
import ClientesEliminarVue from '@/modulos/clientes/vistas/ClientesEliminarVue.vue'
import ClientesVue from '@/modulos/clientes/vistas/ClientesVue.vue'
import Personal_AgregarVue from '@/modulos/personal/vistas/Personal_AgregarVue.vue'
import PersonalEditarVue from '@/modulos/personal/vistas/PersonalEditarVue.vue'
import PersonalElimininarVue from '@/modulos/personal/vistas/PersonalElimininarVue.vue'
import PersonalVue from '@/modulos/personal/vistas/personalVue.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    //  {
    //    path: '/',
    //    name: 'home',
    //    component: HomeView,
    //  },
     {
      path: '/personal',
      name: 'personal',
      component: PersonalVue,
    },
    {
      path: '/personal/agregar',
      name: 'personalAgregar',
      component: Personal_AgregarVue,
    },
    {
      path: '/personal/:id/editar',
      name: 'personalEditar',
      component: PersonalEditarVue,
    },
    {
      path: '/personal/:id/eliminar',
      name: 'personalEliminar',
      component: PersonalElimininarVue,
    },
    {
      path: '/articulos',
      name: 'articulos',
      component: ArticulosVue,
    },
    {
      path: '/articulos/agregar',
      name: 'articulosAgregar',
      component: ArticulosAgregarVue,
    },
    {
      path: '/articulos/:id/editar',
      name: 'articulosEditar',
      component: ArticulosEditarVue,
    },
    {
      path: '/articulos/:id/eliminar',
      name: 'articulosEliminar',
      component: ArticulosEliminarVue,
    },
    {
      path: '/clientes',
      name: 'clientes',
      component: ClientesVue,
    },
    {
      path: '/clientes/agregar',
      name: 'clientesAgregar',
      component: ClientesAgregarVue,
    },
    {
      path: '/clientes/:id/editar',
      name: 'clientesEditar',
      component: ClientesEditarVue,
    },
    {
      path: '/clientes/:id/eliminar',
      name: 'clientesEliminar',
      component: ClientesEliminarVue,
    },
  ],
})

export default router
