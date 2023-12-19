import React, { useState, useEffect } from 'react'
import { Container, AdaptableCard } from 'components/shared'
import {
    Loading,
    MediaSkeleton,
    TextBlockSkeleton,
} from 'components/shared'
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from 'components/ui'
import { HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi'
import { Progress } from 'components/ui'
import { apiGetDiary, apiDeleteDiary } from 'services/MindDiaryService';

const ArticleContent = () => {
    const location = useLocation();
    const path = location.pathname;
    const id = path.split('/').pop();
    const [diary, setDiary] = useState([]);
    const [positive, setPositive] = useState(0);
    const [negative, setNegative] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [loading, setLoding] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        apiGetDiary(id)
        .then((response) => {
                setDiary(response.data.data.mdDiary);
                setPositive(response.data.data.positive);
                setNegative(response.data.data.negative);
                setNeutral(response.data.data.neutral);
                setLoding(false);
            })
        .catch((error) => {})
    }, []);

    const onClickDelete = () => {
        apiDeleteDiary(id)
        .then((res) => {
            navigate('/mind/diary');
        })
        .catch((error) => {})
    }

    const onClickEdit = () => {
        navigate('/mind/diary/update', { state: { editData: diary } });
    }

    return (
        <Loading loading={loading}
            customLoader={
                <div className="flex flex-col gap-8">
                    <MediaSkeleton />
                    <TextBlockSkeleton rowCount={6} />
                    <TextBlockSkeleton rowCount={4} />
                    <TextBlockSkeleton rowCount={8} />
                </div>
            }
        >
            <Container>
                <AdaptableCard>
                    <div className="max-w-[800px] w-full mx-auto">
                        <div className="flex justify-end gap-2 mb-4">

                            <Button onClick={onClickEdit} className="mr-2" variant="twoTone" icon={<HiOutlinePencil />} size="xs">
                                <span>수정</span>
                            </Button>
                            <Button onClick={onClickDelete} className="mr-2" variant="solid" icon={<HiOutlineTrash />} size="xs">
                                <span>삭제</span>
                            </Button>
                        </div>
                        <h3>{diary.dyTitle}</h3>
                        <div className="flex items-center mt-4 gap-4">
                            <div className="text-xs">
                                <div className="mb-1">
                                    Created by
                                    <div className="font-semibold text-gray-900 dark:text-gray-100">
                                        {diary.dyDate}
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="mt-8 prose dark:prose-invert max-w-none">
                            {/* static display text to be remove */}
                            <div dangerouslySetInnerHTML={{ __html: diary.dyContents }} />
                        </div>
                    </div>

                    <div className="max-w-[800px] w-full mx-auto mt-8 border-t-gray-200 border-t">
                        <div className='my-4'>
                            <h3>Ai가 분석한 마음일기의 감정분석결과입니다.</h3>
                        </div>
                        <div className='grid grid-cols-3'>
                            <div>
                                <span>긍정</span>
                                <Progress
                                    color="sky-500"
                                    variant="circle"
                                    percent={positive}
                                    width={150}
                                    customInfo={<CircleCustomInfo percent={positive} />}
                                />
                            </div>
                            <div>
                                <span>중립</span>
                                <Progress
                                    color="emerald-500"
                                    variant="circle"
                                    percent={neutral}
                                    width={150}
                                    customInfo={<CircleCustomInfo percent={neutral} />}
                                />
                            </div>
                            <div>
                                <span>부정</span>
                                <Progress
                                    color="red-500"
                                    variant="circle"
                                    percent={negative}
                                    width={150}
                                    customInfo={<CircleCustomInfo percent={negative} />}
                                />
                            </div>
                        </div>
                    </div>
                </AdaptableCard>
            </Container>

        </Loading>
    )
}

const CircleCustomInfo = ({ percent }) => {
    return (
        <div className="text-center">
            <h3>{percent}%</h3>
        </div>
    )
}

export default ArticleContent
