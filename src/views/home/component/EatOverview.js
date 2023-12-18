import React, { useEffect, useRef  } from 'react'
import { Card } from 'components/ui'
import { Chart } from 'components/shared'
import { COLORS } from 'constants/chart.constant'
import isEmpty from 'lodash/isEmpty'


const EatOverview = ({ dataOrigin = [] }) => {

    const initialData = [
        {
          name: '아침',
          data: [],
        },
        {
          name: '점심',
          data: [],
        },
        {
          name: '저녁',
          data: [],
        },
        {
          name: '간식',
          data: [],
        },
    ];

    const categories = dataOrigin.map(entry => entry.date);

    const data = dataOrigin.reduce((result, entry) => {
        const { kcalBreakfast, kcalLunch, kcalDinner, kcalSnack } = entry;
      
        result[0].data.push(kcalBreakfast || 0);
        result[1].data.push(kcalLunch || 0);
        result[2].data.push(kcalDinner || 0);
        result[3].data.push(kcalSnack || 0);
      
        return result;
    }, initialData);

    return (
        <Card>
            {/* {!isEmpty(data) && ( */}
                <>
                    <div>
                        <h4>최근7일 섭취칼로리</h4>
                        <Chart
                            options={{
                                chart: {
                                    stacked: true,
                                    toolbar: {
                                        show: true,
                                    }
                                },
                                colors: COLORS,
                                responsive: [
                                    {
                                        breakpoint: 480,
                                        options: {
                                            legend: {
                                                position: 'bottom',
                                                offsetX: -10,
                                                offsetY: 0,
                                            },
                                        },
                                    },
                                ],
                                plotOptions: {
                                    bar: {
                                        horizontal: false,
                                    },
                                },
                                xaxis: {
                                    categories
                                },
                                fill: {
                                    opacity: 1,
                                },
                            }}
                            series={initialData}
                            type="bar"
                            customOptions={{
                                colors: [COLORS[0], COLORS[2]],
                                legend: { show: false },
                            }}
                        />
                    </div>
                </>
            {/* )} */}
        </Card>
    )
}

export default EatOverview
