import React, { useState } from 'react';
import { Button } from 'components/ui';
import DialogExercise from 'components/ui/Dialog/DialogExercise';
import TableExercise from 'components/ui/Table/TableExercise';

function Exercise(props) {
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    // 다이얼로그
    const openDialog = () => {
        setDialogOpen(true);
        setLoading(false);
    }

    const closeDialog = () => {
        setDialogOpen(false);
        setLoading(true);
    }

    // 삭제 버튼
    const deleteMenuItem = (el_seq) => {
        props.exerciseDelete(el_seq);

    }

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={{ margin: '0' }} >운동</h2>
                <div style={{ display: 'flex', alignItems: 'center' }}></div>
                <Button
                    onClick={openDialog}
                    variant="solid"
                    style={{
                        width: '100px',
                        height: '30px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    운동 등록
                </Button>
                <DialogExercise writeOK={props.writeOK} isOpen={isDialogOpen} onClose={closeDialog} selectDate={props.selectDate} />
            </div>
            <div>
                ✔️일일 총 소모 칼로리 : {props.totalExerciseCalories} kcal
            </div>
            <br />
            {/* 운동 리스트 */}
            <div>
                <TableExercise exerciseData={props.exerciseData} deleteMenuItem={deleteMenuItem} />
            </div>
        </div>
    )
}

export default Exercise;