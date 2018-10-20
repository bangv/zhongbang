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
        <img class="navbar-brand-full" src="../assets/logo.png" width="89" height="25" alt="CoreUI Logo">
        <img class="navbar-brand-minimized" src="../assets/icon_1.png" width="30" height="30" alt="CoreUI Logo">
      </div>
      <div class="header-time navbar-nav">
        {{nowDate | formatDate}}<span>{{nowDay}}</span>
      </div>
      <div class="header-content navbar-nav ml-auto">
        <span>{{timeNow}}</span>
        <span>{{user}} </span>
        <span class="logout" @click="logout"><i class="icon-logout icons"></i>安全退出</span>
      </div>
    </AppHeader>
    <div class="app-body" ref="Sidebar">
      <div class="side">
        <el-menu router="true" default-active="task" background-color="#ffffff" text-color="#999999" active-text-color="#ff4343">
          <el-menu-item index="task">
            <span class="side-ioc-bg"></span>
            <span slot="title">任务审核</span>
          </el-menu-item>
          <el-menu-item index="reflect" >
            <span class="side-ioc-bg"></span>
            <span slot="title">提现审核</span>
          </el-menu-item>
          <el-menu-item index="apply">
            <span class="side-ioc-bg"></span>
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
  import nav from '@/nav'
  import {formatDate} from '../filter/data'
  import {
    Header as AppHeader,
    SidebarToggler,
    Sidebar as AppSidebar,
    SidebarFooter,
    SidebarForm,
    SidebarHeader,
    SidebarMinimizer,
  } from '@coreui/vue'

  export default {
    name: 'full',
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
        nav: nav.items,
        nowDate: '',
        nowDay: '',
        timeNow: '',
        user: '',
      }
    },
    filters: {
      formatDate(time) {
        var date = new Date(time);
        return formatDate(date, 'yyyy年MM月dd日')
      }
    },
    methods: {
//            退出
      logout() {
        this.$router.push({path: '/login'});
      }
    },
    computed: {
      name() {
        return this.$route.name
      }
    },
    mounted() {
      this.user = '张富贵';
      let dayArray = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'];
      this.nowDate = new Date();
      this.nowDay = dayArray[new Date().getDay() - 1];
      let hour = this.nowDate.getHours();
      if (hour < 6) {
        this.timeNow = '凌晨好！'
      }
      else if (hour < 9) {
        this.timeNow = '早上好！'
      }
      else if (hour < 12) {
        this.timeNow = '上午好！'
      }
      else if (hour < 14) {
        this.timeNow = '中午好！'
      }
      else if (hour < 19) {
        this.timeNow = '下午好！'
      }
      else if (hour < 22) {
        this.timeNow = '晚上好！'
      }
      else {
        this.timeNow = '夜里好！'
      }
      var toggle = this.$refs.Sidebar.querySelectorAll('.nav-dropdown-toggle');
      var old = null;
      let len = toggle.length;
      for (let i = 0; i < len; i++) {
        toggle[i].onclick = function () {
          if (old == i) {
            this.parentNode.className = 'nav-item nav-dropdown';
            old = null;
            return false;
          } else {
            for (var j = 0; j < len; j++) {
              toggle[j].parentNode.className = 'nav-item nav-dropdown';
            }
            this.parentNode.className = 'nav-item nav-dropdown open';
          }
          old = i;
        }

      }
    }
  }
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
    .side-ioc-bg {
      display: inline-block;
      margin: 0 auto;
      width: 34px;
      height: 34px;
      background: url("../assets/task_normal.png") no-repeat top left;
    }
  }

  .el-menu-item:hover {
    border-left: 2px solid #ff4343;
    background: linear-gradient(90deg, rgba(255, 67, 67, 0.2) 0%, rgba(255, 67, 67, 0) 100%) !important;
  }

  .el-menu-item.is-active {
    color: #ff4343 !important;
    border-left: 2px solid #ff4343;
    background: linear-gradient(90deg, rgba(255, 67, 67, 0.2) 0%, rgba(255, 67, 67, 0) 100%) !important;
    .side-ioc-bg {
      background: url("../assets/task_select.png") no-repeat top left;
    }
  }

  .app /deep/ {
    .app-header {
      background: #fff;
      font-size: 14px;
      border: 0 none;
      color: #24282F;
      .navbar-brand {
        width: 120px;
        line-height: 50px;
      }
      .header-time {
        padding-left: 18px;
        & > span {
          margin-left: 8px;
        }
      }
      .header-content {
        padding-right: 18px;
        & > span {
          margin-left: 8px;
        }
        .logout {
          line-height: 34px;
          text-align: center;
          width: 88px;
          height: 34px;
          border: 1px solid #4F5260;
          border-radius: 2px;
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

  .main-content {
    position: relative;
    height: 100%;
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
    .navbar-toggler-icon {
      background-image: url("data:image/svg+xml;charset=utf8,%3Csvg viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='%232f353a' stroke-width='2.25' stroke-linecap='round' stroke-miterlimit='10' d='M4 7h22M4 15h22M4 23h22'/%3E%3C/svg%3E");
    }
  }

  .speedometer {
    height: 18px;
    background: url(../assets/logo.png) no-repeat center/contain;
  }

  .ps {
    .speedometer {
      height: 14px;
    }
  }

  .app-body /deep/ .sidebar .router-link-active {
    background-color: #20a8d8;
  }
</style>