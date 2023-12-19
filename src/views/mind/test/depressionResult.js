import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from 'components/ui';

const DepressionResult = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;

  const depressionScore = state && state.depressionScore;
  const memId = state && state.memId;

  const goToMainPage = () => {
    navigate('/home');
  };

  const goToTestPage = () => {
    navigate('/mind/test');
  };

  return (
    <div class="h-full flex flex-auto flex-col justify-between">
      <main class="h-full">
        <div class="container mx-auto h-full">
          <div class="card h-full card-shadow">
            <div class="card-body h-full">
              <div class=" mb-4">
                <div className="result-container">
                  <h4>{memId}님의 우울증 검사 결과</h4>
                  {depressionScore && <p>당신의 우울증 점수 : {depressionScore}점</p>}<br />

                  <p>점수에 따라 자가진단이 가능합니다.</p><br />
                  <p>35점 미만 : 우울하지 않은 상태입니다.</p><br />
                  <p>36 ~ 49점 : 가벼운 ~ 중간 정도의 우울 상태입니다. 주위 사람들에게 도움을 청해보세요.</p><br />
                  <p>50점 이상 : 심한 우울 상태입니다. 현재 우울감, 절망감, 삶에 대한 불만족감을 경험하고 계실 가능성이 높아 보입니다. 상담센터에 방문하시어 추가적인 검사를 받아보시거나, 전문가와 자신의 상태에 대해 이야기해 볼 것을 권합니다.</p><br />

                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <div className="flex gap-3">
                      <Button variant="twoTone" onClick={goToMainPage}>메인으로</Button>
                      <Button variant="solid" onClick={goToTestPage}>다시 검사하기</Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DepressionResult;
