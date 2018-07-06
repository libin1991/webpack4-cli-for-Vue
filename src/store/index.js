import Vue from 'vue'
import vuex from 'vuex'

import vuexDemo from './modules/vuexDemo'

Vue.use(vuex)

export default new vuex.Store({
  modules: {
    vuexDemo
  }
})

// export default new vuex.Store({
//   state: {
//     count: 0
//   },
//   mutations: {
//     add (state, n) {
//       state.count += n
//     },
//     minus (state, n) {
//       state.count -= n
//     }
//   },
//   getters: {
//     twoCount: (state) => {
//       return state.count + 5
//     }
//   },
//   actions: {
//     add ({ commit }) {
//       commit('add', 1)
//     }
//   }
// })
