<template>
  <div class="sale-wrap">

    <b-row class="tab-title">
      <b-col cols="12">
        <ul>
          <li @click="tabChange(1,0)">
            <span :class="{'active':tabIndex==1,'':tabIndex!=1}">待审核</span>
          </li>
          <li @click="tabChange(2,1)">
            <span :class="{'active':tabIndex==2,'':tabIndex!=2}">已审核</span>
          </li>

          <li @click="tabChange(3,2)">
            <span :class="{'active':tabIndex==3,'':tabIndex!=3}">驳回</span>
          </li>

          <li @click="tabChange(4,'')">
            <span class="last-bd" :class="{'active':tabIndex==4,'':tabIndex!=4}">全部</span>
          </li>
        </ul>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="12">
        <b-card class="text-center sale-table">
          <div class="table-box">
            <el-table
              :data="taskLists"
              style="width: 100%"
              max-height="700"
              v-loading="loading" class="data-list">
              <el-table-column
                prop="alias"
                label="发布人">
                <template slot-scope="scope">
                  <div class="use-bg">
                    <div>
                      <img class="user-logo" :src="scope.row.userIco" v-if="scope.row.userIco" width="38" height="38"/>
                    </div>
                    <div class="use-name">
                      <span class="user-name">{{scope.row.alias}}</span>
                    </div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                prop="typeName"
                label="任务类型">
              </el-table-column>
              <el-table-column
                prop="taskTitle"
                label="任务标题"
                width="180">
                <template slot-scope="scope">
                  <el-button
                    @click.native.prevent="goDetail(scope)"
                    type="text"
                    size="small">
                    {{scope.row.taskTitle}}
                  </el-button>
                </template>
              </el-table-column>
              <el-table-column
                prop="amount"
                label="价格">
              </el-table-column>
              <el-table-column
                prop="taskCount"
                label="数量">
              </el-table-column>
              <el-table-column
                prop="lastTime"
                label="截止时间">
                <template slot-scope="scope">
                  <span class="user-name">{{getDateTime(scope.row['lastTime'])}}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="createTime"
                label="创建时间">
                <template slot-scope="scope">
                  <span class="user-name">{{getDateTime(scope.row['createTime'])}}</span>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <nav class="nav-pagination">
            <div class="total-count">
              总共<span class="txt-rd">{{total}}</span>个任务
            </div>
            <el-pagination
              @current-change="handleCurrentChange"
              :page-size="10"
              layout="prev, pager, next, jumper"
              :total="total">
            </el-pagination>
          </nav>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>

  import axios from "axios";

  export default {
    data() {
      return {
        total: 0,
        perPage: 10,
        page: 1,
        taskLists: [],
        tabIndex: 1,
        taskType: 0,
        //加载圈
        loading: true,

      };
    },
    methods: {
      //时间戳转时间yy-mm-dd:hh:mm:ss
      getDateTime(data) {
        let date = new Date(data);
        let Y = date.getFullYear() + '-';
        let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        let D = date.getDate() + ' ';
        let h = date.getHours() + ':';
        let m = date.getMinutes() + ':';
        let s = date.getSeconds();
        return Y + M + D + h + m + s;
      },
      handleCurrentChange(val) {
        this.page = val;
        this.loading = true;
        this.callBackApi(this.page);
      },
      //切换tab方法
      tabChange(index, type) {
        if (this.tabIndex === index) return;
        this.tabIndex = index;
        this.taskType = type
        this.loading = true;
        //请求接口
        this.page = 1;
        this.callBackApi(this.page);
      },
      goDetail(index) {
        this.$router.push({
          path: '/task-detail',
          query: {id: index.$index, tabIndex: this.tabIndex}
        })
      },
      callBackApi(page) {
        axios.post(process.env.VUE_APP_HOST + "/task/back/query", {
          "examineStatus": this.taskType,
          "nextId": 0,
          "page": page,
          "pageSize": this.pageSize,
          "preId": 0
        }).then(res => {
          this.loading = false;
          if (res.data.code === 200) {
            let data = res.data.data;
            this.total = data.total;
            this.taskLists = data.records;
            console.log('this.taskLists', data.records)
          }
        }),
          err => {
            this.loading = false;
            this.$message("服务器故障，请稍候重试！");
          };
      }
    },
    computed: {},
    beforeMount() {
      this.callBackApi(this.page);
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
      ul,
      li {
        padding: 0;
        margin: 0;
        list-style: none;
        span {
          display: inline-block;
          padding-right: 10px;
          border-right: 2px solid #e9e9e9;
          color: #000;
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
      padding-left: 5px;
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
      content: "上一页" !important;
    }
    .el-icon-arrow-right:before {
      content: "下一页" !important;
    }
    .nav-pagination {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .total-count {
        padding-left: 20px;
        .txt-rd {
          color: #ff4343;
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
        .btn-next,
        .btn-prev {
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
            background: #ff4343;
          }
        }
      }
    }
  }
</style>
