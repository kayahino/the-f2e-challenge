<template>
  <div id="app">
    <Header />
    <router-view />
    <!-- <Map
      :coords="state.currentCoords"
      :maskData="state.maskData"
      v-if="state.tab === 'map' && state.isLoaded"
    /> -->
  </div>
</template>

<script>
import { reactive, onMounted, computed } from '@vue/composition-api'
import Header from '@/components/Header.vue'
export default {
  name: 'app',
  components: {
    Header
  },
  setup (props, { root }) {
    onMounted(async () => {
      root.$store.dispatch('getData')
      // const { data } = await context.root.$http.get(
      //   'https://raw.githubusercontent.com/kiang/pharmacies/master/json/points.json'
      // )
      // state.maskData = data
      // state.currentCoords = await getCurrentGeoLocation()
      // state.isLoaded = true
      // state.filterData = data.features.filter(el => {
      //   const { longitude, latitude } = state.currentCoords
      //   return (
      //     getDistance(
      //       latitude,
      //       longitude,
      //       el.geometry.coordinates[1],
      //       el.geometry.coordinates[0]
      //     ) <= 1
      //
      // })
    })
    const state = reactive({
      tab: 'list',
      filterData: null,
      currentCoords: {},
      isLoaded: false
    })

    const maskData = computed(() => root.$store.state.maskData)

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

    function getDistance (oLat, oLon, nLat, nLon) {
      const R = 6371 // km
      const dLat = toRad(nLat - oLat)
      const dLon = toRad(nLon - nLon)
      const lat1 = toRad(oLat)
      const lat2 = toRad(nLat)

      var a =
        Math.pow(Math.sin(dLat / 2), 2) +
        Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dLon / 2), 2)
      var c = 2 * Math.asin(Math.sqrt(a))
      return c * R
    }

    // Converts numeric degrees to radians
    function toRad (Value) {
      return (Value * Math.PI) / 180
    }

    return {
      state,
      maskData,
      getCurrentGeoLocation,
      getDistance
    }
  }
}
</script>

<style lang="scss">
#app {
  color: #34495E;
  font-size: 16px;
}
</style>
