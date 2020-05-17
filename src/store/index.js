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
        position: {
          x: 100,
          y: 100
        },
        fields: [
          { name: "number", type: 1 },
          { name: "count", type: 2 },
          { name: "membership", type: 3 }
        ]
      },
      {
        id: 1001,
        name: "ship2",
        position: {
          x: 500,
          y: 200
        },
        fields: [
          { name: "number", type: 1 },
          { name: "count", type: 2 },
          { name: "membership", type: 1000 }
        ]
      },
    ],
    activeObject: null
  },
  mutations: {
    addObject(state, object) {
      let id = state.objects.length == 0 ? 1000 : state.objects[state.objects.length - 1].id + 1;
      state.objects.push({ id, ...object, position: { x: 100, y: 100 }});
    },
    changeObject(state, object) {
      let obj = state.objects.find(v => v.id == object.id);
      Object.assign(obj, object);
    },
    deleteObject(state, id) {
      state.objects = state.objects.filter(v => v.id != id);
    },

    setActiveObject(state, id) {
      state.activeObject = state.objects.find(v => v.id == id);
    },
    removeActiveObject(state) {
      state.activeObject = null;
    },
    changeCoordinates(state, mouse) {
      if (state.activeObject) {
        state.activeObject.position.x = mouse.x - mouse.shiftX;
        state.activeObject.position.y = mouse.y - mouse.shiftY;
      }
    }
  },
  actions: {
  },
  modules: {
  }
})
