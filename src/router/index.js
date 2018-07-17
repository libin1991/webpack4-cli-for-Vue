import Vue from 'vue'
import Router from 'vue-router'

import Home from '../views/home/home.vue'
import Demo from '../views/demo/demo.vue'
import VuexDemo from '../views/vuexDemo/vuexDemo.vue'
import EleDemo from '../views/eleDemo/eleDemo.vue'

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/home',
    name: 'home',
    component: Home
  },
  {
    path: '/demo',
    name: 'demo',
    component: Demo
  },
  {
    path: '/vuexDemo',
    name: 'vuexDemo',
    component: VuexDemo
  },
  {
    path: '/eleDemo',
    name: 'eleDemo',
    component: EleDemo
  },
]
export default new Router({ routes })
