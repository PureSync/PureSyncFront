import React, { useEffect, useState } from 'react'
import {
    Loading,
    UsersAvatarGroup,
    MediaSkeleton,
    TextBlockSkeleton,
} from 'components/shared'

import { apiGetNoticeView } from 'services/BoardService'
import { HiOutlineClock, HiOutlineCog, HiOutlinePencil, HiOutlineInboxIn, HiOutlineTrash, HiOutlineHeart } from 'react-icons/hi'

import axios from 'axios'


const NoticeContent = ({ articleId}) => {
    console.log(articleId);
    const [loading, setLoading] = useState(true);
    const [notice, setNotice] = useState(0);


    // const article = useSelector(
    //     (state) => state.knowledgeBaseArticle.data.getNotice
    // )
    // const loading = useSelector(
    //     (state) => state.knowledgeBaseArticle.data.loading
    // )

    useEffect(() => {
        const fetchPosts = async () => {
            await apiGetNoticeView(articleId)
                .then((res) => {
                    setNotice(res.data.data.noticeViewDto)
                    setLoading(false);
                    console.log(notice);
                })
        }

        fetchPosts();
    }, []);


    return (
        <Loading
            loading={loading}
            customLoader={
                <div className="flex flex-col gap-8">
                    <MediaSkeleton />
                    <TextBlockSkeleton rowCount={6} />
                    <TextBlockSkeleton rowCount={4} />
                    <TextBlockSkeleton rowCount={8} />
                </div>
            }
        >
            <div className="flex items-center justify-between">
                <h3>{notice.notice_title}</h3>
            </div>
            <div className="flex items-center mt-4">
                <UsersAvatarGroup
                    avatarProps={{ size: 40 }}
                //users={article.authors || []}
                />
                <div className="text-sm">
                    <div>
                        <span>작성자 : {notice.notice_writer}</span>
                    </div>
                    <div className="mb-1">
                        <span className="flex items-center gap-1">
                            <HiOutlineClock className="text-lg" />
                            작성일시 <span>{notice.notice_wdate}</span>
                        </span>
                    </div>
                </div>
            </div>
            <div className="mt-8 prose dark:prose-invert max-w-none">
                {/* <p>{ReactHtmlParser(article.content || '')}</p> */}
                <p>{notice.notice_contents}</p>

            </div>

        </Loading>
    )
}

export default NoticeContent