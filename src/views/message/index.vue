<template v-loading="Loading" element-loading-background="rgba(247, 245, 245, 0.7)" element-loading-text="使劲加载中...">
  <div class="message">
    <div class="inputBox">
      <v-md-editor v-model="text" :mode="mode" />
      <p class="show"><i class="el-icon-position fly" :title="setModeTitle" :style="{'color' : setModeColor }" @click="setMode" /></p>
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
      text: '',
      mode: 'edit'
    }
  },
  computed: {
    setModeColor() {
      return this.mode === 'edit' ? 'gray' : '#3a8ee6'
    },
    setModeTitle() {
      return this.mode === 'edit' ? '预览' : '编辑'
    }
  },
  methods: {
    setMode() {
      if (this.mode === 'edit') {
        this.mode = 'preview'
      } else {
        this.mode = 'edit'
      }
    }
  }
}
</script>

<style scoped>
.message {
  width:1200px;
  min-height: 800px;
  margin: 0 auto;
  border-radius: 5px;
  overflow: hidden;
}

.message .show{
  background-color: #ffffff;
  margin:0;
}

.message .fly{
  font-size: 30px;
  color:gray;
  cursor: pointer;
  padding: 10px;
}

.message .fly:focus,.message .fly:hover{
  color:#3a8ee6;
}

.message .reply {
  float:right;
  margin-top: 20px;
}

</style>
