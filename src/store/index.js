import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
    maskData: [],
    location: {},
    lastUpdated: '',
    isLoading: false
  },
  getters: {
    getMaskData: (state) => state.maskData
  },
  actions: {
    getData: ({
      commit
    }, payload) => {
      const url = 'https://raw.githubusercontent.com/kiang/pharmacies/master/json/points.json'
      commit('SET_LOADING', true)
      axios.get(url).then((res) => {
        const d = new Date()
        const time = `${d.getHours()}:${d.getMinutes()}:${d.getMilliseconds()}`
        commit('GET_MASKDATA', res.data.features)
        commit('UPDATE_TIME', time)
        commit('SET_LOADING', false)
      })
    },

    getLocation: async ({ commit }, payload) => {
      commit('SET_LOADING', true)
      const location = await getCurrentGeoLocation()
      commit('SET_LOCATION', location)
      commit('SET_LOADING', false)
    }
  },
  mutations: {
    GET_MASKDATA: (state, payload) => {
      state.maskData = payload
    },
    SET_LOCATION: (state, payload) => {
      state.location = payload
    },
    SET_LOADING: (state, payload) => {
      state.isLoading = payload
    },
    UPDATE_TIME: (state, payload) => {
      state.lastUpdated = payload
    }
  }
})

function getCurrentGeoLocation () {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        pos => {
          resolve(pos.coords)
        },
        err => {
          console.warn(`ERROR ${err.code}: ${err.message}`)
          reject(err)
        }
      )
    }
  })
}
