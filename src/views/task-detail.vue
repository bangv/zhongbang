<template>
  <div class="task-detail">
    <AppHeader fixed>
      <header-top></header-top>
    </AppHeader>
    <div class="app-body">
      <div class="content">
        <div class="detail-head">
          <p class="list-title">任务统计</p>
          <div class="content-chart">
            <div class="chart">
              <el-progress type="circle" :percentage="80" :show-text="showTxt" :width="chartWidth"
                           :stroke-width="chartBorder"
                           color="#FF9364"></el-progress>
            </div>
            <div>
              <p class="mg-bt">
                <span class="point has"></span><span>已审核</span>
              </p>
              <p>
                <span class="point"></span><span>待审核</span>
              </p>
            </div>
            <div>
              <p class="count-b">80</p>
              <p class="content-b">已审核</p>
            </div>
            <div>
              <p class="count-b">20</p>
              <p class="content-b">待审核</p>
            </div>
            <div>
              <p class="count-b">100</p>
              <p class="content-b">任务总数量</p>
            </div>
          </div>
        </div>
        <div class="detail-head">
          <p class="list-title">任务详情</p>
          <div class="publisher-wrap">
            <span class="publisher">发布方：</span>
            <div class="head-sculpture">
              <img
                src="https://wx.qlogo.cn/mmopen/vi_32/fibhGLYiayiaU4348d0qhFFt2iaMwOq5UlibvOUxnlmG5IBn0NBXcsaNhMv36ibyENRdHUQnSDSlGIwialTJlKdoP5ZEQ/132"
                title="头像"/>
            </div>
            <div class="publisher-tip">
              <p class="name">{{detailData.name}}</p>
              <p class="id">ID：{{detailData.name}}</p>
            </div>
          </div>
          <!--<div class="publisher-content">-->
          <!--<div class="row">-->
          <!--<div class="w-30"><span class="detail-title">标题：</span><span>{{title}}</span></div>-->
          <!--<div><span class="detail-title">编号：</span><span>{{id}}</span></div>-->
          <!--</div>-->
          <!--</div>-->
          <!--<div class="publisher-content">-->
          <!--<div class="row">-->
          <!--<div class="w-30"><span class="detail-title">类型：</span><span>{{type}}</span></div>-->
          <!--<span class="detail-title">数量：</span><span>{{number}}</span>-->
          <!--</div>-->
          <!--</div>-->
          <!--<div class="publisher-content">-->
          <!--<div class="row">-->
          <!--<div class="w-30"><span class="detail-title">单价：</span><span>{{price}}元</span></div>-->
          <!--<span class="detail-title">支持设备：</span><span class="col02">{{equipment}}</span>-->
          <!--</div>-->
          <!--</div>-->
          <!--<div class="publisher-content">-->
          <!--<div class="row">-->
          <!--<div class="w-30"><span class="detail-title">任务创建时间：</span><span>{{createTime}}</span></div>-->
          <!--<span class="detail-title">任务截止时间：</span><span>{{endTime}}</span>-->
          <!--</div>-->
          <!--</div>-->
          <!--<div class="publisher-content">-->
          <!--<div class="row">-->
          <!--<span class="detail-title">文字验证：</span><span>{{text}}</span>-->
          <!--</div>-->
          <!--</div>-->
          <!--<div class="publisher-content">-->
          <!--<div class="row">-->
          <!--<span class="detail-title">任务链接：</span><span>{{link}}</span>-->
          <!--</div>-->
          <!--</div>-->
          <!--<div class="publisher-content">-->
          <!--<div class="row big">-->
          <!--<span class="detail-title">备注：</span><span>{{tip}}</span>-->
          <!--</div>-->
          <!--</div>-->
          <div class="pic-content">
            <div class="proving-pic">
              <p class="pic-title">---验证图---</p>
              <div class="pic-box">
                <div class="pic01"></div>
                <div class="pic02"></div>
              </div>
            </div>
            <div class="proving-pic">
              <p class="pic-title">---操作步骤---</p>
              <div class="pic-box">
                <div class="pic01"></div>
                <div class="pic02"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="btn-wrap">
          <el-row>
            <el-button class="btn" v-if="1">通过</el-button>
            <el-button class="btn btn-margin" v-if="1" @click="rejectFtn">驳回</el-button>
            <el-button class="btn btn-margin" @click="nextTask">下一个</el-button>
            <el-button class="btn btn-margin" @click="back">返回</el-button>
          </el-row>
        </div>
      </div>
    </div>

    <el-dialog
      title="驳回"
      :visible.sync="taskDialog"
      width="400px"
      :close-on-click-modal="noModal"
      :close-on-press-escape="noESC"
      :before-close="handleClose" class="dialog-title" center>
      <textarea rows="5" cols="20" class="text-content" placeholder="请输入驳回的原因">
      微信名+ID,必须正确截图,所需图片步骤写的一清二楚,否则一律举报无
      </textarea>
      <span slot="footer" class="dialog-footer">
    <el-button @click="taskDialog = false">取 消</el-button>
    <el-button type="primary" @click="taskDialog = false">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>

  import {Header as AppHeader, SidebarFooter} from "@coreui/vue";
  import HeaderTop from "../components/headerTop";
  import axios from "axios";
  import {getDate} from "../filter/data"

  export default {
    components: {
      HeaderTop,
      AppHeader,
      SidebarFooter
    },
    data() {
      return {
        //只能通过关闭按钮关
        noModal: false,
        noESC: false,
        //驳回弹框
        taskDialog: false,
        //进度条
        showTxt: true,
        //进度条线宽度
        chartBorder: 10,
        //进度宽度
        chartWidth: 100,
        //加载圈
        loading: '',
        //任务id
        taskId: '',
        detailData: {
          alias: '',//用户
          ico: '',//图片
          userId: '',//用户id
          title: '',//标题
          userNo: '',//用户编号
          typeId: '',//任务类型
          totalAcount: '',//任务总数
          amount: '',//价格
          deviceType: '',//设备类型（0 andriod 1ios 2 不限）
          nextAutitedId: ''//下一个任务id 如果是-1返回列表页
        }
      };
    },
    methods: {
      handleClose: function () {
        this.taskDialog = false;
      },
      //返回
      back() {
        this.$router.go(-1);
      },
      //驳回
      rejectFtn: function () {
        this.taskDialog = true;
      },
      //下一个
      nextTask() {
        if (this.detailData.nextAutitedId !== 10057) {
          this.taskId = this.detailData.nextAutitedId;
          this.callBackDetailApi(this.taskId);
        } else {
          this.$router.go(-1);
        }
      },
      callBackDetailApi(id) {
        this.loading = this.$loading({
          lock: true,
          text: '请求数据中',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.8)',
        });
        axios.post(process.env.VUE_APP_HOST + "/task/back/detail", {
          id: id
        }).then(res => {
          this.loading.close();
          if (res.data.code === 200) {
            this.detailData.name = 33;
          }
        }),
          err => {
            this.loading.close();
            this.$message("服务器故障，请稍候重试！");
          };
      }
    },
    mounted() {
      this.taskId = this.$route.query.id;
      this.callBackDetailApi(this.$route.query.id);

    }
    ,
    destroyed: function () {
      this.detailData = {};
      this.loading.close();
    }
  }
  ;
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
            display: flex;
            justify-content: center;
            .pic01 {
              width: 420px;
              height: 400px;
              background: #ccc;
            }
            .pic02 {
              width: 420px;
              height: 400px;
              background: #ccc;
              margin-left: 30px;
            }
          }

        }
      }

    }

  }
</style>
