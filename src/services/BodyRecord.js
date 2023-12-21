import ApiService from './ApiService'

// 식단 ----------------------------------------------------------------------------
export async function apiGetMenu(params) {
    return ApiService.fetchData({
        url: process.env.REACT_APP_HOST_URL + '/api/menu/list',
        method: 'get',
        params : params,
    })
}

export async function apiGetAllMenu(params) {
    return ApiService.fetchData({
        url: process.env.REACT_APP_HOST_URL + '/api/menu/foodList',
        method: 'get',
        params : params,
    })
}


export async function apiDeleteMenu(data) {
    return ApiService.fetchData({
        url: process.env.REACT_APP_HOST_URL + '/api/menu/delete',
        method: 'post',
        data: data,
    })
}

export async function apiWriteMenu(data) {
    return ApiService.fetchData({
        url: process.env.REACT_APP_HOST_URL + '/api/menu/save',
        method: 'post',
        data: data,
    })
}

// 운동 ---------------------------------------------------------------------------------
export async function apiGetExercise(params) {
    return ApiService.fetchData({
        url: process.env.REACT_APP_HOST_URL + '/api/exercise/list',
        method: 'get',
        params : params,
    })
}

export async function apiGetAllExercise(params) {
    return ApiService.fetchData({
        url: process.env.REACT_APP_HOST_URL + '/api/exercise/exerciseList',
        method: 'get',
        params : params,
    })
}


export async function apiDeleteExercise(data) {
    return ApiService.fetchData({
        url: process.env.REACT_APP_HOST_URL + '/api/exercise/delete',
        method: 'post',
        data: data,
    })
}

export async function apiWriteExercise(data) {
    return ApiService.fetchData({
        url: process.env.REACT_APP_HOST_URL + '/api/exercise/save',
        method: 'post',
        data: data,
    })
}

// 요약 ------------------------------------------------------------------------------
export async function apiGetSummary(params) {
    return ApiService.fetchData({
        url: process.env.REACT_APP_HOST_URL + '/api/summary/list',
        method: 'get',
        params : params,
    })
}