import Vue from 'vue'
import Router from 'vue-router'

import Home from '../views/home/home.vue'
import Demo from '../views/demo/demo.vue'

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/demo',
    name: 'demo',
    component: Demo
  }
]
export default new Router({
  routes
})
