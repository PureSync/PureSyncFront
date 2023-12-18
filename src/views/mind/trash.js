import React, { useState, useEffect } from 'react';
import { Container} from 'components/shared'
import Trashes from './trash/components/Trashes'
import axios from 'axios'
import TrashHeader from './trash/components/TrashHeader';
import {
    Loading,
} from 'components/shared'
import getHeaderCookie from 'utils/hooks/getHeaderCookie'
import { parseJwt, getMemInfoFromToken } from 'utils/hooks/parseToken'

const Trash = () => {
    const [trashes, setTrashes] = useState([]);
    const [flag, setFlag] = useState(false);
    const [loading, setLoding] = useState(true);
    const [count, setCount] = useState(0);

        //Header Cookie
        const access_token = getHeaderCookie();
        let parse_token = parseJwt(access_token);
        let { memId } = getMemInfoFromToken(parse_token);

    useEffect(() => {
        // axios를 사용하여 데이터를 가져옴
        axios.get(process.env.REACT_APP_HOST_URL + `/api/mind/trash/list/${memId}`, {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        })
            .then(response => {
                // 요청이 성공하면 데이터를 articles 상태로 설정
                setTrashes(response.data.data.mdTrashList);
                setCount(response.data.data.count);
                setLoding(false);
            })
            .catch(error => {
                // 에러 처리
                console.error('데이터를 불러오는 중 에러 발생:', error);
            });
    }, [flag]);

    const goRegister = () => {
        setFlag(!flag)   
    }

    return (
        <Loading loading={loading}>
        <Container>
            <TrashHeader goRegister={goRegister}/>
            <div className="mt-8">
                <Trashes trashes={trashes} goRegister={goRegister} count={count}/>
            </div>
        </Container>
        </Loading>
    );
};

export default Trash;
