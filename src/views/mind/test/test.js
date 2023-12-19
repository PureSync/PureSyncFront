import React, { useState, useEffect } from 'react';
import ActionLink from 'components/shared/ActionLink'
import axios from 'axios';
import { Card } from 'components/ui'
import { Loading } from 'components/shared'
import { useNavigate } from 'react-router-dom';
import getHeaderCookie from 'utils/hooks/getHeaderCookie'

const testOptions = [
    { value: 'stress', label: '스트레스 검사' },
    { value: 'depression', label: '우울증 검사' }
];

const Test = () => {
    const access_token = getHeaderCookie();
    const navigate = useNavigate();
    // const [selectedTest, setSelectedTest] = useState(null);
    const [stressScore, setStressScore] = useState(null);
    const [depressionScore, setDepressionScore] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const testSeqStress = 1;
                const testSeqDepression = 2;

                // Stress API 호출
                const stressResponse = await axios.get(process.env.REACT_APP_HOST_URL + `/api/test/stress/answer/${testSeqStress}`, {
                    headers: {
                        Authorization: `Bearer ${access_token}`
                    }
                });
                const stressTotalScore = stressResponse.data.data.allStressAnswer.total;
                setStressScore(stressTotalScore);

                // Depression API 호출
                const depressionResponse = await axios.get(process.env.REACT_APP_HOST_URL + `/api/test/depression/answer/${testSeqDepression}`, {
                    headers: {
                        Authorization: `Bearer ${access_token}`
                    }
                });
                const depressionTotalScore = depressionResponse.data.data.allDepressionAnswer.total;
                setDepressionScore(depressionTotalScore);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching scores:', error);
            }
        };

        fetchData();
    }, [access_token]);

    const handleCardClick = (option) => {
        navigate(`/mind/test/${option.value}`);
      };

    const cardHeader = (
        <div className="rounded-tl-lg rounded-tr-lg overflow-hidden">
            <img src="/img/others/img-1.jpg" alt="card header" />
        </div>
    )
    
    return (
        <div>
            <h3 className="mb-8">심리 검사</h3>
            <Loading loading={loading}>
            <div className="grid grid-cols-3 gap-4">
                {testOptions.map((option, index) => (
                    <div className="max-w-xs">
                        <Card key={index}
                            clickable
                            className="hover:shadow-lg transition duration-150 ease-in-out dark:border dark:border-gray-600 dark:border-solid"
                            header={cardHeader}
                            headerClass="p-0"
                            footerBorder={false}
                            headerBorder={false}
                            onClick={() => handleCardClick(option)}
                        >
                            <div style={{'min-height' : '130px'}}>
                            <span className="text-emerald-600 font-semibold">
                                [{option.value}]
                            </span>
                            <h4 className="font-bold my-2">{option.label}</h4>
                            <p>
                                {option.value === 'stress' && stressScore !== null ? (
                                    <p>이전 검사 결과 : {stressScore}점</p>
                                ) : option.value === 'depression' && depressionScore !== null ? (
                                    <p>이전 검사 결과 : {depressionScore}점</p>
                                ) : (
                                    <p>아직 참여하지 않으셨네요. 내 마음을 진단해보세요!</p>
                                )}
                            </p>
                            </div>
                        </Card>
                    </div>
                ))}
            </div>
            </Loading>
        </div>
    );
};

export default Test;
