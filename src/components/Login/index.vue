<template>
  <div class="login">
    <el-dialog
      :visible.sync="emitDialog"
      title="QQ登录"
      :before-close="handleClose"
    >
      <iframe :src="url" frameborder="no" border="0" width="100%" height="500px" marginwidth="0" marginheight="0" scrolling="no" style="margin: 0 auto;" noresize />
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'Login',
  props: {
    url: {
      type: String,
      default() {
        return ''
      }
    },
    dialog: Boolean
  },
  data() {
    return {
      emitDialog: null
    }
  },
  watch: {
    dialog(newV, old) {
      // 点击登录按钮后赋值
      this.emitDialog = newV
    }
  },
  mounted() {
    // 初次加载赋值
    this.emitDialog = this.dialog
  },
  methods: {
    handleClose(done) {
      this.emitDialog = false
      this.$emit('closeDialog', false)
    }
  }
}
</script>

<style scoped>

</style>
