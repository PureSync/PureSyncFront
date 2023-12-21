import ApiService from './ApiService'

export async function apiGetTrashList() {
    return ApiService.fetchData({
        url: process.env.REACT_APP_HOST_URL + `/api/mind/trash/list`,
        method: 'get',
    })
}

export async function apiPostTrash(data) {
    return ApiService.fetchData({
        url: process.env.REACT_APP_HOST_URL + '/api/mind/trash',
        method: 'post',
        data: data,
    })
}

export async function apiDeleteTrash(tsSeq) {
    return ApiService.fetchData({
        url: process.env.REACT_APP_HOST_URL + `/api/mind/trash/${tsSeq}`,
        method: 'delete',
    })
}