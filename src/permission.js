// 1. 权限拦截处理逻辑需要放在路由的前置守卫里处理
// 2. 首先判断有无token
// 2.1 token 存在 说明 处于登录状态
// 2.1.1 判断是否处于登录页面，是的话 跳首页 否则 直接留在当前页（直接放行 next()）
// 2.2 token 不存在 说明 不处于登录状态
// 2.2.1 判断一下 是否处于白名单 是的话 直接留在 当前页 否则 跳转到登录页
import router from "@/router";
import store from "@/store";
//白名单,不需要登录 直接跳转
const whiteList = ["/404", "/login"];

router.beforeEach(async (to, from, next) => {
  if (store.getters.token) {
    //如果有token 处于登录状态
    //判断是否要跳转到登录页, 是 跳转到首页
    //userinfo userId       store.getters.userId  store.state.user.userInfo.userId
    //token存在的时候 调用 获取用户资料
    //先看一下 用户资料 是否拿到
    if (!store.getters.userId) {
      await store.dispatch("user/getUserInfo");
    }
    if (to.path === "/login") {
      next("/");
    } else {
      next();
    }
  } else {
    //没有token 不处于登录状态
    if (whiteList.includes(to.path)) {
      //是否处于白名单
      next();
    } else {
      next("/login");
    }
  }
});
