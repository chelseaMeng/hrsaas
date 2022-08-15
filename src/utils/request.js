import axios from "axios";
// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url 配置环境变量中的基准地址
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000, // request timeout
});

// request interceptor
service.interceptors.request.use();

// response interceptor
service.interceptors.response.use((response)=>{
  console.log(response);
  const {success,message,data}=response.data
  if(success){
    return data
  }else{
    Message.error(message)
    return Promise.reject(new Error(message))
  }

},(err)=>{
  Message.error(err.message)
  return Promise.reject(err)
});

export default service;
