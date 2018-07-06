import Vue from 'vue'
import Router from 'vue-router'

import Home from '../views/home/home.vue'
import Demo from '../views/demo/demo.vue'
import VuexDemo from '../views/vuexDemo/vuexDemo.vue'

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'demo',
    component: Demo
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
  }
]
export default new Router({ routes })
