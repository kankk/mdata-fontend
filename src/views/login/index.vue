<template>
  <div class="login">
    <div class="login-box">
      <el-form :model="loginForm" status-icon :rules="loginRules" ref="loginForm" label-width="100px">
        <el-form-item label="账号" prop="username">
          <el-input type="text" id="username" v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" id="password" v-model="loginForm.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="login-btn" @click="submitForm('loginForm')">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'login',
  data () {
    const validateUsername = (rule, value, cb) => {
      if (value === '') {
        cb(new Error('账号不能为空'))
      } else {
        cb()
      }
    }
    const validatePassword = (rule, value, cb) => {
      if (value === '') {
        cb(new Error('密码不能为空'))
      } else {
        cb()
      }
    }
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [
          { validator: validateUsername, trigger: 'blur' }
        ],
        password: [
          { validator: validatePassword, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    ...mapActions([
      'login'
    ]),
    submitForm (formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          try {
            const res = await this.login(this.loginForm)
            if (res) {
              this.$message.success('登录成功')
              this.$router.push('/')
            } else {
              this.$message.error('登录失败')
            }
          } catch (err) {
            this.$message.error(err.message)
          }
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style lang="less">
.login {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  &-box {
    width: 400px;
  }
  &-btn {
    width: 100%;
  }
}
</style>
