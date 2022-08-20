import Vue from "vue";
import Vuex from "vuex";
import getters from "./getters";
import app from "./modules/app";
import settings from "./modules/settings";
import user from "./modules/user";
// 数据持久化 :下包  npm install --save vuex-persistedstate@3.2.1
//引入
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user,
  },
  getters,
  // 配置插件
  plugins: [
    createPersistedState({
      //reducer方法return的数据格式必须和state中的user里面的数据格式一致,否则不知道存的是谁,刷新页面会丢失,
      reducer(state) {
        return {
          user: {
            hrsaasTime: state.user.hrsaasTime,
          },
        };
      },
    }),
  ],
});

export default store;
