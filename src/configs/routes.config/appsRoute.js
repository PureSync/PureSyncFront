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
        key: 'qnaboard',
        path: `/qnaboard`,
        component: React.lazy(() => import('views/qnaboard/index')),
        authority: [ADMIN, USER],
    },
    {
        key: 'qnaBoard.detail',
        path: `/qnaBoard/view`,
        component: React.lazy(() => import('views/qnaboard/Article/index')),
        authority: [ADMIN, USER],
    },
    {
        key: 'qnaboard',
        path: `/qnaboard`,
        component: React.lazy(() => import('views/qnaboard/index')),
        authority: [ADMIN, USER],
    },
    {
        key: 'qnaboard.write',
        path: `/qnaboard/write`,
        component: React.lazy(() => import('views/qnaboard/EditArticle')),
        authority: [ADMIN, USER],
    },
    // {
    //     key: 'qnaBoard.write',
    //     path: `/qnaBoard/write`,
    //     component: React.lazy(() => import('views/qnaBoard/EditArticle')),
    //     authority: [ADMIN, USER],
    // },
    {
        key: 'notice.detail',
        path: `/notice/view`,
        component: React.lazy(() => import('views/board/Article/notice')),
        authority: [ADMIN, USER],
    },
    {
        key: 'appsAccount.settings',
        path: `/account/settings/:tab`,
        component: React.lazy(() => import('views/account/Settings')),
        authority : [ADMIN, USER],
        meta: {
            header: '회원 정보',
            headerContainer: true,
        },
    },

]

export default appsRoute