import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import business from './modules/business'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: () => {
    return {
      count: 0
    }
  },
  mutations: {
    increment(state) {
      state.count++
    }
  },
  actions: {
    add({ commit }, paylod) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          commit('increment')
          resolve()
        }, 1000)
      })
    }
  },
  getters: {
    count(state) {
      // 额外处理state中的状态值
      return state.count + ','
    }
  },
  modules: {
    user: user,
    business: business
  }
})
export default store
