import request from '../utils/request'

export function articleList(query) {
    return request({
        url: '/article/list',
        method: 'get',
        params: query
    })
}
export function articleUserList(query) {
    return request({
        url: '/article/user/list',
        method: 'get',
        params: query
    })
}

export function articleEdit(id = '') {
    return request({
        url: '/article/edit',
        method: 'get',
        params: {id}
    })
}

export function articleDetail(id) {
    return request({
        url: '/article/detail',
        method: 'get',
        params: {id}
    })
}


export function articleSave(data) {
    return request({
        url: '/article/save',
        method: 'post',
        data
    })
}

export function articleDelete(data) {
    return request({
        url: '/article/delete',
        method: 'post',
        data
    })
}
