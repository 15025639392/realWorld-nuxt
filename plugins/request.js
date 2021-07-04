// 基于axios 封装的请求模块
import axios from "axios";

export const request = axios.create({
    baseURL:'https://conduit.productionready.io'
})


// 通过插件机制获取上下文对象
export default ({store})=>{
    //任何请求都要经过请求拦截器，可以在拦截器中做统一处理，如设置token
    request.interceptors.request.use(function (config) {
        // Do something before request is sent
        const {user} = store.state
        if(user&&user.token){
            config.headers.Authorization = `Token ${user.token}`
        }
        return config;
    }, function (error) {
        // Do something with request error
        return Promise.reject(error);
    });


    // 请求拦截器
    // 响应拦截器
}