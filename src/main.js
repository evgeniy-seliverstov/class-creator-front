import Vue from 'vue'
import App from './App.vue'
import store from './store'
import vuetify from './plugins/vuetify';
import VueNoty from 'vuejs-noty'
import 'vuejs-noty/dist/vuejs-noty.css'

Vue.config.productionTip = false

Vue.use(VueNoty, {
  theme: "bootstrap-v4",
  timeout: 2000,
})

new Vue({
  store,
  vuetify,
  render: function (h) { return h(App) }
}).$mount('#app')
