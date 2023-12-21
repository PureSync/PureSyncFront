import React from 'react';
import { Button } from 'components/ui';
import { useNavigate } from 'react-router-dom';
import { HiExclamationCircle } from "react-icons/hi";


const BoardListHeader = () => {

    const navigate = useNavigate();

    return (
        <div className="md:flex items-center justify-between mb-4">
            <div>
                <h3>자유게시판</h3>
                <div className='mb-4'>
                    <span className="flex items-center rounded-full gap-1">
                        <span className='text-emerald-600 dark:text-emerald-100'>
                            <HiExclamationCircle />
                        </span>
                        <span className='font-semibold text-emerald-600' >상대방을 비하하는 글은 관리자에 의해 삭제될 수 있습니다.</span>
                    </span>
                </div>
            </div>

            <Button size="sm" onClick={() => navigate('/board/write')} variant="solid">
                글쓰기
            </Button>
        </div>
    );
};

export default BoardListHeader;