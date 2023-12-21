import React, { useState } from 'react'
import { Card, Button, Tooltip } from 'components/ui'
import { TextEllipsis } from 'components/shared'
import {
    HiOutlineTrash,
} from 'react-icons/hi'
import DialogTrashIntoTrashbin from 'components/ui/Dialog/DialogTrashIntoTrashbin'
import TrashNull from './TrashNull'


const Trashes = (props) => {
    const { trashes, goRegister, count } = props;

    const [dialogStates, setDialogStates] = useState({});

    const openDialog = (tsSeq) => {
        setDialogStates(prevState => ({
            ...prevState,
            [tsSeq]: true
        }));
    };

    const closeDialog = (tsSeq) => {
        setDialogStates(prevState => ({
            ...prevState,
            [tsSeq]: false
        }));
    };

    return (
        <div>
            {count > 0 ? (
                <div className="grid lg:grid-cols-4 gap-4 md:grid-cols-3 sm:grid-cols-2">
                    {trashes.map((trash) => (
                        <Card bordered key={trash.tsSeq}>
                            <div className="min-h-[130px] max-h-[60px]">
                                <TextEllipsis text={trash.tsContents} maxTextCount={100} />
                            </div>
                            <div className="flex items-center justify-between mt-4">
                                <Tooltip title="감정 직접 비우기">
                                    <Button
                                        className="mr-2"
                                        onClick={() => openDialog(trash.tsSeq)}
                                        shape="circle"
                                        color="orange-600"
                                        variant="twoTone"
                                        size="sm"
                                        icon={<HiOutlineTrash />}
                                    />
                                </Tooltip>
                                <DialogTrashIntoTrashbin
                                    isOpen={!!dialogStates[trash.tsSeq]}
                                    onClose={() => closeDialog(trash.tsSeq)}
                                    tsSeq={trash.tsSeq}
                                    goRegister={goRegister}
                                />
                            </div>
                        </Card>
                    ))}
                </div>
            ) : (
                <TrashNull />
            )}
        </div>
    );
};

export default Trashes;
