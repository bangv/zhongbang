<template>
  <div class="app">
    <div class="app-headers">
      <div class="fix-bar">
        <SidebarToggler class="d-md-down-none" display="lg"/>
        <SidebarToggler class="d-lg-none" display="md" mobile/>
      </div>
    </div>
    <AppHeader fixed>
      <div class="navbar-brand">
        <img class="navbar-brand-full" src="../assets/logo.png" width="40" height="38" title="众帮互助" alt="众帮互助">
      </div>
      <div class="header-time navbar-nav">众帮互助
      </div>
      <div class="header-content navbar-nav ml-auto">
        <span class="logout" @click="logout">
          <img src="../assets/logout-bg.png" width="27" height="27" title="安全退出"/>
        </span>
        <span class="logout">
          <img src="../assets/logout-bg.png" width="27" height="27" title="头像"/>
        </span>
        <span>{{user}} </span>
      </div>
    </AppHeader>
    <div class="app-body" ref="Sidebar">
      <div class="side">
        <el-menu default-active="task" background-color="#ffffff" text-color="#999999"
                 active-text-color="#ff4343" router="router">
          <el-menu-item index="task">
            <span class="side-bg side-ioc-bg-1"></span>
            <span slot="title">任务审核</span>
          </el-menu-item>
          <el-menu-item index="reflect">
            <span class="side-bg side-ioc-bg-2"></span>
            <span slot="title">提现审核</span>
          </el-menu-item>
          <el-menu-item index="apply">
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

export default {
  name: "full",
  components: {
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
      router: true,
      nav: nav.items,
      nowDate: "",
      nowDay: "",
      timeNow: "",
      user: "张三"
    };
  },
  filters: {
    formatDate(time) {
      var date = new Date(time);
      return formatDate(date, "yyyy年MM月dd日");
    }
  },
  methods: {
    //退出
    logout() {
      this.$router.push({ path: "/login" });
    }
  },
  computed: {
    name() {
      return this.$route.name;
    }
  },
  mounted() {}
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

.app /deep/ {
  .app-header {
    background: #fff;
    font-size: 14px;
    border: 0 none;
    color: #24282f;
    .navbar-brand {
      width: 66px;
      display: inline-block;
      text-align: right;
      line-height: 50px;
    }
    .header-time {
      line-height: 50px;
      height: 56px;
      font-size: 12px;
      display: inline-block;
    }
    .header-content {
      padding-right: 18px;
      & > span {
        font-size: 12px;
        margin-right: 8px;
      }
      .logout {
        text-align: center;
        width: 27px;
        height: 27px;
        border-radius: 50%;
        margin-left: 15px;
        cursor: pointer;
      }
    }
  }
  .main {
    margin-left: 90px;
    background: rgb(247, 249, 249);
  }
}

.main .main-content {
  position: relative;
  height: 100%;
  padding: 20px 20px!important;
}

.app-headers {
  height: 0;
  width: 100%;
  background: #fff;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1999;
  overflow: hidden;
  .fix-bar {
    display: none;
  }
}
</style>
