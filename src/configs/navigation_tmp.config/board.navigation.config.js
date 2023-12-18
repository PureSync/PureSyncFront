import { AUTH_PREFIX_PATH } from 'constants/route.constant'
import {
    NAV_ITEM_TYPE_TITLE,
    NAV_ITEM_TYPE_COLLAPSE,
    NAV_ITEM_TYPE_ITEM,
} from 'constants/navigation.constant'
import { ADMIN, USER } from 'constants/roles.constant'

const boardNavigationConfig = [
    {
        key: 'authentication',
        path: '',
        title: '',
        translateKey: 'nav.authentication.authentication',
        icon: 'board',
        type: NAV_ITEM_TYPE_TITLE,
        authority: [ADMIN, USER],
        subMenu: [
            {
                key: 'board',
                path: `/board`,
                title: '자유게시판',
                translateKey: 'board',
                icon: 'board',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [ADMIN, USER],
                subMenu: [],
            },

        ],
    },
]

export default boardNavigationConfig
