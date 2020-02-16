<template>
  <div class="modal">
    <div class="modal__wrap">
      <slot name="modal-content" />
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }
  .modal__wrap {
    padding: 20px;
    background-color: #fff;
    box-shadow: 0 5px 10px rgba(#000, 0.3);
    border-radius: 10px;
    background-color: #566778;
  }
</style>
