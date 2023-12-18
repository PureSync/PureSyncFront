import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import CloseButton from '../CloseButton';
import { motion } from 'framer-motion';
import { theme } from 'twin.macro';
import useWindowSize from '../hooks/useWindowSize';
import getHeaderCookie from 'utils/hooks/getHeaderCookie'
import {parseJwt, getMemInfoFromToken} from 'utils/hooks/parseToken'

import { Button, Select, Input } from 'components/ui';
import Axios from 'axios';

const DialogMenu = (props) => {

    //Header Cookie
    const access_token = getHeaderCookie();
    let parse_token = parseJwt(access_token);
    let  { memId, memSeq } = getMemInfoFromToken(parse_token);

    // 현재 창 크기를 가져오는 커스텀 훅 사용
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

    // 식사 선택을 위한 상태 변수들
    const [mealType, setMealType] = useState('');
    const [searchValue, setSearchValue] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const [selectedMealType, setSelectedMealType] = useState('');
    const [inputError, setInputError] = useState(false);

    const [loading, setLoding] = useState(false);

    const mealTypes = [{ meal: '아침', value: 1 }, { meal: '점심', value: 2 }, { meal: '저녁', value: 3 }, { meal: '간식', value: 4 }];

    // 섭취 그람수를 저장하는 상태 변수 추가
    const [gramAmounts, setGramAmounts] = useState(1);

    // 닫기 버튼 클릭 이벤트 핸들러
    const onCloseClick = (e) => {
        setMealType('');
        setSearchValue('');
        setSearchResults([]);
        setSelectedItems([]);
        setSelectedMealType('');
        setGramAmounts(1);
        setInputError(false);

        onClose(e);

    }

    // 닫기 버튼을 렌더링하는 JSX 요소
    const renderCloseButton = (
        <CloseButton
            onClick={onCloseClick}
            className="ltr:right-6 rtl:left-6"
            absolute
        />
    );

    // 모달 콘텐츠의 모양을 커스터마이즈하기 위한 contentStyle 객체
    const contentStyle = {
        content: {
            inset: 'unset',
        },
        ...style,
    };

    // 현재 창 크기와 제공된 width prop을 기반으로 콘텐츠 너비 커스터마이즈
    if (width !== undefined) {
        contentStyle.content.width = width;

        // 창 크기가 테마에서 정의한 "sm" 브레이크포인트보다 작거나 같으면 width를 'auto'로 설정
        if (
            currentSize.width <=
            parseInt(theme`screens.sm`.split(/ /)[0].replace(/[^\d]/g, ''))
        ) {
            contentStyle.content.width = 'auto';
        }
    }

    // 제공된 height prop을 기반으로 콘텐츠 높이 커스터마이즈
    if (height !== undefined) {
        contentStyle.content.height = height;
    }

    // 모달 콘텐츠의 CSS 클래스 정의
    const defaultDialogContentClass = 'dialog-content';

    // 기본 및 사용자 제공 콘텐츠 클래스 이름을 결합
    const dialogClass = classNames(defaultDialogContentClass, contentClassName);


    // 식사 유형 선택 변경 핸들러
    const handleMealTypeChange = (value) => {
        setMealType(value);
        setSelectedMealType(value);
    }

    // mealType 변경 시 selectedMealType 업데이트하기 위해 useEffect 사용
    useEffect(() => {
        setSelectedMealType(mealType);
    }, [mealType]);

    // 검색 입력 변경 핸들러
    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchValue(value);
        setInputError(value.length < 2);
    }

    // 검색 기능을 수행하는 함수
    const performSearch = () => {
        if (searchValue.length < 2) {
            setInputError(true); // 검색어 길이가 2자 미만인 경우 inputError를 true로 설정
        } else {
            setInputError(false); // 검색어 길이가 2자 이상인 경우 inputError를 false로 설정
            
            Axios.get( process.env.REACT_APP_HOST_URL + '/api/menu/foodList',
                { params: { "foodName": searchValue } },
            )
            .then((res) => {
                setSearchResults(res.data.data.allFoods);
                setLoding(true);
            })
            .catch((res) => {
                console.log(res);
            })
        }
    }

    // 검색 입력란에서 엔터 키를 눌렀을 때 검색 실행
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
        performSearch();
        }
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

    // 섭취 그람수를 변경하는 핸들러
    const handleGramAmountChange = (e) => {
        const { value } = e.target;
        setGramAmounts(parseInt(value));
    }

    // 등록 버튼 클릭
    const handleRegisterClick = () => {
        const sendFoodDatas = [];

        // 검색값, 선택된 항목, 운동 시간의 유효성
        if (searchValue === '' || selectedItems.length === 0 || isNaN(gramAmounts) || gramAmounts <= 0) {
            alert("모든 항목을 입력하세요.");
            return;
        }

        // 선택한 식사 유형의 "value" 값을 추출
        const menuWhenValue = selectedMealType ? selectedMealType.value : '';

        // 선택한 항목에 대한 정보를 배열에 추가
        selectedItems.forEach((item) => {
            const foodInfo = {
                menuWhen: menuWhenValue,
                menuDate: props.selectDate,
                menuGram: parseInt(gramAmounts),
                member: { memSeq: memSeq },
                food: {
                    foodSeq: item.foodSeq,
                    foodName: item.foodName,
                    foodCar: item.foodCar,
                    foodPro: item.foodPro,
                    foodFat: item.foodFat,
                    foodSugar: item.foodSugar,
                    foodNa: item.foodNa,
                    foodCol: item.foodCol,
                    foodKcal: item.foodKcal,
                },
            };
            sendFoodDatas.push(foodInfo);
        });

        Axios.post(process.env.REACT_APP_HOST_URL + '/api/menu/save', sendFoodDatas[0],
        {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        }
        
        )
            .then((res) => {
                setMealType('');
                setSearchValue('');
                setSearchResults([]);
                setSelectedItems([]);
                setSelectedMealType('');
                setGramAmounts(1);
                setInputError(false);
                props.onClose();
                props.writeOK(1);
            })
            .catch((error) => {
                console.log('에러 : ');
                console.log(error);

            });
    }

    // 'react-modal'에서 Modal 컴포넌트를 사용하여 모달 대화상자 렌더링
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
            {/* framer-motion을 사용하여 모달 콘텐츠에 애니메이션 적용 */}
            <motion.div
                className={dialogClass}
                initial={{ transform: 'scale(0.9)' }}
                animate={{
                    transform: isOpen ? 'scale(1)' : 'scale(0.9)',
                }}
            >
                {/* closable이 true인 경우 닫기 버튼 렌더링 */}
                {closable && renderCloseButton}
                <h4>음식 선택</h4><br />

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                    <Select
                        placeholder="식사 유형"
                        options={mealTypes.map((type) => ({
                            value: type.value,
                            label: type.meal,
                        }))}
                        value={selectedMealType}
                        onChange={(value) => handleMealTypeChange(value)}
                        style={{ width: '60px', height: '70px' }}
                    />
                </div>
                <br />

                <div>
                    {/* 항목 검색을 위한 Input 컴포넌트와 검색 버튼 */}
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Input
                            placeholder="식품을 입력하세요"
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
                                    {result.foodName}
                                    {selectedItems.includes(result) && " ✔️"}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <br /><br />

                <div style={{ maxHeight: '220px', overflowY: 'auto' }}>
                    <h5>식단 추가</h5>
                    {/* 선택한 항목을 표시 */}

                    {selectedItems.length > 0 ? (
                        selectedItems.map((item, index) => (
                            <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
                                <span style={{ flex: 1 }}>
                                    {item.foodName} - 섭취한 양(g) :&nbsp;&nbsp;
                                    <Input
                                        name="gramAmounts"
                                        value={gramAmounts}
                                        onChange={handleGramAmountChange}
                                        type="number"
                                        style={{ width: '100px', height: '15px' }}
                                    />
                                </span>
                            </div>
                        ))
                        ) : (
                            <p>식단에 항목을 추가하세요.</p>
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

// 컴포넌트의 PropTypes 정의
DialogMenu.propTypes = {
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

// 컴포넌트의 기본 속성값 정의
DialogMenu.defaultProps = {
    closable: true,
    width: 520,
    closeTimeoutMS: 150,
}

export default DialogMenu;

