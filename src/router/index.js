import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

/* Layout */
import Layout from "@/layout";
import approvalsRouter from './modules/approvals'
import attendancesRouter from "./modules/attendances";
import departmentsRouter from "./modules/departments";
import employeesRouter from "./modules/employees";
import permissionRouter from "./modules/permission";
import salarysRouter from "./modules/salarys";
import settingRouter from "./modules/setting";
import socialRouter from "./modules/social";

const asyncRouter=[approvalsRouter,attendancesRouter,departmentsRouter,employeesRouter,permissionRouter,salarysRouter,settingRouter,socialRouter]

export const constantRoutes = [
  {
    path: "/login",
    component: () => import("@/views/login/index"),
    hidden: true,
  },

  {
    path: "/404",
    component: () => import("@/views/404"),
    hidden: true,
  },

  {
    path: "/",
    component: Layout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: () => import("@/views/dashboard/index"),
        meta: { title: "首页", icon: "dashboard" },
      },
    ],
  },
//  ...asyncRouter,
  // 404 page must be placed at the end !!!     hidden: true   路由不显示在左侧菜单
  { path: "*", redirect: "/404", hidden: true },
];

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }), //路由页面滚动条所处的开始位置
    //路由临时合并
    routes: [...constantRoutes,...asyncRouter],
  });

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
