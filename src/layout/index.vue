<template>
  <div class="container">
    <el-container>
      <el-header class="header-container">
        <div class="header-container-content">
          <div class="logo">
            <a href="/">
              <img width="80" src="data:image/jpeg;base64,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wmMXsHzahbIp23C92wOvH3h+I5Fdz4J8Y2XjPQItQtHUSDCXEGeYZMcr9PQ966gjNfO8+s/8Ki+KuqxeRJ/YeoobgQRKPmyCU256ANuX2B+lAHqvxB8d2XgjQTdTATXsuUtbff8Afb1P+yO5/DvXhHgnwrq/xP8AF0muawd1l9oD3szceb6RKPoMcdBVC1TWfi18RIzdMY/tROSBlbaAdl+nT3J5619SaLo9loWlW2mafF5VrbrsRe/uSe5J5J9aALdnZwWNpFbW0UcMMShEijGFUD0HardFGKAFooooAKKKKACiiigBKWkpaACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKSloASs7VtPXVNOltHlkiZsFJYz80bggqw9wQDWjQaAMfw/fSajpMU1xH5d2hMVxH6SodrfhkZHsRVnULOG+s5ba4iaSKQYkRWKkj6gg1n6WRb+ItatgCA5husHoNylTj2/dfnms3x/ca5YaA+o6JcyJJaZeaJIVkLx49G44OD64zQByGkac+m/F2NtPsxbW85ljkbZ5SSxRxKDtAGDyUOOCCGPIbj2CvM9flOqaFpni/SrJ7i9txHdwRQSkF+R5isR9/jcoAHJyeldzpGqWus6Zb6jZuWguYxIpPBHsfQjoR2NAGpXyj8ZPE48U+NhY2W2S304G2haMcySEjfz6Z4H096+gfHviOPwt4K1LUjKsc4jaO2x1MpGFx9Dz9BXy54L8Ov4m8S6fYOsmL24Ikk25ARcM5Bz1xx/wACoA91+BXhlNM8HrrE8JF5qJJDuORCD8oHoCct75FesgYqC1gjtbaKCFQkUahEQdFUDAFWKAFooooAKKKKACiiigApKWkoAKKKKAFopKKACk5paSgBRS0gpaACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACmu20Zp1IRQBhyeJtOikwTO0ewP5yW7tHyM/eAx0q1Pq1jbQCd7mPZ8pBBySGOAQB1ya0cUwRIpyqgfQUAYkvimwtWdL9LmykQAt58DBQD33gFcepzx3xV2XVrOHzQ93ADEAZR5gyueRx15HSobe3vxcTrdzW9zbyNmNRFt8rB4B5O7tzxyD68VNVs5lZbmy0myuJ4riORd+AzZ4Zgf4WAPBOenvQBP8A8JTonlRyLq1k6y/cKThi3GeAOTxVvT9X07U0Mllf29wo67HBK/UdR+NUbSGwlle8htYYFG5Sz23kupBy3JAJBIznocZ5rOluNI1iO5trQwXV24Uzi2gjzKpIDMDINrAjAPJ4464oAxfh4YdR1/xTrqX8l0098Yf9WyqqqTtUE8NgYwRwMn1zXoF3bJdWstvLzHIhjb6EYNc3Bo2rQz295HqkqNAgj/s5MCBo++4lc7jjO4AYxgDFXtS8QwaXOkcltdyjBM00afuoFAyWkYkAdRx1PYGgCVdMtLHSo9PiAitI7f7OEBx8mMDGOf17+prhfBpbwnrb6NK0ItL+4kA2zf6icDdghjn94pU7QWYHrweOxl1jTJbVprqRkSBVuTFJGwPlk/K5TGeo4GMjjIrm7/S9H8SalfRoJbNU/e3ge2aMzgMP3sbccgrgOOQVHGCcgHlnx38WRa14ig0K2fMOmBhOQeDMcZH/AAEDH1JrU/Z30SKbVdX1eTmS3ijhi9vMySfyUD8TWTdfBO/Or3Sxa/ZPaI5R7q53RnzQAxUg9TtJOQSODnFdb4S8DeIvDFs39i6ss6agI43kthG9rjcwLk7hICqfNlcZYgUAe3iqpvbcXX2Xz4vPwD5W8bsHpxXNDw/cQSpHLrF3d2oTyjZzDMQGD1PXGO7FvxqePwvp8dtHavp8Sr5HlyTwRBGfgqVzyyjByMHjHWgDifip8WLrwleDRdJiibUGiDyzSDIhB6AL3Yjnngcdc1H8JPineeKbp9F1kedqCxvMlyoVQ6gj5doAwRn8av8AiX4Q+E7+W21C8ubmxit4VinkE4CyKOAzF84Pbj1FR6N8LdF8LySyabPqF9dXGxflvlgdICeSCuMrkDPrigD1jrS1x1z4Ys2iDLqGoHUrSP8AdXv2lmmjBJIyMgEdcgjkCnW+ia9dQi4ufE9zHdk5DWsESwFewETBj05yWzk+nFAHX0Vj6fDqce/+0LqKUDCRiJcdCfnJ45IIyAMDHFa+aACiiigBDR2pGOO1LnIoABnvQeKAaQmgAyD0opjEjpQeaAJFORmnU1Pu06gAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooASloooAKKKKAIJbZJY9jE446e1Z10NSE1slgLQQKw87zN2dnfaBwDjpnjn252KaaAM+8gnuf3aTtDC0bI7RjDg9iG6DHPY0kOmrFYratc3EoUk+ZK+WPXv8AjWkKKAOevryaznkSx067u7twNm75YEznnzDwo4ycAnpxVVdQ8RYt719OEcEUZ+1WbEPcMf8Apmyna3TIyBnOODXVGigDl9SnsrWKXXdUdZLaCLzLeJotrRKVAf5WOWY5xjAPOMZPMcOqRahLHpaw32kySMwMDWpQuvXKuBtXI5znIJxw1dQ4B3MQCV6Zp9AHLWFjPpOqvb6fp/8AoTY+0397fO8r8cCPduLBR6lQM8Z5q1L4ejv75b28v75mXAEMNy8MIwc/dU854zknP04roDyOaKAKbWcUu8TDzkcEMjgFSCc4waWOyt4ypSGJdihEAUYUDsPQe1W6KAGCNVYsqgE9cd6fRRQAtJSVEjFs5oAmoJA61Evzo2fU0yRfnPJ/OgCUyIf4qCygdc1TkYjGDVpf9UKAAP6UjSADNMXv9KY3b6UAOadBIeaRp17MBxmmJ8/3qF+/J9KALUBYx5bvU1V7f/UipxQAtFFFABRRRQB//9k=">
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
                <el-menu-item index="/article">
                  <router-link to="/article">
                    技术分析
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
              <router-link to="/article">
                <el-menu-item index="/article">
                  技术分析
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
      <div :class="classObj" class="app-wrapper">
        <div class="main-container">
          <right-panel>
            <settings />
          </right-panel>
        </div>
      </div>
    </el-container>
  </div>
</template>

<script>
import BackToTop from '@/components/BackToTop'
import RightPanel from '@/components/RightPanel'
import Settings from '@/components/Settings'
import { mapState } from 'vuex'
export default {
  name: 'Layout',
  components: { BackToTop, RightPanel, Settings },
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
