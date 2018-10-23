<template>
  <div class="app">
    <AppHeader fixed>
      <header-top></header-top>
    </AppHeader>
    <div class="app-body" ref="Sidebar">
      <div class="side">
        <el-menu :default-active="$route.path" background-color="#ffffff" text-color="#999999"
                 active-text-color="#ff4343" router="router">
          <el-menu-item index="/task">
            <span class="side-bg side-ioc-bg-1"></span>
            <span slot="title">任务审核</span>
          </el-menu-item>
          <el-menu-item index="/reflect">
            <span class="side-bg side-ioc-bg-2"></span>
            <span slot="title">提现审核</span>
          </el-menu-item>
          <el-menu-item index="/apply">
            <span class="side-bg side-ioc-bg-3"></span>
            <span slot="title">申诉处理</span>
          </el-menu-item>
        </el-menu>
      </div>
      <main class="main">
        <div class="container-fluid main-content">
          <router-view></router-view>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import nav from "@/nav";
import { formatDate } from "../filter/data";
import {
  Header as AppHeader,
  SidebarToggler,
  Sidebar as AppSidebar,
  SidebarFooter,
  SidebarForm,
  SidebarHeader,
  SidebarMinimizer
} from "@coreui/vue";
import HeaderTop from "../components/headerTop";

export default {
  name: "full",
  components: {
    "header-top": HeaderTop,
    AppHeader,
    AppSidebar,
    SidebarForm,
    SidebarFooter,
    SidebarToggler,
    SidebarHeader,
    SidebarMinimizer
  },
  data() {
    return {
      router: true, //是否启动路由模式Nav
      nav: nav.items,
      nowDate: "",
      nowDay: "",
      timeNow: "",
    };
  },
  filters: {
    formatDate(time) {
      var date = new Date(time);
      return formatDate(date, "yyyy年MM月dd日");
    }
  },
  methods: {
    routeName() {
      return this.$route;
    }
  },
  computed: {},
  mounted() {
    console.log("home页面");
    this.routeName();
  }
};
</script>

<style lang="scss">
.side {
  position: fixed;
  z-index: 1019;
  width: 90px;
  height: 100vh;
  background: #fff;
  ul {
    border: 0;
  }
}

.el-menu-item {
  padding: 20px 0 !important;
  text-align: center !important;
  font-size: 12px !important;
  height: auto !important;
  line-height: normal !important;
  display: flex;
  flex-direction: column;
  .side-bg {
    display: inline-block;
    margin: 0 auto;
    width: 34px;
    height: 34px;
    background-size: 100% 100%;
  }
  .side-ioc-bg-1 {
    background: url("../assets/task_normal.png") no-repeat top left;
    background-size: 100% 100%;
  }
  .side-ioc-bg-2 {
    background: url("../assets/withdraw_normal .png") no-repeat top left;
    background-size: 100% 100%;
  }
  .side-ioc-bg-3 {
    background: url("../assets/appeal_normal.png") no-repeat top left;
    background-size: 100% 100%;
  }
}

.el-menu-item:hover {
  border-left: 2px solid #ff4343;
  background: linear-gradient(
    90deg,
    rgba(255, 67, 67, 0.2) 0%,
    rgba(255, 67, 67, 0) 100%
  ) !important;
}

.el-menu-item.is-active {
  color: #ff4343 !important;
  border-left: 2px solid #ff4343;
  background: linear-gradient(
    90deg,
    rgba(255, 67, 67, 0.2) 0%,
    rgba(255, 67, 67, 0) 100%
  ) !important;
  .side-ioc-bg-1 {
    background: url("../assets/task_select.png") no-repeat top left;
  }
  .side-ioc-bg-2 {
    background: url("../assets/withdraw_select.png") no-repeat top left;
  }
  .side-ioc-bg-3 {
    background: url("../assets/appeal_select.png") no-repeat top left;
  }
}

.main {
  margin-left: 90px;
  background: rgb(247, 249, 249);
}

.main .main-content {
  position: relative;
  height: 100%;
  padding: 20px 20px !important;
}
.app-header {
  width: 100% !important;
  background: #fff !important;
  position: fixed !important;
  top: 0 !important;
  left: 0 !important;
}
</style>
