<template>
  <div class="wrapper">
    <List />
    <MaskMap
      ref="map"
    />
  </div>
</template>

<script>
import { reactive, ref, onMounted } from '@vue/composition-api'
import MaskMap from '@/components/Map'
import List from '@/views/List'
export default {
  name: 'view-map',
  props: [
    'coords',
    'maskData'
  ],
  components: {
    MaskMap,
    List
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

<style lang="scss" scoped>
  .wrapper {
    display: flex;
  }
</style>
