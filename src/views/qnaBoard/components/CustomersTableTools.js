import React, { useRef } from 'react';
import { Button } from 'components/ui';
import { useDispatch, useSelector } from 'react-redux';
import { setTableData, setFilterData } from '../store/dataSlice';
import cloneDeep from 'lodash/cloneDeep';
import { useNavigate } from 'react-router-dom';
import { HiExclamationCircle } from "react-icons/hi";


const CustomersTableTools = () => {
    const dispatch = useDispatch();
    const inputRef = useRef();
    const navigate = useNavigate();
    const tableData = useSelector((state) => state.qnaCrmCustomers.data.tableData);

    const handleInputChange = (val) => {
        const newTableData = cloneDeep(tableData);
        newTableData.query = val;
        newTableData.pageIndex = 1;

        if (typeof val === 'string' && val.length > 1) {
            fetchData(newTableData);
        }

        if (typeof val === 'string' && val.length === 0) {
            fetchData(newTableData);
        }
    };

    const fetchData = (data) => {
        dispatch(setTableData(data));
    };

    const onClearAll = () => {
        
        navigate('/qnaBoard/write');
    
    };

    return (
        <div className="md:flex items-center justify-between mb-4">
            <div>
                <h3>문의 게시판</h3>
                <div className='mb-4'>
                <span className="flex items-center rounded-full gap-1">
                    <span className='text-emerald-600 dark:text-emerald-100'>
                    <HiExclamationCircle />
                    </span>
                    <span className='font-semibold text-emerald-600' >상대방을 비하하는 글은 관리자에 의해 삭제될 수 있습니다.</span>
                    </span>
                </div>
            </div>
            
            <Button size="sm" onClick={onClearAll} variant="solid">
                글쓰기
            </Button>
            
        </div>
    );
};

export default CustomersTableTools;