import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    types: [
      { id: 1, name: "int" },
      { id: 2, name: "string" },
      { id: 3, name: "datetime" },
    ]
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
