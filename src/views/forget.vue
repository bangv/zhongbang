<template>
  <div class="wrap" v-loading="load">
    <el-form v-show="isShow" :model="forgetForm" :rules="forgetform" ref="forgetForm"
             class="demo-ruleForm forget-container">
      <!--<h2 class="logo">重置密码</h2>-->
      <div class="logo"><p class="title">众帮互助</p></div>
      <p>修改密码</p>
      <el-form-item prop="phone">
        <el-input type="text" v-model="forgetForm.phone" auto-complete="off" placeholder="手机号" clearable
                  :maxlength="eleven"></el-input>
      </el-form-item>
      <el-form-item prop="testPass" id="check">
        <el-input type="text" v-model="forgetForm.testPass" auto-complete="off" placeholder="验证码"
                  :maxlength="four"></el-input>
        <el-button :class="{ 'active': isActive }" :disabled="!isActive" @click="sendCode()">{{phonecode}}</el-button>
      </el-form-item>
      <el-form-item prop="pass" class="demo-input-suffix">
        <el-input :type="passType" v-model="forgetForm.pass" auto-complete="off" :maxlength="six" placeholder="新密码"
                  :input="showIcon()"><i slot="suffix" class="el-input__icon"
                                         :class="{'icon-show': passShow,'icon-hide':passHide }"
                                         @click.self="showPass(passType)"></i></el-input>
      </el-form-item>
      <!--<el-form-item label="确认密码" prop="checkPass"  class="demo-input-suffix">-->
      <!--<el-input :type="passTwo" v-model="forgetForm.checkPass" auto-complete="off" :maxlength="six" placeholder="请确认6位密码" :input="showIcontwo()"  @keyup.enter.native="resetPass"><i slot="suffix" class="el-input__icon" :class="{'icon-show': showtwo,'icon-hide':hidetwo }" @click.self="showPasstwo(passTwo)"></i></el-input>-->
      <!--</el-form-item>-->
      <el-form-item style="width:100%;margin-top: 20px" label-width="0">
        <el-button class="reset-btn" :class="{'valid-btn': forgetForm.phone,'':!forgetForm.phone }"
                   @click.native.prevent="resetPass()">确定
        </el-button>
      </el-form-item>
      <!--<p style="text-align: center;margin-top: -15px">已有密码，请<el-button type="text" style="color: #F56C6C;" @click="toLogin">登录</el-button></p>-->
      <div class="prompt" v-if="prompt">
        <div class="prompt-box">
          <div class="prompt-close" @click="prompt=false"><i class="el-icon-close"></i></div>
          <div class="prompt-icon"><i
            :class="{'el-icon-error': fail ,'el-icon-success': success ,'fail': fail ,'success' : success}"></i></div>
          <p>{{promptMsg}}</p>
        </div>
      </div>
    </el-form>
    <div v-show="!isShow" class="content">
      <div class="success_pic"></div>
      <p>修改密码成功,请
        <el-button type="text" style="color: #F56C6C;" @click="toLogin">重新登录</el-button>
        !
      </p>

    </div>
  </div>
