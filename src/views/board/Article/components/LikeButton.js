import React, { useState, useCallback } from 'react';
import axios from 'axios';
import { Button } from 'components/ui';
import { HiOutlineHeart } from 'react-icons/hi';
import { useDispatch } from 'react-redux';
import { setArticle } from 'views/board/EditArticle/store/dataSlice';
import getHeaderCookie from 'utils/hooks/getHeaderCookie'
import { parseJwt, getMemInfoFromToken } from 'utils/hooks/parseToken'

const LikeButton = ({ article, isLike}) => {
  console.log(article.boardLikescount);
  const dispatch = useDispatch();
  const access_token = getHeaderCookie();
    let parse_token = parseJwt(access_token);
    let { memId } = getMemInfoFromToken(parse_token);
  const [liked, setLiked] = useState(isLike);
  const [likesCount, setLikesCount] = useState(article.boardLikescount);
  
 // const [findlikes, setfindlikes] = useState(false)


  const fetchData = useCallback(async () => {
    try {
      // 병렬로 두 요청을 실행
      const [response, response2] = await Promise.all([
        axios.get(`http://localhost:9000/api/board/${article.boardSeq}/likes`, {
          headers: {
            Authorization: `Bearer ${access_token}`
          }
        }),
        axios.get(`http://localhost:9000/api/board/${article.boardSeq}/mylikes`, {
          headers: {
            Authorization: `Bearer ${access_token}`
          }
        }),
      ]);
  
      // 각 응답에 대한 추가 작업 수행
      dispatch(setArticle(response.data));
      console.log(response.data.data.findLikes);
      const findLikes = response.data.data.findLikes;
      setLikesCount(findLikes);
  
      console.log(response2.data.data.findMyLikes);
      const findMyLikes = response2.data.data.findMyLikes;
      setLiked(findMyLikes == 1);
      console.log(liked);
    } catch (error) {
      console.error('게시물 정보 조회 중 오류:', error);
    }
  }, [article.boardSeq, dispatch]);
 
  

  const handleLike = useCallback(async () => {
    try {
      // 서버에 좋아요 요청을 보냄
      await axios.post(`http://localhost:9000/api/board/${article.boardSeq}/likes`, null, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${access_token}`
      }
    });

      // 서버에서 좋아요 카운트를 업데이트했다면, 다시 데이터를 불러옴
      fetchData();
    } catch (error) {
      console.error('좋아요 클릭 중 오류:', error);
    }
  }, [article.boardSeq, fetchData]);

  return (
    <div className="flex items-center gap-1">
      <Button onClick={handleLike} variant="twoTone" icon={<HiOutlineHeart fill={liked ? 'blue' : 'white'} />} size="sm" color="blue-600" >
        좋아요
      </Button>
      <span>{likesCount}</span>
    </div>
  );
};

export default React.memo(LikeButton);