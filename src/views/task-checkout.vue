<template>
  <div class="sale-wrap">

    <b-row class="tab-title">
      <b-col cols="12">
        <ul>
          <li>
            <span class="active">待审核</span>
          </li>

          <li>
            <span>已审核</span>
          </li>

          <li>
            <span>驳回</span>
          </li>

          <li>
            <span class="last-bd">全部</span>
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
              max-height="700">
              <el-table-column
                prop="name"
                label="发布人">
              </el-table-column>
              <el-table-column
                prop="type"
                label="任务类型">
              </el-table-column>
              <el-table-column
                prop="title"
                label="任务标题"
                width="180">
                <template slot-scope="scope">
                  <el-button
                    @click.native.prevent="deleteRow(scope, tableData2)"
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
                prop="count"
                label="数量">
              </el-table-column>
              <el-table-column
                prop="endTime"
                label="截止时间">
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
            <!--<b-pagination align="right" :label-page="falg" :number-of-pages="num"  :total-rows="total" :per-page="perPage" v-model="page" prev-text="上一页"-->
            <!--next-text="下一页"/>-->
          </nav>
        </b-card>
      </b-col>

    </b-row>
  </div>
</template>

<script>
import { request, Modules } from "../utils/HttpRequest/request";

export default {
  data() {
    return {
      modalShow: false,
      CodeName: "",
      pickerOptions: {},
      name: "",
      saleList: [],
      total: 0,
      perPage: 20,
      page: 1,
      tableData2: [],
      num: 3,
      falg: true
    };
  },
  methods: {
    searchCard() {
      let localData = JSON.parse(sessionStorage.getItem("cardLists"));
      let searchData = [];
      if (this.CodeName) {
        localData.map(item => {
          if (
            item.card_no.toString().indexOf(this.CodeName) > -1 ||
            item.card_name.indexOf(this.CodeName) > -1
          ) {
            searchData.push(item);
          }
        });
        if (!searchData.length) {
          this.modalShow = true;
          this.saleList = localData;
        } else {
          this.saleList = searchData;
        }
      } else {
        this.saleList = localData;
      }
    },
    save() {
      let localData = JSON.parse(sessionStorage.getItem("cardLists"));
      this.saleList = localData;
      if (this.typeTitle === "编辑卡券") {
        this.saleList[this.editIndex] = this.cardInfo;
      } else {
        this.saleList.unshift(this.cardInfo);
      }
      sessionStorage.setItem("cardLists", JSON.stringify(this.saleList));
      this.showAdd = true;
    },
    back() {
      this.showAdd = true;
    },
    // deleteRow(index, row) {
    //   console.log(index);
    // },

    editCard(type, index) {
      if (type === "edit") {
        this.editIndex = index;
        this.cardInfo = this.saleList[index];
        this.typeTitle = "编辑卡券";
      } else {
        this.cardInfo = {
          card_no: parseInt(new Date().getTime() / 1000),
          card_name: "",
          card_type: "",
          start_time: "",
          end_time: "",
          status: "已提交"
        };
        this.editIndex = 0;
        this.typeTitle = "新增卡券";
      }
      this.showAdd = false;
    }
  },
  computed: {},
  mounted() {
    for (let i = 0; i < 200; i++) {
      this.tableData2.push({
        name: "2016-05-02",
        type: "注册",
        title: "微信邀请好友",
        price: "￥2.3",
        count: 234,
        endTime: "2018-10-20 12:34",
        startTime: "2018-09-20 12:34"
      });
    }
    this.total = this.tableData2.length;
    // this.$http.post('http://47.107.33.234/user/login', {
    //   userLoginVO: {
    //     "mobile": "4634",
    //     "pwd": "123456",
    //     "verifyCode": "1234"
    //   }
    // })
    //   .then(res => {
    //     console.log(res)
    //   }), err => {
    //   console.error('失败', err)
    // }
    request({
      url: Modules.SYS_LOGIN,
      params: {
        mobile: "4634",
        pwd: "123456",
        verifyCode: "1234"
      }
    }).then(res => {
      console.log(res);
    });
    request({
      url: Modules.SYS_CHANGE,
      params:{
        "lastTransTime": 0,
        "size": 10
      }
    }).then(res => {
      console.log(res);
    });
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
