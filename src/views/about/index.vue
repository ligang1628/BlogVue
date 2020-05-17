<template v-loading="Loading" element-loading-background="rgba(247, 245, 245, 0.7)" element-loading-text="使劲加载中...">
  <div class="about">
    关于我
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: '',
      Loading: false,
      text: ''
    }
  }
}
</script>

<style scoped>
.about {
  width:90%;
  min-height: 800px;
  padding: 10px;
  margin: 0 auto;
  background-color: #ffffff;
  border-radius: 5px;
  overflow: hidden;
}

</style>
