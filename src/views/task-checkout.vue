<template>
  <div class="sale-wrap">
    <b-row>
      <b-col cols="12" v-if="showAdd">
        <b-card class="text-center sale-table">
          <b-row class="table-top">
            <b-col cols="12" md="4" sm="12">
              <h6 class="apply-title">发券申请列表</h6>
            </b-col>
            <b-col cols="4" md="3">
              <div class="btn-group search-input">
                <b-form-input class="search-val" v-model="CodeName"
                              type="text"
                              placeholder="输入搜索的券号或券名"></b-form-input>
                <b-button size="small" @click="searchCard" class="condition">搜索</b-button>
              </div>
              <csv-download style="display: none" class="download" :data-json="exportedsaleLists"
                            v-show="exportedsaleLists.length"></csv-download>
            </b-col>
            <b-col cols="9" md="5" sm="12" class="add-col">
              <div class="btn-group">
                <b-button size="small" @click="editCard('add','')" class="condition">新增</b-button>
              </div>
            </b-col>
          </b-row>
          <div class="table-box">

            <!--@row-dbclicked="enterEdit"-->
            <b-table hover responsive="sm" :items="saleList" :fields="fields" :current-page="page"
                     :per-page="perPage">
              <template slot="operation" slot-scope="row">
                <a size="sm" @click="editCard('edit',row.index)" class="edit-btn">
                  编辑
                </a>
              </template>
            </b-table>
          </div>
          <nav>
            <b-pagination align="right" :total-rows="total" :per-page="perPage" v-model="page" prev-text="<"
                          next-text=">" hide-goto-end-buttons/>
          </nav>
        </b-card>
      </b-col>
      <b-col cols="12" v-if="!showAdd">
        <b-card class="latelyThirty  sale-table">
          <p class="everyOrderTitle">{{typeTitle}}</p>
          <b-form @submit="save">
            <b-form-group horizontal
                          label="*券名:"
                          label-class="text-sm-right"
                          label-for="nestedStreet"
                          class="form-title">
              <b-form-input required class="input" v-model.trim="cardInfo.card_name"></b-form-input>
            </b-form-group>
            <b-form-group horizontal
                          label="*券码:"
                          label-class="text-sm-right"
                          label-for="nestedStreet"
                          class="form-title">
              <b-form-input required class="input" disabled
                            v-model.trim="cardInfo.card_no"></b-form-input>
            </b-form-group>
            <b-form-group horizontal
                          label="*类型:"
                          label-class="text-sm-right"
                          label-for="nestedStreet"
                          class="form-title">
              <b-form-select required v-model="cardInfo.card_type" :options="options" class="input"/>
            </b-form-group>
            <b-form-group horizontal
                          label="*开始时间:"
                          label-class="text-sm-right"
                          label-for="nestedStreet"
                          class="form-title">
              <el-date-picker
                v-model="cardInfo.start_time"
                type="date"
                placeholder="选择日期"
                :picker-options="pickerOptions"
                value-format="yyyy-MM-dd"
              >
              </el-date-picker>
            </b-form-group>
            <b-form-group horizontal
                          label="*结束时间:"
                          label-class="text-sm-right"
                          label-for="nestedStreet"
                          class="form-title">
              <el-date-picker
                v-model="cardInfo.end_time"
                type="date"
                placeholder="选择日期"
                :picker-options="pickerOptions"
                value-format="yyyy-MM-dd"
              >
              </el-date-picker>
            </b-form-group>
            <b-button variant="primary" class="add btn" type="submit">保存</b-button>
            <b-button variant="secondary" class="btn" @click="back">返回</b-button>
          </b-form>
        </b-card>
      </b-col>
    </b-row>
    <b-modal v-model="modalShow"  title="温馨提示">
      抱歉，没有查询出符合条件的卡券！
    </b-modal>
  </div>
</template>

