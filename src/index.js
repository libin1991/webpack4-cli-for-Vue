import Vue from 'vue'
import ElementUI from 'element-ui'
import './globle/theme-chalk/index.css'
import App from './App'
import router from './router'
import store from './store/index.js'

// import './globle/rem' import './globle/base.css' import
// './assets/css/main.styl' import './assets/css/main.css'
Vue.use(ElementUI)

// 全局广播
Vue.prototype.$eventHub = Vue.prototype.$eventHub || new Vue()

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
