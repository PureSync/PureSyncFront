import React, { useState } from 'react';
import DialogMenu from 'components/ui/Dialog/DialogMenu';
import { Button } from 'components/ui';
import TableMenu from 'components/ui/Table/TableMenu';

function Menu(props) {
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [loading, setLoading] = useState(false);
   
    const openDialog = () => {
        setDialogOpen(true);
        setLoading(false);
    }

    const closeDialog = () => {
        setDialogOpen(false);
        setLoading(true);

    }

    // 삭제 버튼
    const deleteMenuItem = (menu_seq) => {
        props.menuDelete(menu_seq);
    }


    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={{ margin: '0' }}>식단</h2>
                <div style={{ display: 'flex', alignItems: 'center' }}>
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
                        식단 등록
                    </Button>
                    <DialogMenu writeOK={props.writeOK} isOpen={isDialogOpen} onClose={closeDialog} selectDate={props.selectDate} />
                </div>
            </div>
            <div>
                ✔️일일 총 섭취 칼로리 : {props.dailyTotalCalories} kcal
            </div>

            <br /><br />

            {/* 아침 메뉴 */}
            <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h4>아침</h4>
                    <div>
                    📌아침 총 칼로리: {props.breakfastTotalCalories} kcal
                    </div>
                </div>
                <TableMenu menuData={props.menuData} deleteMenuItem={deleteMenuItem} menuWhen={1} />
            </div>
            <br /><br />

            {/* 점심 메뉴 */}
            <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h4>점심</h4>
                    <div>
                        
                        📌점심 총 칼로리 : {props.lunchTotalCalories} kcal
                    </div>
                </div>
                <TableMenu menuData={props.menuData} deleteMenuItem={deleteMenuItem} menuWhen={2} />
            </div>
            <br /><br />

            {/* 저녁 메뉴 */}
            <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h4>저녁</h4>
                    <div>
                        📌저녁 총 칼로리 :{props.dinnerTotalCalories} kcal
                    </div>
                </div>
                <TableMenu menuData={props.menuData} deleteMenuItem={deleteMenuItem} menuWhen={3} />
            </div>
            <br /><br />

            {/* 간식 메뉴 */}
            <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h4>간식</h4>
                    <div>
                        📌간식 총 칼로리 : {props.snackTotalCalories} kcal
                    </div>
                </div>
                <TableMenu menuData={props.menuData} deleteMenuItem={deleteMenuItem} menuWhen={4} />
            </div>
        </div>
    );
}

export default Menu;