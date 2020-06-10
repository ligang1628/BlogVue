<template>
  <div class="drawer-container">
    <div>
      <h3 class="drawer-title">登录方式</h3>

      <div class="drawer-item">
        <a href="javascript:void(0)" @click="QQ_Login">
          <img src="../../assets/images/Connect_logo_3.png">
        </a>
      </div>

      <!-- <div class="drawer-item">
        <span>微信 登录</span>
      </div> -->

    </div>
    <!-- <el-dialog title="QQ登录" :visible.sync="showQQ">
      <iframe :src="urlQQ" />
    </el-dialog> -->
  </div>
</template>

<script>
// import { GetQQToken } from '@/api/api'
export default {
  data() {
    return {
      urlQQ: '',
      showQQ: false
    }
  },
  computed: {

  },
  methods: {
    QQ_Login() {
      // const res = await GetQQToken()
    }
  }
}
</script>

<style lang="scss" scoped>
.drawer-container {
  padding: 24px;
  font-size: 14px;
  line-height: 1.5;
  word-wrap: break-word;

  .drawer-title {
    margin-bottom: 12px;
    color: rgba(0, 0, 0, .85);
    font-size: 14px;
    line-height: 22px;
  }

  .drawer-item {
    color: rgba(0, 0, 0, .65);
    font-size: 14px;
    padding: 12px 0;
  }

  .drawer-switch {
    float: right
  }
}
</style>
