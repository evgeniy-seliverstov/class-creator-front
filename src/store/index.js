import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    types: [
      { id: 1, name: "int" },
      { id: 2, name: "string" },
      { id: 3, name: "datetime" },
    ],
    objects: [
      {
        id: 1000,
        name: "ship",
        fields: [
          { name: "number", type: 1 },
          { name: "count", type: 2 },
          { name: "membership", type: 3 }
        ]
      },
    ]
  },
  mutations: {
    addObject(state, object) {
      let id = state.objects.length == 0 ? 1000 : state.objects[state.objects.length - 1].id + 1;
      state.objects.push({ id, ...object });
    },
    changeObject(state, object) {
      let obj = state.objects.find(v => v.id == object.id);
      Object.assign(obj, object);
    }
  },
  actions: {
  },
  modules: {
  }
})
