import axios from 'axios'
import {getToken} from './auth'


// 创建axios实例
const service = axios.create({
    baseURL: process.env.BASE_API, // api的base_url
    timeout: 15000                  // 请求超时时间
});

service.interceptors.request.use(config => {
    if (getToken()) {
        config.headers['Authorization'] = 'Bearer ' + getToken()
    }
    return config
}, error => {
    return Promise.reject(error)
});

// response拦截器
service.interceptors.response.use(
    response => {

        const res = response.data;
        if (res.code !== 200) {
            return Promise.reject(res.message)
        } else {
            return res
        }
    },
    error => {
        return Promise.reject(error)
    }
);

export default service
