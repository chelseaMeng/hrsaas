import { login } from '@/api/user'
import  {getToken,setToken,removeToken} from '@/utils/auth'
export default {
  namespaced: true,
  state: {
    token:getToken()
  },
  mutations: {
    setToken(state,token){
    state.token=token
    setToken(token)
    },
    removeToken(state,token){
      state.token=null
      removeToken()
    }
  },
  actions: {
    //通过接口获取token
    async login({ commit},data){
     const res= await login(data)
     console.log(res) //token
     commit('setToken',res)
    }
    //commit setToken
  },
};