<script>

  export default {
    data() {
      return {
        modalShow:false,
        CodeName:'',
        pickerOptions: {},
        name: '',
        saleList: [],
        total: 0,
        perPage: 15,
        page: 1,
        exportedsaleLists: [],
        fields: {
//          no: {
//            label: "序号"
//          },
          operation: {
            label: '操作',
          },
          card_no: {
            label: '券号'
          },
          card_name: {
            label: '券名'
          },
          card_type: {
            label: '类型'
          },
          start_time: {
            label: '开始时间'
          },
          end_time: {
            label: '结束时间'
          },
          status: {
            label: '状态'
          }
        }, selected: null,
        options: [
          {value: null, text: '请选择卡券类型'},
          {value: '商品券', text: '商品券'},
          {value: '折扣券', text: '折扣券'},
        ],
        typeTitle: "",
        showAdd: true,
        cardInfo: {
          card_no: "",
          card_name: '',
          card_type: "",
          start_time: "",
          end_time: "",
          status: '已提交'
        },
        editIndex: 0
      }
    },
    methods: {
      searchCard(){
        let localData = JSON.parse(sessionStorage.getItem('cardLists'));
        let searchData = [];
        if(this.CodeName) {
          localData.map((item) =>{
            if(item.card_no.toString().indexOf(this.CodeName)>-1||item.card_name.indexOf(this.CodeName)>-1){
              searchData.push(item);
            }
          });
          if(!searchData.length){
            this.modalShow = true
            this.saleList = localData;
          }else{
            this.saleList =searchData;
          }
        }else{
          this.saleList = localData;
        }

      },
      save() {
        let localData = JSON.parse(sessionStorage.getItem('cardLists'));
        this.saleList = localData;
        if (this.typeTitle === '编辑卡券') {
          this.saleList[this.editIndex] = this.cardInfo;
        } else {
          this.saleList.unshift(this.cardInfo);
        }
        sessionStorage.setItem('cardLists', JSON.stringify(this.saleList));
        this.showAdd = true;
      },
      back() {
        this.showAdd = true;
      },
      editCard(type, index) {
        if (type === 'edit') {
          this.editIndex = index;
          this.cardInfo = this.saleList[index];
          this.typeTitle = '编辑卡券';
        } else {
          this.cardInfo = {
            card_no: parseInt((new Date()).getTime() / 1000),
            card_name: '',
            card_type: "",
            start_time: "",
            end_time: "",
            status: '已提交'
          };
          this.editIndex = 0;
          this.typeTitle = '新增卡券';
        }
        this.showAdd = false;
      },
    },
    computed: {},
    mounted() {
      let data = [
        {
          card_no: "1535509633",
          card_type: "商品券",
          card_name: '五粮液优惠券',
          start_time: "2018-9-20",
          end_time: "2018-10-20",
          status: "已核销"
        },
        {
          card_no: "1535503332",
          card_type: "折扣券",
          card_name: '蒙牛优惠券',
          start_time: "2018-9-10",
          end_time: "2018-10-20",
          status: "已提交"
        },
        {
          card_no: "1535507692",
          card_type: "商品券",
          card_name: '伊利优惠券',
          start_time: "2018-9-20",
          end_time: "2018-10-09",
          status: "已审核"
        },
        {
          card_no: "1535504333",
          card_type: "商品券",
          card_name: '云南白药优惠券',
          start_time: "2018-9-20",
          end_time: "2018-10-10",
          status: "已核销"
        },
        {
          card_no: "1535505231",
          card_type: "折扣券",
          card_name: '烟酒优惠券',
          start_time: "2018-9-20",
          end_time: "2018-11-02",
          status: "已关闭"
        },
      ];
      let localData = sessionStorage.getItem('cardLists');
      if (localData) {
        this.saleList = JSON.parse(localData);
      } else {
        this.saleList = data;
        sessionStorage.setItem('cardLists', JSON.stringify(data))
      }
      this.total = this.saleList.length;

    }
  }
</script>

<style lang="scss" scoped>
  @media (min-width: 768px) {
    .sale-table {
      margin-bottom: 0;

      .table-box {
        height: 571px;
        overflow-y: auto;
      }
    }

  }

  .everyOrderTitle {
    color: #000;
    line-height: 50px;
    font-size: 16px;
    margin-left: 30px;
    font-weight: 800;
  }

  .edit-btn {
    color: rgb(32, 168, 216) !important;
    border-bottom: solid 1px rgb(32, 168, 216);
    cursor: pointer;
  }

  .apply-title {
    text-align: left;
    font-size: 16px;
    font-weight: 800;
  }

  .sale-wrap {
    padding: 20px 0;

  }

  .latelyThirty /deep/ {
    background: #fff;
    padding-bottom: 10px;

    .input {
      width: 50%;
    }

    .btn {
      margin-top: 30px;
      display: inline-block;
      width: 180px
    }
    .add {
      margin-left: 30%;
      margin-right: 80px;
    }
  }

  .form-title {
    margin-right: 50px;
  }

  .sale-table /deep/ {

    .table-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #000;
      margin-bottom: 10px;

      h4 {
        width: 40%;
        flex-grow: 1;
        padding: 15px 10px;
      }

      .download {
        flex-grow: 1;
      }

      .add-col {
        text-align: right;
        padding-right: 30px;
      }

      .btn-group {
        flex-grow: 0;
        &.search-input{
          width: 100%;
          .search-val{
            border:1px solid rgb(8, 121, 208);
          }
        }

        .condition {
          background: transparent;
          color: #0879D0;
          border-color: #4B99FF;

          &.active {
            background: #0879D0;
            color: #fff;
          }

          &:active {
            background: #0879D0;
            opacity: 0.9;
            color: #fff;
          }

          &:hover {
            background: #0879D0;
            opacity: 0.7;
            color: #fff;
          }

        }
      }
    }
    .table th {
      border-top: 0 !important;
    }

  }


</style>
