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
        <div class="detail-head pd-100">
          <p class="list-title">提现详情</p>
          <div class="publisher-wrap">
            <span class="publisher">申请人：</span>
            <div class="head-sculpture">
              <img src="https://wx.qlogo.cn/mmopen/vi_32/fibhGLYiayiaU4348d0qhFFt2iaMwOq5UlibvOUxnlmG5IBn0NBXcsaNhMv36ibyENRdHUQnSDSlGIwialTJlKdoP5ZEQ/132" title="头像"/>
            </div>
            <div class="publisher-tip">
              <p class="name">{{publisherName}}</p>
              <p class="id">ID：{{publisherID}}</p>
            </div>
          </div>
          <div class="publisher-content">
            <div class="row">
              <div class="w-30"><span class="detail-title">提现类别：</span><span>任务币提现</span></div>
              <div><span class="detail-title">单号：</span><span>6859</span></div>
            </div>
          </div>
          <div class="publisher-content">
            <div class="row">
              <div class="w-30"><span class="detail-title">提现现金：</span><span>45元</span></div>
              <span class="detail-title">申请时间：</span><span>2018-10-20 12:00</span>
            </div>
          </div>
          <div class="publisher-content">
            <div class="row">
              <div class="w-30"><span class="detail-title">支付宝账号：</span><span>158***8525</span></div>
              <span class="detail-title">支付宝姓名：</span><span class="col02">{{publisherName}}</span>
            </div>
          </div>
          <div class="publisher-content">
            <div class="row">
              <div class="w-30"><span class="detail-title">上次提现金额：</span><span>600元</span></div>
              <span class="detail-title">上次提现类别：</span><span>保证金提现</span>
            </div>
          </div>
          <div class="publisher-content">
            <div class="row">
              <div class="w-30"><span class="detail-title">会员等级：</span><span>青铜会员</span></div>
              <span class="detail-title">账户余额：</span><span>123元</span>
            </div>
          </div>
        </div>
        <div class="btn-wrap">
          <el-row>
            <el-button class="btn">通过</el-button>
            <el-button class="btn btn-margin" @click="rejectFtn">驳回</el-button>
            <el-button class="btn btn-margin" @click="paymentDialog">转账</el-button>
            <el-button class="btn btn-margin">下一个</el-button>
            <el-button class="btn btn-margin" @click="back">返回</el-button>
          </el-row>
        </div>
      </div>
    </div>
    <el-dialog
      :title="DialogTitle"
      :visible.sync="rejectDialog"
      width="400px"
      :close-on-click-modal="noModal"
      :close-on-press-escape="noESC"
      :before-close="handleClose" class="dialog-title" center>
      <textarea v-if="!isReject" rows="5" cols="20" class="text-content" placeholder="请输入驳回的原因">
      微信名+ID,必须正确截图,所需图片步骤写的一清二楚,否则一律举报无
      </textarea>
      <div v-if="isReject">
        <div class="payment-content">
          <p><span class="detail-title">申诉人：</span><span>微猫微视</span></p>
          <p class="pd-30"><span class="detail-title">单号：</span><span>2586</span></p>
        </div>
        <div class="payment-content">
          <p><span class="detail-title">支付宝账号：</span><span>135****8695</span></p>
          <p class="pd-30"><span class="detail-title">支付宝姓名：</span><span>张三</span></p>
        </div>

        <div class="payment-content">
          <p><span class="detail-title">提现类别：</span><span>任务币提现</span></p>
          <p class="pd-30"><span class="detail-title">提现金额：</span><span>600</span></p>
        </div>
      </div>

      <span slot="footer" class="dialog-footer">
    <el-button @click="rejectDialog = false">取 消</el-button>
    <el-button type="primary" @click="rejectDialog = false">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
  import {Header as AppHeader, SidebarFooter} from "@coreui/vue";
  import HeaderTop from "../components/headerTop";

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
        rejectDialog: false,
        //是否为驳回 反之为付款
        isReject: false,
        //弹框标题
        DialogTitle: '',
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
        total: 0,
        perPage: 20,
        page: 1,
        tableData2: [],
        publisherName: "微猫微视",
        publisherID: 557313,
      };
    },
    methods: {
      handleClose: function () {
        this.rejectDialog = false;
      },
      //驳回
      rejectFtn: function () {
        this.DialogTitle = '驳回';
        this.isReject = false;
        this.rejectDialog = true;
      },
      //转账
      paymentDialog: function () {
        this.rejectDialog = true;
        this.DialogTitle = '提现转账';
        this.isReject = true;
      },
      //返回
      back() {
        this.$router.go(-1);
      },
    },
    computed: {},
    mounted() {
      console.log("=====", this.$route.query.id);
    },
    destroyed: function () {
      // this.loading.close();
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
            display: flex;
            justify-content: center;
            .pic01 {
              width: 420px;
              height: 747px;
              background: red;
            }
            .pic02 {
              width: 420px;
              height: 747px;
              background: blue;
              margin-left: 30px;
            }
          }

        }
      }
    }

  }
</style>
