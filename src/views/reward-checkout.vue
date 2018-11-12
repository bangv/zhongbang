<template>
  <div class="sale-wrap">

    <b-row class="tab-title">
      <b-col cols="12" class="tool-d">
        <ul>
          <li @click="tabChange(1,1)">
            <span :class="{'active':tabIndex==1,'':tabIndex!=1}">接单任务</span>
          </li>

          <li @click="tabChange(2,3)">
            <span :class="{'active':tabIndex==2,'':tabIndex!=2}">接单赚钱</span>
          </li>

          <li @click="tabChange(3,2)">
            <span :class="{'active':tabIndex==3,'':tabIndex!=3}">发布任务</span>
          </li>

          <li @click="tabChange(4,4)">
            <span class="last-bd" :class="{'active':tabIndex==4,'':tabIndex!=4}">好友邀请</span>
          </li>
        </ul>
        <div>
          <span class="qishu">奖励期数:</span>
          <el-select @change="change(periods)" v-model="periods" placeholder="请选择奖励期数">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="12">
        <b-card class="text-center sale-table">
          <div class="table-box">
            <el-table
              :data="dataLists"
              style="width: 100%"
              max-height="700" v-loading="loading">
              <el-table-column
                prop="apealAlias"
                label="用户">
                <template slot-scope="scope">
                  <div class="use-bg">
                    <div>
                      <img class="user-logo" :src="scope.row.ico" v-if="scope.row.ico" width="38"
                           height="38"/>
                    </div>
                    <div class="use-name">
                      <span class="user-name">{{scope.row.alias}}</span>
                      <p class="user-id">ID:{{scope.row.userId}}</p>
                    </div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                prop="doTaskCount"
                label="接单数" v-if="taskType==1">
              </el-table-column>
              <el-table-column
                prop="totalAmout"
                label="赚钱金额" v-if="taskType==3">
              </el-table-column>

              <el-table-column
                prop="publishCount"
                label="发布数" v-if="taskType==2">
              </el-table-column>

              <el-table-column
                prop="friends"
                label="好友数" v-if="taskType==4">
              </el-table-column>
              <el-table-column
                prop="amount"
                label="奖励"
                width="180">
                <template slot-scope="scope">
                  <span>{{(+scope.row.amount / 100 ).toFixed( 2 )}}</span>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="btn-wrap" v-if="tabIndex==4">
            <el-button @click="sure()" class="btn" v-bind:disabled="state==1">{{state==1?'已发放':'确定发放'}}</el-button>
          </div>
          <!--<nav class="nav-pagination">-->
          <!--<div class="total-count">-->
          <!--总共<span class="txt-rd">{{total}}</span>个任务-->
          <!--</div>-->
          <!--<el-pagination-->
          <!--:page-size="perPage"-->
          <!--@current-change="handleCurrentChange"-->
          <!--layout="prev, pager, next, jumper"-->
          <!--:total="total">-->
          <!--</el-pagination>-->
          <!--</nav>-->
        </b-card>
      </b-col>

    </b-row>
  </div>
</template>

<script>

  import axios from "axios";
  import {getDate} from "../filter/data";
  import _ from "lodash";

  export default {
    data() {
      return {
        total: 0,
        perPage: 10,
        page: 1,
        applyLists: {},
        dataLists: [],
        tabIndex: 1,
        taskType: 1,
        //加载圈
        loading: true,
        options: [],
        periods: '',
        state: 0
      };
    },
    methods: {
      // //时间戳转时间yy-mm-dd:hh:mm:ss
      getDateTime(data) {
        return getDate(data);
      },
      change(val) {
        let param = _.filter(this.options, (o) => {
          return o.indexNo === val;
        });
        this.state = this.options[0].sended;
        this.callBackDataApi(param[0]);
      },
      //切换tab方法
      tabChange(index, type) {
        if (this.tabIndex === index) return;
        this.tabIndex = index;
        this.taskType = type;
        this.dataLists = this.applyLists[this.taskType];
      },
      sure() {
        let param = _.filter(this.options, (o) => {
          return o.indexNo === this.periods;
        });
        if (param[0].sended == 1) return;
        axios.post(process.env.VUE_APP_HOST + "/sys/weekback/confirmBons", {
          "endTime": param[0].endTime,
          "id": param[0].id,
          "indexNo": param[0].indexNo,
          "name": param[0].name,
          "sended": param[0].sended,
          "startTime": param[0].startTime,
        }).then(res => {
          if (res.data.code === 200) {
            this.$message("发布成功");
          }
        }),
          err => {
            this.$message("服务器故障，请稍候重试！");
          };
      },
      callBackQiApi() {
        axios.get(process.env.VUE_APP_HOST + "/sys/weekback/periods", {}).then(res => {
          this.loading = false;
          if (res.data.code === 200) {
            let data = res.data.data;
            this.options = data;
            for (let i = 0; i < data.length; i++) {
              this.options[i]['value'] = data[i].indexNo;
              this.options[i]['label'] = data[i].name;
            }
            this.periods = this.options[0].indexNo;
            this.state = this.options[0].sended;
            this.callBackDataApi(this.options[0]);
          }
        }),
          err => {
            this.loading = false;
            this.$message("服务器故障，请稍候重试！");
          };
      },
      callBackDataApi(index) {
        axios.post(process.env.VUE_APP_HOST + "/sys/weekback/periodDatas", {
          "endTime": index.endTime,
          "id": index.id,
          "indexNo": index.indexNo,
          "name": index.name,
          "sended": index.sended,
          "startTime": index.startTime,
        }).then(res => {
          if (res.data.code === 200) {
            let result = res.data.data;
            this.applyLists = result;
            if (this.applyLists[3].length) {
              for (let i = 0; i < this.applyLists[3].length; i++) {
                this.applyLists[3][i]['totalAmout'] = (+this.applyLists[3][i]['totalAmout'] / 100).toFixed(2);
              }
            }
            this.dataLists = this.applyLists[this.taskType];
          }
        }),
          err => {
            this.loading = false;
            this.$message("服务器故障，请稍候重试！");
          };
      }

    },
    computed: {},
    mounted() {
    },
    beforeMount() {
      this.tabIndex = 1;
      //请求期数
      this.callBackQiApi();
    },
    destroyed: function () {
      this.applyLists = [];
    }
  };
