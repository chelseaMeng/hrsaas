import { login, getUserInfo, getUserDetailById } from "@/api/user";
import { getToken, setToken, removeToken } from "@/utils/auth";
export default {
  namespaced: true,
  state: {
    token: getToken(),
    userInfo: {},
    hrsaasTime: "", //时间戳
    // hrsaasTime:0
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
      setToken(token);
    },
    removeToken(state, token) {
      state.token = null;
      removeToken();
    },
    //修改用户信息
    setUserInfo(state, userInfo) {
      // state.userInfo=userInfo
      // state.userInfo={...userInfo} //浅拷贝
      state.userInfo = JSON.parse(JSON.stringify(userInfo)); //深拷贝
    },
    //清空用户信息
    removeUserInfo(state) {
      state.userInfo = {};
    },
    //设置时间戳
    sethrsaasTime(state, time) {
      state.hrsaasTime = time;
    },
   
  },
  actions: {
    //通过接口获取token
    async login({ commit }, data) {
      const res = await login(data);
      console.log(res); //token
      // 拿到token就开始计时 存入hrsaasTime
      commit('sethrsaasTime',+new Date())
      commit("setToken", res);
    },
    //commit setTokecn
    //获取用户信息
    async getUserInfo({ commit }) {
      const res = await getUserInfo();
      // console.login(res)
      //获取图片
      const baseInfo = await getUserDetailById(res.userId);
      //包含用户图片的数据
      const baseResult = { ...res, ...baseInfo };
      commit("setUserInfo", baseResult);
      // return baseResult; 讲这个是为了引出vuex里数据和组件里数据隔离开的重要性
      // return res 会带来什么问题? 如何解决
      // res是对象,赋值的时候指向的是同一个地址，要注意是否外面传递的数据会影响vuex里面的数据
    },
    //登出
    logout({ commit }) {
      commit("removeToken");
      commit("removeUserInfo");
    },
  },
};
