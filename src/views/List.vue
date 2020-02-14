<template>
  <div class="list-page">
    <div class="location-bar" @click="$router.push({ name: 'search' })">
      <p class="location" v-if="!userStatus">請選擇欲查找的區域</p>
      <p class="location" v-else-if="userStatus === 'LOCATE_BY_LATLNG'">目前位置</p>
      <p class="location" v-else>{{ userStatus }}</p>
      <div class="locate-btn">
        <img src="@/assets/img/ic_location.png" draggable="false">
      </div>
    </div>
    <div class="content">
      <div class="status"><span>{{ state.status }}</span> 購買日</div>
      <div class="help">
        <div class="icon">?</div>
        <div class="tooltip">
          身分證末一碼為 {{ state.status === '雙數' ? '奇數或偶數' : state.status }}<br />
          可以在此天購買口罩
        </div>
      </div>
    </div>
    <div class="info">
     <div>
       距離方圓 1 公里 以內的供應商 <br />
       資訊更新時間 {{ lastUpdatedTime }}
     </div>
     <div class="refresh">
       <div :class="['btn', dataFiltered ? '' : 'disabled']" @click="getData">
         重整列表
       </div>
     </div>
   </div>
   <div class="loading" v-if="isLoading">
     Loading...
   </div>
   <div class="mask-list" v-else>
     <div v-for="item in dataFiltered" :key="item.properties.id">
       <ListCard :item="item" @showPosition="showPosition" />
     </div>
     <div class="see-more" v-if="state.isMore">
       <p>尚有 {{ state.remained }} 筆</p>
       <div class="btn" @click="seeMore">查看更多</div>
     </div>
   </div>
   <!-- <TopButton /> -->
  </div>
</template>

<script>
import { reactive, onMounted, computed, watch, ref, onBeforeUnmount } from '@vue/composition-api'
import getDistance from '@/utils/getDistance.js'
import { mapActions } from 'vuex'
import { EventBus } from '@/utils/event-bus.js'
// import TopButton from '@/components/TopButton'
import ListCard from '@/components/ListCard'

export default {
  components: {
    // TopButton,
    ListCard
  },
  setup (props, { root, emit }) {
    onMounted(() => {
      state.status = getDay()
    })
    onBeforeUnmount(() => {
      console.log('unmounted')
    })
    const state = reactive({
      status: '雙數',
      page: 1,
      max: 10,
      range: 2,
      isMore: false,
      remained: 0
    })

    const maskData = computed(() => root.$store.state.maskData)
    const location = computed(() => root.$store.state.location)
    const isLoading = computed(() => root.$store.state.isLoading)
    const lastUpdatedTime = computed(() => root.$store.state.lastUpdated)
    const userStatus = computed(() => root.$store.state.status)
    // const dataCache = computed(() => root.$store.state.dataCache)
    const dataFiltered = ref(null)
    watch(location, (prev, next) => {
      console.log('location changed')
      if (location.value.latitude) {
        state.page = 1
        dataFiltered.value = filter(state.range, state.page)
      }
    })

    function filter (range, page) {
      const filteredAll = maskData.value.features.filter(el => {
        const { longitude, latitude } = location.value
        return getDistance(latitude, longitude, el.geometry.coordinates[1], el.geometry.coordinates[0]) <= range
      })
      const dataSorted = sortData(filteredAll, 'distance')
      const filteredByPage = dataSorted.slice(0, page * state.max)
      if (filteredByPage.length < filteredAll.length) {
        state.isMore = true
        state.remained = filteredAll.length - filteredByPage.length
      } else {
        state.isMore = false
        state.remained = 0
      }
      return filteredByPage
    }

    function sortData (rawData, pattern) {
      const sortPattern = {
        distance: sortByDistance,
        stock: sortByStock
      }
      const [...newData] = rawData
      return sortPattern[pattern](newData)
    }

    function sortByStock (data) {
      return data.sort((a, b) => {
        return a.properties.mask_adult < b.properties.mask_adult ? 1 : -1
      })
    }

    function sortByDistance (data) {
      const { longitude, latitude } = location.value
      return data.sort((a, b) => {
        const aD = getDistance(latitude, longitude, a.geometry.coordinates[1], a.geometry.coordinates[0])
        const bD = getDistance(latitude, longitude, b.geometry.coordinates[1], b.geometry.coordinates[0])
        return aD > bD ? 1 : -1
      })
    }

    function seeMore () {
      state.page += 1
      dataFiltered.value = filter(state.range, state.page)
    }

    // function toSearchPage () {
    //   root.$router.push({ name: 'search' })
    //   //  state.page = 1
    //   //  root.$store.dispatch('getLocation')
    // }

    function getDay () {
      const day = new Date().getDay()
      return day === 0 ? '雙數' : day % 2 !== 0 ? '奇數' : '偶數'
    }

    function showPosition (id, location) {
      EventBus.$emit('showPos', id, location)
    }

    return {
      state,
      location,
      userStatus,
      maskData,
      dataFiltered,
      lastUpdatedTime,
      isLoading,
      seeMore,
      showPosition
    }
  },
  methods: {
    ...mapActions([
      'getLocation',
      'getData',
      'setDataCache'
    ])
  }
}
</script>

