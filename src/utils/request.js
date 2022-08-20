import axios from "axios";
import store from "@/store";
import router from "@/router";

import { Message } from "element-ui";

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url 配置环境变量中的基准地址
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000, // request timeout
});

//定义超时时间
const timeout = 3600; //单位是秒 修改为1小时

//封装判断时间是否超时的函数
function isCheckOut() {
  //现在时间-登录时间>10秒 过期了
  return (Date.now() - store.getters.hrsaasTime) / 1000 > timeout;
}
// request interceptor 请求拦截器
service.interceptors.request.use(
  (config) => {
    console.log(config);
    if (store.getters.token) {
      //有token 检查时间戳是否超时
      if (isCheckOut()) {
        //如果是true 表示过期了
        //token没用了
        store.dispatch("user/logout"); //登出 清除token 清除用户信息
        router.push("/login");
        // Message.error('token超时')
        return Promise.reject(new Error("token超时"));
      }
      // 没有超时,携带token 发送请求
      config.headers["Authorization"] = `Bearer ${store.getters.token}`;
    }
    return config; //必须返回配置
  },
  (err) => {
    return Promise.reject(err);
  }
);

// response interceptor
service.interceptors.response.use(
  (response) => {
    console.log(response);
    const { success, message, data } = response.data;
    if (success) {
      return data;
    } else {
      Message.error(message);
      return Promise.reject(new Error(message));
    }
  },
  (err) => {
    console.log(err);
    console.log(err.response);
    if (err.response && err.response.data && err.response.data.code === 10002) {
      //token没用了
      store.dispatch("user/logout"); //登出 清除token 清除用户信息
      router.push("/login");
    } else {
      Message.error(err.message || "");
    }
    //判断接口报错是否是 token问题
    //如果是token问题 直接退出登录
    return Promise.reject(err);
  }
);

export default service;
