import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Radio, Button } from 'components/ui'
import { Loading } from 'components/shared'
import getHeaderCookie from 'utils/hooks/getHeaderCookie'
import { parseJwt, getMemInfoFromToken } from 'utils/hooks/parseToken'

const Stress = () => {
  const access_token = getHeaderCookie();
  let parse_token = parseJwt(access_token);
  let { memId } = getMemInfoFromToken(parse_token);
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState(Array(0).fill(''));
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // 백엔드에서 문항 데이터를 가져오는 API 엔드포인트를 사용합니다.
    axios.get(process.env.REACT_APP_HOST_URL + '/api/test/stress', {
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    })
      .then((res) => {
        const stressTests = res.data.data.stressTests;
        setQuestions(stressTests);
        setAnswers(Array(stressTests.length).fill(''));
        setLoading(false);
      })
      .catch((error) => {
        // console.error(error);
      });
  }, [access_token]);

  const handleRadioChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const goBack = () => {
    // 뒤로 가기
    navigate(-1);
  };

  const goToResult = async () => {
    setIsSubmitting(true);
    const userConfirmed = window.confirm('제출하시겠습니까?');

    if (!userConfirmed || answers.some(answer => !answer)) {
      alert('모든 문제에 답해주세요.');
      setIsSubmitting(false);
      return;
    }

    const testAns = [];

    answers.forEach((value) => {
      // 각 선택지의 값을 점수로 변환하여 배열에 저장
      switch (value) {
        case 'option1':
          testAns.push(`4`);
          break;
        case 'option2':
          testAns.push(`3`);
          break;
        case 'option3':
          testAns.push(`2`);
          break;
        case 'option4':
          testAns.push(`1`);
          break;
        case 'option5':
          testAns.push(`0`);
          break;
        default:
          break;
      }
    });

    const testSeq = 1;

    const data = {
      testAns: testAns.join(', ')
    };

    try {
      // ansSeq가 DB에 존재하는지 확인
      const response = await axios.get(process.env.REACT_APP_HOST_URL + `/api/test/stress/answer/${testSeq}`, {
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      });
      const ansSeqExists = response.data.data.allStressAnswer;

      // ansSeq가 존재하는지에 따라 POST 또는 PUT 요청 보내기
      if (ansSeqExists !== null) {
        // ansSeq가 존재하면 PUT 요청 보내기
        await axios.put(process.env.REACT_APP_HOST_URL + `/api/test/stress/${testSeq}`, data, {
          headers: {
            Authorization: `Bearer ${access_token}`
          }
        });

        const updatedResponse = await axios.get(process.env.REACT_APP_HOST_URL + `/api/test/stress/answer/${testSeq}`, {
          headers: {
            Authorization: `Bearer ${access_token}`
          }
        });

        const updatedTotalScore = updatedResponse.data.data.allStressAnswer.total;
        // console.log('PUT 요청 성공');

        navigate('/mind/test/stressResult', {
          state: {
            stressScore: updatedTotalScore,
            memId: memId
          }
        });
        // alert('스트레스 테스트 저장이 완료되었습니다.');
      } else {
        // ansSeq가 존재하지 않으면 POST 요청 보내기
        await axios.post(process.env.REACT_APP_HOST_URL + '/api/test/stress', data, {
          headers: {
            Authorization: `Bearer ${access_token}`
          }
        });

        const createdResponse = await axios.get(process.env.REACT_APP_HOST_URL + `/api/test/stress/answer/${testSeq}`, {
          headers: {
            Authorization: `Bearer ${access_token}`
          }
        });
        const createdTotalScore = createdResponse.data.data.allStressAnswer.total;

        // console.log('POST 요청 성공');
        navigate('/mind/test/stressResult', {
          state: {
            stressScore: createdTotalScore,
            memId: memId
          }
        });
        // alert('스트레스 테스트 저장이 완료되었습니다.');
      }
    } catch (error) {
      // 실패한 경우 에러 처리
      // console.error('스트레스 테스트 저장 오류:', error);
      // alert('스트레스 테스트 저장 중 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div class="h-full flex flex-auto flex-col justify-between">
      <main class="h-full">
        <div class="container mx-auto h-full">
          <div class="card h-full card-shadow">
            <div class="card-body h-full">
              <div class=" mb-4">
                <div class="summary-container" >
                  <div class="mb-8">
                    <h3>스트레스 테스트</h3>
                  </div>
                  <Loading loading={loading}>
                    <div class="mb-4">
                      <div class="overflow-x-auto">
                        {questions.map((question, index) => (
                          <div key={index} class="mb-10">
                            <div className="bg-gray-200 p-2 mb-3 rounded-md font-bold">
                              {`질문 ${index + 1} : ${question.queContents}`}
                            </div>
                            <form className="mt-4 flex flex-col gap-2">
                              <Radio
                                name={`question${index}`}
                                value="option1"
                                checked={answers[index] === 'option1'}
                                onChange={() => handleRadioChange(index, 'option1')}
                                color="green-500"
                              >
                                매우 그렇다
                              </Radio>
                              <Radio
                                name={`question${index}`}
                                value="option2"
                                checked={answers[index] === 'option2'}
                                onChange={() => handleRadioChange(index, 'option2')}
                                color="green-500"
                              >
                                그렇다
                              </Radio>
                              <Radio
                                name={`question${index}`}
                                value="option3"
                                checked={answers[index] === 'option3'}
                                onChange={() => handleRadioChange(index, 'option3')}
                                color="green-500"
                              >
                                보통이다
                              </Radio>
                              <Radio
                                name={`question${index}`}
                                value="option4"
                                checked={answers[index] === 'option4'}
                                onChange={() => handleRadioChange(index, 'option4')}
                                color="green-500"
                              >
                                그렇지 않다
                              </Radio>
                              <Radio
                                name={`question${index}`}
                                value="option5"
                                checked={answers[index] === 'option5'}
                                onChange={() => handleRadioChange(index, 'option5')}
                                color="green-500"
                              >
                                매우 그렇지 않다
                              </Radio>
                            </form>
                          </div>
                        ))}

                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                          <div className="flex gap-3">
                            <Button loading={isSubmitting} variant="twoTone" onClick={goBack}>뒤로 가기</Button>
                            <Button loading={isSubmitting} variant="solid" onClick={goToResult}>결과 보기</Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Loading>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Stress;
