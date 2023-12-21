import React, { useState } from 'react';
import Modal from 'react-modal';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import CloseButton from '../CloseButton';
import { motion } from 'framer-motion';
import { theme } from 'twin.macro';
import useWindowSize from '../hooks/useWindowSize';
import { Button, Input } from 'components/ui';
import { apiGetAllExercise, apiWriteExercise } from 'services/BodyRecord';

const DialogExercise = (props) => {


    const currentSize = useWindowSize();

    const {
        className,
        closable,
        width,
        height,
        style,
        isOpen,
        onClose,
        bodyOpenClassName,
        portalClassName,
        overlayClassName,
        contentClassName,
        closeTimeoutMS,
        ...rest
    } = props;

    // 변수들
    const [searchValue, setSearchValue] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const [loading, setLoding] = useState(false);
    const [timeAmounts, setTimeAmounts] = useState(1);
    const [inputError, setInputError] = useState(false);


    const onCloseClick = (e) => {
        setSearchValue('');
        setSearchResults([]);
        setSelectedItems([]);
        setTimeAmounts(1);
        setInputError(false);
        onClose(e);
    }

    const renderCloseButton = (
        <CloseButton
            onClick={onCloseClick}
            className="ltr:right-6 rtl:left-6"
            absolute
        />
    );

    const contentStyle = {
        content: {
            inset: 'unset',
        },
        ...style,
    };

    if (width !== undefined) {
        contentStyle.content.width = width;

        if (
            currentSize.width <=
            parseInt(theme`screens.sm`.split(/ /)[0].replace(/[^\d]/g, ''))
        ) {
            contentStyle.content.width = 'auto';
        }
    }
    if (height !== undefined) {
        contentStyle.content.height = height;
    }

    const defaultDialogContentClass = 'dialog-content';

    const dialogClass = classNames(defaultDialogContentClass, contentClassName);



    // 검색 입력 변경 핸들러
    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchValue(value);
        setInputError(value.length < 2); // 검색어 길이가 2자 미만인 경우 inputError를 true로 설정
    }


    // 항목 선택/해제 핸들러  
    const handleItemToggle = (item) => {
        if (selectedItems.includes(item)) {
            setSelectedItems(selectedItems.filter((selectedItem) => selectedItem !== item));
        }
        else {
            setSelectedItems([...selectedItems, item]);// 선택된 아이템들의 목록
        }
    }

    // 운동 시간을 변경하는 핸들러
    const handleTimeAmountChange = (e) => {
        const { value } = e.target;
        setTimeAmounts(parseInt(value));
    }

    // 검색 기능을 수행하는 함수
    const performSearch = () => {
        if (searchValue.length < 2) {
            setInputError(true); // 검색어 길이가 2자 미만인 경우 inputError를 true로 설정
        } else {
            setInputError(false); // 검색어 길이가 2자 이상인 경우 inputError를 false로 설정
            
            const sendExerciseData = {
                exerciseName : searchValue
            };

            apiGetAllExercise(sendExerciseData)
                .then((res) => {
                    setSearchResults(res.data.data.allExercise);
                    setLoding(true);
                })
                .catch((res) => {
                    console.log(res);
                });
        }
    }

    // 검색 입력란에서 엔터 키를 눌렀을 때 검색 실행
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    }

    // 등록 버튼 클릭
    const handleRegisterClick = () => {
        const sendExerciseDatas = [];

        // 검색값, 선택된 항목, 운동 시간의 유효성
        if (searchValue === '' || selectedItems.length === 0 || isNaN(timeAmounts) || timeAmounts <= 0) {
            alert("모든 항목을 입력하세요.");
            return;
        }

        // 선택된 항목을 루프하여 exerciseInfo 객체를 생성합니다.
        let i = 0;
        selectedItems.forEach((item, index) => {
            const exerciseTimeValue = parseInt(timeAmounts);
            const exerciseInfo = {
                elDate: props.selectDate,
                elTime: exerciseTimeValue,
                ecSeq: item.ecSeq
            };
            i++;
            sendExerciseDatas.push(exerciseInfo);
        });

        apiWriteExercise(sendExerciseDatas[0])
            .then((res) => {
                setSearchValue('');
                setSearchResults([]);
                setSelectedItems([]);
                setTimeAmounts(1);
                setInputError(false);
                props.onClose();
                props.writeOK(2);
            })
            .catch((res) => {
                console.log('에러 : ');
                console.log(res);
            })
    }

    return (
        <Modal
            className={{
                base: classNames('dialog', className),
                afterOpen: 'dialog-after-open',
                beforeClose: 'dialog-before-close',
            }}
            overlayClassName={{
                base: classNames('dialog-overlay', overlayClassName),
                afterOpen: 'dialog-overlay-after-open',
                beforeClose: 'dialog-overlay-before-close',
            }}
            portalClassName={classNames('dialog-portal', portalClassName)}
            bodyOpenClassName={classNames('dialog-open', bodyOpenClassName)}
            ariaHideApp={false}
            isOpen={isOpen}
            style={{ ...contentStyle }}
            closeTimeoutMS={closeTimeoutMS}
            {...rest}
        >
            <motion.div
                className={dialogClass}
                initial={{ transform: 'scale(0.9)' }}
                animate={{
                    transform: isOpen ? 'scale(1)' : 'scale(0.9)',
                }}
            >
                {closable && renderCloseButton}

                <h4>운동 선택</h4><br />
                <div>
                    {/* 항목 검색을 위한 Input 컴포넌트와 검색 버튼 */}
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Input
                            placeholder="운동을 입력하세요"
                            value={searchValue}
                            onChange={handleSearchChange}
                            onKeyPress={handleKeyPress}
                            className={inputError ? 'border-2 border-red-500' : ''}
                        />
                        <Button onClick={performSearch} onKeyPress={handleKeyPress} variant="solid">
                            검색
                        </Button>
                    </div>
                    {inputError && <p className="text-red-500">⚠️ 검색어를 2자 이상 입력하세요</p>}
                </div>

                <div>
                    {/* 검색 결과 표시 및 항목 선택 가능 */}
                    {searchValue && searchResults.length >= 2 && (
                        <div style={{ maxHeight: '100px', overflowY: 'auto' }}>
                            {searchResults.map((result, index) => (
                                <div key={index} onClick={() => handleItemToggle(result)}>
                                    {result.ecName}
                                    {selectedItems.includes(result) && " ✔️"}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <br /><br />
                <div style={{ maxHeight: '220px', overflowY: 'auto' }}>
                    <h5>운동 기록 추가</h5>
                    {/* 선택한 항목을 표시 */}
                    {selectedItems.length > 0 ? (
                        selectedItems.map((item, index) => (
                            <div key={index} style={{ display: 'flex', alignItems: 'center' }}>

                                <span style={{ flex: 1 }}>
                                    {item.ecName} - 운동 시간(분) :&nbsp;&nbsp;
                                    <Input
                                        name="timeAmounts"
                                        value={timeAmounts}
                                        onChange={handleTimeAmountChange}
                                        type="number"
                                        style={{ width: '100px', height: '15px' }}
                                    />
                                </span>
                            </div>

                        ))
                    ) : (
                        <p>운동 기록에 항목을 추가하세요.</p>
                    )
                    }
                </div>
                <br /><br />

                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button onClick={handleRegisterClick} variant="solid">
                        등록
                    </Button>
                </div>
            </motion.div>
        </Modal>
    );
}


DialogExercise.propTypes = {
    className: PropTypes.string,
    closable: PropTypes.bool,
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    style: PropTypes.object,
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func,
    bodyOpenClassName: PropTypes.string,
    portalClassName: PropTypes.string,
    overlayClassName: PropTypes.string,
    contentClassName: PropTypes.string,
    closeTimeoutMS: PropTypes.number,
}

DialogExercise.defaultProps = {
    closable: true,
    width: 520,
    closeTimeoutMS: 150,
}

export default DialogExercise;