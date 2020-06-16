import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    types: [
      { id: 0, name: "byte" },
      { id: 1, name: "short" },
      { id: 2, name: "char" },
      { id: 3, name: "int" },
      { id: 4, name: "long" },
      { id: 5, name: "float" },
      { id: 6, name: "double" },
      { id: 7, name: "string" },
      { id: 8, name: "boolean" },
      { id: 9, name: "date" },
      { id: 10, name: "datetime" },
    ],
    objects: [{"id":1000,"name":"shop","fields":[{"name":"name","type":7}],"position":{"x":293,"y":233}},{"id":1001,"name":"view_product","fields":[{"name":"name","type":7},{"name":"shelf_life","type":3}],"position":{"x":1432,"y":435}},{"id":1002,"name":"owner","fields":[{"name":"name","type":7},{"name":"pasport","type":7},{"name":"patronomic","type":7},{"name":"surname","type":7}],"position":{"x":1443,"y":25}},{"id":1003,"name":"warehouse","fields":[{"name":"address","type":7},{"name":"capacity","type":3},{"name":"name","type":7},{"name":"id_owner","type":1002}],"position":{"x":1056,"y":25}},{"id":1004,"name":"car","fields":[{"name":"id_owner","type":1002},{"name":"number","type":7},{"name":"capacity","type":3},{"name":"model","type":7}],"position":{"x":1059,"y":230}},{"id":1005,"name":"delivery","fields":[{"name":"id_warehouse","type":1003},{"name":"id_car","type":1004},{"name":"id_shop","type":1000}],"position":{"x":684,"y":234}},{"id":1006,"name":"product","fields":[{"name":"id_delivery","type":1005},{"name":"id_view_product","type":1001},{"name":"price","type":6},{"name":"count","type":3},{"name":"remaining_count","type":3}],"position":{"x":1064,"y":434}}],
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
      let f = true;
      state.objects.forEach(v => {
        v.fields.forEach(e => {
          if (e.type == id) {
            f = false;
          }
        })
      });
      if (f) state.objects = state.objects.filter(v => v.id != id);
      else Vue.noty.error("Класс содержит подклассы. Прежде удалите подклассы.");
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
