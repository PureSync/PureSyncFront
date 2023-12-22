import ApiService from './ApiService'

export async function apiSignIn(data) {

    return ApiService.fetchData({
        // url: process.env.REACT_APP_HOST_URL + `api/member/login`,
        url: `/member/login`,
        method: 'post',
        data,
    })
}

export async function apiSignUp(data) {
    return ApiService.fetchData({

        // url: process.env.REACT_APP_HOST_URL + '/member/sign-up',
        url: '/member/sign-up',
        method: 'post',
        data,
    })
}

export async function apiForgotPassword(data) {
    return ApiService.fetchData({

        url: `/member/searchId/${data.email}`,
        method: 'get',
        data,
    })
}

export async function apiResetPassword(data) {
    return ApiService.fetchData({

        url: '/member/searchPassword',
        method: 'post',
        data,
    })
}