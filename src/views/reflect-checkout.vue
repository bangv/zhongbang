<template>
  <div class="sale-wrap">
    <b-row class="tab-title">
      <b-col cols="12">
        <ul>
          <li @click="tabChange(1)">
            <span :class="{'active':tabIndex==1,'':tabIndex!=1}">待审核</span>
          </li>

          <li @click="tabChange(2)">
            <span :class="{'active':tabIndex==2,'':tabIndex!=2}">已审核</span>
          </li>

          <li @click="tabChange(3)">
            <span :class="{'active':tabIndex==3,'':tabIndex!=3}">待付款</span>
          </li>

          <li @click="tabChange(4)">
            <span :class="{'active':tabIndex==4,'':tabIndex!=4}">已付款</span>
          </li>

          <li @click="tabChange(5)">
            <span :class="{'active':tabIndex==5,'':tabIndex!=5}">驳回</span>
          </li>
          <li @click="tabChange(6)">
            <span class="last-bd" :class="{'active':tabIndex==6,'':tabIndex!=6}">全部</span>
          </li>
        </ul>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="12">
        <b-card class="text-center sale-table">
          <div class="table-box">
            <el-table
              :data="tableData2"
              style="width: 100%"
              max-height="700" v-loading="loading">
              <el-table-column
                prop="name"
                label="申请人">
                <template slot-scope="scope">
                  <img class="user-logo" src="https://wx.qlogo.cn/mmopen/vi_32/fibhGLYiayiaU4348d0qhFFt2iaMwOq5UlibvOUxnlmG5IBn0NBXcsaNhMv36ibyENRdHUQnSDSlGIwialTJlKdoP5ZEQ/132" width="38" height="38" />
                  <span class="user-name">{{scope.row.name}}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="order"
                label="单号">
              </el-table-column>
              <el-table-column
                prop="title"
                label="提现分类"
                width="180">
                <template slot-scope="scope">
                  <el-button
                    @click.native.prevent="goDetail(scope)"
                    type="text"
                    size="small">
                    {{scope.row.title}}
                  </el-button>
                </template>
              </el-table-column>
              <el-table-column
                prop="price"
                label="价格">
              </el-table-column>
              <el-table-column
                prop="startTime"
                label="创建时间">
              </el-table-column>
            </el-table>
          </div>
          <nav class="nav-pagination">
            <div class="total-count">
              总共<span class="txt-rd">{{total}}</span>个任务
            </div>
            <el-pagination
              :page-size="20"
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

  export default {
    data() {
      return {
        total: 0,
        perPage: 20,
        page: 1,
        tableData2: [],
        tabIndex: 1,
        //加载圈
        loading: true,
      };
    },
    methods: {
      loadSpiner() {
        setTimeout(() => {
          this.loading = false;
        }, 2000);
      },

      //切换tab方法
      tabChange(index) {
        if (this.tabIndex === index) return;
        this.tabIndex = index;
        this.loading = true;
        this.loadSpiner();
        //请求接口
        this.search()
      },
      search() {
        //
      },
      goDetail(index) {
        this.$router.push({
          path: '/reflect-detail',
          query: {id: index.$index, tabIndex: this.tabIndex}
        })
      },

    },
    computed: {},
    mounted() {
      for (let i = 0; i < 200; i++) {
        this.tableData2.push({
          name: "微微笑"+i+1,
          order:"254862",
          title: "微信邀请好友",
          price: "￥2.3",
          startTime: "2018-09-20 12:34",
          status: i
        });
      }
      this.total = this.tableData2.length;
      setTimeout(() => {
        this.loading = false;
      }, 2000);
      this.$http.post(process.env.VUE_APP_HOST + '/user/login', {
        "mobile": "4634",
        "pwd": "123456",
        "verifyCode": "1234"

      }).then(res => {
        console.log(res)
      }), err => {
        console.error('失败', err)
      }
      this.$http.post(process.env.VUE_APP_HOST + '/accout/userTransDetail', {
        "lastTransTime": 0,
        //     "size": 10

      }).then(res => {
        console.log(res)
      }), err => {
        console.error('失败', err)
      }

      // request({
      //   url: Modules.SYS_LOGIN,
      //   params: {
      //     mobile: "4634",
      //     pwd: "123456",
      //     verifyCode: "1234"
      //   }
      // }).then(res => {
      //   console.log(res);
      // });
      // request({
      //   url: Modules.SYS_CHANGE,
      //   params:{
      //     "lastTransTime": 0,
      //     "size": 10
      //   }
      // }).then(res => {
      //   console.log(res);
      // });
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
    ul,
    li {
      padding: 0;
      margin: 0;
      list-style: none;
    }
    * {
      outline: none !important;
    }
    width: 100%;
    .tab-title {
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
    .user-logo{
      border-radius: 50%;
    }
    .user-name{
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
