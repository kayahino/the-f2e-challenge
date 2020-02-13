import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
    isMobile: false,
    maskData: [],
    dataCache: {},
    location: {},
    // selectedPoint: null,
    lastUpdated: '',
    isLoading: false,
    status: null
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
        commit('GET_MASKDATA', res.data)
        commit('UPDATE_TIME', time)
        commit('SET_LOADING', false)
      })
    },

    getLocation: async ({ commit }, payload) => {
      commit('SET_LOADING', true)
      const location = await getCurrentGeoLocation()
      commit('SET_LOCATION', location)
      // commit('SET_STATUS', 'LOCATE_BY_LATLNG')
      commit('SET_LOADING', false)
    },

    setDataCache: ({ commit }, payload) => {
      commit('SET_CACHE', payload)
    },

    checkIfMobile: ({ commit }, payload) => {
      if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
        commit('SET_IS_MOBILE', true)
      } else {
        commit('SET_IS_MOBILE', false)
      }
    }

    // selectPoint: ({ commit }, payload) => {
    //   commit('SET_POINT_MARKER', payload)
    // }
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
    },
    SET_STATUS: (state, payload) => {
      state.status = payload
    },
    SET_CACHE: (state, payload) => {
      state.dataCache = payload
    },
    SET_IS_MOBILE: (state, payload) => {
      state.isMobile = payload
    }
    // SET_POINT_MARKER: (state, payload) => {
    //   state.selectedPoint = payload
    // }
  }
})

function getCurrentGeoLocation () {
  return new Promise((resolve, reject) => {
    if ('geolocation' in navigator) {
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
