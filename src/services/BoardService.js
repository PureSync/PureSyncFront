import ApiService from './ApiService'

export async function apiGetArticleList(number) {
    return  ApiService.fetchData({
        url: process.env.REACT_APP_HOST_URL + `/api/board?page=${number}&size=10`,
        method: 'get',
    });
}

export async function apiGetArticle(params) {
    return ApiService.fetchData({
        url: process.env.REACT_APP_HOST_URL + `/api/board/${params.id}`,
        method: 'get',
    })
}

export async function apiPostArticle(data) {
    return ApiService.fetchData({
        url: process.env.REACT_APP_HOST_URL + `/api/board`,
        method: 'post',
        data: data,
        headers : {
            'Content-Type': 'multipart/form-data',
        }
    })
}

export async function apiPutArticle(params, data) {
    return ApiService.fetchData({
        url: process.env.REACT_APP_HOST_URL + `/api/board/${params}`,
        method: 'put',
        data: data,
        headers : {
            'Content-Type': 'multipart/form-data',
        }
    })
}

export async function apiDeleteArticle(params) {
    return ApiService.fetchData({
        url: process.env.REACT_APP_HOST_URL + `/api/board/${params}`,
        method: 'delete'
    })
}

export async function apiPostComment(params, data) {
    return ApiService.fetchData({
        url: process.env.REACT_APP_HOST_URL + `/api/board/${params}/comments`,
        method: 'post',
        data: data,
        headers : {
            'Content-Type': 'application/json', 
        }
    })
}

export async function apiPutComment(boardSeq, cmtSeq, data  ) {
    return ApiService.fetchData({
        url: process.env.REACT_APP_HOST_URL + `/api/board/${boardSeq}/comments/${cmtSeq}`,
        method: 'put',
        data: data,
        headers : {
            'Content-Type': 'application/json', 
        }
    })
}

export async function apiDeleteComment(boardSeq,cmtSeq) {
    return ApiService.fetchData({
        url: process.env.REACT_APP_HOST_URL + `/api/board/${boardSeq}/comments/${cmtSeq}`,
        method: 'delete'
    })
}

export async function apiGetMyLikes(params) {
    return ApiService.fetchData({
        url: process.env.REACT_APP_HOST_URL + `/api/board/${params}/boardLikes`,
        method: 'post',
    })
}

export async function apiGetNotice() {
    return ApiService.fetchData({
        url: process.env.REACT_APP_HOST_URL + `/api/notice/list`,
        method: 'get',
    })
}

export async function apiGetNoticeView(params) {
    return ApiService.fetchData({
        url: process.env.REACT_APP_HOST_URL + `/api/notice/view/${params}`,
        method: 'get',
    })
}



// =================================================

export async function apiGetOthersArticleList(params) {
    return ApiService.fetchData({
        url: process.env.REACT_APP_HOST_URL + `/api/board/${params.id}/comments`,
        method: 'get',
        params,
    })
}


export async function apiGetCrmCustomerDetails(params) {

    console.log( params.id );
    console.log( "****************************************8" );
    return ApiService.fetchData({
        url: process.env.REACT_APP_HOST_URL + `/api/board/${params.id}`,
        method: 'get',
        params,
    })
}




