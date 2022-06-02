const user = {
  namespaced: true,
  state: () => ({
    friends: []
  }),
  mutations: {
    addFriend(state, payload) {
      state.friends.push(payload)
    },
    fetchFriends(state, payload) {
      console.log('------:', payload)
      state.friends.push(...payload)
    }
  },
  actions: {
    addFriend({ commit }, payload) {
      commit('addFriend', payload)
    },
    fetchFriends({ commit }, payload) {
      const userId = payload.userId
      return new Promise(resolve => {
        setTimeout(() => {
          console.log('----:', userId)
          const friends = [
            {
              name: 'zh' + parseInt(Math.random()) * 100,
              age: parseInt(Math.random() * 30),
              userId: parseInt(Math.random() * 1000) + ''
            },
            {
              name: 'li' + parseInt(Math.random()) * 100,
              age: parseInt(Math.random() * 100),
              userId: parseInt(Math.random() * 1000) + ''
            },
            {
              name: 'ww' + parseInt(Math.random()) * 100,
              age: parseInt(Math.random() * 100),
              userId: parseInt(Math.random() * 1000) + ''
            }
          ]
          commit('fetchFriends', friends)
          resolve()
        }, 2 * 1000)
      })
    }
  },
  getters: {
    friendsCount(state) {
      return state.friends.length
    }
  }
}

export default user
