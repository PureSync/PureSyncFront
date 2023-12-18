import React, { useEffect, useState } from 'react'
import Diaries from './diary/components/Diaries'
import { Container } from 'components/shared'
import DiaryHeader from './diary/components/DiaryHeader'
import EmotionProgress from './diary/components/EmotionProgress'
import {
    Loading,
} from 'components/shared'
import axios from 'axios'
import getHeaderCookie from 'utils/hooks/getHeaderCookie'
import { parseJwt, getMemInfoFromToken } from 'utils/hooks/parseToken'
import { useInView } from 'react-intersection-observer';

const Diary = () => {
    const [loading, setLoding] = useState(true);
    const [diaries, setDiaries] = useState([]);
    const [diaryCount, setDiaryCount] = useState(0);
    const [ref, inView] = useInView();
    const [page, setPage] = useState(0);
    const [loadingMore, setLoadingMore] = useState(false);


    //Header Cookie
    const access_token = getHeaderCookie();
    let parse_token = parseJwt(access_token);
    let { memId } = getMemInfoFromToken(parse_token);

    const diaryFetch = () => {
        setLoadingMore(true);
        // axios를 사용하여 데이터를 가져옴
        axios.get(process.env.REACT_APP_HOST_URL + `/api/mind/diary/list/${memId}?page=${page}&size=9`,
            {
                headers: {
                    Authorization: `Bearer ${access_token}`
                }
            }
        )
            .then(response => {
                // 요청이 성공하면 데이터를 articles 상태로 설정
                setDiaries([...diaries, ...(response.data.data.mdDiaryList)]);
                setDiaryCount(diaryCount + response.data.data.count);
                setLoadingMore(false);
                setPage((page) => page + 1)
            })
            .catch(error => {
                // 에러 처리
                console.error('데이터를 불러오는 중 에러 발생:', error);
                setLoadingMore(false);
            });
    }

    useEffect(() => {
        axios.get(process.env.REACT_APP_HOST_URL + `/api/mind/diary/list/${memId}?page=${page}&size=9`,
            {
                headers: {
                    Authorization: `Bearer ${access_token}`
                }
            }
        )
            .then(response => {
                // 요청이 성공하면 데이터를 articles 상태로 설정
                setDiaries([...diaries, ...(response.data.data.mdDiaryList)]);
                setPage((page) => page + 1)
                setDiaryCount(response.data.data.count);
                setLoding(false)
            })
            .catch(error => {
                // 에러 처리
                console.error('데이터를 불러오는 중 에러 발생:', error);
            });
    }, [])

    useEffect(() => {
        // inView가 true 일때만 실행한다.
        if (inView) {
            diaryFetch();
        }
    }, [inView]);

    let goodCount = diaries.filter((it) => it.emoField === 1).length;
    let neutralCount = diaries.filter((it) => it.emoField === 2).length;
    let badCount = diaries.filter((it) => it.emoField === 3).length;

    let goodRatio = parseFloat(((goodCount / diaryCount) * 100).toFixed(2));
    let neutralRatio = parseFloat(((neutralCount / diaryCount) * 100).toFixed(2));
    let badRatio = parseFloat(((badCount / diaryCount) * 100).toFixed(2));

    if (diaryCount === 0) {
        goodRatio = 0;
        neutralRatio = 0;
        badRatio = 0;
    }

    return (
        <Loading loading={loading}>
            <Container>
                <DiaryHeader />
                <div className="mt-8">
                    <EmotionProgress goodRatio={goodRatio} neutralRatio={neutralRatio} badRatio={badRatio} />
                    <Diaries diaries={diaries} diaryCount={diaryCount} />
                    {loadingMore && <Loading
                        loading={loadingMore}
                        customLoader={
                            <div className="flex items-center justify-center p-5">
                                <div className="flex space-x-2 animate-pulse">
                                    <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
                                    <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
                                    <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
                                </div>
                            </div>
                        }
                    />}
                    <div ref={ref}></div>


                </div>
            </Container>
        </Loading>
    );
}

export default Diary
