import request from '../utils/request'

export function login(email, password) {
    const data = {
        email,
        password
    };
    return request({
        url: '/user/login',
        method: 'post',
        data
    })
}

export function register(name, password,email) {
    const data = {
        name,
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

