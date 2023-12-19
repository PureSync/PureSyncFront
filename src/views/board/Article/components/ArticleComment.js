import React, {useState} from 'react'
import { Container, AdaptableCard } from 'components/shared'
import { HiOutlineClock } from 'react-icons/hi'
import { Card, Button, Input } from 'components/ui'
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom'
import getHeaderCookie from 'utils/hooks/getHeaderCookie'
import { parseJwt, getMemInfoFromToken } from 'utils/hooks/parseToken'
const ArticleComment = ({ data }) => {
  const navigate = useNavigate();
  const access_token = getHeaderCookie();
  let parse_token = parseJwt(access_token);
  let { memId } = getMemInfoFromToken(parse_token);
  const [editingComment, setEditingComment] = useState(null);
  const [modifiedCommentContent, setModifiedCommentContent] = useState("");
  // const [commentList, setCommentList]= useState(data.comment);
  // commentList.push({cmtContents: "현보님 잘 해요", cmtStatus: 1, }));
  console.log("================", data.comment);
  const cmtDelete = async (cmtSeq) => {
          console.log(cmtSeq);
    try {
        console.log(data.comment.cmtSeq);
        if (!cmtSeq) {
            console.error('댓글을 찾을 수 없습니다.');
            return;
        }
        await axios.delete(`http://localhost:9000/api/board/${data.boardSeq}/comments/${cmtSeq}`,{
          headers: {
            Authorization: `Bearer ${access_token}`
        },
        });
        window.location.reload()
        //navigate(`/board/view?id=${data.boardSeq}`);
    } catch (error) {
        console.error('게시물 삭제 중 오류:', error);
    } finally {

    }
};
const cmtModify = async (cmtSeq, modifiedContents) => {
  try {
    if (!cmtSeq) {
      console.error('댓글을 찾을 수 없습니다.');
      return;
    }
    // API를 호출하여 댓글 수정
    await axios.put(
      `http://localhost:9000/api/board/${data.boardSeq}/comments/${cmtSeq}`,
      {
        cmtContents: modifiedContents,
      },
      {
        headers: {
          Authorization: `Bearer ${access_token}`
        },
      }
    );
    window.location.reload()
    setEditingComment(null);
    setModifiedCommentContent(""); // 수정 후에는 수정된 댓글 내용을 초기화
    
    //navigate(`/board/view?id=${data.boardSeq}`);
  } catch (error) {
    console.error('댓글 수정 중 오류:', error);
  }
};
    if (data.comment && Array.isArray(data.comment)) {
      return (
        <div className="mt-5">
          {data.comment.map((comment) => (
            <div style={{ marginBottom: '10px' }}>
                <div className="flex items-center justify-between mb-4">
                  <p>작성자: {data.memId}</p>
                  <div className="flex gap-2">
                    <span className="flex items-center gap-2">
                      <HiOutlineClock className="text-lg" />
                      <span>{comment.cmtWdate}</span>
                </span>
                {editingComment === comment.cmtSeq ? (
            <>
              {/* <Input
                type="text"
                value={modifiedCommentContent}
                onChange={(e) => setModifiedCommentContent(e.target.value)}
              /> */}
              <Button
                variant="twoTone"
                size="xs"
                color="blue-600"
                onClick={() => cmtModify(comment.cmtSeq,modifiedCommentContent)}
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
                        setModifiedCommentContent(comment.cmtContents); // 수정 시작 시에 초기 내용 설정
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
              </div>
            </div>

            <div className="mb-2">
              댓글:{' '}
              {editingComment === comment.cmtSeq ? (
                // 수정 중일 때는 Input으로 댓글 내용 표시
                <Input
                  type="text"
                  value={modifiedCommentContent}
                  onChange={(e) => setModifiedCommentContent(e.target.value)}
                />
              ) : (
                // 수정 중이 아닐 때는 댓글 내용 표시
                comment.cmtContents
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