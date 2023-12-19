import React, { useState, useEffect, Suspense, lazy } from 'react'
import { Tabs } from 'components/ui'
import { AdaptableCard, Container } from 'components/shared'
import { useNavigate, useLocation } from 'react-router-dom'
import isEmpty from 'lodash/isEmpty'
import { apiGetAccountSettingData } from 'services/AccountServices'
import { HiUser, HiLockClosed, HiPencilAlt, HiHeart    } from 'react-icons/hi'

const Profile = lazy(() => import('./components/Profile'))
const ProfileBody = lazy(() => import('./components/ProfileBody'))
const Password = lazy(() => import('./components/Password'))
const Posts = lazy(() => import('./components/Posts'))
const Likes = lazy(() => import('./components/Likes'))

const { TabNav, TabList } = Tabs

const settingsMenu = {
    profile: { label: '내 정보', path: 'profile', icon: <HiUser /> },
    password: { label: '비밀번호 변경', path: 'password', icon: <HiLockClosed /> },
    posts: { label: '내가 작성한 글', path: 'posts', icon: <HiPencilAlt />  },
    likes: { label: '내가 좋아하는 글', path: 'likes', icon: <HiHeart />  },
}

const Settings = () => {
    const [currentTab, setCurrentTab] = useState('profile')
    const [data, setData] = useState({})

    const navigate = useNavigate()

    const location = useLocation()

    const path = location.pathname.substring(
        location.pathname.lastIndexOf('/') + 1
    )

    const onTabChange = (val) => {
        setCurrentTab(val)
        navigate(`/account/settings/${val}`)
    }

    const fetchData = async () => {
        const response = await apiGetAccountSettingData()
        setData(response.data.data.memberInfo)
    }

    useEffect(() => {
        setCurrentTab(path)
        if (isEmpty(data)) {
            fetchData()
        }
    }, [data])

    const onProfileBodyDataUpdate = (updatedData) => {
        setData(prevData => ({
            ...prevData,
            bodyHeight: updatedData.bodyHeight,
            bodyWeight: updatedData.bodyWeight,
            bodyWishWeight: updatedData.bodyWishWeight,
            bodyWishConsCal: updatedData.bodyWishConscal,
            bodyWishBurnCal: updatedData.bodyWishBurncal
        }));
    }

    const onProfileDefaultDataUpdate = (updatedData) => {
        setData(prevData => ({
            ...prevData,
            memNick: updatedData.memNick,
            memImg: updatedData.memImg
        }));
    }

    return (
        <Container>
            <AdaptableCard>
                <Tabs value={currentTab} onChange={(val) => onTabChange(val)}>
                    <TabList>
                        {Object.keys(settingsMenu).map((key) => (
                            <TabNav key={key} value={key} icon={settingsMenu[key].icon}>
                                {settingsMenu[key].label}
                            </TabNav>
                        ))}
                    </TabList>
                </Tabs>
                <div className="px-4 py-6">
                    <Suspense fallback={<></>}>
                        {currentTab === 'profile' && (
                            <>
                            <Profile data={data} onDataUpdate={onProfileDefaultDataUpdate} />
                            <ProfileBody data={data}  onDataUpdate={onProfileBodyDataUpdate}/>
                            </>
                        )}
                        {currentTab === 'password' && (
                            <Password />
                        )}
                        {currentTab === 'posts' && (
                            <Posts />
                        )}
                        {currentTab === 'likes' && <Likes />}
                    </Suspense>
                </div>
            </AdaptableCard>
        </Container>
    )
}

export default Settings
