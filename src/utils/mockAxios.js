import axios from "axios";
import nProgress from "nprogress"
import 'nprogress/nprogress.css'

const request = axios.create({
    baseURL: "",
    timeout: 5000
})

// 请求拦截器
request.interceptors.request.use(config => {
    nProgress.start()
    // 请求携带token
    let token = window.sessionStorage.getItem("token")
    if (!config.headers.hasOwnProperty('Authorization') && token) {
        config.headers.Authorization = token;
    }
    return config
}, error => {
    console.log("请求失败，请求拦截器")
    return Promise.reject(error)
})

// 响应拦截器
request.interceptors.response.use((response) => {
    nProgress.done()
    // 响应数据会经过拦截器，利用本地存储和拦截器，将网页的的地址存储在本地，登陆成功后从本地取出此地址进行判断，如果相同则返回上一页，否则跳转到其他页
    if (!response.data.code === 200) {
        sessionStorage.setItem("baseURL", "http://localhost:3000")
        // 跳转到登陆页面
        window.location.href = '/login'
    }
    return response

}, (error) => {
    console.log("响应失败")
    return Promise.reject(error)
})

export default request;