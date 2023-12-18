import ApiService from './ApiService'

export async function apiGetMemberDashboardData(selectedDate) {
    let url = 'http://localhost:9000/api/dashboard/1';

    if (selectedDate) {
        url += `/${selectedDate}`;
    }

    return ApiService.fetchData({
        url,
        method: 'get',
    });
}

export async function getPositive () {
    return ApiService.fetchData({
        url: 'http://127.0.0.1:9000/api/positive',
        method: 'get'
    })
}
