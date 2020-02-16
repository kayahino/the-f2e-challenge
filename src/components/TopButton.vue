<template>
  <transition name="fade">
    <div
      :class="['to-top', state.isPin ? '' : 'sticky', isMobile ? '' : 'pc']"
      @click="scrollToTop"
      v-if="state.isShow"
    >
      TOP
    </div>
  </transition>
</template>

<script>
import { reactive, onMounted, onBeforeUnmount, computed, watch } from '@vue/composition-api'
let scrollTarget = null
export default {
  setup (props, context) {
    onMounted(() => {
      scrollTarget = isMobile.value ? window : context.parent.$el
      pinButton()
    })
    onBeforeUnmount(() => {
      scrollTarget.removeEventListener('scroll', scrollHandler)
    })

    const state = reactive({
      isPin: true,
      isShow: false,
      styleFix: ''
    })

    const isMobile = computed(() => context.root.$store.state.isMobile)
    const frameWidth = computed(() => context.parent.frame.offsetWidth - 46 - 30)

    watch(() => {
      scrollTarget.removeEventListener('scroll', scrollHandler)
      if (isMobile.value) {
        scrollTarget = window
      } else {
        scrollTarget = context.parent.$el
      }
      scrollTarget.addEventListener('scroll', scrollHandler)
    })

    function scrollHandler () {
      const scroll = isMobile.value ? window.pageYOffset : context.parent.$el.scrollTop
      if (scroll > 100) {
        state.isShow = true
      } else {
        state.isShow = false
      }
      pinButton()
    }

    function pinButton () {
      if (!isMobile.value) return false
      const footer = document.querySelector('.footer')
      const footerHeight = footer ? footer.offsetHeight : 0
      const scroll = window.pageYOffset
      if (scroll >= document.body.scrollHeight - window.innerHeight - footerHeight) {
        state.isPin = false
      } else {
        state.isPin = true
      }
    }

    function scrollToTop () {
      const currentScroll = isMobile.value ? window.pageYOffset : context.parent.$el.scrollTop
      const smoothness = 8
      const val = currentScroll - (currentScroll / smoothness)
      scrollTarget.scrollTo(0, val)
      if (currentScroll > 0) requestAnimationFrame(scrollToTop)
    }

    return {
      state,
      scrollToTop,
      isMobile,
      frameWidth
    }
  }
}
</script>

<style lang="scss">
  .to-top {
    position: fixed;
    bottom: 40px;
    right: 30px;
    width: 46px;
    height: 46px;
    color: #fafafa;
    text-align: center;
    line-height: 46px;
    font-size: 12px;
    letter-spacing: 0.75px;
    border-radius: 50%;
    background-color: #34495E;
    box-shadow: 0 10px 20px #34495E4D;
    cursor: pointer;
    z-index: 99;

    &.sticky {
      position: absolute;
      bottom: 40px;
      right: 30px;
    }

    &.pc {
      background-color: #FFFFFF;
      color: #34405E;
    }
  }

  // fade
  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }

  .fade-enter-to,
  .fade-enter-leave {
    opacity: 1;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s ease;
  }

</style>
