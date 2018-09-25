import request from '../utils/request'

export function commentSave(data) {
    return request({
        url: '/comment/save',
        method: 'post',
        data
    })
}


