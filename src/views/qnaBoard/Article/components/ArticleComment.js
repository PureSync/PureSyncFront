import React, {useState} from 'react'
import { Container, AdaptableCard } from 'components/shared'
import { HiOutlineClock } from 'react-icons/hi'
import { Card, Button, Input } from 'components/ui'
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom'
const ArticleComment = ({ data }) => {
  const navigate = useNavigate();
  const [editingComment, setEditingComment] = useState(null);
  console.log(data.qnaComment);
  const cmtDelete = async (qnaCmtSeq) => {
          console.log(qnaCmtSeq);
    try {
        console.log(data.qnaComment.qnaCmtSeq);
        if (!qnaCmtSeq) {
            console.error('댓글을 찾을 수 없습니다.');
            return;
        }
        await axios.delete(`http://localhost:9000/api/qnaBoard/${data.qnaBoardSeq}/comments/${qnaCmtSeq}`);
        console.log('게시물 삭제 성공');
        navigate('/qnaBoard');
    } catch (error) {
        console.error('게시물 삭제 중 오류:', error);
    } finally {

    }
};
const cmtModify = async (qnaCmtSeq, modifiedContents) => {
  try {
    if (!qnaCmtSeq) {
      console.error('댓글을 찾을 수 없습니다.');
      return;
    }
    // API를 호출하여 댓글 수정
    await axios.put(`http://localhost:9000/api/qnaBoard/${data.qnaBoardSeq}/comments/${qnaCmtSeq}`, {
      qnaCmtContents: modifiedContents,
    });
    console.log('댓글 수정 성공');
    // 수정이 완료되면 editingComment 상태를 null로 설정하여 수정 모드를 종료
    setEditingComment(null);
  } catch (error) {
    console.error('댓글 수정 중 오류:', error);
  }
};
    if (data.qnaComment && Array.isArray(data.qnaComment)) {
      return (
        <div className="mt-5">
          {data.qnaComment.map((qnaComment) => (
            <div style={{ marginBottom: '10px' }}>
                <div className="flex items-center justify-between mb-4">
                  <p>작성자 : 관리자</p>
                  <div className="flex gap-2">
                    <span className="flex items-center gap-2">
                      <HiOutlineClock className="text-lg" />
                      <span>{qnaComment.cmtWdate}</span>
                </span>
                {editingComment === qnaComment.qnaCmtSeq ? (
                  // 수정, 삭제 버튼 쓰려면 주석풀기
                  <>
                    {/* <Button
                      variant="twoTone"
                      size="xs"
                      color="blue-600"
                      onClick={() => cmtModify(qnaComment.qnaCmtSeq, editingComment)}
                    >
                      완료
                    </Button> */}
                  </>
                ) : (
                  <>
                    {/* <Button
                      variant="twoTone"
                      size="xs"
                      color="green-600"
                      onClick={() => setEditingComment(qnaComment.qnaCmtSeq)}
                    >
                      수정
                    </Button>
                    <Button
                      variant="twoTone"
                      size="xs"
                      color="red-600"
                      onClick={() => cmtDelete(qnaComment.qnaCmtSeq)}
                    >
                      삭제
                    </Button> */}
                  </>
                )}
              </div>
            </div>

            <div className="mb-2">
              댓글:{' '}
              {editingComment === qnaComment.qnaCmtSeq ? (
                // 수정 중일 때는 Input으로 댓글 내용 표시
                <Input
                  type="text"
                  value={qnaComment.qnaCmtContents}
                  onChange={(e) => setEditingComment(e.target.value)}
                />
              ) : (
                // 수정 중이 아닐 때는 댓글 내용 표시
                qnaComment.qnaCmtContents
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