<template>
    <div class="login_wrap">
        <b-container>
            <b-row>
                <b-col md="7" sm="2" cols="12">
                    <div class="login_bg"></div>
                </b-col>
                <b-col md="5" sm="10" cols="12">
                    <div class="login-container">
                        <h3 class="logo">系统登录</h3>
                        <el-form :rules="rules2" :model="form" label-width="80px" ref="ruleForm2">
                            <el-form-item label="用户名" prop="usernamae" class="inputs">
                                <el-input v-model="form.username"></el-input>
                            </el-form-item>
                            <el-form-item label="密码" prop="password" class="inputs">
                                <el-input type="password" v-model="form.password" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="danger" @click="onSubmit">登录</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
    import {request, Modules} from '../utils/HttpRequest/request'
    export default {
        data () {
            return {
                form: {
                    username: '',
                    password: ''
                },
                ruleForm2: {
                    username: '',
                    password: ''
                },
                rules2: {
                    username: [
                        { required: true, message: '用户名不能为空', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '密码不能为空，请重新输入', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            onSubmit (evt) {
                evt.preventDefault();
                console.log('form:', this.form)
                request({
                    url: Modules.SYS_LOGIN,
                    params: {
                    'username': this.form.username,
                        'password': this.form.password
                    }
                })
            },
            formatter (date1) {
                let y = date1.getFullYear();
                let m = date1.getMonth() + 1;
                m = m < 10 ? '0' + m : m;
                let d = date1.getDate();
                d = d < 10 ? ('0' + d) : d;
                return y + '-' + m + '-' + d
            }
        }
    }
</script>

<style lang="scss">
    ::-ms-clear, ::-ms-reveal {
        display:none;
    }
    .login_wrap{
        width:100%;
        height:100%;
        background: #fff;
        .login_content{
            width:1210px;
            height:100%;
            margin:0 auto;
            position: relative;
            .logo{
                width:310px;
                height: 50px;
                /*background:url(../../static/img/login-logo.png) no-repeat center;*/
                position: absolute;
                left:0;
                top:50%;
                margin-top:-330px;
            }
            .index{
                line-height:40px;
                position: absolute;
                right:20px;
                top:50%;
                font-size: 16px;
                margin-top:-325px;
                &>a{
                    color: #4d4d4d;
                    text-decoration: none;
                }
            }
            .banquan{
                width:374px;
                text-align: center;
                position: absolute;
                bottom:50%;
                margin-bottom: -330px;
                left:50%;
                margin-left: -187px;
                color: #999999;
            }
        }
        .login_bg{
            width:100%;
            height:540px;
            position: fixed;
            top:50%;
            left:0;
            margin-top: -270px;
            background:#f5f5f5 url(../assets/login-bg.jpg) no-repeat center;
            background-size: 100%;
        }
        .login-container {
            -webkit-border-radius: 3px;
            border-radius: 3px;
            -moz-border-radius: 3px;
            background-clip: padding-box;
            position: fixed;
            z-index: 100;
            right:auto;
            /*margin-left: 20px;*/
            top:50%;
            margin-top: -180px;
            height: 270px;
            width: 350px;
            padding: 25px 35px 55px 0px;
            background: #fff;
            border: 1px solid #eaeaea;
            box-shadow: 0 0 8px rgba(0,0,0,.14);
            .inputs {
                margin-bottom: 10px;
            }
            .el-input__suffix-inner{
                margin-right: 10px!important;
                .icon-hide{
                    display: inline-block;
                    width:20px;
                    height:20px;
                    background-size: 100% 100%;
                    vertical-align: middle;
                }
                .icon-show{
                    display: inline-block;
                    width:20px;
                    height:20px;
                    background-size: 100% 100%;
                    vertical-align: middle;
                }
            }

            .logo {
                margin: 0px auto 10px auto;
                text-align: center;
                color: #333333;
                font-weight: 600;
            }
            .load-btn{
                background: #c91423;
                border-color: #ba1423;
                color: #fff;
                height:50px;
                margin:10px 0;
                opacity: 0.9;
            }
            .load-btn:hover, .load-btn:active{
                opacity: 1;
            }
        }
    }
    @media (max-width:476px){
        .login_wrap .login-container {
            -webkit-border-radius: 3px;
            border-radius: 3px;
            -moz-border-radius: 3px;
            background-clip: padding-box;
            position: fixed;
            z-index: 100;
            left:50%;
            margin-left: -175px;
            top:50%;
            margin-top: -180px;
            height: 270px;
            width: 350px;
            padding: 35px 30px 55px 30px;
            background: #fff;
            border: 1px solid #eaeaea;
            box-shadow: 0 0 8px rgba(0,0,0,.14);
        }
    }
</style>