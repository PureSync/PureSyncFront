import React from 'react'
import { Table } from 'components/ui'
import { Button } from 'components/ui';

const { Tr, Th, Td, THead, TBody } = Table

const TableExercise = ({ exerciseData, deleteMenuItem }) => {
    return (
        <div>
            <Table>
                <THead>
                    <Tr>
                        <Th style={{ fontSize: '16px' }}>운동명</Th>
                        <Th style={{ fontSize: '16px' }}>운동 시간(분)</Th>
                        <Th style={{ fontSize: '16px' }}>소모 칼로리</Th>
                        <Th style={{ fontSize: '16px' }}></Th>
                    </Tr>
                </THead>
                <TBody>
                    {exerciseData.map((item, index) => {
                        return (
                            <tr key={index}>
                                <td style={{ textAlign: "left", fontSize: '16px' }}>{item.ec_name}</td>
                                <td style={{ textAlign: "left", fontSize: '16px' }}>{item.el_time}</td>
                                <td style={{ textAlign: "left", fontSize: '16px' }}>{item.el_total.toFixed(2)}</td>
                                <td style={{ textAlign: "left", fontSize: '16px' }}>
                                    <Button
                                        onClick={() => {
                                            deleteMenuItem(item.el_seq);
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

export default TableExercise
