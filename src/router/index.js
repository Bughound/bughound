import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Observations from '../views/Observations.vue'
import Mapa from '../views/Mapa.vue'
import Observation from '../views/Observation.vue'
import Register from '../views/Register.vue'

import isAuthenticated from '@/helpers/isAuthenticated.js'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    beforeEnter: (to, from, next) => {
      if (isAuthenticated()) next()
      else next()
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/',
    name: 'Inicio',
    component: Mapa
  },
  {
    path: '/observations',
    name: 'Observaciones',
    component: Observations
  },
  {
    path: '/observations/:id',
    name: 'Observacion',
    component: Observation
  },
  {
    path: '/mapa',
    name: 'Mapa',
    component: Mapa
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
