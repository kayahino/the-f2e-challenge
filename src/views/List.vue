<template>
  <div class="list-page">
    <div class="location-bar">
      <p class="location">目前位置 {{ location.latitude }}</p>
      <div class="locate-btn" @click="getLocation">
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
       <div class="btn" @click="getData">
         重整列表
       </div>
     </div>
   </div>
   <div class="loading" v-if="isLoading">
     Loading...
   </div>
   <div class="mask-list" v-else>
     <div v-for="item in dataFiltered" :key="item.properties.id">
       <ListCard :item="item"/>
     </div>
     <div class="see-more" v-if="state.isMore">
       <p>尚有 {{ state.remained }} 筆</p>
       <div class="btn" @click="seeMore">查看更多</div>
     </div>
   </div>
   <TopButton />
  </div>
</template>

<script>
import { reactive, onMounted, computed, watch, ref } from '@vue/composition-api'
import { mapActions } from 'vuex'
import TopButton from '@/components/TopButton'
import ListCard from '@/components/ListCard'
export default {
  components: {
    TopButton,
    ListCard
  },
  setup (props, { root }) {
    onMounted(() => {
      state.status = getDay()
    })
    const state = reactive({
      status: '雙數',
      page: 1,
      max: 5,
      range: 1,
      isMore: false,
      remained: 0
    })

    const maskData = computed(() => root.$store.state.maskData)
    const location = computed(() => root.$store.state.location)
    const isLoading = computed(() => root.$store.state.isLoading)
    const lastUpdatedTime = computed(() => root.$store.state.lastUpdated)
    const dataFiltered = ref([])
    watch(location, (prev, next) => {
      dataFiltered.value = filter(state.range, state.page)
    })

    function filter (range, page) {
      const filteredAll = root.$store.state.maskData.filter(el => {
        const { longitude, latitude } = location.value
        return getDistance(latitude, longitude, el.geometry.coordinates[1], el.geometry.coordinates[0]) <= range
      })
      const filteredByPage = filteredAll.slice(0, page * state.max)
      if (filteredByPage.length < filteredAll.length) {
        state.isMore = true
        state.remained = filteredAll.length - filteredByPage.length
      } else {
        state.isMore = false
      }
      return filteredByPage
    }

    function seeMore () {
      state.page += 1
      dataFiltered.value = filter(state.range, state.page)
    }

    function getDay () {
      const day = new Date().getDay()
      return day === 0 ? '雙數' : day % 2 !== 0 ? '奇數' : '偶數'
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
      location,
      maskData,
      dataFiltered,
      lastUpdatedTime,
      isLoading,
      seeMore
    }
  },
  methods: {
    ...mapActions([
      'getLocation',
      'getData'
    ])
  }
}
</script>

<style lang="scss" scoped>
  .list-page {
    position: relative;
    display: flex;
    flex-direction: column;
    padding: 20px;
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
  }

  .location {
    margin: 0;
  }
  .locate-btn {
    width: 24px;
    height: 24px;
    cursor: pointer;
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
      cursor: pointer;

      &:hover > .tooltip, &:active > .tooltip {
        display: block;
      }

      .icon {
        width: 24px;
        height: 24px;
        background-color: rgba(#566778, 0.3);
        color: #fafafa;
        border-radius: 50%;
        text-align: center;
        line-height: 24px;
        font-weight: bold;
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
      padding: 8px 20px;
      color: #34495E;
      font-size: 14px;
      border: 2px solid #34495E;
      border-radius: 100px;
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
