import ApiService from './ApiService'

export async function apiPostVisitor() {
    return ApiService.fetchData({
        url: process.env.REACT_APP_HOST_URL + '/api/visitor',
        method: 'post',
    })
}