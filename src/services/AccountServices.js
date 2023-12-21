import ApiService from './ApiService'

export async function apiGetAccountSettingData() {
    return ApiService.fetchData({
        url: process.env.REACT_APP_HOST_URL + '/api/my',
        method: 'get',
    })
}

export async function apiPutSettingData(formData) {
    return ApiService.fetchData({
        url: process.env.REACT_APP_HOST_URL + '/api/my',
        method: 'put',
        headers : {
            'Content-Type': 'multipart/form-data',
        },
        data : formData
    })
}

export async function apiPutPassword(data) {
    return ApiService.fetchData({
        url: process.env.REACT_APP_HOST_URL + '/api/my/password',
        method: 'put',
        headers : {
            'Content-Type': 'application/json',
        },
        data : data
    })
}

export async function apiGetLikePosts(page) {
    return ApiService.fetchData({
        url: process.env.REACT_APP_HOST_URL + `/api/my/liked-posts?page=${page}`,
        method: 'get',
    })
}

export async function apiGetMyPosts(page) {
    return ApiService.fetchData({
        url: process.env.REACT_APP_HOST_URL + `/api/my/posts?page=${page}`,
        method: 'get',
    })
}

export async function apiDeleteMember() {
    return ApiService.fetchData({
        url: process.env.REACT_APP_HOST_URL + '/api/my',
        method: 'delete',
    })
}

export async function apiPostMemberDetails(data) {
    return ApiService.fetchData({
        url: process.env.REACT_APP_HOST_URL + '/api/my',
        method: 'post',
        data: data
    })
}
