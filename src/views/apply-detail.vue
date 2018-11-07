<template>
  <div class="task-detail">
    <AppHeader fixed>
      <header-top></header-top>
    </AppHeader>
    <div class="app-body">
      <div class="content">
        <div class="detail-head">
          <p class="list-title">申诉统计</p>
          <div class="content-chart">
            <div class="chart">
              <el-progress type="circle" :percentage="detailData.percentage" :show-text="showTxt" :width="chartWidth"
                           :stroke-width="chartBorder"
                           color="#FF9364"></el-progress>
            </div>
            <div>
              <p class="mg-bt">
                <span class="point has"></span><span>已处理</span>
              </p>
              <p>
                <span class="point"></span><span>待处理</span>
              </p>
            </div>
            <div>
              <p class="count-b">{{detailData.cmpCount}}</p>
              <p class="content-b">已处理</p>
            </div>
            <div>
              <p class="count-b">{{detailData.unCmpCout}}</p>
              <p class="content-b">待处理</p>
            </div>
            <div>
              <p class="count-b">{{detailData.totalCount}}</p>
              <p class="content-b">总申诉数</p>
            </div>
          </div>
        </div>
        <div class="detail-head pd-100">
          <p class="list-title">申诉详情</p>
          <div class="publisher-wrap">
            <span class="publisher">申诉人：</span>
            <div class="head-sculpture">
              <img v-if="detailData.apealIco" :src="detailData.apealIco"
                   title="头像"/>
            </div>
            <div class="publisher-tip">
              <p class="name">{{detailData.apealAlias}}</p>
              <p class="id">ID：{{detailData.apealId}}</p>
            </div>
          </div>
          <div class="publisher-content">
            <div class="row">
              <div class="w-30"><span class="detail-title">单号：</span><span>{{detailData.orderNo}}</span></div>
              <div><span class="detail-title">申诉时间：</span><span>{{detailData.publishTime}}</span></div>
            </div>
          </div>
          <div class="publisher-content">
            <div class="row">
              <div class="w-30"><span class="detail-title">被申诉人：</span><span>{{detailData.toApealAlias}}<span
                class="detail-title">（ID:{{detailData.toApealId}}）</span></span></div>
              <span class="detail-title">任务编号：</span><span>{{detailData.taskId}}</span>
            </div>
          </div>
          <div class="publisher-content">
            <div class="row">
              <span class="detail-title">任务标题：</span><span>{{detailData.taskTitle}}</span>
            </div>
          </div>
          <div class="publisher-content">
            <div class="row">
              <span class="detail-title">申诉原因：</span><span>{{detailData.remarker}}</span>
            </div>
          </div>
        </div>
        <div class="btn-wrap">
          <el-row>
            <el-button class="btn"  @click="detail">查看详情</el-button>
            <el-button class="btn btn-margin" @click="checkout(1)" v-if="detailData.state==1">已处理</el-button>
            <el-button class="btn btn-margin" @click="checkout(2)" v-if="detailData.state==2">已完结</el-button>
            <el-button class="btn btn-margin" @click="nextTask">下一个</el-button>
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
        detailData: {
          "apealAlias": "",
          "apealIco": "",
          "apealId": "",
          "cmpCount": 0,
          "id": 0,
          "nextId": 0,
          "orderNo": "",
          "publishTime": 0,
          "remarker": "",
          "state": 0,
          "subId": 0,
          "taskId": "",
          "taskTitle": "",
          "toApealAlias": "",
          "toApealId": "",
          "totalCount": 0,
          "unCmpCout": 0,
          "percentage": 0
        }
      };
    },
    methods: {
      // //时间戳转时间yy-mm-dd:hh:mm:ss
      getDateTime(data) {
        return getDate(data);
      },
      //下一个
      nextTask() {
        if (this.detailData.nextId !== -1) {
          this.callBackDetailApi(this.detailData.nextId);
        } else {
          this.$router.go(-1);
        }
      },
      //详情
      detail() {
        this.$router.push({
          path: '/apply-task-detail',
          query: {id: this.detailData.subId}
        })
      },
      //返回
      back() {
        this.$router.go(-1);
      },
      //申诉处理api
      checkout(state) {
        if (state === 1) {
          axios
            .post(process.env.VUE_APP_HOST + "/task/back/apealDeal", {
              id: this.detailData.id
            }).then(res => {
            if (res.data.code === 200) {
              this.$message("处理成功");
              this.nextTask();
            }
          }),
            err => {
              this.loading.close();
              this.$message("服务器故障，请稍候重试！");
              this.nextTask();
            };
        } else {
          axios
            .post(process.env.VUE_APP_HOST + "/task/back/apealCmplete", {
              id: this.detailData.id
            }).then(res => {
            if (res.data.code === 200) {
              this.$message("完结成功");
              this.nextTask();
            }
          }),
            err => {
              this.loading.close();
              this.$message("服务器故障，请稍候重试！");
            };
        }

      },
      //详情api
      callBackDetailApi(id) {
        this.loading = this.$loading({
          lock: true,
          text: "加载中...",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.8)"
        });
        axios
          .post(process.env.VUE_APP_HOST + "/task/back/apealDetail", {
            id: id
          })
          .then(res => {
            this.loading.close();
            if (res.data.code === 200) {
              var data = res.data.data;
              this.detailData = _.cloneDeep(data);
              this.detailData.percentage = parseInt((+data.cmpCount / +data.totalCount) * 100);
              this.detailData.publishTime = this.getDateTime(data.publishTime);
              this.detailData.nextId = data.nextId ? data.nextId : -1;
            }
          }),
          err => {
            this.loading.close();
            this.$message("服务器故障，请稍候重试！");
          };
      }
    },
    mounted() {
      this.detailData.id = this.$route.query.id;
      this.callBackDetailApi(this.detailData.id);
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
        &.pd-100 {
          padding-bottom: 100px;
        }
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
              text-align: left;
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
