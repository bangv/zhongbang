<template>
  <div class="login_wrap">

    <div class="login_bg"></div>
    <div class="content-bg">
      <div class="logo_bg">
        <div class="logo"></div>
        <p class="welcome">欢迎使用</p>
        <p class="platform">众帮互助平台</p>
      </div>
      <div class="login-container">
        <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-width="0" class="demo-ruleForm">
          <!--<h2 class="logo">系统登录</h2>-->
          <el-form-item prop="account">
            <el-input type="text" v-model="ruleForm2.account" auto-complete="off" placeholder="手机号" clearable
                      :maxlength='accountLength'></el-input>
          </el-form-item>
          <el-form-item prop="checkPass">
            <el-input :type="passType" v-model.trim="ruleForm2.checkPass" auto-complete="off" placeholder="密码"
                      :maxlength='passwordLength' :input="showIcon()" @keyup.enter.native="dologoin"><i slot="suffix"
                                                                                                        class="el-input__icon"
                                                                                                        :class="{'icon-show': passShow,'icon-hide':passHide }"
                                                                                                        @click.self="showPass(passType)"></i>
            </el-input>
          </el-form-item>
          <el-form-item class="demo-input-suffix">
          <span class="forget-pw" @click="forget">
          忘记密码?
          </span>
          </el-form-item>
          <!--<el-button class="btn_style" type="text" @click="forget">忘记密码?</el-button>-->
          <el-form-item style="width:100%;margin-top: 10px;" label-width="0">
            <el-button style="width:100%;" class="load-btn"
                       :class="{'valid-btn': ruleForm2.account,'':!ruleForm2.account }"
                       @click.native.prevent="dologoin">
              登录
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>

  </div>

</template>

