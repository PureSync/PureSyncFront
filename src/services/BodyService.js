import ApiService from './ApiService'


export async function apiGetSleepCalendar() {
    return ApiService.fetchData({
        url: 'http://localhost:9000/api/sleep/list',
        method: 'get'
    })
}