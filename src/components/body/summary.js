import React, { useState, useEffect } from 'react';
import './summary.css';
import SummaryChart from 'views/ui-components/graph/Charts/SummaryChart';

function Summary(props) {

  return (
    <div className="summary-container">
      <h2>요약</h2>
      <div>
        ✔️오늘의 칼로리 :                {(
                (
                  (props.menuWhenData[1] || 0) +
                  (props.menuWhenData[2] || 0) +
                  (props.menuWhenData[3] || 0) +
                  (props.menuWhenData[4] || 0)
                ).toFixed(2) -
                (
                  parseFloat(props.exTotal || 0) +
                  parseFloat(props.bodyBaseData || 0)
                ).toFixed(2)
              ).toFixed(2)} kcal
      </div>
      <br />
      <div className="summary-content grid grid-cols-4 ">

        {/* 요약 박스 */}
        <div className="summary-box col-start-1 col-span-2 ">
          <h6>섭취 칼로리</h6>
          <div className="summary-item">
            <p>아침 + {props.menuWhenData[1] === 0 ? 0 : (props.menuWhenData[1] || 0)}</p>
          </div>
          <div className="summary-item">
            <p>점심 + {props.menuWhenData[2] === 0 ? 0 : (props.menuWhenData[2] || 0)}</p>
          </div>
          <div className="summary-item">
            <p>저녁 + {props.menuWhenData[3] === 0 ? 0 : (props.menuWhenData[3] || 0)}</p>
          </div>
          <div className="summary-item">
            <p>간식 + {props.menuWhenData[4] === 0 ? 0 : (props.menuWhenData[4] || 0)}</p>
          </div>
          <hr />
          <p className="total">{((props.menuWhenData[1] || 0) + (props.menuWhenData[2] || 0) + (props.menuWhenData[3] || 0) + (props.menuWhenData[4] || 0)).toFixed(2)} kcal </p>
          <br />
          <h6>소모 칼로리</h6>
          <div className="summary-item">
            <p>운동 - {props.exTotal || 0}</p>
          </div>
          <div className="summary-item">
            <p>기초대사량 - {props.bodyBaseData}</p>
          </div>
          <hr />
          <p className="total">{(parseFloat(props.exTotal || 0) + parseFloat(props.bodyBaseData || 0)).toFixed(2)} kcal </p>
          <br />
          <h5>결과</h5>
          <div className="summary-item">
            <p className="result">
              {(
                (
                  (props.menuWhenData[1] || 0) +
                  (props.menuWhenData[2] || 0) +
                  (props.menuWhenData[3] || 0) +
                  (props.menuWhenData[4] || 0)
                ).toFixed(2) -
                (
                  parseFloat(props.exTotal || 0) +
                  parseFloat(props.bodyBaseData || 0)
                ).toFixed(2)
              ).toFixed(2)} kcal
            </p>
          </div>
        </div>

        {/* 차트 */}
        <div className="summary-chart col-end-4 col-span-2 " >
          {
            <SummaryChart
              totalMenuKcal={((props.menuWhenData[1] || 0) + (props.menuWhenData[2] || 0) + (props.menuWhenData[3] || 0) + (props.menuWhenData[4] || 0)).toFixed(2)}
              exerciseTotal={props.exTotal}
              selectDate={props.selectDate}
            />
          }
        </div>
      </div>
    </div>
  );

}

export default Summary;
