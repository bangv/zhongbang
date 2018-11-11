<template>
  <div class="task-detail">
    <AppHeader fixed>
      <header-top></header-top>
    </AppHeader>
    <div class="app-body">
      <div class="content">
        <div class="detail-head">
          <h2 class="title-bg">{{noticeTitle}}</h2>
          <el-form :model="systemForm" :rules="rules" ref="systemForm" label-width="100px" class="system-form">
            <el-form-item label="公告标题" prop="title">
              <el-input v-model="systemForm.title"></el-input>
            </el-form-item>
            <el-form-item label="公告内容" prop="content">
              <el-input type="textarea" v-model="systemForm.content"></el-input>
            </el-form-item>

            <el-form-item label="推送时间" required>
              <el-form-item prop="publishTime">
                <el-date-picker
                  v-model="systemForm.publishTime"
                  type="datetime"
                  placeholder="选择日期时间"
                  value-format="yyyy-MM-dd hh:mm:ss">
                </el-date-picker>
              </el-form-item>
            </el-form-item>
          </el-form>
        </div>
        <div class="btn-wrap">
          <el-row>
            <el-button class="btn btn-margin" @click="checkout('systemForm',1)" v-if="systemForm.state!=2">保存
            </el-button>
            <el-button class="btn btn-margin" @click="checkout('systemForm',2)" v-if="systemForm.state!=2">发布
            </el-button>
            <el-button class="btn btn-margin" @click="checkout('systemForm',3)" v-if="systemForm.state!=2">下线</el-button>
            <el-button class="btn btn-margin" @click="back">返回</el-button>
          </el-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  import {Header as AppHeader, SidebarFooter} from "@coreui/vue";
  import HeaderTop from "../components/headerTop";
  import axios from "axios";
  import {getDate} from "../filter/data";
  import _ from "lodash";

  export default {
    components: {
      HeaderTop,
      AppHeader,
      SidebarFooter
    },
    data() {
      return {
        //进度条
        showTxt: true,
        //进度条线宽度
        chartBorder: 10,
        //进度宽度
        chartWidth: 100,
        //类型的序列号
        tabIndex: 0,
        //加载圈
        loading: '',
        noticeTitle: '新增公告',
        detailData: {id: ''},
        systemForm: {
          title: '',
          content: '',
          publishTime: '',
          state: 2
        },
        rules: {
          title: [
            {required: true, message: '请输入公告标题', trigger: 'blur'},
          ],
          content: [
            {required: true, message: '请输入公告内容', trigger: 'blur'},
          ],
          publishTime: [
            {required: true, message: '请选择推送时间', trigger: 'blur'},
          ],
        }
      };
    },
    methods: {
      // //时间戳转时间yy-mm-dd:hh:mm:ss
      getDateTime(data) {
        return getDate(data);
      },
      //返回
      back() {
        this.$router.go(-1);
      },
      //提交公告
      checkout(formName, type) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let params = {};
            if (this.detailData.id) {
              params = {
                "content": this.systemForm.content,
                "id": this.detailData.id,
                "pushTime": this.systemForm.publishTime,
                "state": 0,
                "title": this.systemForm.title,
              };
            } else {
              params = {
                "content": this.systemForm.content,
                "pushTime": this.systemForm.publishTime,
                "state": 0,
                "title": this.systemForm.title,
              };
            }
            if (type === 1) {
              axios
                .post(process.env.VUE_APP_HOST + "/sys/msg/save", params)
                .then(res => {
                  if (res.data.code === 200) {
                    this.$message("保存成功");
                  }
                });
            }
            if (type === 2) {
              axios
                .post(process.env.VUE_APP_HOST + "/sys/msg/publish", params)
                .then(res => {
                  if (res.data.code === 200) {
                    this.$message("公告发布成功");
                    this.$router.go(-1);
                  }
                });
            }
            if (type === 3) {
              axios
                .post(process.env.VUE_APP_HOST + "/sys/msg/off", {
                  "id": this.detailData.id,
                })
                .then(res => {
                  if (res.data.code === 200) {
                    this.$message("公告下线成功");
                    this.$router.go(-1);
                  }
                });
            }
          } else {
            return false;
          }
        });
      },
      //详情api
      callBackDetailApi(id) {
        axios
          .post(process.env.VUE_APP_HOST + "/sys/msg/detail", {
            id: id
          })
          .then(res => {
            this.loading.close();
            if (res.data.code === 200) {
              var data = res.data.data;
              this.systemForm = _.cloneDeep(data);
            }
          }),
          err => {
            this.loading.close();
            this.$message("服务器故障，请稍候重试！");
          };
      }
    },
    mounted() {

      this.loading = this.$loading({
        lock: true,
        text: "加载中...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.8)"
      });
      if (this.$route.query.hasOwnProperty('id')) {
        this.detailData.id = this.$route.query.id;
        this.callBackDetailApi(this.detailData.id);
        this.noticeTitle = "修改公告";
      }else{
        this.noticeTitle = "新增公告";
        this.loading.close();
      }
    },
    destroyed: function () {
      this.detailData = {};
      this.loading.close();
    }
  };
</script>
<style lang="scss" scoped>
  //列表和头部的公共样式
  .task-detail {
    .app-body {
      margin-top: 0;
    }
    p {
      text-align: center;
      padding: 0;
      margin: 0;
    }
    .content {
      width: 100%;
      background: #f7f9fa;
      height: 100vh;
      padding-top: 65px;
      .detail-head {
        width: 600px;
        margin: 30px auto 10px auto;
        background-color: #fff;
        padding: 10px;
        border: 0;
        box-shadow: 2px 2px 10px #ccc;
        border-radius: 2px;
      }
      .title-bg {
        text-align: center;
        margin-bottom: 20px;
        font-size: 24px;
      }
    }

  }

</style>
