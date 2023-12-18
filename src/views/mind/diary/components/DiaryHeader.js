import React, { useState, useEffect } from 'react';
import { Button } from 'components/ui'
import { useNavigate } from 'react-router-dom'

const DiaryHeader = () => {    
    const navigate = useNavigate();
    const id = 0;
    const goView = () => {
        navigate(
            `/mind/diary/write`
        )
    }

    return (
        <div className="flex items-center justify-between mb-4">
                <div>
                    <h3>마음일기</h3>
                </div>
        <div className="flex items-center">
            <Button size="sm" variant="solid" onClick={goView}>
                감정일기 작성
            </Button>
        </div>
        </div>
    )
}

export default DiaryHeader
