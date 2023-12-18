import { UI_COMPONENTS_PREFIX_PATH } from 'constants/route.constant'
import {
    NAV_ITEM_TYPE_TITLE,
    NAV_ITEM_TYPE_COLLAPSE,
    NAV_ITEM_TYPE_ITEM,
} from 'constants/navigation.constant'
import { ADMIN, USER } from 'constants/roles.constant'

const bodyNavigationConfig = [
    {
        key: 'uiComponent',
        path: '',
        title: '',
        translateKey: 'nav.uiComponents',
        icon: 'body',
        type: NAV_ITEM_TYPE_TITLE,
        authority: [ADMIN, USER],
        subMenu: [
            {
                key: 'body.body',
                path: `/body/body`,
                title: '식단&운동 기록',
                translateKey: 'nav.body.body',
                icon: 'table',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [ADMIN, USER],
                subMenu: [],
            },
            {
                key: 'body.sleep',
                path: `/body/sleep`,
                title: '수면기록',
                translateKey: 'nav.body.sleep',
                icon: 'sleep',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [ADMIN, USER],
                subMenu: [],
            },
            {
                key: 'landing',
                path: `/landing/landing`,
                title: '랜딩페이지',
                translateKey: 'nav.landing',
                icon: 'table',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [ADMIN, USER],
                subMenu: [],
                meta: {
                    layout: 'blank'
                }
            },
        ],
    },
]

export default bodyNavigationConfig
