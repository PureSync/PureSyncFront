// import React, { useState, useCallback, useEffect } from 'react';
// import axios from 'axios';
// import { Button } from 'components/ui';
// import { HiOutlineHeart } from 'react-icons/hi';
// import { useDispatch } from 'react-redux';
// import getHeaderCookie from 'utils/hooks/getHeaderCookie';

// const LikeButton = ({ article, isLike }) => {
//   const dispatch = useDispatch();
//   const access_token = getHeaderCookie();
//   const [liked, setLiked] = useState(isLike);
//   const [likesCount, setLikesCount] = useState(article.boardLikescount);

//   const fetchData = useCallback(async () => {
//     try {
//       const response = await axios.post(`http://localhost:9000/api/board/${article.boardSeq}/boardLikes`, null, {
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${access_token}`
//         }
//       });

//       setLikesCount(response.data.data.findLikes);
//       setLiked(response.data.data.findMyLikes == 0);
//     } catch (error) {
//       console.error('게시물 정보 조회 중 오류:', error);
//     }
//   }, [article.boardSeq, access_token]);

//   useEffect(() => {
//     fetchData();
//   }, [fetchData]);

// <<<<<<< fix2
// //   const handleLike = useCallback(() => {
// //     setLiked(!liked);
// //     setLikesCount(liked ? likesCount - 1 : likesCount + 1);
// //   }, [liked, likesCount]);  
// =======
//   const handleLike = useCallback(() => {
//     setLiked(!liked);
//     setLikesCount(liked ? likesCount - 1 : likesCount + 1);
//   }, [liked, likesCount]);
// >>>>>>> dev

//   return (
//     <div className="flex items-center gap-1">
//       <Button onClick={handleLike} variant="twoTone" icon={<HiOutlineHeart fill={liked ? 'blue' : 'white'} />} size="sm" color="blue-600">
//         좋아요
//       </Button>
//       <span>{likesCount}</span>
//     </div>
//   );
// };

// export default React.memo(LikeButton);
