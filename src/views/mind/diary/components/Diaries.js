import { Card, Tag } from 'components/ui'
import { HiOutlineClock } from 'react-icons/hi'
import { useNavigate } from 'react-router-dom'
import React from "react"
import { TextEllipsis } from 'components/shared'
import DiaryNull from './DiaryNull'


const Diaries = (props) => {
    const {
        diaries,
        diaryCount
    } = props

    const navigate = useNavigate()

    const onArticleClick = (id) => {
        navigate(
            `/mind/diary/view/${id}`
        )
    }
    
    return (
        <>
        {
            diaryCount > 0 ? (<div className='grid lg:grid-cols-3 gap-4 sm:grid-cols-1 md:grid-cols-2'>
            {diaries.map((diary, index) => (
                <Card key={index}
                className="group"
                clickable
                onClick={() => onArticleClick(diary.dySeq)}
            >
                <div className="px-8 py-3 relative">
                    <div className="flex items-center justify-between gap-4">
                        <h5 className="group-hover:underline">
                        <TextEllipsis text={diary.dyTitle} maxTextCount={16} />
                        </h5>
                       
                       {
                        diary.emoField === 1 ? (
                            <Tag
                            className="text-sky-600 bg-sky-100 dark:text-sky-100 dark:bg-sky-500/20 border-0"
                        >
                            {diary.emoState}
                        </Tag>
                        ) : diary.emoField === 2 ? (
                            <Tag
                            className="text-emerald-600 bg-emerald-100 dark:text-emerald-100 dark:bg-emerald-500/20 border-0"
                        >
                            {diary.emoState}
                        </Tag>): (
                            <Tag
                            className="text-red-600 bg-red-100 dark:text-red-100 dark:bg-red-500/20 border-0"
                        >
                            {diary.emoState}
                        </Tag>
                        )
                       }
                        
                    </div>
                    
                    <div className="min-h-[60px]">
                     <TextEllipsis text={diary.dyContents.replace(/<[^>]*>/g, '')} maxTextCount={120} />
                    </div>
                    
                    <div className="flex items-center justify-between mt-6">
                        <div className="flex items-center gap-4">
                            <span className="flex items-center gap-2">
                                <HiOutlineClock className="text-lg" />
                                <span>
                                    {diary.dyDate}
                                </span>
                            </span>
                        </div>
                    </div>
                </div>
            </Card>
            ))}
            </div>):(<DiaryNull />)
        }
        </>
        
        
    )
}

export default Diaries