<template v-loading="Loading" element-loading-background="rgba(247, 245, 245, 0.7)" element-loading-text="使劲加载中...">
  <div class="message">
    <div class="inputBox">
      <v-md-editor v-model="text" mode="edit" height="200px" autoface />
      <el-button type="primary" class="reply">留言</el-button>
    </div>
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
.message {
  width:91%;
  min-height: 800px;
  margin: 0 auto;
  /* padding:10px; */
  /* background-color: #ffffff; */
  border-radius: 5px;
  overflow: hidden;
}

.message .reply {
  float:right;
  margin-top: 20px;
}

</style>
