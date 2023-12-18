import QnaApiService from './QnaApiService'

export async function apiGetQnaCrmDashboardData(data) {
    return QnaApiService.fetchData({
        url: '/crm/dashboard',
        method: 'get',
        data,
    })
}

export async function apiGetQnaCrmCalendar() {
    return QnaApiService.fetchData({
        url: '/crm/calendar',
        method: 'get',
    })
}

export async function apiGetQnaCrmCustomers(data) {
    return QnaApiService.fetchData({
        url: '/crm/customers',
        method: 'post',
        data,
    })
}

export async function apiGetQnaCrmCustomersStatistic(params) {
    return QnaApiService.fetchData({
        url: '/crm/customers-statistic',
        method: 'get',
        params,
    })
}

export async function apPutQnaCrmCustomer(data) {
    return QnaApiService.fetchData({
        url: '/crm/customers',
        method: 'put',
        data,
    })
}

export async function apiGetQnaCrmCustomerDetails(params) {
    return QnaApiService.fetchData({
        url: '/crm/customer-details',
        method: 'get',
        params,
    })
}

export async function apiDeleteQnaCrmCustomer(data) {
    return QnaApiService.fetchData({
        url: '/crm/customer/delete',
        method: 'delete',
        data,
    })
}

export async function apiGetQnaCrmMails(params) {
    return QnaApiService.fetchData({
        url: '/crm/mails',
        method: 'get',
        params,
    })
}

export async function apiGetQnaCrmMail(params) {
    return QnaApiService.fetchData({
        url: '/crm/mail',
        method: 'get',
        params,
    })
}
