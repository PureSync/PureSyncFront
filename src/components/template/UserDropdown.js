import React from 'react'
import { Avatar, Dropdown } from 'components/ui'
import withHeaderItem from 'utils/hoc/withHeaderItem'
import useAuth from 'utils/hooks/useAuth'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import classNames from 'classnames'
import { HiOutlineUser, HiOutlineCog, HiOutlineLogout } from 'react-icons/hi'
import { FiActivity } from 'react-icons/fi'
import getHeaderCookie from 'utils/hooks/getHeaderCookie'
import {parseJwt, getMemInfoFromToken} from 'utils/hooks/parseToken'


const access_token = getHeaderCookie();
let parse_token = parseJwt(access_token);
let  { memId, memEmail } = getMemInfoFromToken(parse_token);

const dropdownItemList = [
    {
        label: '내 정보',
        path: '/app/account/settings/profile',
        icon: <HiOutlineUser />,
    },
]

export const UserDropdown = ({ className }) => {
    const { avatar, userName, authority, email } = useSelector(
        (state) => state.auth.user
    )

    const { signOut } = useAuth()

    //  회원 프로필 수정되면 Avatar에 src={avatar} 추가, usename 주석 풀기
    const UserAvatar = (
        <div className={classNames(className, 'flex items-center gap-2')}>
            <Avatar size={32} shape="circle" icon={<HiOutlineUser />} />
            <div className="hidden md:block">
                <div className="font-bold">{memId}</div>
                {/* <div className="font-bold">{userName}</div> */}
            </div>
        </div>
    )

    //  회원 프로필 수정되면 Avatar에 src={avatar} 추가
    return (
        <div>
            <Dropdown
                menuStyle={{ minWidth: 240 }}
                renderTitle={UserAvatar}
                placement="bottom-end"
            >
                <Dropdown.Item variant="header">
                    <div className="py-2 px-3 flex items-center gap-2">
                        <Avatar shape="circle" icon={<HiOutlineUser />} />
                        <div>
                            {/* <div className="font-bold text-gray-900 dark:text-gray-100">
                                {userName}
                            </div> */}
                            <div className="font-bold text-gray-900 dark:text-gray-100">
                            {memId}
                            </div>
                            <div className="text-xs">{memEmail}</div>
                            {/* <div className="text-xs">{email}</div> */}
                        </div>
                    </div> 
                </Dropdown.Item>
                <Dropdown.Item variant="divider" />
                {dropdownItemList.map((item) => (
                    <Dropdown.Item
                        key={item.label}
                        eventKey={item.label}
                        className="mb-1 px-0"
                    >
                        <Link 
                            className="flex h-full w-full px-2" 
                            to={item.path}
                        >
                            <span className="flex gap-2 items-center w-full">
                                <span className="text-xl opacity-50">
                                    {item.icon}
                                </span>
                                <span>{item.label}</span>
                            </span>
                        </Link>
                    </Dropdown.Item>
                ))}
                <Dropdown.Item variant="divider" />
                <Dropdown.Item
                    onClick={signOut}
                    eventKey="Sign Out"
                    className="gap-2"
                >
                    <span className="text-xl opacity-50">
                        <HiOutlineLogout />
                    </span>
                    <span>로그아웃</span>
                </Dropdown.Item>
            </Dropdown>
        </div>
    )
}

export default withHeaderItem(UserDropdown)
