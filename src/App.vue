<template>
  <div id="app">
    <div class="mapContainer" id="map"></div>
  </div>
</template>

<script>
import * as L from 'leaflet'
import { onMounted, reactive } from '@vue/composition-api'
export default {
  name: 'app',
  components: {
  },
  setup (props, context) {
    onMounted(async () => {
      const { data } = await context.root.$http.get('https://raw.githubusercontent.com/kiang/pharmacies/master/json/points.json')
      state.maskData = data.features
      state.isLoaded = true
      createMap()
    })

    const state = reactive({
      isLoaded: false,
      maskData: null
    })

    function createMap () {
      var map = L.map('map').setView([-25.363, 131.044], 5)
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '<a href="https://www.openstreetmap.org/">OSM</a>',
        maxZoom: 18
      }).addTo(map)
    }

    return {
      state
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

</style>
