import Vue from 'vue'
import VueCompositionApi from '@vue/composition-api'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Vuex from 'vuex'
import utils from '@/utils'
import router from './router'
import store from './store'
import 'normalize.css'
import '@fortawesome/fontawesome-free/css/all.css'

Vue.config.productionTip = false
Vue.use(VueCompositionApi)
Vue.use(VueAxios, axios)
Vue.use(Vuex)
Vue.prototype.$utils = utils

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
