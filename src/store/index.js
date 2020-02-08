import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
    maskData: []
  },
  getters: {
    getMaskData: (state) => state.maskData
  },
  actions: {
    getData: ({
      commit
    }, payload) => {
      const url = 'https://raw.githubusercontent.com/kiang/pharmacies/master/json/points.json'
      axios.get(url).then((res) => {
        commit('GET_MASKDATA', res.data.features)
      })
    }
  },
  mutations: {
    GET_MASKDATA: (state, payload) => {
      state.maskData = payload
    }
  }
})
