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
              <el-progress type="circle" :percentage="80" :show-text="showTxt" :width="chartWidth" :stroke-width="chartBorder"
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


      </div>
    </div>
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
        //进度条
        showTxt: true,
        //进度条线宽度
        chartBorder:10,
        //进度宽度
        chartWidth:100,
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
      //返回
      goback() {
        this.$router.go(-1);
      },
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
      console.log("=====", this.$route.query.id);
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
      this.$http
        .post(process.env.VUE_APP_HOST + "/user/login", {
          mobile: "4634",
          pwd: "123456",
          verifyCode: "1234"
        })
        .then(res => {
          this.$message("登录成功");
          console.log(res);
        }),
        err => {
          console.error("失败", err);
        };
      this.$http
        .post(process.env.VUE_APP_HOST + "/accout/userTransDetail", {
          lastTransTime: 0
          //     "size": 10
        })
        .then(res => {
          console.log(res);
        }),
        err => {
          console.error("失败", err);
        };
    }
  };
</script>
<style lang="scss" scoped>
  //列表和头部的公共样式
  .task-detail {
    .app-body {
      margin-top: 0;
    }
    .content {
      width: 100%;
      background: #f7f9fa;
      height: 100vh;
      padding-top: 55px;
      .detail-head {
        margin: 20px;
        background-color: #fff;
        padding: 8px 12px;
        border: 0;
        box-shadow: 2px 2px 10px #ccc;
        border-radius: 2px;
      }
      .list-title {
        padding-left: 5px;
        border-left: 2px solid rgb(255, 67, 67);
        font-size: 18px;
        font-weight: 400;
        display: inline-block;
      }
      .content-chart {
        width: 650px;
        margin: 0 auto;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: -30px;
        div {
          flex: 1;
          &.flex-2 {
            flex: 1;
          }
        }
        p {
          text-align: center;
          padding: 0;
          margin: 0;
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
        .mg-bt{
          margin-bottom: 15px;
        }
        .count-b {
          font-size: 30px;
          font-weight: bold;
          color: #333333;
        }
        .content-b{
          font-size: 18px;
          color: #333333;
        }
      }
    }
  }
</style>
