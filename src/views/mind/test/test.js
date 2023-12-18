import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Select } from 'components/ui'
import { Button } from 'components/ui'
import { useNavigate } from 'react-router-dom';
import './test.css';

const testOptions = [
  { value: 'stress', label: '스트레스 검사' },
  { value: 'depression', label: '우울증 검사' }
];

const Test = () => {
  const navigate = useNavigate();
  const [selectedTest, setSelectedTest] = useState(null);
  const [stressScore, setStressScore] = useState(null);
  const [depressionScore, setDepressionScore] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const memSeq = 2;
        const testSeqStress = 1;
        const testSeqDepression = 2;

        // Stress API 호출
        const stressResponse = await axios.get(`http://127.0.0.1:9000/api/test/stress/answer/${memSeq}/${testSeqStress}`);
        const stressTotalScore = stressResponse.data.data.allStressAnswer.total;
        setStressScore(stressTotalScore);

        // Depression API 호출
        const depressionResponse = await axios.get(`http://127.0.0.1:9000/api/test/depression/answer/${memSeq}/${testSeqDepression}`);
        const depressionTotalScore = depressionResponse.data.data.allDepressionAnswer.total;
        setDepressionScore(depressionTotalScore);
      } catch (error) {
        console.error('Error fetching scores:', error);
      }
    };

    fetchData();
  }, []);

  // const handleTest = (testType) => {
  //   setSelectedTest(testType);
  // };

  const handleSelectChange = (selectedOption) => {
    console.log('Selected Option:', selectedOption);
    setSelectedTest(selectedOption.value);
  };
  
  return (
    <div className="test-container">
      <h1>검사 선택</h1>
      {/* <p>원하는 검사를 선택하세요:</p>

      <div className="test-buttons">
        <button onClick={() => handleTest('stress')}>Stress 검사</button> <br />
        <button onClick={() => handleTest('depression')}>Depression 검사</button>
      </div> <br /> */}

      <div>
        <Select
          placeholder="원하는 검사를 선택하세요"
          options={testOptions}
          onChange={handleSelectChange}
        />
      </div>

      <div>
        {stressScore !== null && <p>스트레스 검사 결과: {stressScore}점</p>}
        {depressionScore !== null && <p>우울증 검사 결과: {depressionScore}점</p>}
      </div>

      {selectedTest && (
        <div className="button-container">
          <Button variant="solid" onClick={() => navigate(`/mind/test/${selectedTest}`)}>
            <h3>선택한 검사 시작</h3>
          </Button>
        </div>
      )}
    </div>
  );
};

export default Test;
