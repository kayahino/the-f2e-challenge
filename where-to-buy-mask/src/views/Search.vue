<template>
  <div class="search">
    <div class="search__bar">
      <div class="back" @click="$router.push({ name: 'list' })">
        <span class="dash top"></span>
        <span class="dash bottom"></span>
      </div>
      <div class="input-area">
        <input type="text"
          class="input" placeholder="請輸入地址或區域"
          v-model.trim="address"
          @blur="state.isFocus = false"
          @focus="state.isFocus = true; state.isPasted = false"
        >
        <div class="cancel-icon" @click="cancel" v-if="address">
          <i class="fas fa-times"></i>
        </div>
      </div>
      <div class="locate-icon" @click="search">
        <i class="fas fa-map-marker-alt"></i>
      </div>
    </div>
    <div class="search__history">
      <div class="history__header">
        <div class="title">最近搜尋</div>
        <div class="clear" @click="clearHistory">清除</div>
      </div>
      <transition-group name="list" class="history__list" tag="ul">
        <li v-for="(item, index) in history" :key="index" @click="address = item; state.isPasted = true">{{ item }}</li>
      </transition-group>
    </div>
    <div class="locate">
      <p>使用目前位置</p>
      <div class="icon" @click="locateByLatLng">
        <img src="@/assets/img/ic_location.png" draggable="false">
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref, computed, reactive, onUnmounted } from '@vue/composition-api'
import GoogleMapsApiLoader from 'google-maps-api-loader'
let google
let geocoder
export default {
  setup (props, context) {
    onMounted(async () => {
      google = await GoogleMapsApiLoader({
        apiKey: 'AIzaSyDuABb63Waunx22fh_JSS8nNEHlxDh0dRQ'
      })
      geocoder = new google.maps.Geocoder()
      history.value = JSON.parse(localStorage.getItem('searchHistory')) || []
    })
    onUnmounted(() => {
    })
    const coords = computed(() => context.root.$store.state.location)
    const address = ref(null)
    const history = ref(null)

    const state = reactive({
      isFocus: false,
      isPasted: false
    })

    async function search () {
      if (!address.value) return false
      if (history.value.length > 4) await removeItem(history.value)
      if (!state.isPasted) {
        history.value.push(address.value)
        localStorage.setItem('searchHistory', JSON.stringify(history.value))
      }
      locateByAddress(address.value)
      setTimeout(() => {
        context.root.$router.push({ name: 'list' })
      }, 1000)
    }

    function removeItem (data) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          data.splice(0, 1)
          resolve()
        }, 100)
      })
    }
    function locateByAddress (address) {
      geocoder.geocode(
        {
          'address': address
        }, (results, status) => {
          if (status === google.maps.GeocoderStatus.OK) {
            const location = results[0].geometry.location
            const { lat, lng } = location
            context.root.$store.commit('SET_LOCATION', { latitude: lat(), longitude: lng() })
            context.root.$store.commit('SET_STATUS', address)
          } else {
            alert(`${status}`)
          }
        }
      )
    }

    function locateByLatLng () {
      context.root.$store.dispatch('getLocation')
      context.root.$store.commit('SET_STATUS', 'LOCATE_BY_LATLNG')
      context.root.$router.push({ name: 'list' })
    }

    function cancel () {
      address.value = ''
    }

    function clearHistory () {
      history.value = []
      localStorage.setItem('searchHistory', JSON.stringify(history.value))
    }

    return {
      state,
      address,
      coords,
      search,
      history,
      locateByAddress,
      locateByLatLng,
      clearHistory,
      cancel
    }
  }
}
</script>

<style lang="scss">
  .search {
    position: relative;
    min-width: 320px;
    max-width: 600px;
  }
  .search__bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;

    .back {
      position: relative;
      width: 28px;
      min-width: 28px; // safari
      height: 44px;
      margin-right: 10px;
      cursor: pointer;
      > a {
        color: #70777C;
      }

      .dash {
        position: absolute;
        top: 50%;
        display: block;
        width: calc(100% - 10px);
        height: 5px;
        border-radius: 4px;
        background-color: #70777C;

        &.top {
          transform: translateY(-100%) rotate(-45deg);
        }
        &.bottom {
          transform: translateY(100%) rotate(45deg);
        }
      }
    }
  }
  .input-area {
    position: relative;
    // flex: 1 0 auto;
    width: 100%;
    .input {
      appearance: none;
      // width: calc(100% - 25px);
      width: 100%;
      height: 44px;
      padding: 0 40px 0 10px;
      color: #34495E;
      border: 1px solid #34495E33;
      border-radius: 10px;
      outline: none;
      line-height: normal;
    }

    .cancel-icon {
      position: absolute;
      top: 50%;
      right: 10px;
      width: 24px;
      height: 24px;
      text-align: center;
      line-height: 24px;
      font-size: 14px;
      color: #fff;
      background-color: #566778;
      transform: translateY(-50%);
      border-radius: 50%;
      opacity: 0.7;
      cursor: pointer;
    }
  }
  .locate-icon {
    // position: absolute;
    // top: 50%;
    // left: calc(100% - 12px);
    margin-left: 15px;
    font-size: 24px;
    color: #566778;
    // transform: translateY(-50%);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .history__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 20px;
    color: #fff;
    font-size: 12px;
    background-color: #34495E;

    .clear {
      padding: 4px 10px;
      border: 2px solid #FAFAFA;
      border-radius: 100px;
      opacity: 0.8;
      cursor: pointer;
    }
  }

  .history__list {
    list-style: none;
    margin: 0;
    padding: 20px;
    line-height: 1.6;
    cursor: pointer;

    > li {
      padding: 10px 12px;
      border-bottom: 1px solid #00000036;
    }
  }

  .locate {
    position: absolute;
    right: 16px;
    bottom: 24px;
    display: flex;
    align-items: center;
    font-size: 12px;
    font-weight: bold;
    cursor: pointer;

    .icon {
      margin-left: 10px;
      width: 44px;
      height: 44px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #fff;
      box-shadow: 0 3px 6px #00000029;
      border-radius: 50%;

      > img {
        width: 24px;
        height: auto;
        vertical-align: middle;
      }
    }
  }

  .list-enter,
  .list-leave-to {
    opacity: 0;
    transform: translateY(30px);
  }

  .list-enter-to,
  .list-enter-leave {
    opacity: 1;
    transform: translateY(0);
  }

  .list-enter-active,
  .list-leave-active {
    transition: opacity 0.2s ease, transform 0.3s ease 0.2s;
  }
</style>
