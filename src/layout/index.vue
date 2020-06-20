<template>
  <div class="container">
    <el-container>
      <el-header class="header-container">
        <div class="header-container-content">
          <div class="logo">
            <a href="/">
              <img width="80" src="../assets/images/logo.jpg">
            </a>
          </div>
          <div class="header-container-banner">
            <div class="nav">
              <el-menu
                :default-active="activeIndex"
                class="el-menu-demo"
                mode="horizontal"
                background-color="#ffffff"
                text-color="#000000"
                active-text-color="#ffd04b"
              >
                <el-menu-item index="/">
                  <router-link to="/">
                    首页
                  </router-link>
                </el-menu-item>
                <el-menu-item index="/mood">
                  <router-link to="/mood">
                    心情随笔
                  </router-link>
                </el-menu-item>
                <el-menu-item index="/message">
                  <router-link to="/message">
                    BLOG留言
                  </router-link>
                </el-menu-item>
                <el-menu-item index="/about">
                  <router-link to="/about">
                    关于我
                  </router-link>
                </el-menu-item>
              </el-menu>
            </div>
          </div>
        </div>
        <div class="nav-mobile">
          <el-menu
            :default-active="activeIndex"
            class="el-menu-demo"
            mode="horizontal"
            background-color="#ffffff"
            text-color="#000000"
            active-text-color="#ffd04b"
          >
            <el-submenu index="menu">
              <template slot="title"><i class="el-icon-menu" /></template>
              <router-link to="/">
                <el-menu-item index="/">
                  首页
                </el-menu-item>
              </router-link>
              <router-link to="/mood">
                <el-menu-item index="/mood">
                  心情随笔
                </el-menu-item>
              </router-link>
              <router-link to="/message">
                <el-menu-item index="/message">
                  BLOG留言
                </el-menu-item>
              </router-link>
              <router-link to="/about">
                <el-menu-item index="/about">
                  关于我
                </el-menu-item>
              </router-link>
            </el-submenu>
          </el-menu>
        </div>
      </el-header>
      <div id="no" />
      <div class="container-content">
        <router-view />
      </div>
      <el-footer class="copyright">
        <div style="width:100%;margin:0 auto;padding:15px 0;" class="copyBeian">
          <a target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=44030602004444">
            <img src="../assets/images/beian.png" style="float:left;">粤公网安备 44030602004444号
          </a>
          <a href="https://www.beian.gov.cn" target="_blank">粤ICP备20030330号-1</a>
        </div>
      </el-footer>
      <el-tooltip placement="top" content="返回顶部">
        <back-to-top :custom-style="BackTo" :visibility-height="300" :back-position="50" transition-name="fade" />
      </el-tooltip>
    </el-container>
  </div>
</template>

<script>
import BackToTop from '@/components/BackToTop'
import { mapState } from 'vuex'
export default {
  name: 'Layout',
  components: { BackToTop },
  data() {
    return {
      activeIndex: '1',
      BackTo: {
        right: '50px',
        bottom: '50px',
        width: '40px',
        height: '40px',
        'border-radius': '4px',
        'line-height': '45px', // 请保持与高度一致以垂直居中 Please keep consistent with height to center vertically
        background: '#12b7de'// 按钮的背景颜色 The background color of the button
      }
    }
  },
  computed: {
    ...mapState({
      device: state => state.app.device,
      showSettings: state => state.settings.showSettings
    }),
    classObj() {
      return {
        mobile: this.device === 'mobile'
      }
    }
  }
}
</script>

<style scoped>
.container{
  min-width: 411px;
}

.container .header-container {
  height: 60px;
  z-index: 100;
  box-shadow: 0 2px 10px rgba(0,0,0,.05);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  background-color: #ffffff;
  overflow: hidden;
}

.container .header-container-content {
  max-width: 1440px;
  margin: 0 auto;
  overflow: hidden;
  transition: transform .3s cubic-bezier(.645,.045,.355,1),-webkit-transform .3s cubic-bezier(.645,.045,.355,1);
}

.container .header-container-content .logo {
  float: left;
}

.container .header-container-content .logo,.container .header-container-content .header-container-banner{
  display: inline-block;
}

.nav-mobile {
  position: absolute;
  right: 20px;
  top: 0px;
  display: none;
  font-size: 25px;
}

.nav-mobile:hover,.nav-mobile:focus{
  cursor: pointer;
}

#no {
  padding: 60px;
  text-align: center;
}

.container .container-content{
  margin: 0;
  padding-bottom: 40px;
}

.copyright{
  width: 100%;
  text-align:center !important;
  background-color: #ffffff;
  color:#000000;
  line-height: 20px;
  border-top: 8px solid #00c1de;
  border-bottom:none;
}

.copyright a {
  /* color:rgba(255,255,255,.95); */
  font-size: 12px;
  margin-right: 10px;
  display: inline-block;
  text-decoration:none;
}
</style>
