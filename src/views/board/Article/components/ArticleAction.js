import React, { useState, useRef, useCallback } from 'react'
import { Card, Button, Input } from 'components/ui'
import { HiOutlinePencil } from 'react-icons/hi'
import { apiPostComment } from 'services/BoardService';


const ArticleAction = (props) => {
  const commentInput = useRef();

  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  const onHelpfulClick = useCallback((event) => {
    const val = event.target.value;
    setComment(val);
  }, []);

  const onCommentSubmit = async () => {
    console.log(comment);
    console.log(props.data);
    
    await apiPostComment(props.data, JSON.stringify({
      cmtContents: comment
    }))
      .then((res) => {
        console.log(res.data);
        setComments((prevComments) => [...prevComments, res.data]);
        setComment('');
        props.commentRegister(); //부모한테 나 글등록했다.
      })
      .catch((error) => { console.log(error) })

  };
  return (
    <div className="mt-12 mb-5">
      <h4 className="mb-4">댓글</h4>
      <Input ref={commentInput} placeholder=" " value={comment} textArea onChange={onHelpfulClick} />
      <div className="mt-1 flex justify-end">
        <Button onClick={onCommentSubmit} variant="solid" icon={<HiOutlinePencil />} size="xs" className="mb-5">
          댓글 등록
        </Button>
      </div>
    </div>
  );
};

export default ArticleAction