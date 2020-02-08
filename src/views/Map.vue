<template>
  <div id="map">
    <MaskMap
      ref="map"
      :coords="coords"
      :maskData="maskData"
    />
    <div>
      <button @click="flyTo">get current position</button>
    </div>
  </div>
</template>

<script>
import { reactive, ref, onMounted } from '@vue/composition-api'
import MaskMap from '@/components/Map'
export default {
  name: 'view-map',
  props: [
    'coords',
    'maskData'
  ],
  components: {
    MaskMap
  },
  setup (props, context) {
    onMounted(() => {
    })
    const map = ref(null)

    const state = reactive({
    })

    async function flyTo () {
      map.value.flyToCurrentPos()
    }

    return {
      state,
      flyTo,
      map
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

#map-container {
  height: 400px;
}
</style>