<script>

  import {SHA1} from 'crypto-js'
  import {sha256} from 'crypto-js/sha256'

  export default {
    data() {
      //      手机号验证
      var validatePhone = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('账号不能为空，请重新输入'))
        } else {
          if (!(/^((1[3,5,8][0-9])|(14[5,7])|(17[0,1,3,5,6,7,8]))\d{8}$/.test(value))) {
            callback(new Error('账号格式错误'))
          }
        }
        callback()
      }
      return {
        passType: 'password',
        passShow: true,
        passHide: true,
        logining: false,
        accountLength: 11,
        passwordLength: 6,
        storeId: '',
        ruleForm2: {
          account: '',
          checkPass: ''
        },
        rules2: {
          account: [
            {required: true, validator: validatePhone, trigger: 'blur'}
          ],
          checkPass: [
            {required: true, message: '密码不能为空，请重新输入', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      // 输入密码时控制眼睛睁闭
      showIcon() {
        if (this.ruleForm2.checkPass !== '') {
          this.passHide = true
        } else {
          this.passHide = false;
          this.passShow = false;
        }
      },
      // 控制输入的密码是否为明文
      showPass(pass) {
        if (pass === 'password') {
          this.passType = 'text'
          this.passShow = true
        } else {
          this.passType = 'password'
          this.passShow = false
        }
      },
      // 忘记密码
      forget() {
        this.$router.push({path: '/forget'});
      },
      // 登录
      dologoin(ev) {

        this.$router.push({path: '/home'});
        if (!this.ruleForm2.account) return;
        this.$refs.ruleForm2.validate((valid) => {
          if (valid) {
            this.logining = true;
            alert(33);
            let password = SHA1(this.ruleForm2.checkPass).toString();
            console.log(password)
            // sessionStorage.setItem('store_id', this.storeId)
          } else {
            this.logining = false;
            return false
          }
        })
      },

    },
    mounted() {
      this.$http.post(process.env.VUE_APP_HOST + '/user/login', {
        "mobile": "4634",
        "pwd": "123456",
        "verifyCode": "1234"

      }).then(res => {
        console.log(res)
      }), err => {
        console.error('失败', err)
      }
    }
  }
</script>
<style lang="scss">
  ::-ms-clear, ::-ms-reveal {
    display: none;
  }

  .el-form-item.is-success {
    .el-input__inner {
      border-color: #eee;
    }
  }

  .login_wrap {
    width: 100%;
    height: 100%;
    background: #fff;
    .content-bg {
      width: 800px;
      height: 530px;
      position: fixed;
      top:50%;
      left:50%;
      margin-left:-400px;
      margin-top: -265px;

    }
    .login_content {
      width: 1210px;
      height: 100%;
      margin: 0 auto;
      position: relative;
      .logo {
        width: 310px;
        height: 50px;
        background: url(../assets/logo.png) 0 0 no-repeat;
        position: absolute;
        left: 0;
        top: 50%;
        margin-top: -330px;
      }
      .index {
        line-height: 40px;
        position: absolute;
        right: 20px;
        top: 50%;
        font-size: 16px;
        margin-top: -325px;
        & > a {
          color: #4d4d4d;
          text-decoration: none;
        }
      }
      .banquan {
        width: 374px;
        text-align: center;
        position: absolute;
        bottom: 50%;
        margin-bottom: -330px;
        left: 50%;
        margin-left: -187px;
        color: #999999;
      }
    }
    .login_bg {
      width: 100%;
      height: 100%;
      position: absolute;
      background: #f5f5f5 url(../assets/login-bg.jpg) no-repeat center;
    }
    .logo_bg {

      width: 400px;
      height: 530px;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 10;
      box-shadow: 2px 2px 10px rgb(240, 33, 40);
      background: url(../assets/logo_bg.png) no-repeat center;
      .logo {
        width: 88px;
        height: 72px;
        position: absolute;
        top: 20%;
        left: 50%;
        margin-left: -44px;
        background: url(../assets/logo_pic.png) no-repeat center;
      }
      .welcome {
        width: 100%;
        text-align: center;
        color: #ffffff;
        font-size: 38px;
        position: absolute;
        top: 45%;
      }
      .platform {
        width: 100%;
        text-align: center;
        color: #ffffff;
        font-size: 30px;
        position: absolute;
        top: 60%;
      }
    }
    .login-container {
      border-radius: 3px;
      background-clip: padding-box;
      position: absolute;
      margin-left: 50px;
      top: 50%;
      height: 460px;
      width: 360px;
      padding: 20px;
      padding-left: 50px;
      margin-top: -230px;
      background: rgb(255, 255, 255);
      border: 1px solid rgb(234, 234, 234);
      box-shadow: 0 0 8px rgba(0, 0, 0, 0.14);
      right: 0;
      margin-right: 50px;
      z-index: 2;

      .el-form-item {
        margin-top: 35px;
      }
      .el-input__suffix-inner {
        .icon-hide {
          display: inline-block;
          width: 20px;
          height: 20px;
          background: url(../assets/hide.png) 0 0 no-repeat;
          background-size: 100% 100%;
          vertical-align: middle;
        }
        .icon-show {
          display: inline-block;
          width: 20px;
          height: 20px;
          background: url(../assets/show.png) 0 0 no-repeat;
          background-size: 100% 100%;
          vertical-align: middle;
        }
      }

      .logo {
        margin: 0px auto 35px auto;
        text-align: center;
        color: #333333;
        font-weight: 600;
      }
      .load-btn {
        background: #F4F4F4;
        color: #bbb;
        border: 0;
        outline: 0;
        height: 50px;
        margin: 10px 0;
      }
      .valid-btn {
        background: #FF4343;
        color: #fff;
      }
      .demo-input-suffix {
        margin-top: 20px;
        text-align: right;
        color: #BBBBBB;
        .forget-pw {
          display: inline-block;
          cursor: pointer;
        }
      }
      .demo-ruleForm {
        margin-top: 100px;
      }
      .btn_style {
        width: 100%;
        text-align: right;
        color: #999999;
        margin-top: -10px;
      }
    }
  }

</style>
