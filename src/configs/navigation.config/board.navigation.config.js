import { NAV_ITEM_TYPE_TITLE, NAV_ITEM_TYPE_ITEM } from 'constants/navigation.constant'
import { USER } from 'constants/roles.constant'

const boardNavigationConfig = [
    {
        key: 'authentication',
        path: '',
        title: '게시판',
        translateKey: 'nav.authentication.authentication',
        icon: 'board',
        type: NAV_ITEM_TYPE_TITLE,
        authority: [USER],
        subMenu: [
            {
                key: 'board',
                path: `/board`,
                title: '자유 게시판',
                translateKey: 'board',
                icon: 'board',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [USER],
                subMenu: [],
            },
            {
                key: 'qnaBoard',
                path: `/qnaBoard`,
                title: '문의 게시판',
                translateKey: 'qnaBoard',
                icon: 'qnaboard',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [USER],
                subMenu: [],
            },
        ],
    },
]

export default boardNavigationConfig
