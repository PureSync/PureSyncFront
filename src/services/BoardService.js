import ApiService from './ApiService'
import getHeaderCookie from 'utils/hooks/getHeaderCookie'
import { parseJwt, getMemInfoFromToken } from 'utils/hooks/parseToken'

const access_token = getHeaderCookie();
let parse_token = parseJwt(access_token);

// export async function apiGetBoardData() {
//     console.log("*****************8");
//     return ApiService.fetchData({
//         url: 'http://localhost:9000/api/board',
//         method: 'get',
//         headers: {
//             Authorization: `Bearer ${access_token}`
//         },
//     });
// }


export async function apiGetArticle(params) {
    console.log( params.id );
    //console.log( "****************************************8" );
    return ApiService.fetchData({
        url: `http://localhost:9000/api/board/${params.id}`,
        method: 'get',
        params,
        headers: {
            Authorization: `Bearer ${access_token}`
        },
    })
}

export async function apiGetOthersArticleList(params) {
    return ApiService.fetchData({
        url: `http://localhost:9000/api/board/${params.id}/comments`,
        method: 'get',
        params,
        headers: {
            Authorization: `Bearer ${access_token}`
        },
    })
}


export async function apiGetCrmDashboardData(data) {
    return ApiService.fetchData({
        url: '/crm/dashboard',
        method: 'get',
        data,
    })
}

export async function apiGetCrmCalendar() {
    return ApiService.fetchData({
        url: '/crm/calendar',
        method: 'get',
    })
}

export async function apiGetCrmCustomers(data) {

    // let result = await ApiService.fetchData({
    //     url: 'http://localhost:9000/api/board',
    //     method: 'get',
    //     data,
    // });

    // console.log( result);

    return  ApiService.fetchData({
        url: 'http://localhost:9000/api/board',
        method: 'get',
        headers: {
            Authorization: `Bearer ${access_token}`
        },
    });
}


export async function apiGetCrmCustomersStatistic(params) {
    return ApiService.fetchData({
        url: '/crm/customers-statistic',
        method: 'get',
        params,
    })
}


export async function apPutCrmCustomer(data) {
    return ApiService.fetchData({
        url: '/crm/customers',
        method: 'put',
        data,
    })
}

export async function apiGetCrmCustomerDetails(params) {

    console.log( params.id );
    console.log( "****************************************8" );
    return ApiService.fetchData({
        url: `http://localhost:9000/api/board/${params.id}`,
        method: 'get',
        params,
    })
}



export async function apiDeleteCrmCustomer(data) {
    return ApiService.fetchData({
        url: '/crm/customer/delete',
        method: 'delete',
        data,
    })
}

export async function apiGetCrmMails(params) {
    return ApiService.fetchData({
        url: '/crm/mails',
        method: 'get',
        params,
    })
}

export async function apiGetCrmMail(params) {
    return ApiService.fetchData({
        url: '/crm/mail',
        method: 'get',
        params,
    })
}
