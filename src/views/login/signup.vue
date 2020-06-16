<template>
  <div class="login-container">
    <el-form ref="signupForm" :model="signupForm" :rules="signupRules" class="login-form" autocomplete="off" label-position="left">

      <div class="title-container">
        <h3 class="title">注册</h3>
      </div>
      <el-form-item prop="username">
        <el-input
          v-model="signupForm.username"
          placeholder="请输入用户名"
          name="username"
          type="text"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item prop="email">
        <el-input
          v-model="signupForm.email"
          placeholder="请输入邮箱"
          name="email"
          type="text"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item>
        <el-col :span="14">
          <el-form-item prop="code">
            <el-input
              v-model="signupForm.code"
              placeholder="请输入验证码"
              name="code"
              type="text"
              autocomplete="off"
            />
          </el-form-item>
        </el-col>
        <el-col class="line" :span="2">&nbsp;</el-col>
        <el-col :span="4">
          <el-form-item>
            <el-button :disabled="sendCode" @click="SendEmailCode" v-text="btnText" />
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          key="password"
          v-model="signupForm.password"
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
        <el-button :loading="loading" type="danger" style="width:100%;" @click.native.prevent="handleSignup">注册</el-button>
      </el-form-item>
      <el-form-item>
        已有账号?<a href="/login" target="black" style="color:#5d9cec;font-weight:bold;">登录</a>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
import { SendEmail, SignUp } from '@/api/api'
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
      signupForm: {
        username: '',
        password: '',
        email: '',
        code: ''
      },
      signupRules: {
        username: [{ required: true, trigger: 'blur', message: '请输入用户名' }],
        email: [
          { required: true, trigger: 'blur', message: '请输入邮箱' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ],
        code: [{ required: true, trigger: 'blur', message: '请输入验证码' }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      loading: false,
      sendCode: false,
      btnText: '获取验证码',
      time: null
    }
  },
  methods: {
    async SendEmailCode() {
      this.$refs.signupForm.validateField('email', (valid) => {
        if (!valid) {
          SendEmail({ email: this.signupForm.email }).then(res => {
            if (res.result === true) {
              this.$message.success(res.msg)
              let num = 60
              this.time = setInterval(() => {
                this.sendCode = true
                num -= 1
                this.btnText = num + 's后重新获取'
                if (num === 0) {
                  this.sendCode = false
                  this.btnText = '重新获取'
                  clearInterval(this.time)
                  return
                }
              }, 1000)
            } else {
              this.$message.warning(res.msg)
            }
          }).catch(err => {
            console.log(err)
          })
        } else {
          return false
        }
      })
    },
    checkCapslock(e) {
      const { key } = e
      this.capsTooltip = key && key.length === 1 && (key >= 'A' && key <= 'Z')
    },
    handleSignup() {
      this.$refs.signupForm.validate(valid => {
        if (valid) {
          this.loading = true
          // 进入 api/user/login
          SignUp({
            username: this.signupForm.username,
            password: this.$md5(this.signupForm.password),
            code: this.signupForm.code,
            email: this.signupForm.email
          }).then(res => {
            if (res.result === true) {
              this.$message.success(res.msg)
              this.$refs['signupForm'].resetFields()
              this.$router.push({ path: '/login' })
            } else {
              this.$message.warning(res.msg)
            }
            this.loading = false
          }).catch(err => {
            this.loading = false
            console.log(err)
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
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
