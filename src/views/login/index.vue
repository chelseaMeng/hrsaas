<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      class="login-form"
      label-position="left"
      :model="loginForm"
      :rules="rules"
    >
      <div class="title-container">
        <h3 class="title">
          <img src="@/assets/common/login-logo.png" alt="" />
        </h3>
      </div>

      <!-- svg-container 是样式前缀 -->
      <!-- 手机号 -->
      <el-form-item prop="mobile">
        <span class="svg-container el-icon-user-solid"></span>
        <el-input
          placeholder="请输入账号"
          v-model="loginForm.mobile"
        ></el-input>
      </el-form-item>
      <!-- 密码 -->
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password"></svg-icon>
        </span>
        <el-input
          placeholder="请输入密码"
          ref="pwd"
          :type="pwdType"
          v-model="loginForm.password"
        ></el-input>
        <span class="svg-container">
          <svg-icon
            :icon-class="pwdType === 'password' ? 'eye' : 'eye-open'"
            @click="changeType"
          ></svg-icon>
        </span>
      </el-form-item>

      <!-- 登录 -->
      <el-button
        class="loginBtn"
        type="primary"
        :loading="loading"
        style="width: 100%; margin-bottom: 30px"
        @click="onLogin"
        >登录</el-button
      >
      <!-- 修改显示的提示文本和登录文本 -->
      <div class="tips">
        <span style="margin-right: 20px">账号: 13800000002</span>
        <span> 密码: 123456</span>
      </div>
    </el-form>
  </div>
</template>

<script>
import { validMobile } from "@/utils/validate";
export default {
  name: "Login",
  data() {
    const validatorMobile = (rule, value, callback) => {
      if (validMobile(value)) {
        return callback();
      }
      return callback(new Error("手机号格式不对"));
    };
    return {
      pwdType: "password",
      loginForm: {
        mobile: "13800000002",
        password: "123456",
      },
      loading: false,
      rules: {
        mobile: [
          { required: true, message: "手机号不能为空", trigger: "blur" },
          // {
          //   pattern:
          //     /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[189]))\d{8}$/,
          //   message: "手机号格式不正确",
          //   trigger: "blur",
          // },
          { validator: validatorMobile, trigger: "blur" },
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { min: 6, max: 16, message: "密码格式不正确", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    changeType() {
      //1.切换密码框的type值
      this.pwdType === "password"
        ? (this.pwdType = "")
        : (this.pwdType = "password");
      //2.眼睛切换
      //3.输入框聚焦
      // dom更新是异步的 上面修改完type值,这里还不能立刻获取到dom,所以用$nextTick()等dom更新完再focus()聚焦
      this.$nextTick(() => {
        this.$refs.pwd.focus();
      });
    },
    async onLogin() {
      try {
        const res = await this.$refs.loginForm.validate(); //promise
        this.loading = true;
        console.log(res);
        this.$store.dispatch("user/login", this.loginForm); //调用login模块的actions,把token存到vuex
        // this.loading = false;
        //登录以后实现页面跳转 但是刷新过后,token消失,需要用cookie实现持久化
        this.$router.push("/");
      } catch (e) {
        console.log(e);
        // this.loading = false;
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #68b0fe;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    // background: rgba(0, 0, 0, 0.1);
    background: rgba(255, 255, 255, 0.7); // 输入登录表单的背景色
    border-radius: 5px;
    color: #454545;
  }
  .el-form-item__error {
    color: #fff;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #68b0fe;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;
  background-image: url(~@/assets/common/login.jpg);
  background-position: center;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
.loginBtn {
  background: #407ffe;
  height: 64px;
  line-height: 32px;
  font-size: 24px;
}
</style>
