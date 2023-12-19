import React, { useState, useRef, useCallback } from 'react'
import { Card, Button, Input } from 'components/ui'
import axios from 'axios';
import {HiOutlinePencil} from 'react-icons/hi'
import getHeaderCookie from 'utils/hooks/getHeaderCookie'
import {parseJwt, getMemInfoFromToken} from 'utils/hooks/parseToken'

const ArticleAction = (props) => {
    const commentInput = useRef();
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);
    const access_token = getHeaderCookie();
    let parse_token = parseJwt(access_token);
    let  { memId } = getMemInfoFromToken(parse_token);

    const onHelpfulClick = useCallback((event) => {
      const val = event.target.value;
      setComment(val); 
  }, []);

    const onCommentSubmit = () => {
      // console.log(comment);
      // console.log(props.data);
      axios.post(process.env.REACT_APP_HOST_URL + `/api/qnaBoard/${props.data}/comments`,  { qnaCmtContents: comment } 
      , {
        headers: {
          'Content-Type': 'application/json', 
          Authorization: `Bearer ${access_token}`
        },
      })
      .then((res)=>{
        // console.log(res.data);
        setComments((prevComments) => [...prevComments, res.data]);
        setComment('');
        props.commentRegister(); //부모한테 나 글등록했다.
      })
            
        
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