import ApiService from './ApiService'

export async function apiGetMemberDashboardData(selectedDate) {
    let url = process.env.REACT_APP_HOST_URL + '/api/dashboard';

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
        url: process.env.REACT_APP_HOST_URL + '/api/positive',
        method: 'get',
    })
}
