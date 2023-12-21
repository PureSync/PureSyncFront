import React, { useEffect } from 'react'
import { Container, AdaptableCard } from 'components/shared'
import Editor from './Editor'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const DiaryUpdate = () => {
    const location = useLocation();
    const diary = location.state.editData;

    return (
        <Container>
            <AdaptableCard>
                <div className="max-w-[800px] mx-auto">
                    <div className="flex justify-between items-center mb-4">
                    </div>
                    <Editor diary={diary}/>
                </div>
            </AdaptableCard>
        </Container>
    )
}

export default DiaryUpdate;
