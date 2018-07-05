import Vue from 'vue'
import App from './App'
import router from './router'

// import './assets/css/main.styl'
// import './assets/css/main.css'

// 全局广播
Vue.prototype.$eventHub = Vue.prototype.$eventHub || new Vue()

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
