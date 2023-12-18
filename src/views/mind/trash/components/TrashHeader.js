import React, { useState, useEffect } from 'react';
import { Button } from 'components/ui'
import DialogTrashInsert from 'components/ui/Dialog/DialogTrashInsert';
import { HiExclamationCircle } from "react-icons/hi";

const TrashHeader = (props) => {
    const [isDialogOpen, setDialogOpen] = useState(false);

    const openDialog = () => {
        setDialogOpen(true);
    }

    const closeDialog = () => {
        setDialogOpen(false);
    }



    return (
        <>
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h3>마음쓰레기통</h3>
                </div>
                <Button onClick={openDialog} size="sm" variant="solid">
                    감정 적기
                </Button>
                <DialogTrashInsert isOpen={isDialogOpen} onClose={closeDialog} goRegister={props.goRegister} />
            </div>
            <div className='mb-4'>
            <span className="flex items-center rounded-full gap-1">
                <span className='text-emerald-600 dark:text-emerald-100'>
                <HiExclamationCircle />
                </span>
                <span className='font-semibold text-emerald-600' >마음쓰레기통은 매일 자정에 자동으로 비워집니다.</span>
                </span>
            </div>
        </>

    )
}

export default TrashHeader
