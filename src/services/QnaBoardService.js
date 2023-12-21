import ApiService from './ApiService'


export async function apiGetQnaArticleList(number) {
    return  ApiService.fetchData({
        url: process.env.REACT_APP_HOST_URL + `/api/qnaBoard?page=${number}&size=10`,
        method: 'get',
    });
}
export async function apiGetQnaArticle(params) {
    return ApiService.fetchData({
        url: process.env.REACT_APP_HOST_URL + `/api/qnaBoard/${params.id}`,
        method: 'get',
    })
}

export async function apiGetQnaOthersArticleList(params) {
    return ApiService.fetchData({
        url: process.env.REACT_APP_HOST_URL + `/api/qnaBoard/${params.id}/comments`,
        method: 'get',
        params,
      
    })
}

export async function apiPostArticle(data) {
    return ApiService.fetchData({
        url: process.env.REACT_APP_HOST_URL + `/api/qnaBoard`,
        method: 'post',
        data: data,
        headers : {
            'Content-Type': 'multipart/form-data',
        }
    })
}

export async function apiPutArticle(params, data) {
    return ApiService.fetchData({
        url: process.env.REACT_APP_HOST_URL + `/api/qnaBoard/${params}`,
        method: 'put',
        data: data,
        headers : {
            'Content-Type': 'multipart/form-data',
        }
    })
}

export async function apiDeleteArticle(params) {
    return ApiService.fetchData({
        url: process.env.REACT_APP_HOST_URL + `/api/qnaBoard/${params}`,
        method: 'delete'
    })
}




export async function apiGetQnaCrmDashboardData(data) {
    return ApiService.fetchData({
        url: '/crm/dashboard',
        method: 'get',
        data,
    })
}

export async function apiGetQnaCrmCalendar() {
    return ApiService.fetchData({
        url: '/crm/calendar',
        method: 'get',
    })
}

export async function apiGetQnaCrmCustomers(data) {

    // let result = await QnaApiService.fetchData({
    //     url: process.env.REACT_APP_HOST_URL + '/api/qnaBoard',
    //     method: 'get',
    //     data,
    // });

    // console.log( result);

    return  ApiService.fetchData({
        url: process.env.REACT_APP_HOST_URL + '/api/qnaBoard',
        method: 'get',
      
    });
}


export async function apiGetQnaCrmCustomersStatistic(params) {
    return ApiService.fetchData({
        url: '/crm/customers-statistic',
        method: 'get',
        params,
    })
}


export async function apPutQnaCrmCustomer(data) {
    return ApiService.fetchData({
        url: '/crm/customers',
        method: 'put',
        data,
    })
}

export async function apiGetQnaCrmCustomerDetails(params) {

    console.log( params.id );
    console.log( "****************************************8" );
    return ApiService.fetchData({
        url: process.env.REACT_APP_HOST_URL + `/api/qnaBoard/${params.id}`,
        method: 'get',
        params,
    })
}



export async function apiDeleteQnaCrmCustomer(data) {
    return ApiService.fetchData({
        url: '/crm/customer/delete',
        method: 'delete',
        data,
    })
}

export async function apiGetQnaCrmMails(params) {
    return ApiService.fetchData({
        url: '/crm/mails',
        method: 'get',
        params,
    })
}

export async function apiGetQnaCrmMail(params) {
    return ApiService.fetchData({
        url: '/crm/mail',
        method: 'get',
        params,
    })
}
export async function apiGetOthersArticleList(params) {
    return ApiService.fetchData({
        url: process.env.REACT_APP_HOST_URL + `/api/board/${params.id}/comments`,
        method: 'get',
        params,
    })
}