import Vue from "vue";
import Router from "vue-router";
import sessionManagement from "./utils/SessionManagement";
import Home from "./views/Home.vue";
import task from "./views/task-checkout.vue";
import apply from "./views/apply-checkout.vue";
import reflect from "./views/reflect-checkout.vue";
import TaskDetail from "./views/task-detail";
import reflectDetail from "./views/reflect-detail";
import applyDetail from "./views/apply-detail";
import PageLogin from "./views/PageLogin";
import Forget from "./views/forget";applyTaskDetail
import applyTaskDetail from "./views/apply-task-detail";

Vue.use(Router);

let router = new Router({
  routes: [
    {
      path:'/',
      name: '',
      component: PageLogin,
    },
    {
      path: "/login",
      name: "Login",
      component: PageLogin
    },
    {
      path: "/forget",
      name: "forget",
      component: Forget
    },
    {
      path: "/task-detail",
      name: "TaskDetail",
      component: TaskDetail
    },

    {
      path: "/apply-task-detail",
      name: "applyTaskDetail",
      component: applyTaskDetail
    },
    {
      path: "/reflect-detail",
      name: "reflectDetail",
      component: reflectDetail
    },
    {
      path: "/apply-detail",
      name: "applyDetail",
      component: applyDetail
    },
    {
      path: "/home",
      name: "home",
      redirect: "/task",
      component: Home,
      children: [
        {
          path: "/task",
          name: "任务审核",
          component: task
        },
        {
          path: "/reflect",
          name: "提现审核",
          component: reflect
        },
        {
          path: "/apply",
          name: "申诉处理",
          component: apply
        }
      ]
    }
  ]
});
//全局路由守卫
router.beforeEach((to, from, next) => {
  // 如果session没有用户信息，且路由目标不是登录页，则跳转至登录页
  if (sessionManagement.getUserInfo() && to["name"] !== "Login") {
    console.log(to["name"] )
    next({ name: "Login" });
  }
  next();
});

export default router;
