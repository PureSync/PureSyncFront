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
  const cmtDelete = async (qnaCmtSeq) => {
    console.log(qnaCmtSeq);

    console.log(data.qnaComment.qnaCmtSeq);
    if (!qnaCmtSeq) {
      console.error('댓글을 찾을 수 없습니다.');
      return;
    }
    await apiDeleteComment(data.qnaBoardSeq, qnaCmtSeq)
      .then((res) => {
        window.location.reload();
      })
      .catch(error => { console.log(error) })
  };
  const cmtModify = async (qnaCmtSeq, modifiedContents) => {
    if (!qnaCmtSeq) {
      console.error('댓글을 찾을 수 없습니다.');
      return;
    }

    await apiPutComment(data.qnaBoardSeq, qnaCmtSeq, JSON.stringify({
      qnaCmtContents: modifiedContents
    }))
      .then((res) => {
        window.location.reload()
        setEditingComment(null);
        setModifiedCommentContent(""); // 수정 후에는 수정된 댓글 내용을 초기화
      })
      .catch(error => { console.log(error) })
  };

  if (data.qnaComment && Array.isArray(data.qnaComment)) {
    return (
      <div className="mt-5">
        {data.qnaComment.map((qnaComment) => (
          <div style={{ marginBottom: '10px' }}>
            <div className="flex items-center justify-between mb-4">
              {console.log('qnaComment.qnaCmtWriter:', qnaComment.qnaCmtWriter)}
              <p>작성자 : {qnaComment.qnaCmtWriter}</p>
              <div className="flex gap-2">
                <span className="flex items-center gap-2">
                  <HiOutlineClock className="text-lg" />
                  <span>{qnaComment.cmtWdate}</span>
                </span>
                {qnaComment.qnaCmtStatus === 1 && qnaComment.qnaCmtWriter === userName && (
                  <>
                    {editingComment === qnaComment.qnaCmtSeq ? (
                      <>
                        <Button
                          variant="twoTone"
                          size="xs"
                          color="blue-600"
                          onClick={() => cmtModify(qnaComment.qnaCmtSeq, modifiedCommentContent)}
                        >
                          완료
                        </Button>
                      </>
                    ) : (
                      <>
                        {/* 수정 중이 아닐 때는 수정 버튼 */}
                        {/* <Button
                          variant="twoTone"
                          size="xs"
                          color="green-600"
                          onClick={() => {
                            setEditingComment(qnaComment.qnaCmtSeq);
                            setModifiedCommentContent(qnaComment.qnaCmtContents);
                          }}
                        >
                          수정
                        </Button> */}
                        {/* 삭제 버튼 */}
                        {/* <Button
                          variant="twoTone"
                          size="xs"
                          color="red-600"
                          onClick={() => cmtDelete(qnaComment.qnaCmtSeq)}
                        >
                          삭제
                        </Button> */}
                      </>
                    )}
                  </>
                )}
              </div>
            </div>

            <div className="mb-2">
              {qnaComment.qnaCmtStatus === 2 ? (
                <span className="text-red-500">관리자에 의해 삭제된 댓글입니다.</span>
              ) : (
                <>
                  댓글:{' '}
                  {editingComment === qnaComment.qnaCmtSeq ? (
                    <Input
                      type="text"
                      value={modifiedCommentContent}
                      onChange={(e) => setModifiedCommentContent(e.target.value)}
                    />
                  ) : (
                    qnaComment.qnaCmtContents
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