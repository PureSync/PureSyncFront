import { NAV_ITEM_TYPE_TITLE, NAV_ITEM_TYPE_ITEM } from 'constants/navigation.constant'
import { USER } from 'constants/roles.constant'

const bodyNavigationConfig = [
    {
        key: 'uiComponent',
        path: '',
        title: '신체',
        translateKey: 'nav.uiComponents',
        icon: 'food',
        type: NAV_ITEM_TYPE_TITLE,
        authority: [USER],
        subMenu: [
            {
                key: 'body.body',
                path: `/body/body`,
                title: '식단기록',
                translateKey: 'nav.body.body',
                icon: 'food',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [USER],
                subMenu: [],
            },
            {
                key: 'body.sleep',
                path: `/body/sleep`,
                title: '수면기록',
                translateKey: 'nav.body.sleep',
                icon: 'sleep',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [USER],
                subMenu: [],
            },
        ],
    },
]

export default bodyNavigationConfig
