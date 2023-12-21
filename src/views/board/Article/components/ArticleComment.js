import React, { useState } from 'react'
import { Container, AdaptableCard } from 'components/shared'
import { HiOutlineClock } from 'react-icons/hi'
import { Card, Button, Input } from 'components/ui'
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom'
import { apiPutComment, apiDeleteComment } from 'services/BoardService'
import { useSelector, useDispatch } from 'react-redux'
import { setUser } from 'store/auth/userSlice'
const ArticleComment = ({ data }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const { userName } = useSelector(
    (state) => state.auth.user
  )

  const [editingComment, setEditingComment] = useState(null);
  const [modifiedCommentContent, setModifiedCommentContent] = useState("");
  const cmtDelete = async (cmtSeq) => {
    console.log(cmtSeq);

    console.log(data.comment.cmtSeq);
    if (!cmtSeq) {
      console.error('댓글을 찾을 수 없습니다.');
      return;
    }
    await apiDeleteComment(data.boardSeq, cmtSeq)
      .then((res) => {
        window.location.reload();
      })
      .catch(error => { console.log(error) })
  };
  const cmtModify = async (cmtSeq, modifiedContents) => {
    if (!cmtSeq) {
      console.error('댓글을 찾을 수 없습니다.');
      return;
    }

    await apiPutComment(data.boardSeq, cmtSeq, JSON.stringify({
      cmtContents: modifiedContents
    }))
      .then((res) => {
        window.location.reload()
        setEditingComment(null);
        setModifiedCommentContent(""); // 수정 후에는 수정된 댓글 내용을 초기화
      })
      .catch(error => { console.log(error) })
  };

  if (data.comment && Array.isArray(data.comment)) {
    return (
      <div className="mt-5">
        {data.comment.map((comment) => (
          <div style={{ marginBottom: '10px' }}>
            <div className="flex items-center justify-between mb-4">
              {console.log('comment.memId:', comment.memId)}
              <p>작성자: {comment.memId}</p>
              <div className="flex gap-2">
                <span className="flex items-center gap-2">
                  <HiOutlineClock className="text-lg" />
                  <span>{comment.cmtWdate}</span>
                </span>
                {comment.cmtStatus === 1 && comment.memId === userName && (
                  <>
                    {editingComment === comment.cmtSeq ? (
                      <>
                        <Button
                          variant="twoTone"
                          size="xs"
                          color="blue-600"
                          onClick={() => cmtModify(comment.cmtSeq, modifiedCommentContent)}
                        >
                          완료
                        </Button>
                      </>
                    ) : (
                      <>
                        {/* 수정 중이 아닐 때는 수정 버튼 */}
                        <Button
                          variant="twoTone"
                          size="xs"
                          color="green-600"
                          onClick={() => {
                            setEditingComment(comment.cmtSeq);
                            setModifiedCommentContent(comment.cmtContents);
                          }}
                        >
                          수정
                        </Button>
                        {/* 삭제 버튼 */}
                        <Button
                          variant="twoTone"
                          size="xs"
                          color="red-600"
                          onClick={() => cmtDelete(comment.cmtSeq)}
                        >
                          삭제
                        </Button>
                      </>
                    )}
                  </>
                )}
              </div>
            </div>

            <div className="mb-2">
              {comment.cmtStatus === 2 ? (
                <span className="text-red-500">관리자에 의해 삭제된 댓글입니다.</span>
              ) : (
                <>
                  댓글:{' '}
                  {editingComment === comment.cmtSeq ? (
                    <Input
                      type="text"
                      value={modifiedCommentContent}
                      onChange={(e) => setModifiedCommentContent(e.target.value)}
                    />
                  ) : (
                    comment.cmtContents
                  )}
                </>
              )}
            </div>
            <hr />
          </div>
        ))}
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default ArticleComment