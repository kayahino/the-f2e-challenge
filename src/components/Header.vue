<template>
  <div :class="['header', state.menuOpen ? 'isOpen' : '']">
    <div class="wrap">
      <div class="header__logo" @click="toIndex">
        <div class="logo">
          <div class="circle"></div>
        </div>
        <div class="title">口罩即時查</div>
      </div>
      <div class="menu__trigger" @click="state.menuOpen = !state.menuOpen">
        <div class="dash top"></div>
        <div class="dash bottom"></div>
      </div>
    </div>
    <div class="header__menu">
      <div class="link">口罩供給現況</div>
      <div class="link">口罩怎麼買</div>
    </div>
  </div>
</template>

<script>
import { reactive } from '@vue/composition-api'
export default {
  setup (props, { root }) {
    const state = reactive({
      menuOpen: false
    })

    function toIndex () {
      root.$router.push({ name: 'index' }).catch((err) => {
        console.log(err)
      })
    }

    return {
      state,
      toIndex
    }
  }
}
</script>

<style lang="scss" scoped>
  .header {
    position: relative;
    z-index: 100;

    > .wrap {
      position: relative;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px;
      background-color: #fff;
      z-index: 99;
      transition: background 0.3s linear;
    }
  }
  .header__logo {
    display: flex;
    align-items: center;
    cursor: pointer;
    .logo {
      width: 41px;
    }
    .title {
      margin-left: 10px;
    }
  }

  .header__menu {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    text-align: center;
    transform: translateY(-100%);
    transition: transform 0.3s linear, background 0.3s linear;
    cursor: pointer;
    // display: none;

    .link {
      padding: 20px;
      &:hover {
        background-color: rgba(255, 255, 255, 0.1)
      }
    }
  }
  .circle {
    position: relative;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 2px solid #fff;
    background-color: #11787A;
    &::after {
      content: '';
      position: absolute;
      left: 75%;
      top: -2px;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      border: 2px solid #fff;
      background-color: #E67E22;
    }
  }
  .menu__trigger {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
    width: 26px;
    height: 24px;
    cursor: pointer;

    .dash {
      position: absolute;
      width: 26px;
      height: 4px;
      background-color: #34495E;
      transition: all 0.3s linear;

      &.top {
        margin-top: -4px;
      }

      &.bottom {
        margin-top: 8px;
        width: 50%;
      }
    }
  }

  .header.isOpen {

    .wrap {
      background-color: #34495E;
    }

    .header__menu {
      color: #fafafa;
      background-color: #34495E;
      transform: translateY(0);
      transition: background 0.3s linear, transform 0.3s linear 0.2s;
    }
    .title {
      color: #fafafa;
    }
    .circle {
      border-color: #34495E;

      &::after {
        border-color: #34495E;
      }
    }
    .dash.top {
      margin-top: 0;
      background-color: #fafafa;
      transform: rotate(45deg);
    }
    .dash.bottom {
      margin-top: 0;
      width: 100%;
      background-color: #fafafa;
      transform: rotate(-45deg);
    }
  }
</style>
