import React from 'react'
import classNames from 'classnames'
import { Card, Avatar } from 'components/ui'
import {
    HiFire,
    HiLightningBolt,
    HiCalendar,
    HiOutlineTrendingUp,
    HiOutlineTrendingDown,
    HiOutlineIdentification,
    HiQuestionMarkCircle
} from 'react-icons/hi'
import { Tooltip } from 'components/ui'
import StarRate from './StarRate'

const GrowShrinkEat = ({ wish, real }) => {
    return (
        <span className="flex items-center rounded-full gap-1">
            <span
                className={classNames(
                    'rounded-full p-1',
                    wish - real > 0 &&
                        'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-100 dark:bg-emerald-500/20 dark:text-emerald-100',
                    wish - real < 0 &&
                        'text-red-600 bg-red-100 dark:text-red-100 dark:bg-red-500/20',
                    real == 0 &&
                        'text-blue-600 bg-blue-100 dark:text-blue-100 dark:bg-blue-500/20'
                )}
            >
                {real == 0 && <HiQuestionMarkCircle />}
                {wish - real < 0 && <HiOutlineTrendingUp />}
                {real !== 0 && wish - real > 0 && <HiOutlineTrendingDown />}
            </span>
            <span
                className={classNames(
                    'font-semibold',
                    wish - real > 0 && 'text-emerald-600',
                    wish - real < 0 && 'text-red-600',
                    real == 0 && 'text-sky-600'
                )}
            >
                {real === 0 ? (
                    '해당일에 식단을 기록하지 않았습니다.'
                ) : (
                wish - real !== 0 ? (
                    wish - real > 0 ? (
                    <>
                        축하드려요! 목표보다 {(wish - real).toFixed(2)}Kcal를 덜 섭취했어요!
                    </>
                    ) : (
                    <>
                        목표보다 {(real - wish).toFixed(2)}Kcal 더 섭취했어요.
                    </>
                    )
                ) : (
                    '목표와 동일합니다.'
                )
                )}

            </span>
        </span>
    )
}

const GrowShrinkBurn = ({ wish, real }) => {
    return (
        <span className="flex items-center rounded-full gap-1">
            <span
                className={classNames(
                    'rounded-full p-1',
                    wish - real < 0 &&
                        'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-100 dark:bg-emerald-500/20 dark:text-emerald-100',
                    wish - real > 0 &&
                        'text-red-600 bg-red-100 dark:text-red-100 dark:bg-red-500/20',
                    real == 0 &&
                        'text-blue-600 bg-blue-100 dark:text-blue-100 dark:bg-blue-500/20'
                )}
            >
                {real == 0 && <HiQuestionMarkCircle />}
                {wish - real < 0 && <HiOutlineTrendingUp />}
                {real !== 0 && wish - real > 0 && <HiOutlineTrendingDown />}
            </span>
            <span
                className={classNames(
                    'font-semibold',
                    wish - real < 0 && 'text-emerald-600',
                    wish - real > 0 && 'text-red-600',
                    real == 0 && 'text-sky-600'
                )}
            >
                {real === 0 ? (
                    '해당일에 운동을 기록하지 않았습니다.'
                ) : (
                wish - real !== 0 ? (
                    wish - real > 0 ? (
                    <>
                        화이팅! 목표보다 {(wish - real).toFixed(2)}Kcal를 덜 소모했어요.
                    </>
                    ) : (
                    <>
                        축하드려요! 목표보다 {(real - wish).toFixed(2)}Kcal 더 소모했어요.
                    </>
                    )
                ) : (
                    '목표와 동일합니다.'
                )
                )}
            </span>
        </span>
    )
}


const StatisticIcon = ({ type }) => {
    switch (type) {
        case 'eatKcal':
            return (
                <Avatar
                    size={55}
                    className="bg-indigo-100 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-100"
                    icon={<HiLightningBolt />}
                />
            )
        case 'burnKcal':
            return (
                <Avatar
                    size={55}
                    className="bg-cyan-100 text-cyan-600 dark:bg-cyan-500/20 dark:text-cyan-100"
                    icon={<HiFire />}
                />
            )
        case 'score':
            return (
                <Avatar
                    size={55}
                    className="bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-100"
                    icon={<HiOutlineIdentification  />}
                />
            )
        case 'appointment':
            return (
                <Avatar
                    size={55}
                    className="bg-amber-100 text-amber-600 dark:bg-amber-500/20 dark:text-amber-100"
                    icon={<HiCalendar />}
                />
            )
        default:
            return <div></div>
    }
}

const ScoreIcon = (score) => {
    switch (score.value) {
        case 0:
        case 1:
        case 2:
            return (
                <Tooltip title="혹시 무슨 일 있었나요?">
                    <Avatar shape="circle" src="/img/face/sad.png" style={{background: "white"}} />
                </Tooltip>
            )
        case 3:
        case 4:
            return (
                <Tooltip title="무난한 하루네요.">
                    <Avatar shape="circle" src="/img/face/mute.png" style={{background: "white"}} />
                </Tooltip>
            )
        case 5:
        case 6:
            return (
                <Tooltip title="최고에요!">
                    <Avatar shape="circle" src="/img/face/smile.png" style={{background: "white"}} />
                </Tooltip>
            )
        default:
            return <div>1</div>
    }
}

const Statistic = ({ data }) => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 mb-5 mt-5">
            <Card>
                <div className="flex items-center gap-4">
                    <StatisticIcon type="eatKcal" />
                    <div>
                        <h3 className="font-bold leading-none">{data.eatKcal}Kcal</h3>
                        <p className="font-semibold">목표섭취칼로리 : {data.wishEatKcal}Kcal</p>
                        <p className="flex items-center gap-1">
                            <GrowShrinkEat wish={data.wishEatKcal} real={data.eatKcal} />
                        </p>
                    </div>
                </div>
            </Card>
            <Card>
                <div className="flex items-center gap-4">
                    <StatisticIcon type="burnKcal" />
                    <div>
                        <h3 className="font-bold leading-none">{data.burnKcal}Kcal</h3>
                        <p className="font-semibold">목표소모칼로리 : {data.wishBurnKcal}Kcal</p>
                        <p className="flex items-center gap-1">
                        <GrowShrinkBurn wish={data.wishBurnKcal} real={data.burnKcal} />
                        </p>
                    </div>
                </div>
            </Card>
            <Card>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <StatisticIcon type="score" />
                        <div>
                            <div className="flex gap-1">
                                <StarRate data={data.score} />
                                <span style={{'whiteSpace': 'nowrap'}}>[{data.score}점]</span>
                            </div>
                            <p className="font-semibold">몸과 마음 점수</p>
                        </div>
                    </div>
                        <ScoreIcon value={data.score} allowHalf="true"/>
                </div>
            </Card>
        </div>
    )
}

export default Statistic
