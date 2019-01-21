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
              <el-progress type="circle" :percentage="detailData.percentage" :show-text="showTxt" :width="chartWidth"
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
              <p class="count-b">{{detailData.audited}}</p>
              <p class="content-b">已审核</p>
            </div>
            <div>
              <p class="count-b">{{detailData.toBeaudited}}</p>
              <p class="content-b">待审核</p>
            </div>
            <div>
              <p class="count-b">{{detailData.totalCount}}</p>
              <p class="content-b">任务总数量</p>
            </div>
          </div>
        </div>
        <div class="detail-head pd-100">
          <p class="list-title">提现详情</p>
          <div class="publisher-wrap">
            <span class="publisher">申请人：</span>

            <div class="head-sculpture">
              <img v-if="detailData.userDetail.ico" :src="detailData.userDetail.ico"
                   title="头像"/>
            </div>
            <div class="publisher-tip">
              <p class="name">{{detailData.userDetail.alias}}</p>
              <p class="id">ID：{{detailData.userDetail.userId}}</p>
            </div>
          </div>


          <div class="publisher-content">
            <div class="row">
              <div class="w-30"><span class="detail-title">提现类别：</span><span>{{detailData.transType}}</span></div>
              <div><span class="detail-title">单号：</span><span>{{detailData.orderNo}}</span></div>
            </div>
          </div>
          <div class="publisher-content">
            <div class="row">
              <div class="w-30"><span class="detail-title">提现现金：</span><span>{{detailData.withdrawVO.amount}}元</span>
              </div>
              <span class="detail-title">申请时间：</span><span>{{detailData.subTime}}</span>
            </div>
          </div>
          <div class="publisher-content">
            <div class="row">
              <div class="w-30"><span class="detail-title">支付宝账号：</span><span>{{detailData.withdrawVO.accoutNo}}</span>
              </div>
              <span class="detail-title">支付宝姓名：</span><span class="col02">{{detailData.withdrawVO.realName}}</span>
            </div>
          </div>
          <div class="publisher-content">
            <div class="row">
              <div class="w-30"><span class="detail-title">上次提现金额：</span><span>{{detailData.lastAmount}}元</span>
              </div>
              <span class="detail-title">上次提现类别：</span><span>{{detailData.lastTranType}}</span>
            </div>
          </div>
          <div class="publisher-content">
            <div class="row">
              <div class="w-30"><span
                class="detail-title">会员等级：</span><span> {{detailData.withdrawVO.memberLevel}}</span></div>
              <span class="detail-title">账户余额：</span><span>{{detailData.balance}}元</span>
            </div>
          </div>
        </div>
        <div class="btn-wrap">
          <el-row>
            <el-button class="btn" v-if="detailData.status===0" @click="success">通过</el-button>
            <el-button class="btn btn-margin" v-if="detailData.status===0" @click="rejectFtn">驳回</el-button>
            <el-button class="btn btn-margin" v-if="detailData.status===2" @click="paymentDialog">转账</el-button>
            <el-button class="btn btn-margin" @click="nextTask">下一个</el-button>
            <el-button class="btn btn-margin" @click="back">返回</el-button>
          </el-row>
        </div>
      </div>
    </div>
    <el-dialog
      class="fee-dialog"
      title="提现费率"
      :visible.sync="feeDialog"
      width="400px"
      :close-on-click-modal="noModal"
      :close-on-press-escape="noESC"
    >
      <div class="demo-input-suffix">
        <span class="fee-c">提现费率：</span>
        <el-input
          placeholder="请输入提现费率"
          v-model="fee">
        </el-input>
      </div>
      <span slot="footer" class="dialog-footer">
    <el-button @click="feeDialog = false">取 消</el-button>
    <el-button type="primary" @click="reflectSuccess">确 定</el-button>
  </span>
    </el-dialog>
    <el-dialog
      :title="DialogTitle"
      :visible.sync="rejectDialog"
      width="400px"
      :close-on-click-modal="noModal"
      :close-on-press-escape="noESC"
      :before-close="handleClose" class="dialog-title" center>
      <textarea v-if="!isReject" rows="5" cols="20" class="text-content"
                placeholder="请输入驳回的原因" v-model="backMessage"></textarea>
      <div v-if="isReject">
        <div class="payment-content">
          <p><span class="detail-title">申诉人：</span><span>{{detailData.userDetail.alias}}</span></p>
          <p class="pd-30"><span class="detail-title">单号：</span><span>{{detailData.orderNo}}</span></p>
        </div>
        <div class="payment-content">
          <p><span class="detail-title">支付宝账号：</span><span>{{detailData.withdrawVO.accoutNo}}</span></p>
          <p class="pd-30"><span class="detail-title">支付宝姓名：</span><span>{{detailData.withdrawVO.realName}}</span></p>
        </div>

        <div class="payment-content">
          <p><span class="detail-title">提现类别：</span><span>{{detailData.transType}}</span></p>
          <p class="pd-30"><span class="detail-title">提现金额：</span><span>{{detailData.withdrawVO.amount}}元</span>
          </p>
        </div>
      </div>

      <span slot="footer" class="dialog-footer">
    <el-button @click="rejectDialog = false">取 消</el-button>
    <el-button type="primary" @click="backAndPayTask">确 定</el-button>
  </span>
    </el-dialog>
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
        //只能通过关闭按钮关
        noModal: false,
        noESC: false,
        //费率弹框
        feeDialog: false,
        //驳回弹框
        rejectDialog: false,
        //是否为驳回 反之为付款
        isReject: false,
        //弹框标题
        DialogTitle: "",
        //进度条
        showTxt: true,
        //进度条线宽度
        chartBorder: 10,
        //进度宽度
        chartWidth: 100,
        //类型的序列号
        tabIndex: 0,
        //加载圈
        loading: "",
        backMessage: "", //驳回原因
        fee: 0,
        detailData: {
          //任务id
          id: "",
          nextAutitedId: "", //下一个任务id 如果是-1返回列表页
          toBeaudited: "", //待审核任务数
          audited: "", //已审核数
          totalCount: "", //总任务数量
          percentage: 0, //百分比
          userDetail: {ico: "", userId: ""},
          status: '',//当前任务状态
          transType: "", //提现类别
          userId: "", //用户id
          orderNo: "", //单号
          withdrawVO: {amount: 0, accoutNo: "", realName: "", memberLevel: ""},
          subTime: "", //申请时间
          lastAmount: "", //上次提现金额
          lastTranType: "", //上次提现类别
          balance: "" //余额
        }
      };
    },
    methods: {
      handleClose: function () {
        this.rejectDialog = false;
      },
      //驳回
      rejectFtn: function () {
        this.rejectDialog = true;
        this.DialogTitle = "驳回";
        this.isReject = false;
      },
      //转账
      paymentDialog: function () {
        this.rejectDialog = true;
        this.DialogTitle = "提现转账";
        this.isReject = true;
      },
      // //时间戳转时间yy-mm-dd:hh:mm:ss
      getDateTime(data) {
        return getDate(data);
      },
      //返回
      back() {
        this.$router.go(-1);
      },
      //审核接口
      checkedTaskApi(type) {
        axios
          .post(process.env.VUE_APP_HOST + "/accout/back/transCheck", {
            'fee': +this.fee,
            "id": this.detailData.id,
            "pass": type,//1通过 0驳回
            "reason": type ? '' : this.backMessage
            // "userId": this.detailData.userDetail.userId
          })
          .then(res => {
            let message = type ? "通过成功" : "驳回成功";
            if (res.data.code === 200) {
              this.feeDialog = false;
              this.rejectDialog = false;
              this.$message(message);
              this.nextTask();
            }
          });
      },
      reflectSuccess() {
        if (isNaN(+this.fee) || +this.fee < 0) {
          this.$message('费率必须是大于的数字');
          return;
        }
        this.checkedTaskApi(1);
      },
      success() {
        this.feeDialog = true;
      },
      backAndPayTask() {
        if (this.detailData.status === 2) {//待付款 转账
          axios
            .post(process.env.VUE_APP_HOST + "/accout/back/transfer", {transId: this.detailData.id})
            .then(res => {
              if (res.data.code === 200) {
                this.rejectDialog = false;
                this.$message('转账成功');
                this.nextTask();
              }
            });
        } else {//待审核 驳回
          this.checkedTaskApi(0);
        }
      },
      //下一个
      nextTask() {
        if (this.detailData.nextAutitedId !== -1) {
          this.callBackDetailApi(this.detailData.nextAutitedId);
        } else {
          this.$router.go(-1);
        }
      },
      callBackDetailApi(id) {
        this.loading = this.$loading({
          lock: true,
          text: "加载中...",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.8)"
        });
        axios
          .post(process.env.VUE_APP_HOST + "/accout/back/detail", {
            id: id
          })
          .then(res => {
            this.loading.close();
            if (res.data.code === 200) {
              var data = res.data.data;
              this.detailData = _.cloneDeep(data);
              this.detailData.percentage = parseInt(
                (+data.audited / +data.totalCount) * 100
              );
              this.detailData.lastAmount = data.lastAmount ? (+data.lastAmount / 100).toFixed(2) : 0;
              this.detailData.balance = data.balance ? (+data.balance / 100).toFixed(2) : 0;
              this.detailData.subTime = this.getDateTime(data.subTime);
              this.detailData.withdrawVO.amount = data.withdrawVO.amount ? (+data.withdrawVO.amount / 100).toFixed(2) : 0;
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
  .task-detail /deep/ {
    .fee-dialog /deep/ {
      .demo-input-suffix {
        display: flex;
        justify-content: center;
        align-items: center;
        .fee-c {
          width: 120px;
          display: inline-block;
        }
      }
    }
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
            background: #d8dbdb;
            margin-right: 5px;
            &.has {
              background: #ff9364;
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
              text-align: left;
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