</template>
<script>
  // import { SHA1, SHA256 } from 'crypto-js'

  import axios from "axios";

  export default {
    data() {
      // 手机号验证
      var validatePhone = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入手机号'))
          callback(this.notThrow())
          return false
        } else {
          if (!(/^((1[3,5,8][0-9])|(14[5,7])|(17[0,1,3,5,6,7,8]))\d{8}$/.test(value))) {
            callback(new Error('格式错误'))
            callback(this.notThrow())
            return false
          }
        }
        callback(this.throw())
      }
      // 密码验证
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'))
        } else {
          if (value.length !== 6) {
            callback(new Error('格式错误'))
          }
          callback()
        }
      }
      return {
        isShow: true,
        load: false,
        eleven: 11,
        six: 6,
        four: 4,
        passType: 'password',
        passTwo: 'password',
        phonecode: '获取验证码',
        phoneMaxLength: 11,
        codeMaxLength: 4,
        passMaxLength: 6,
        passShow: false,
        passHide: false,
        showtwo: false,
        hidetwo: false,
        isActive: false,
        fail: false,
        success: false,
        prompt: false,
        testCode: '',
        promptMsg: '',
        forgetForm: {
          phone: '',
          testPass: '',
          pass: '',
          checkPass: ''
        },
        forgetform: {
          phone: [
            {validator: validatePhone, required: true, trigger: 'change'}
          ],
          testPass: [
            {required: true, message: '请输入验证码', trigger: 'blur'}
          ],
          pass: [
            {validator: validatePass, required: true, trigger: 'blur'}
          ],
          checkPass: [
            {validator: validatePass, required: true, trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      throw() {
        this.isActive = true
      },
//      输入框控制发送验证码按钮置灰
      notThrow() {
        let that = this
        this.isActive = false
        clearInterval(that.timer)
        this.phonecode = '发送验证码'
        this.testCode = ''
      },
      // 登录
      toLogin() {
        this.$router.push({path: '/login'})
      },
      sendCode() {
        this.codeSend();

      },
      // 发送验证码
      codeSend() {
        this.isActive = false
        let num = 60
        let that = this
        this.phonecode = ' 60 s '
        that.timer = setInterval(() => {
          num--
          this.phonecode = num + ' s '
          if (num === 0) {
            clearInterval(that.timer)
            this.phonecode = '发送验证码'
            if (!(/^((1[3,5,8][0-9])|(14[5,7])|(17[0,1,3,5,6,7,8]))\d{8}$/.test(this.forgetForm.phone))) {
              this.isActive = false
            } else {
              this.isActive = true
            }
          }
        }, 1000);
        this.sendValidCode();
      },
      //发送验证码api
      sendValidCode() {
        axios.post(process.env.VUE_APP_HOST + "/sys/sms/send", {"mobile": this.forgetForm.phone}).then(res => {
          if (res.data.code === 200) {
            this.$message({
              message: '验证码已发送，请注意查收',
              type: 'success'
            })
          }
        }),
          err => {
            this.$message("服务器故障，登录失败！");
          };
      },
      // 输入密码时控制眼睛睁闭
      showIcon() {
        if (this.forgetForm.pass !== '') {
          this.passHide = true
        } else {
          this.passHide = false
          this.passShow = false
        }
      },
      showIcontwo() {
        if (this.forgetForm.checkPass !== '') {
          this.hidetwo = true
        } else {
          this.hidetwo = false
          this.showtwo = false
        }
      },
      // 输入密码时控制是否为明文
      showPass(pass) {
        if (pass === 'password') {
          this.passType = 'text'
          this.passShow = true
        } else {
          this.passType = 'password'
          this.passShow = false
        }
      },
      showPasstwo(pass) {
        if (pass === 'password') {
          this.passTwo = 'text'
          this.showtwo = true
        } else {
          this.passTwo = 'password'
          this.showtwo = false
        }
      },
      // 重置密码
      resetPass() {
        axios.post(process.env.VUE_APP_HOST + "/user/updatePwd", {
          "mobile": this.forgetForm.phone,
          "newPwd": this.forgetForm.pass,
          "pwd": "",
          "verifyCode": this.forgetForm.testPass
        }).then(res => {
          if (res.data.code === 200) {
            this.$message("密码重置成功，请重新登录");
            this.$router.push({path: "/login"});
          }
        }),
          err => {
            this.$message("服务器故障，登录失败！");
          };
      }
    }
  }
</script>
<style lang="scss">
  ::-ms-clear, ::-ms-reveal {
    display: none;
  }

  .wrap {
    width: 100%;
    /*height:100%;*/
    background: #f5f5f5;
    .reset_content {
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
        width: 232px;
        text-align: center;
        position: absolute;
        bottom: 50%;
        margin-bottom: -330px;
        left: 50%;
        margin-left: -116px;
        color: #999999;
      }
      /*  .reset_bg{
          width:100%;
          height:540px;
          position: absolute;
          top:50%;
          left:0;
          margin-top: -255px;
          background:#ffffff;
        }*/
    }
    .forget-container {
      -webkit-border-radius: 5px;
      border-radius: 5px;
      -moz-border-radius: 5px;
      background-clip: padding-box;
      position: absolute;
      top: 0px;
      bottom: 0;
      left: 0;
      right: 0;
      margin: auto;
      height: 430px;
      width: 430px;
      padding: 35px;
      background: #fff;
      margin: 40px auto;
      .el-input__suffix-inner {
        margin-right: 10px !important;
        .icon-hide {
          display: inline-block;
          width: 20px;
          height: 20px;
          background: url("../assets/hide.png") no-repeat center;
          background-size: 100% 100%;
          vertical-align: middle;
        }
        .icon-show {
          display: inline-block;
          width: 20px;
          height: 20px;
          background: url("../assets/show.png") no-repeat center;
          background-size: 100% 100%;
          vertical-align: middle;
        }
      }
      .logo {
        margin: 0px auto 30px auto;
        text-align: center;
        color: #333333;
        font-weight: 600;
        width: 195px;
        height: 50px;
        background: url(../assets/logo.png) 0 0 no-repeat;
        .title {
          font-size: 24px;
          padding-top: 2px;
        }
      }
      #check {
        .el-input {
          width: 50% !important;
          margin-right: 66px;
        }
      }
      .reset-btn {
        background: #F4F4F4;
        color: #bbb;
        height: 50px;
        width: 100%;
      }
      .valid-btn {
        background: #FF4343;
        color: #fff;
      }
      .prompt {
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        margin: auto;
        z-index: 888;
        background: rgba(0, 0, 0, .5);
        .prompt-box {
          width: 300px;
          height: 200px;
          padding: 30px;
          text-align: center;
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          margin: auto;
          background: #fff;
          .prompt-close {
            float: right;
            font-size: 20px;
            margin: -15px -15px 0 0;
          }
          .prompt-icon {
            font-size: 60px;
            margin: 20px;
            .fail {
              color: red;
            }
            .success {
              color: yellowgreen;
            }
          }
          p {
            font-size: 16px;
            padding-top: 20px;
          }
        }
      }
    }
    .content {
      margin: 200px auto;
      text-align: center;
      background: #ffffff;
      .success_pic {
        width: 175px;
        height: 175px;
        margin: 0 auto;
        background: url(../assets/success.png) 0 0 no-repeat;
      }
      .to-login {
        color: #FF4343;
        cursor: pointer;
      }
      .to-login:hover {
        color: #bf0404;
      }
    }
  }
</style>
