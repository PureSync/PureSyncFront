import ApiService from './ApiService'

export async function apiGetDiaryList(page) {
    return ApiService.fetchData({
        url: process.env.REACT_APP_HOST_URL + `/api/mind/diary/list?page=${page}&size=9`,
        method: 'get',
    })
}

export async function apiGetDiary(id) {
    return ApiService.fetchData({
        url: process.env.REACT_APP_HOST_URL + `/api/mind/diary/${id}`,
        method: 'get',
    })
}

export async function apiPostDiary(data) {
    return ApiService.fetchData({
        url: process.env.REACT_APP_HOST_URL + '/api/mind/diary',
        method: 'post',
        data: data,
    })
}

export async function apiPutDiary(dySeq, data) {
    return ApiService.fetchData({
        url: process.env.REACT_APP_HOST_URL + `/api/mind/diary/${dySeq}`,
        method: 'put',
        data: data,
    })
}

export async function apiDeleteDiary(id) {
    return ApiService.fetchData({
        url: process.env.REACT_APP_HOST_URL + `/api/mind/diary/${id}`,
        method: 'delete',
    })
}