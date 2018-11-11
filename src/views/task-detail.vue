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
        <div class="detail-head">
          <p class="list-title">任务详情</p>
          <div class="publisher-wrap">
            <span class="publisher">发布方：</span>
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
              <div class="w-30"><span class="detail-title">标题：</span><span>{{detailData.title}}</span></div>
              <div><span class="detail-title">编号：</span><span>{{detailData.userNo}}</span></div>
            </div>
          </div>
          <div class="publisher-content">
            <div class="row">
              <div class="w-30"><span class="detail-title">类型：</span><span>{{detailData.taskTypeName}}</span></div>
              <span class="detail-title">数量：</span><span>{{detailData.totalAcount}}</span>
            </div>
          </div>
          <div class="publisher-content">
            <div class="row">
              <div class="w-30"><span class="detail-title">单价：</span><span>{{detailData.amount}}元</span></div>
              <span class="detail-title">支持设备：</span><span class="col02">{{detailData.deviceType}}</span>
            </div>
          </div>
          <div class="publisher-content">
            <div class="row">
              <div class="w-30"><span class="detail-title">任务创建时间：</span><span>{{detailData.createTime}}</span></div>
              <span class="detail-title">任务截止时间：</span><span>{{detailData.lastTime}}</span>
            </div>
          </div>
          <div class="publisher-content">
            <div class="row">
              <span class="detail-title">文字验证：</span><span>{{detailData.textVerify}}</span>
            </div>
          </div>
          <div class="publisher-content">
            <div class="row">
              <span class="detail-title">任务链接：</span><span>{{detailData.href}}</span>
            </div>
          </div>
          <div class="publisher-content">
            <div class="row big">
              <span class="detail-title">备注：</span><span>{{detailData.remarker}}</span>
            </div>
          </div>
          <div class="pic-content" >
            <div class="proving-pic" v-if="detailData.checkPics.length">
              <p class="pic-title">---验证图---</p>
              <div class="pic-box">
                <div class="pic01" v-for="item in detailData.checkPics">
                  <img :src="item.url"
                       title="验证图"/>
                </div>
              </div>
            </div>
            <div class="proving-pic" v-if="detailData.taskDetails.length">
              <p class="pic-title">---操作步骤---</p>
              <div class="pic-box">
                <div class="pic01" v-for="(item,index) in detailData.taskDetails">
                  <span class="title-list">{{index+1}}</span>
                  <span>{{item.title}}</span>
                  <img :src="item.url"
                       title="步骤图"/>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="btn-wrap">
          <el-row>
            <el-button class="btn" v-if="detailData.examineStatus===0" @click="success">通过</el-button>
            <el-button class="btn btn-margin" v-if="detailData.examineStatus===0" @click="rejectFtn">驳回</el-button>
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
      <textarea rows="5" cols="20" class="text-content" placeholder="请输入驳回的原因" v-model="backMessage"></textarea>
      <span slot="footer" class="dialog-footer">
    <el-button @click="taskDialog = false">取 消</el-button>
    <el-button type="primary" @click="backTask">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
import { Header as AppHeader, SidebarFooter } from "@coreui/vue";
import HeaderTop from "../components/headerTop";
import axios from "axios";
import { getDate } from "../filter/data";
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
      //驳回弹框
      taskDialog: false,
      //进度条
      showTxt: true,
      //进度条线宽度
      chartBorder: 10,
      //进度宽度
      chartWidth: 100,
      //加载圈
      loading: "",
      //驳回原因
      backMessage: "",
      detailData: {
        //任务id
        id: "",
        nextAutitedId: "", //下一个任务id 如果是-1返回列表页
        toBeaudited: "", //待审核任务数
        audited: "", //已审核数
        totalCount: "", //总任务数量
        percentage: 0, //百分比
        userDetail: { ico: "", userId: "" },
        userId: "", //用户id
        title: "", //标题
        userNo: "", //用户编号
        taskTypeName: "", //任务类型
        totalAcount: "", //任务数量
        amount: "", //价格
        deviceType: "", //设备类型（0 andriod 1ios 2 不限)
        createTime: "", //创建时间
        lastTime: "", //截止时间
        textVerify: "", //文字说明
        href: "", //任务链接
        checkPics: [], //验证图
        taskDetails: [], //步骤图
        status: "", //任务状态
        remarker: "" //备注
      }
    };
  },
  methods: {
    // //时间戳转时间yy-mm-dd:hh:mm:ss
    getDateTime(data) {
      return getDate(data);
    },
    handleClose: function() {
      this.taskDialog = false;
    },
    //返回
    back() {
      this.$router.go(-1);
    },
    //审核接口
    checkedTaskApi(type) {
      axios
        .post(process.env.VUE_APP_HOST + "/task/back/examine", {
          examineText: this.backMessage,
          pass: type,
          submitId: this.detailData.id
        })
        .then(res => {
          let message = type ? "通过成功" : "驳回成功";
          if (res.data.code === 200) {
            this.taskDialog = false;
            this.$message(message);
            this.nextTask();
          }
        });
    },
    //通过
    success() {
      this.checkedTaskApi(1);
    },
    //驳回
    rejectFtn() {
      this.taskDialog = true;
    },
    backTask() {
      this.checkedTaskApi(0);
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
        .post(process.env.VUE_APP_HOST + "/task/back/detail", {
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
            this.detailData.deviceType =
              data.deviceType == 1
                ? "苹果"
                : data.deviceType == 2
                  ? "不限"
                  : "安卓";
            this.detailData.lastTime = this.getDateTime(data.lastTime);
            this.detailData.amount = data.amount?( +data.amount / 100 ).toFixed( 2 ):0;
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
  destroyed: function() {
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
          text-align: center;
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
              margin-top: 8px;
            }
          }
          .title-list{
            display: inline-block;
            width: 20px;
            height: 20px;
            line-height: 20px;
            margin-right: 10px;
            font-size: 16px;
            text-align: center;
            border-radius: 50%;
            background: rgb(255, 67, 67);
            color: rgb(255, 255, 255);
          }
        }
      }
    }
  }
}
</style>
