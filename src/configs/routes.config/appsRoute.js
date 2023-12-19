import React from 'react'
import { APP_PREFIX_PATH } from 'constants/route.constant'
import { ADMIN, USER } from 'constants/roles.constant'


//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
//라우터 등록
const appsRoute = [
    // 메인
    {
        key: 'home.home',
        path: `/home`,
        component: React.lazy(() => import('views/home/dashboard')),
        authority: [],
    },
    // 신체
    {
        key: 'body.body',
        path: `/body/body`,
        component: React.lazy(() => import('views/body/Body')),
        authority: [ADMIN, USER],
    },
    {
        key: 'body.sleep',
        path: `/body/sleep`,
        component: React.lazy(() => import('views/body/Sleep')),
        authority: [ADMIN, USER],
    },
    
    // 마음
    {
        key: 'mind.diary',
        path: `/mind/diary`,
        component: React.lazy(() => import('views/mind/diary')),
        authority: [ADMIN, USER],
    },
    {
        key: 'mind.diaryView',
        path: `/mind/diary/view/:id`,
        component: React.lazy(() => import('views/mind/diary/components/ArticleContent')),
        authority: [ADMIN, USER],
    },
    {
        key: 'mind.diaryWrite',
        path: `/mind/diary/write`,
        component: React.lazy(() => import('views/mind/diary/components/DiaryWrite')),
        authority: [ADMIN, USER],
    },
    {
        key: 'mind.diaryWrite',
        path: `/mind/diary/update`,
        component: React.lazy(() => import('views/mind/diary/components/DiaryUpdate')),
        authority: [ADMIN, USER],
    },
    {
        key: 'mind.trash',
        path: `/mind/trash`,
        component: React.lazy(() => import('views/mind/trash')),
        authority: [ADMIN, USER],
    },
    {
        key: 'mind.test',
        path: `/mind/test`,
        component: React.lazy(() => import('views/mind/test/test')),
        authority: [ADMIN, USER],
    },
    {
        key: 'mind.stress',
        path: `/mind/test/stress`,
        component: React.lazy(() => import('views/mind/test/stress')),
        authority: [ADMIN, USER],
    },
    {
        key: 'mind.test',
        path: `/mind/test/depression`,
        component: React.lazy(() => import('views/mind/test/depression')),
        authority: [ADMIN, USER],
    },
    {
        key: 'mind.stressResult',
        path: `/mind/test/stressResult`,
        component: React.lazy(() => import('views/mind/test/stressResult')),
        authority: [ADMIN, USER],
    },
    {
        key: 'mind.depressionResult',
        path: `/mind/test/depressionResult`,
        component: React.lazy(() => import('views/mind/test/depressionResult')),
        authority: [ADMIN, USER],
    },
    // 게시판
    {
        key: 'board',
        path: `/board`,
        component: React.lazy(() => import('views/board/index')),
        authority: [ADMIN, USER],
    },
    {
        key: 'board.detail',
        path: `/board/view`,
        component: React.lazy(() => import('views/board/Article/index')),
        authority: [ADMIN, USER],
    },
    {
        key: 'board.write',
        path: `/board/write`,
        component: React.lazy(() => import('views/board/EditArticle')),
        authority: [ADMIN, USER],
    },
    // 문의게시판
    {
        key: 'qnaBoard',
        path: `/qnaBoard`,
        component: React.lazy(() => import('views/qnaBoard/index')),
        authority: [ADMIN, USER],
    },
    {
        key: 'qnaBoard.detail',
        path: `/qnaBoard/view`,
        component: React.lazy(() => import('views/qnaBoard/Article/index')),
        authority: [ADMIN, USER],
    },
    {
        key: 'qnaBoard.write',
        path: `/qnaBoard/write`,
        component: React.lazy(() => import('views/qnaBoard/EditArticle')),
        authority: [ADMIN, USER],
    },
    // 마이페이지
   
// 기존 -----------------------------------------------------------------------------------------

    {
        key: 'appsProject.dashboard',
        path: `${APP_PREFIX_PATH}/project/dashboard`,
        component: React.lazy(() => import('views/project/ProjectDashboard')),
        authority: [ADMIN, USER],
    },
    {
        key: 'appsProject.projectList',
        path: `${APP_PREFIX_PATH}/project/project-list`,
        component: React.lazy(() => import('views/project/ProjectList')),
        authority: [ADMIN, USER],
    },
    {
        key: 'appsProject.scrumBoard',
        path: `${APP_PREFIX_PATH}/project/scrum-board`,
        component: React.lazy(() => import('views/project/ScrumBoard')),
        authority: [ADMIN, USER],
        meta: {
            pageContainerType: 'gutterless',
        },
    },
    {
        key: 'appsProject.issue',
        path: `${APP_PREFIX_PATH}/project/issue`,
        component: React.lazy(() => import('views/project/Issue')),
        authority: [ADMIN, USER],
    },
    {
        key: 'appsCrm.dashboard',
        path: `${APP_PREFIX_PATH}/crm/dashboard`,
        component: React.lazy(() => import('views/crm/CrmDashboard')),
        authority: [ADMIN, USER],
    },
    {
        key: 'appsCrm.calendar',
        path: `${APP_PREFIX_PATH}/crm/calendar`,
        component: React.lazy(() => import('views/crm/Calendar')),
        authority: [ADMIN, USER],
    },
    {
        key: 'appsCrm.customers',
        path: `${APP_PREFIX_PATH}/crm/customers`,
        component: React.lazy(() => import('views/crm/Customers')),
        authority: [ADMIN, USER],
        meta: {
            header: 'Customers',
        },
    },
    {
        key: 'appsCrm.customerDetails',
        path: `${APP_PREFIX_PATH}/crm/customer-details`,
        component: React.lazy(() => import('views/crm/CustomerDetail')),
        authority: [ADMIN, USER],
        meta: {
            header: 'Customer Details',
            headerContainer: true,
        },
    },
    {
        key: 'appsCrm.mail',
        path: `${APP_PREFIX_PATH}/crm/mail`,
        component: React.lazy(() => import('views/crm/Mail')),
        authority: [ADMIN, USER],
        meta: {
            pageContainerType: 'gutterless',
            footer: false,
        },
    },
    {
        key: 'appsCrm.mail',
        path: `${APP_PREFIX_PATH}/crm/mail/:category`,
        component: React.lazy(() => import('views/crm/Mail')),
        authority: [ADMIN, USER],
        meta: {
            pageContainerType: 'gutterless',
            footer: false,
        },
    },
    {
        key: 'appsSales.dashboard',
        path: `${APP_PREFIX_PATH}/sales/dashboard`,
        component: React.lazy(() => import('views/sales/SalesDashboard')),
        authority: [ADMIN, USER],
    },
    {
        key: 'appsSales.productList',
        path: `${APP_PREFIX_PATH}/sales/product-list`,
        component: React.lazy(() => import('views/sales/ProductList')),
        authority: [ADMIN, USER],
    },
    {
        key: 'appsSales.productEdit',
        path: `${APP_PREFIX_PATH}/sales/product-edit/:productId`,
        component: React.lazy(() => import('views/sales/ProductEdit')),
        authority: [ADMIN, USER],
        meta: {
            header: 'Edit Product',
        },
    },
    {
        key: 'appsSales.productNew',
        path: `${APP_PREFIX_PATH}/sales/product-new`,
        component: React.lazy(() => import('views/sales/ProductNew')),
        authority: [ADMIN, USER],
        meta: {
            header: 'Add New Product',
        },
    },
    {
        key: 'appsSales.orderList',
        path: `${APP_PREFIX_PATH}/sales/order-list`,
        component: React.lazy(() => import('views/sales/OrderList')),
        authority: [ADMIN, USER],
    },
    {
        key: 'appsSales.orderDetails',
        path: `${APP_PREFIX_PATH}/sales/order-details/:orderId`,
        component: React.lazy(() => import('views/sales/OrderDetails')),
        authority: [ADMIN, USER],
    },
    {
        key: 'appsCrypto.dashboard',
        path: `${APP_PREFIX_PATH}/crypto/dashboard`,
        component: React.lazy(() => import('views/crypto/CryptoDashboard')),
        authority: [ADMIN, USER],
    },
    {
        key: 'appsCrypto.portfolio',
        path: `${APP_PREFIX_PATH}/crypto/portfolio`,
        component: React.lazy(() => import('views/crypto/Portfolio')),
        authority: [ADMIN, USER],
        meta: {
            header: 'Portfolio',
        },
    },
    {
        key: 'appsCrypto.market',
        path: `${APP_PREFIX_PATH}/crypto/market`,
        component: React.lazy(() => import('views/crypto/Market')),
        authority: [ADMIN, USER],
        meta: {
            header: 'Market',
        },
    },
    {
        key: 'appsCrypto.wallets',
        path: `${APP_PREFIX_PATH}/crypto/wallets`,
        component: React.lazy(() => import('views/crypto/Wallets')),
        authority: [ADMIN, USER],
        meta: {
            header: 'Wallets',
        },
    },
    {
        key: 'appsknowledgeBase.helpCenter',
        path: `${APP_PREFIX_PATH}/knowledge-base/help-center`,
        component: React.lazy(() => import('views/knowledge-base/HelpCenter')),
        authority: [ADMIN, USER],
        meta: {
            pageContainerType: 'gutterless',
        },
    },
    {
        key: 'appsknowledgeBase.article',
        path: `${APP_PREFIX_PATH}/knowledge-base/article`,
        component: React.lazy(() => import('views/knowledge-base/Article')),
        authority: [ADMIN, USER],
    },
    {
        key: 'appsknowledgeBase.manageArticles',
        path: `${APP_PREFIX_PATH}/knowledge-base/manage-articles`,
        component: React.lazy(() =>
            import('views/knowledge-base/ManageArticles')
        ),
        authority: [ADMIN, USER],
        meta: {
            header: 'Manage Articles',
            extraHeader: React.lazy(() =>
                import(
                    'views/knowledge-base/ManageArticles/components/PanelHeader'
                )
            ),
            headerContainer: true,
        },
    },
    {
        key: 'appsknowledgeBase.editArticle',
        path: `${APP_PREFIX_PATH}/knowledge-base/edit-article`,
        component: React.lazy(() => import('views/knowledge-base/EditArticle')),
        authority: [ADMIN, USER],
    },
    {
        key: 'appsAccount.settings',
        // path: `${APP_PREFIX_PATH}/account/settings/:tab`,
        path: `/account/settings/:tab`,
        component: React.lazy(() => import('views/account/Settings')),
        // authority: [ADMIN, USER],
        authority : [],
        meta: {
            header: '회원 정보',
            headerContainer: true,
        },
    },
]

export default appsRoute