import React, { useEffect, useState } from 'react'
import {
    Loading,
    UsersAvatarGroup,
    MediaSkeleton,
    TextBlockSkeleton,
} from 'components/shared'
import ArticleAction from './ArticleAction'
import ArticleComment from './ArticleComment'
import { getArticle } from '../store/dataSlice'
import { useDispatch, useSelector } from 'react-redux'
import ReactHtmlParser from 'html-react-parser'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Button } from 'components/ui'
import { HiOutlineClock, HiOutlineCog, HiOutlinePencil, HiOutlineInboxIn, HiOutlineTrash,HiOutlineHeart} from 'react-icons/hi'
import { getboardFile } from 'services/DashboardService'
import LikeButton from './LikeButton';
import getHeaderCookie from 'utils/hooks/getHeaderCookie'
import {parseJwt, getMemInfoFromToken} from 'utils/hooks/parseToken'    

const ArticleContent = ({ articleId }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const access_token = getHeaderCookie();
    let parse_token = parseJwt(access_token);
    let { memId } = getMemInfoFromToken(parse_token);
    const [flag, setFlag] = useState(false);
    const article = useSelector(
        (state) => state.knowledgeBaseQnaArticle.data.article
    )
    const loading = useSelector(
        (state) => state.knowledgeBaseQnaArticle.data.loading
    )
    // console.log(article);
    const { search } = useLocation()
    //const imageUrl = `https://fccbucket123.s3.ap-northeast-2.amazonaws.com/fileUpload/${response.data.qnaBoardfileName}`;

    useEffect(() => {
        fetchData()
        
        // eslint-disable-next-line react-hooks/exhaustive-deps
        // console.log(article);
    }, [search])

    const fetchData = () => {
        if (articleId) {
            dispatch(getArticle({ id: articleId }))
        }
        setFlag(true);
    }
    
    const handleUpdate = () => {
        // 필요한 데이터를 객체로 만들어 전달
        const updateData = {
            articleId: article.qnaBoardSeq, 
            qnaBoardName: article.qnaBoardName, 
            qnaBoardContents : article.qnaBoardContents,
            qnaBoardFile: article.qnaBoardFile
            
        };

        const shouldUpdate = window.confirm('게시물을 수정하시겠습니까?');

            if (!shouldUpdate) {
                return;
            }
        
        // navigate를 사용하여 editor.js로 이동하면서 데이터 전달
        navigate('/qnaBoard/write', { state: { updateData } });
    }
    // const handleLike = async () => {
    //     try {
    //         // 서버에 좋아요 요청을 보냄
    //         await axios.post(`http://localhost:9000/api/qnaBoard/${article.qnaBoardSeq}/likes`, {
    //                 withCredentials: false, headers: {
    //                 Authorization: `Bearer ${access_token}`
    //             }
    //         });
            
    //         // 서버에서 좋아요 카운트를 업데이트했다면, 다시 데이터를 불러옴
    //         fetchData();
    //     } catch (error) {
    //         console.error('좋아요 클릭 중 오류:', error);
    //     }
    // };
    
    const handleDelete = async () => {
        try {
            if (!article.qnaBoardSeq) {
                // console.error('게시물 qnaBoardSeq를 찾을 수 없습니다.');
                return;
            }

            const shouldDelete = window.confirm('게시물을 삭제하시겠습니까?');

            if (!shouldDelete) {
                return;
            }

            await axios.delete(process.env.REACT_APP_HOST_URL + `/api/qnaBoard/${article.qnaBoardSeq}`, {
            headers: {
                    Authorization: `Bearer ${access_token}`
                }
            });
            // console.log('게시물 삭제 성공');
            navigate('/qnaBoard');
        } catch (error) {
            // console.error('게시물 삭제 중 오류:', error);
        } finally {

        }
    };
    const commentRegister = () => {
        //alert("댓글등록");
        //setRegister(true);
        // console.log(article.findBoardFile);
        fetchData()
    }

    const [imageUrlList, setImageUrlList] = useState([]);

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
                <h3>{article.qnaBoardName}</h3>
                <div className="gap-2 flex">
                    <LikeButton article={article} fetchData={fetchData} />
                {/* <Button onClick={handleLike} variant="twoTone" icon={<HiOutlineHeart fill={article.qnaBoardLikescount ? 'blue' : 'white'} />} size="sm" color="blue-600" >좋아요</Button> */}
                    <Button onClick={handleUpdate} variant="twoTone" icon={<HiOutlinePencil />} size="sm" color="green-600" >수정하기</Button>
                    <Button onClick={handleDelete} variant="twoTone" icon={<HiOutlineTrash />} size="sm" color="red-600" >삭제하기</Button>
                </div>
            </div>
            <div className="flex items-center mt-4">
                <UsersAvatarGroup
                    avatarProps={{ size: 40 }}
                //users={article.authors || []}
                />
                <div className="text-sm">
                    <div>
                        <span>작성자 : {article.memId}</span>
                        <span className="mx-2">•</span>
                        {/* <span>좋아요 : {article.qnaBoardLikescount}</span> */}

                    </div>
                    <div className="mb-1">
                        <span className="flex items-center gap-1">
                            <HiOutlineClock className="text-lg" />
                            작성일시 <span>{article.qnaBoardWdate}</span>
                        </span>
                    </div>
                </div>
            </div>
            <div className="mt-8 prose dark:prose-invert max-w-none">
                <p>{ReactHtmlParser(article.content || '')}</p>
                <p>{article.qnaBoardContents}</p>
                {
                    flag && article.qnaBoardFile
                        ? article.qnaBoardFile.map((item, index) => (
                            <img key={index} src={item.fileUrl} alt={`image-${index}`} style={{ width: '500px', height: 'auto' }} />
                        ))
                        : null
                }
            </div>

            {/* <ArticleAction data={article.qnaBoardSeq} commentRegister={commentRegister} /> */}
            <ArticleComment data={article} />
        </Loading>
    )
}

export default ArticleContent