</script>

<style lang="scss" scoped>
  @media (min-width: 768px) {
    .sale-table {
      margin-bottom: 0;
      .table-box {
        height: auto;
        overflow-y: auto;
      }
    }
  }

  //列表和头部的公共样式
  .sale-wrap /deep/ {
    * {
      outline: none !important;
    }
    width: 100%;
    .tab-title {
      .tool-d {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;
        .qishu {
          display: inline-block;
          padding-right: 5px;
          font-size: 16px;
        }
      }
      ul,
      li {
        padding: 0;
        margin: 0;
        list-style: none;
        span {
          display: inline-block;
          padding-right: 10px;
          border-right: 2px solid #e9e9e9;
          color: #000;;
          font-size: 16px;
          cursor: pointer;

          &.last-bd {
            border-right: 0;
          }
          &.active {
            color: #ff4343;
            font-weight: bold;
          }
        }
      }
      li {
        display: inline-block;
        padding-bottom: 15px;
        margin-right: 15px;
      }
    }
    .el-button.is-disabled:hover {
      color: #fff;
      cursor: not-allowed;
      background-image: none;
      background: #ff4343;
    }
    .use-bg {
      display: flex;
      align-items: center;
      justify-content: center;
      div {
        flex: 1;
        text-align: right;
        &.use-name {
          text-align: left;
        }
      }
    }

    .user-logo {
      border-radius: 50%;
    }
    .user-name {
      display: inline-block;
      padding-left: 10px;
    }
    .user-id {
      padding-left: 10px;
      color: #999999;
      margin: 0;
      font-size: 12px;
    }
    .el-table th {
      border-bottom: 1px solid #e9e9e9 !important;
      background: #ffffff !important;
      border-top: 0 !important;
      text-align: center !important;
    }
    .el-table td {
      border-top: 0 !important;
      border: 0 !important;
      text-align: center !important;
    }
    .card.text-center.sale-table {
      border: 0 !important;
      box-shadow: 2px 2px 10px #ccc;
      border-radius: 0 !important;

      .card-body {
        padding: 0 !important;
      }
    }
    .el-icon-arrow-left:before {
      content: '上一页' !important;
    }
    .el-icon-arrow-right:before {
      content: '下一页' !important;
    }
    .nav-pagination {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .total-count {
        padding-left: 20px;
        .txt-rd {
          color: #FF4343;
          display: inline-block;
          padding: 0 3px;
          font-size: 12px;
        }
      }

      .el-pagination {
        padding-right: 20px;
        margin-top: 15px;
        text-align: right;
        margin-bottom: 15px;
        .btn-next, .btn-prev {
          background: rgb(232, 235, 237);
          color: rgb(51, 51, 51);
          font-size: 14px;
          margin-left: 6px;
        }
        .el-pager li {
          padding: 0;
          background: rgb(232, 235, 237);
          font-size: 14px;
          color: rgb(51, 51, 51);
          min-width: 30px;
          margin-left: 6px;
          font-weight: normal;
          &.active {
            color: #fff;
            font-weight: bold;
            background: #FF4343;

          }
        }
      }
    }
  }
</style>
