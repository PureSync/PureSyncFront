import React, { useState, useEffect, useRef  } from 'react'
import { Card, Segment } from 'components/ui'
import { Loading } from 'components/shared'
import { Chart } from 'components/shared'
import { COLORS } from 'constants/chart.constant'
import isEmpty from 'lodash/isEmpty'


const TaskOverview = ({ data = {}, className, title, subtitle }) => {    
    const transformData = (inputData) => {
        if (inputData && Object.keys(inputData).length > 0) {
            const transformedData = {
                weekly: {
                    series: [
                        {
                            name: '시간',
                            data: inputData.weekly.map(entry => entry.totalTime),
                        },
                        {
                            name: '소모칼로리',
                            data: inputData.weekly.filter(entry => entry.totalKcal !== undefined).map(entry => entry.totalKcal),
                        },
                    ],
                    range: inputData.weekly.map(entry => entry.date),
                },
                monthly: {
                    series: [
                        {
                            name: '시간',
                            data: inputData.monthly.map(entry => entry.totalTime),
                        },
                        {
                            name: '소모칼로리',
                            data: inputData.monthly.filter(entry => entry.totalKcal !== undefined).map(entry => entry.totalKcal),
                        },
                    ],
                    range: inputData.monthly.map(entry => entry.date),
                },
                yearly: {
                    series: [
                        {
                            name: '시간',
                            data: inputData.yearly.map(entry => entry.totalTime),
                        },
                        {
                            name: '소모칼로리',
                            data: inputData.yearly.filter(entry => entry.totalKcal !== undefined).map(entry => entry.totalKcal),
                        },
                    ],
                    range: inputData.yearly.map(entry => entry.date),
                },
            };
    
            return transformedData;
        } else {
            return {
                weekly: { series: [], range: [] },
                monthly: { series: [], range: [] },
                yearly: { series: [], range: [] },
            };
        }
    };

    const finalData = transformData(data);

    const [timeRange, setTimeRange] = useState(['weekly'])

    const [repaint, setRepaint] = useState(false)

    useEffect(() => {
        setRepaint(true)
        const timer1 = setTimeout(() => setRepaint(false), 300)

        return () => {
            clearTimeout(timer1)
        }
    }, [data])

    return (
        <Card className={className}>
            <div className="flex sm:flex-row flex-col md:items-center justify-between mb-6 gap-4">
                <div>
                    <h4>{title}</h4><span>{subtitle}</span>
                </div>
                <Segment
                    value={timeRange}
                    onChange={(val) => setTimeRange(val)}
                    size="sm"
                >
                    <Segment.Item value="weekly">최근7일</Segment.Item>
                    <Segment.Item value="monthly">최근30일</Segment.Item>
                    <Segment.Item value="yearly">최근12개월</Segment.Item>
                </Segment>
            </div>
            {!isEmpty(data) && !repaint && (
                <>
                    <div>
                        <Chart
                            series={finalData[timeRange[0]].series}
                            xAxis={finalData[timeRange[0]].range}
                            type="area"
                            customOptions={{
                                colors: [COLORS[0], COLORS[2]],
                                legend: { show: false },
                            }}
                        />
                    </div>
                </>
            )}
            <Loading loading={repaint} type="cover">
                {repaint && <div className="h-[300px]" />}
            </Loading>
        </Card>
    )
}

export default TaskOverview