<style lang="scss" scoped>
  .list-page {
    position: relative;
    display: flex;
    flex-direction: column;
    min-width: 320px;
    max-width: 420px;
    padding: 20px;

    // @media only screen and (min-height: 600px) {
    //   max-height: calc(100vh - 60px - 103px);
    //   overflow-y: auto;
    // }
  }
  .loading {
    flex: 1 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .location-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 11px 15px;
    border: 1px solid #34495E33;
    border-radius: 10px;
    background-color: #fff;
    cursor: pointer;
  }

  .location {
    margin: 0;
  }
  .locate-btn {
    width: 24px;
    height: 24px;
    > img {
      max-width: 100%;
      height: auto;
    }
  }

  .content {
    display: flex;
    align-items: baseline;
    margin-top: 24px;
    padding: 0 10px;
    line-height: 1.7;

    .status {
      flex: 1 0 auto;
      > span {
        font-size: 36px;
        font-weight: bold;
      }
    }

    .help {
      position: relative;
      width: 100%;
      margin-left: 5px;

      .icon {
        width: 24px;
        height: 24px;
        background-color: rgba(#566778, 0.3);
        color: #fafafa;
        border-radius: 50%;
        text-align: center;
        line-height: 24px;
        font-weight: bold;
        cursor: pointer;

        &:hover ~ .tooltip, &:active ~ .tooltip {
          display: block;
        }
      }

      .tooltip {
        position: absolute;
        top: 50%;
        left: 35px;
        padding: 10px 15px;
        font-size: 12px;
        background-color: rgba(#566778, 0.2);
        transform: translateY(-50%);
        display: none;
        z-index: 50;
      }
    }
  }

  .info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 25px;
    margin-bottom: 20px;
    padding-left: 10px;
    line-height: 1.8;
    font-size: 12px;
    color: #566778;
  }

  .refresh {
    cursor: pointer;
    .btn {
      padding: 5px 20px;
      color: #34495E;
      font-size: 14px;
      border: 2px solid #34495E;
      border-radius: 100px;
      transition: all 0.2s ease;

      &:hover {
        color: #fff;
        background-color: #34495E;
      }

      &.disabled {
        opacity: 0.4;
        pointer-events: none;
      }
    }
  }

  .mask-list {
    margin-bottom: 80px;
  }

  .see-more {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: -60px;
    font-size: 12px;
    color: #34495E;

    .btn {
      margin-top: 10px;
      padding: 14px 45px;
      color: #fafafa;
      font-size: 14px;
      letter-spacing: 0.75px;
      background-color: #34495E;
      box-shadow: 0 10px 20px #34495E4D;
      border-radius: 100px;
      cursor: pointer;
    }
  }
</style>
