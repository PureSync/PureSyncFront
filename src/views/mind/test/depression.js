import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Radio } from 'components/ui'
import './depression.css';

const Depression = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState(Array(0).fill(''));

  useEffect(() => {
    axios.get('http://127.0.0.1:9000/api/test/depression')
      .then((res) => {
        const depressionTests = res.data.data.depressionTests;
        setQuestions(depressionTests);
        setAnswers(Array(depressionTests.length).fill(''));
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleRadioChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const goBack = () => {
    navigate(-1);
  };

  const goToResult = async () => {

    const testAns = [];

    if (answers.some(answer => !answer)) {
      alert('모든 문제에 답해주세요.');
      return;
    }

    answers.forEach((value) => {
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

    const memSeq = 2;
    const testSeq = 2;

    try {
      const response = await axios.get(`http://127.0.0.1:9000/api/test/depression/answer/${memSeq}/${testSeq}`);
      const ansSeqExists = response.data.data.allDepressionAnswer;
      
      if (ansSeqExists !== null) {
        await axios.put(`http://127.0.0.1:9000/api/test/depression/${memSeq}/${testSeq}`, {
          testAns: testAns.join(', '),
          memSeq: memSeq // 실제 멤버 시퀀스로 교체
        });
        
        const updatedResponse = await axios.get(`http://127.0.0.1:9000/api/test/depression/answer/${memSeq}/${testSeq}`);
        const updatedTotalScore = updatedResponse.data.data.allDepressionAnswer.total;

        console.log('PUT 요청 성공');
        navigate('/mind/test/depressionResult', { state: { depressionScore: updatedTotalScore } });
        alert('우울증 테스트 저장이 완료되었습니다.');
      } else {
        // ansSeq가 존재하지 않으면 POST 요청 보내기
        await axios.post('http://127.0.0.1:9000/api/test/depression', {
          testAns: testAns.join(', '),
          memSeq: memSeq // 실제 멤버 시퀀스로 교체
        });
        const createdResponse = await axios.get(`http://127.0.0.1:9000/api/test/depression/answer/${memSeq}/${testSeq}`);
        const createdTotalScore = createdResponse.data.data.allDepressionAnswer.total;

        console.log('POST 요청 성공');
        navigate('/mind/test/depressionResult', { state: { depressionScore: createdTotalScore } });
        alert('우울증 테스트 저장이 완료되었습니다.');
      }
    } catch (error) {
      // 실패한 경우 에러 처리
      console.error('우울증 테스트 저장 오류:', error);
      alert('우울증 테스트 저장 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="summary-container">
      <h1>심리 테스트</h1>
      {questions.map((question, index) => (
        <div key={index}>
          <h2>{`질문 ${index + 1}: ${question.queContents}`}</h2>
          <form>
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

      <div className="button-container">
        <button onClick={goBack}><h3>뒤로 가기</h3></button>
        <button onClick={goToResult}><h3>결과 보기</h3></button>
      </div>
    </div>
  );
};

export default Depression;
