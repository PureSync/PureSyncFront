import { NAV_ITEM_TYPE_TITLE, NAV_ITEM_TYPE_ITEM } from 'constants/navigation.constant'
import { USER } from 'constants/roles.constant'

const mindNavigationConfig = [
    {
        key: 'pages',
        path: '',
        title: '마음',
        translateKey: 'nav.pages.pages',
        icon: 'heart',
        type: NAV_ITEM_TYPE_TITLE,
        authority: [USER],
        subMenu: [
            {
                key: 'mind.diary',
                path: `/mind/diary`,
                title: '마음일지',
                translateKey: 'nav.mind.diary',
                icon: 'write',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [USER],
                subMenu: [],
            },
            {
                key: 'mind.trash',
                path: `/mind/trash`,
                title: '마음쓰레기통',
                translateKey: 'nav.mind.trash',
                icon: 'heart',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [USER],
                subMenu: [],
            },
            {
                key: 'mind.test',
                path: `/mind/test`,
                title: '심리검사',
                translateKey: 'nav.mind.test',
                icon: 'test',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [USER],
                subMenu: [],
            },
        ],
    },
]

export default mindNavigationConfig
