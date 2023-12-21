import React, { useEffect, useState } from 'react'
import Diaries from './diary/components/Diaries'
import { Container } from 'components/shared'
import DiaryHeader from './diary/components/DiaryHeader'
import EmotionProgress from './diary/components/EmotionProgress'
import {
    Loading,
} from 'components/shared'
import { useInView } from 'react-intersection-observer';
import { apiGetDiaryList } from 'services/MindDiaryService'

const Diary = () => {
    const [loading, setLoding] = useState(true);
    const [diaries, setDiaries] = useState([]);
    const [diaryCount, setDiaryCount] = useState(0);
    const [ref, inView] = useInView();
    const [page, setPage] = useState(0);
    const [loadingMore, setLoadingMore] = useState(false);

    const diaryFetch = () => {
        setLoadingMore(true);
        apiGetDiaryList(page)
        .then((res) => {
            setDiaries([...diaries, ...(res.data.data.mdDiaryList)]);
            setDiaryCount(diaryCount + res.data.data.count);
            setLoadingMore(false);
            setPage((page) => page + 1)
        })
    }

    useEffect(() => {
        apiGetDiaryList(page)
        .then(
            (res) => {
                setDiaries([...diaries, ...(res.data.data.mdDiaryList)]);
                setPage((page) => page + 1)
                setDiaryCount(res.data.data.count);
                setLoding(false)
            }
        )
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
