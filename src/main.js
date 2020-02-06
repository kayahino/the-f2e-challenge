import Vue from 'vue'
import VueCompositionApi from '@vue/composition-api'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.config.productionTip = false
Vue.use(VueCompositionApi)
Vue.use(VueAxios, axios)

new Vue({
  render: h => h(App)
}).$mount('#app')
