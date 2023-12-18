import React, { useState } from 'react'
import classNames from 'classnames'
import { Card, Calendar, Badge, Avatar } from 'components/ui'

const isToday = (someDate) => {
    const today = new Date()
    return (
        someDate.getDate() === today.getDate() &&
        someDate.getMonth() === today.getMonth() &&
        someDate.getFullYear() === today.getFullYear()
    )
}

const Schedule = ({ data = [] }) => {
    const [value, setValue] = useState()

    const startDate = new Date(2023, 11, 1); // 예시: 2023년 1월 1일
    const endDate = new Date(2023, 11, 31); // 예시: 2023년 12월 31일

    return (
        <Card className="mb-4">
            <div className="mx-auto max-w-[420px]">
                <Calendar
                    value={value}
                    onChange={setValue}
                    minDate={startDate}
                    maxDate={endDate}
                    locale="ko"
                    prev2Label={null}
                    dayClassName={(date, { selected }) => {
                        const defaultClass = 'text-base'

                        if (isToday(date) && !selected) {
                            return classNames(defaultClass)
                        }

                        if (selected) {
                            return classNames(defaultClass, 'text-white')
                        }

                        return defaultClass
                    }}
                    dayStyle={() => {
                        return { height: 80 }
                    }}
                    renderDay={(date) => {
                        const day = date.getDate()

                        if (!isToday(date)) {
                            return (
                                <>  
                                    <div className="flex flex-col items-center">
                                        <span>{day}</span>
                                        <Avatar shape="circle" src="/img/face/sad.png" className="bg-white" />
                                    </div>
                                </>
                            )
                        }

                        return (
                            <span className="relative flex justify-center items-center w-full h-full">
                                <div className="flex flex-col items-center">
                                    {day}
                                    <Avatar shape="circle" src="/img/face/sad.png" className="bg-white" />
                                </div>
                            </span>
                        )
                    }}
                />
            </div>
        </Card>
    )
}

export default Schedule
