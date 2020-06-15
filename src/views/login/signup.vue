<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" autocomplete="off" label-position="left">

      <div class="title-container">
        <h3 class="title">登录</h3>
      </div>
      <el-form-item prop="username">
        <el-input
          v-model="loginForm.username"
          placeholder="请输入用户名或邮箱"
          name="username"
          type="text"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          key="password"
          v-model="loginForm.password"
          type="password"
          placeholder="请输入密码"
          name="password"
          autocomplete="off"
          show-password
          @keyup.native="checkCapslock"
          @keyup.enter.native="handleLogin"
        />
      </el-form-item>
      <el-form-item>
        <el-button :loading="loading" type="primary" style="width:100%;" @click.native.prevent="handleLogin">Login</el-button>
      </el-form-item>
      <el-form-item style="overflow:hidden;">
        <div style="display:block;float:left;">
          <i class="iconfont icon-blog-suo" />
          <a href="/forget" target="black">忘记密码?</a>
        </div>
      </el-form-item>
      <el-form-item>
        还没有账号?<a href="/signup" target="black" style="color:#5d9cec;font-weight:bold;">注册</a>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码长度最少为6位'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', message: '请输入账号或邮箱' }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      loading: false,
      redirect: undefined,
      otherQuery: {}
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query
        console.log(query)
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  created() {

  },
  mounted() {
  },
  destroyed() {
  },
  methods: {
    checkCapslock(e) {
      const { key } = e
      this.capsTooltip = key && key.length === 1 && (key >= 'A' && key <= 'Z')
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          const password = this.$md5(this.loginForm.password)
          // 进入 api/user/login
          this.$store.dispatch('user/login', { username: this.loginForm.username, password })
            .then((data) => {
              this.$message.success(data.msg)
              this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
              this.loading = false
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    }
    // afterQRScan() {
    //   if (e.key === 'x-admin-oauth-code') {
    //     const code = getQueryObject(e.newValue)
    //     const codeMap = {
    //       wechat: 'code',
    //       tencent: 'code'
    //     }
    //     const type = codeMap[this.auth_type]
    //     const codeName = code[type]
    //     if (codeName) {
    //       this.$store.dispatch('LoginByThirdparty', codeName).then(() => {
    //         this.$router.push({ path: this.redirect || '/' })
    //       })
    //     } else {
    //       alert('第三方登录失败')
    //     }
    //   }
    // }
  }
}
</script>

<style scoped>
.login-container{
  height:100%;
  justify-content: center;
  display: flex;
  align-items: center;
  background:url('../../assets/images/loginbg.jpg') no-repeat center center;
  overflow: hidden;
}

.login-form {
  width:450px;
  padding:30px 40px;
  border-radius: 5px;
  border:1px solid #DCDFE6;
  box-shadow: 0px 0px 20px #DCDFE6;
  background-color: #ffffff;
  text-align: center;
}
</style>
