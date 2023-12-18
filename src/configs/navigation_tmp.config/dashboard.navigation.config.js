import { APP_PREFIX_PATH } from 'constants/route.constant'
import {
    NAV_ITEM_TYPE_TITLE,
    NAV_ITEM_TYPE_COLLAPSE,
    NAV_ITEM_TYPE_ITEM,
} from 'constants/navigation.constant'
import { ADMIN, USER } from 'constants/roles.constant'

const dashboardNavigationConfig = [
    {
        key: 'apps',
        path: '/home',
        title: '메인',
        translateKey: 'nav.apps',
        icon: 'dashboard',
        type: NAV_ITEM_TYPE_TITLE,
        authority: [ADMIN, USER],
        subMenu: [
            {
                key: 'apps.home',
                path: `/home`,
                title: '대시보드',
                translateKey: 'nav.home',
                icon: 'dashboard',
                type: NAV_ITEM_TYPE_ITEM,

                authority: [ADMIN, USER],
                subMenu: [
                    
                ]
            },
        ],
    },
]

export default dashboardNavigationConfig
