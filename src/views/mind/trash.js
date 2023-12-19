import React, { useState, useEffect } from 'react';
import { Container} from 'components/shared'
import Trashes from './trash/components/Trashes'
import TrashHeader from './trash/components/TrashHeader';
import {
    Loading,
} from 'components/shared'
import { apiGetTrashList } from 'services/MindTrashService';

const Trash = () => {
    const [trashes, setTrashes] = useState([]);
    const [flag, setFlag] = useState(false);
    const [loading, setLoding] = useState(true);
    const [count, setCount] = useState(0);

    useEffect(() => {
        apiGetTrashList()
        .then((res) => {
            setTrashes(res.data.data.mdTrashList);
                setCount(res.data.data.count);
                setLoding(false);
        })
        .catch((res) => {})
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
