import React, { useState, useCallback } from 'react';
import axios from 'axios';
import { Button } from 'components/ui';
import { HiOutlineHeart } from 'react-icons/hi';
import { useDispatch } from 'react-redux';
import { setArticle } from 'views/board/EditArticle/store/dataSlice';
import getHeaderCookie from 'utils/hooks/getHeaderCookie'

const LikeButton = ({ article, isLike }) => {
  const dispatch = useDispatch();
  const access_token = getHeaderCookie();
  const [liked, setLiked] = useState(isLike);
  const [likesCount, setLikesCount] = useState(article.boardLikescount);

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.post(`http://localhost:9000/api/board/${article.boardSeq}/boardLikes`, null, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${access_token}`
        }
      });

      dispatch(setArticle(response.data.data));
      setLikesCount(response.data.data.findLikes);
      setLiked(response.data.data.findMyLikes == 0);
    } catch (error) {
      console.error('게시물 정보 조회 중 오류:', error);
    }
  }, [article.boardSeq, dispatch, access_token]);

  const handleLike = useCallback(async () => {
    try {
      await fetchData();
    } catch (error) {
      console.error('좋아요 클릭 중 오류:', error);
    }
  }, [fetchData]);

  return (
    <div className="flex items-center gap-1">
      <Button onClick={handleLike} variant="twoTone" icon={<HiOutlineHeart fill={liked ? 'blue' : 'white'} />} size="sm" color="blue-600">
        좋아요
      </Button>
      <span>{likesCount}</span>
    </div>
  );
};

export default React.memo(LikeButton);
