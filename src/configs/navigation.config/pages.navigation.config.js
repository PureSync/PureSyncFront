import { PAGES_PREFIX_PATH } from 'constants/route.constant'
import {
    NAV_ITEM_TYPE_TITLE,
    NAV_ITEM_TYPE_ITEM,
} from 'constants/navigation.constant'
import { ADMIN, USER } from 'constants/roles.constant'

const pagesNavigationConfig = [
    {
        key: 'pages',
        path: '',
        title: 'PAGES',
        translateKey: 'nav.pages.pages',
        icon: 'pages',
        type: NAV_ITEM_TYPE_TITLE,
        authority: [ADMIN, USER],
        subMenu: [
            {
                key: 'mind.diary',
                path: `/mind/diary`,
                title: '마음일지',
                translateKey: 'nav.mind.diary',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [ADMIN, USER],
                subMenu: [],
            },
            {
                key: 'mind.trash',
                path: `/mind/trash`,
                title: '마음쓰레기통',
                translateKey: 'nav.mind.trash',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [ADMIN, USER],
                subMenu: [],
            },
            {
                key: 'mind.test',
                path: `/mind/test`,
                title: '심리검사',
                translateKey: 'nav.mind.test',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [ADMIN, USER],
                subMenu: [],
            },
            {
                key: 'pages.welcome',
                path: `${PAGES_PREFIX_PATH}/welcome`,
                title: 'Welcome',
                translateKey: 'nav.pages.welcome',
                icon: 'welcome',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [ADMIN, USER],
                subMenu: [],
            },
            {
                key: 'pages.accessDenied',
                path: '/access-denied',
                title: 'Access Denied',
                translateKey: 'nav.pages.accessDenied',
                icon: 'accessDenied',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [ADMIN, USER],
                subMenu: [],
            },
        ],
    },
]

export default pagesNavigationConfig
