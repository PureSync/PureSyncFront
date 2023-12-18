import ApiService from './ApiService'
import QnaApiService from './QnaApiService'

export async function apiGetCategoriesData() {
    return ApiService.fetchData({
        url: '/knowledge-base/categories',
        method: 'get',
    })
}

export async function apiQueryArticleList(data) {
    return ApiService.fetchData({
        url: '/knowledge-base/articles-query',
        method: 'post',
        data,
    })
}

export async function apiGetArticle(params) {
    return ApiService.fetchData({
        url: '/knowledge-base/article',
        method: 'get',
        params,
    })
}

export async function apiGetQnaArticle(params) {
    return QnaApiService.fetchData({
        url: '/knowledge-base/qna-article',
        method: 'get',
        params,
    })
}

export async function apiPostArticle(data) {
    return ApiService.fetchData({
        url: '/knowledge-base/article',
        method: 'post',
        data,
    })
}

export async function apiPostQnaArticle(data) {
    return QnaApiService.fetchData({
        url: '/knowledge-base/qna-article',
        method: 'post',
        data,
    })
}

export async function apiGetOthersArticleList(params) {
    return ApiService.fetchData({
        url: '/knowledge-base/others-article',
        method: 'get',
        params,
    })
}

export async function apiGetQnaOthersArticleList(params) {
    return QnaApiService.fetchData({
        url: '/knowledge-base/others-qna-article',
        method: 'get',
        params,
    })
}

export async function apiGetCategorizedArticles(params) {
    return ApiService.fetchData({
        url: '/knowledge-base/categorized-articles',
        method: 'get',
        params,
    })
}
