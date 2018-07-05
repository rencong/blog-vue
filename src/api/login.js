import request from '../utils/request'

export function login(username, password) {
    const data = {
        username,
        password
    };
    return request({
        url: '/user/login',
        method: 'post',
        data
    })
}

export function register(username, password,email) {
    const data = {
        username,
        password,
        email
    };
    return request({
        url: '/user/register',
        method: 'post',
        data
    })
}

// export function logout() {
//   return request({
//     url: '/user/logout',
//     method: 'post'
//   })
// }

export function getUserInfo() {
    return request({
        url: '/user/info',
        method: 'get'
    })
}

