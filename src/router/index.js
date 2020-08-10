import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Observations from '../views/Observations.vue'
import Mapa from '../views/Mapa.vue'
import Observation from '../views/Observation.vue'
import Identify from '../views/Identify/Identify.vue'
import Register from '../views/Register.vue'
import TakePicture from '../views/TakePicture.vue'

import isAuthenticated from '@/helpers/isAuthenticated.js'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home,
    beforeEnter: (to, from, next) => {
      if (!isAuthenticated()) next('/login')
      else next()
    }
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
    component: Register,
    beforeEnter: (to, from, next) => {
      if (isAuthenticated()) next()
      else next()
    }
  },
  {
    path: '/',
    name: 'Inicio',
    component: Mapa,
    beforeEnter: (to, from, next) => {
      if (!isAuthenticated()) next('/login')
      else next()
    }
  },
  {
    path: '/observations',
    name: 'Observaciones',
    component: Observations,
    beforeEnter: (to, from, next) => {
      if (!isAuthenticated()) next('/login')
      else next()
    }
  },
  {
    path: '/observations/:id',
    name: 'Observacion',
    component: Observation,
    beforeEnter: (to, from, next) => {
      if (!isAuthenticated()) next('/login')
      else next()
    }
  },
  {
    path: '/mapa',
    name: 'Mapa',
    component: Mapa,
    beforeEnter: (to, from, next) => {
      if (!isAuthenticated()) next('/login')
      else next()
    }
  },
  {
    path: '/take_picture',
    name: 'Tomar foto',
    component: TakePicture
  },
  {
    path: '/identify',
    name: 'Identificacion',
    component: Identify
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
