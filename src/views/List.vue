<template>
  <div class="list-page">
    <div class="location-bar">
      <p class="location">目前位置</p>
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
       距離方圓 5公里 以內的供應商 <br />
       資訊更新時間 20:22:22
     </div>
     <div class="refresh">
       <div class="btn">
         重整列表
       </div>
     </div>
   </div>
  </div>
</template>

<script>
import { reactive, onMounted } from '@vue/composition-api'
export default {

  setup (props, context) {
    onMounted(() => {
      state.status = getDay()
    })
    const state = reactive({
      status: '雙數'
    })

    function getDay () {
      const day = new Date().getDay()
      return day === 0 ? '雙數' : day % 2 !== 0 ? '奇數' : '偶數'
    }

    return {
      state
    }
  }
}
</script>

<style lang="scss" scoped>
  .list-page {
    padding: 20px;
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
</style>
