<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
  </div>
</template>

<script>
import { onMounted, reactive } from '@vue/composition-api'
export default {
  name: 'app',
  components: {
  },
  setup (props, { root }) {
    onMounted(async () => {
      const { data } = await root.$http.get('https://raw.githubusercontent.com/kiang/pharmacies/master/json/points.json')
      state.maskData = data.features
      state.isLoaded = true
    })

    const state = reactive({
      isLoaded: false,
      maskData: null
    })

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
