<template>
  <div class="task-detail">
    <AppHeader fixed>
      <header-top></header-top>
    </AppHeader>
    <div class="app-body">
      <div class="content">
        <div class="detail-head">
          <p class="list-title">任务审核详情</p>
          <div class="publisher-wrap">
            <span class="publisher">申诉人：</span>
            <div class="head-sculpture">
              <img v-if="detailData.userDetailVO.ico" :src="detailData.userDetailVO.ico"
                   title="头像"/>
            </div>
            <div class="publisher-tip">
              <p class="name">{{detailData.userDetailVO.alias}}</p>
              <p class="id">ID：{{detailData.userDetailVO.userId}}</p>
            </div>
          </div>

          <div class="publisher-content">
            <div class="row">
              <div class="w-30"><span class="detail-title">被申诉人：</span><span>{{detailData.taskDetail.userDetail.alias}}<span
                class="detail-title">（ID:{{detailData.taskDetail.userDetail.userId}}）</span></span></div>
              <span class="detail-title">任务编号：</span><span>{{detailData.taskDetail.taskNo}}</span>
            </div>
          </div>
          <div class="publisher-content">
            <div class="row">

              <div class="w-30"><span class="detail-title">任务标题：</span><span>{{detailData.taskDetail.title}}</span></div>
              <div><span class="detail-title">任务类型：</span><span>{{detailData.taskDetail.taskTypeName}}</span></div>
            </div>
          </div>

          <div class="publisher-content">
            <div class="row">
              <div class="w-30"><span class="detail-title">文字验证：</span><span>{{detailData.taskDetail.textVerify}}</span>
              </div>
              <div><span class="detail-title">任务截止时间：</span><span>{{detailData.taskDetail.lastTime}}</span></div>
            </div>
          </div>
          <div class="publisher-content">
            <div class="row">
              <span class="detail-title">任务链接：</span><span>{{detailData.taskDetail.href}}</span>
            </div>
          </div>
          <div class="publisher-content">
            <div class="row big">
              <span class="detail-title">备注：</span><span>{{detailData.taskDetail.remarker}}</span>
            </div>
          </div>
          <div class="pic-content" v-if="detailData.taskDetail.checkPics.length">
            <div class="proving-pic">
              <p class="pic-title">---验证图---</p>
              <div class="pic-box">
                <div class="pic01" v-for="item in detailData.taskDetail.checkPics">
                  <img :src="item.url"
                       title="验证图"/>
                </div>
              </div>
            </div>
            <div class="proving-pic" v-if="detailData.taskDetail.taskDetails.length">
              <p class="pic-title">---操作步骤---</p>
              <div class="pic-box">
                <div class="pic01" v-for="item in detailData.taskDetail.taskDetails">
                  <img :src="item.url"
                       title="验证图"/>
                </div>
              </div>
            </div>
            <div class="proving-pic" v-if="detailData.taskDetail.checkFailReason">
              <p class="pic-title">---驳回原因---</p>
              <div class="pic-box">
                {{detailData.taskDetail.checkFailReason}}
              </div>
            </div>
          </div>
        </div>
        <div class="btn-wrap">
          <el-row>
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
        loading: '',
        detailData: {
          "taskDetail": {
            "amount": 0,
            "applyCount": 0,
            "applyed": 0,
            "checkFailReason": "",
            "checkPics": [],
            "checkStaus": 0,
            "checkTime": 0,
            "checkingCount": 0,
            "collected": 0,
            "completeCount": 0,
            "deviceType": 0,
            "examineStatus": 0,
            "href": "",
            "id": 0,
            "lastTime": 0,
            "limitTime": 0,
            "opVedio": "",
            "proAmount": 0,
            "recommend": 0,
            "refreshTime": 0,
            "refreshTimes": 0,
            "remarker": "",
            "status": 0,
            "subFlag": 0,
            "submitId": 0,
            "taskDetails": [],
            "taskNo": "",
            "taskTypeName": "",
            "textVerify": "",
            "title": "",
            "toped": 0,
            "totalAcount": 0,
            "totalfee": 0,
            "typeIcon": "",
            "typeId": 0,
            "userDetail": {
              "alias": "",
              "alipayNo": "",
              "birthDay": "",
              "bondAmout": 0,
              "errorDetail": "",
              "followed": 0,
              "gender": 0,
              "ico": "",
              "id": 0,
              "level": 0,
              "levelExpired": 0,
              "mobile": "",
              "pwd": "",
              "realNamed": 0,
              "refereeId": 0,
              "salt": "",
              "status": 0,
              "success": true,
              "truename": "",
              "type": 0,
              "userId": "",
              "wxNo": ""
            },
            "userId": 0,
            "userNo": ""
          },
          "taskSubmitDetail": {
            "accoutId": 0,
            "checkPics": [],
            "claimTime": 0,
            "examineExpired": 0,
            "examineText": "",
            "examineTime": 0,
            "expiredTime": 0,
            "id": 0,
            "remarker": "",
            "replyText": "",
            "status": 0,
            "subId": 0,
            "subTime": 0,
            "taskAmout": 0,
            "taskId": 0
          },
          "userDetailVO": {
            "alias": "",
            "alipayNo": "",
            "birthDay": "",
            "bondAmout": 0,
            "errorDetail": "",
            "followed": 0,
            "gender": 0,
            "ico": "",
            "id": 0,
            "level": 0,
            "levelExpired": 0,
            "mobile": "",
            "pwd": "",
            "realNamed": 0,
            "refereeId": 0,
            "salt": "",
            "status": 0,
            "success": true,
            "truename": "",
            "type": 0,
            "userId": "",
            "wxNo": ""
          }
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
      callBackDetailApi(id) {
        this.loading = this.$loading({
          lock: true,
          text: "加载中...",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.8)"
        });
        axios
          .post(process.env.VUE_APP_HOST + "/task/back/apealOverView", {
            subId: +id
          })
          .then(res => {
            this.loading.close();
            if (res.data.code === 200) {
              var data = res.data.data;
              this.detailData = _.cloneDeep(data);
              this.detailData.taskDetail.checkPics = data.taskDetail.checkPics;
              this.detailData.taskDetail.taskDetails = data.taskDetail.taskDetails;
              this.detailData.taskDetail.lastTime = this.getDateTime(data.taskDetail.lastTime);

            }
          }),
          err => {
            this.loading.close();
            this.$message("服务器故障，请稍候重试！");
          };
      }
    },
    mounted() {
      this.detailData.taskDetail.id = this.$route.query.id;
      this.callBackDetailApi(this.detailData.taskDetail.id);
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
        margin: 25px 40px;
        background-color: #fff;
        padding: 8px 0px;
        border: 0;
        box-shadow: 2px 2px 10px #ccc;
        border-radius: 2px;
      }
      .list-title {
        padding-left: 5px;
        border-left: 2px solid rgb(255, 67, 67);
        font-size: 24px;
        font-weight: 400;
        margin-left: 8px;
        display: inline-block;
      }
      .content-chart {
        width: 650px;
        margin: 0 auto;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: -36px;
        div {
          flex: 1;
          &.flex-2 {
            flex: 1;
          }
        }

        span {
          display: inline-block;
          color: #999999;
          font-size: 12px;
          &.point {
            width: 10px;
            height: 10px;
            border-radius: 2px;
            background: #D8DBDB;
            margin-right: 5px;
            &.has {
              background: #FF9364;
            }
          }
        }
        .mg-bt {
          margin-bottom: 15px;
        }
        .count-b {
          font-size: 30px;
          font-weight: bold;
          color: #333333;
        }
        .content-b {
          font-size: 18px;
          color: #333333;
        }
      }
      .detail-head {
        .publisher-wrap {
          width: 30%;
          display: flex;
          padding-left: 20px;
          align-items: center;
          justify-content: start;
          margin: 20px 0px;
          font-size: 16px;
          span {
            color: #333;
            font-size: 16px;
            display: inline-block;
            &.detail-title {
              color: #999;
            }
            &.detail-title-id {
              font-size: 12px;
            }
          }
          .publisher {
            color: #999999;
          }
          .head-sculpture {
            width: 44px;
            height: 44px;
            vertical-align: middle;
            img {
              width: 100%;
              height: 100%;
              border-radius: 50%;
            }
          }
          .publisher-tip {
            color: #999999;
            padding-left: 10px;
            .name {
              color: #333;
            }
            .id {
              color: #999;
              font-size: 12px;
            }
          }
        }
        .publisher-content {
          font-size: 16px;
          display: flex;
          padding: 0px 20px;
          margin-top: 15px;
          color: #999999;
          .w-30 {
            width: 30%;
          }
          span {
            color: #333;
            font-size: 16px;
            display: inline-block;
            &.detail-title {
              color: #999;
            }
          }
          .row {
            width: 80%;
            margin: 0;
            &.big {
              width: 100%;
            }
          }
        }
      }
      .pic-content {
        border-top: 1px solid rgb(233, 233, 233);
        margin-top: 40px;
        .pic-title {
          font-size: 18px;
          padding-bottom: 10px;
          padding-top: 40px;
        }
        .proving-pic {
          text-align: center;
          margin-bottom: 20px;
          .pic-box {

            .pic01 {
              display: inline-block;
              width: 30%;
              height: 550px;
              margin-right: 10px;
              margin-bottom: 10px;
              img {
                width: 100%;
                height: 100%;
              }
            }
          }

        }
      }

    }

  }
</style>
