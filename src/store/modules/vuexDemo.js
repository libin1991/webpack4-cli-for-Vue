const state = {
  count: 0
}

const getters = {
  twoCount: (state) => {
    return state.count + 5
  }
}

const mutations = {
  add (state, n) {
    state.count += n
  },
  minus (state, n) {
    state.count -= n
  }
}

const actions = {
  add ({ commit }) {
    commit('add', 1)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
