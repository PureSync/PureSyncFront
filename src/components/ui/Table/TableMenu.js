
import React from 'react'
import { Table } from 'components/ui'
import { Button } from 'components/ui';

const { Tr, Th, Td, THead, TBody } = Table

const TableMenu = ({ menuData, deleteMenuItem, menuWhen }) => {
    return (
        <div>
            <Table>
                <THead>
                    <Tr>
                        <Th style={{ fontSize: '16px' }}>음식명</Th>
                        <Th style={{ fontSize: '16px' }}>섭취량</Th>
                        <Th style={{ fontSize: '16px' }}>단백질</Th>
                        <Th style={{ fontSize: '16px' }}>탄수화물</Th>
                        <Th style={{ fontSize: '16px' }}>지방</Th>
                        <Th style={{ fontSize: '16px' }}>콜레스테롤</Th>
                        <Th style={{ fontSize: '16px' }}>당</Th>
                        <Th style={{ fontSize: '16px' }}>나트륨</Th>
                        <Th style={{ fontSize: '16px' }}>칼로리</Th>
                        <Th></Th>
                    </Tr>
                </THead>
                <TBody>
    {menuData
        .filter(item => item.menu_when === menuWhen ) // 아침 식단 필터링
        .map((item, index) => {
            const lastIndex = item.food_name.lastIndexOf('_');
            const extractedName = lastIndex !== -1 ? item.food_name.substr(lastIndex + 1) : item.food_name;

            return (
                <tr key={index}>
                    <td style={{ textAlign: "left", fontSize: '16px' }}>{extractedName}</td>
                    <td style={{ textAlign: "left", fontSize: '16px' }}>{item.menu_gram}</td>
                    <td style={{ textAlign: "left", fontSize: '16px' }}>{item.menu_total_pro.toFixed(2)}</td>
                    <td style={{ textAlign: "left", fontSize: '16px' }}>{item.menu_total_car.toFixed(2)}</td>
                    <td style={{ textAlign: "left", fontSize: '16px' }}>{item.menu_total_fat.toFixed(2)}</td>
                    <td style={{ textAlign: "left", fontSize: '16px' }}>{item.menu_total_cal.toFixed(2)}</td>
                    <td style={{ textAlign: "left", fontSize: '16px' }}>{item.menu_total_sugar.toFixed(2)}</td>
                    <td style={{ textAlign: "left", fontSize: '16px' }}>{item.menu_total_na.toFixed(2)}</td>
                    <td style={{ textAlign: "left", fontSize: '16px' }}>{item.menu_total.toFixed(2)}</td>
                    <td style={{ textAlign: "left", fontSize: '16px' }}>
                        <Button
                            onClick={() => {
                                deleteMenuItem(item.menu_seq);
                            }}
                            variant="solid"
                            style={{
                                width: '50px',
                                height: '20px',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                fontSize: '12px',
                            }}
                        >
                            삭제
                        </Button>
                    </td>
                </tr>
            );
        })}
</TBody>
            </Table>
        </div>
    )
}

export default TableMenu

