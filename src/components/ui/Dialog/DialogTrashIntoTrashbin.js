import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import CloseButton from '../CloseButton';
import { motion } from 'framer-motion';
import { theme } from 'twin.macro';
import useWindowSize from '../hooks/useWindowSize';
import { Notification, toast } from 'components/ui'
import { DndContext } from '@dnd-kit/core';
import { useDraggable } from '@dnd-kit/core';
import { useDroppable } from '@dnd-kit/core';
import { apiDeleteTrash } from 'services/MindTrashService';

export function Draggable(props) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: 'draggable',
    });
    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    } : undefined;


    return (
        <button ref={setNodeRef} style={style} {...listeners} {...attributes}>
            {props.children}
        </button>
    );
}

export function Droppable(props) {
    const { isOver, setNodeRef } = useDroppable({
        id: 'droppable',
    });
    
    const defaultStyle = {
        transition: 'box-shadow 0.3s',
    };

    const highlightedStyle = {
        boxShadow: isOver ? '0 0 10px 5px #e13c63' : 'none',
    };

    const combinedStyle = {
        ...defaultStyle,
        ...highlightedStyle,
    };

    return (
        <div ref={setNodeRef} style={combinedStyle}>
            {props.children}
        </div>
    );
}

const DialogTrashIntoTrashbin = (props) => {
    // 현재 창 크기를 가져오는 커스텀 훅 사용
    const currentSize = useWindowSize();

    const {
        goRegister,
        tsSeq,
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

    //토스트
    const openNotification = (placement) => {
        toast.push(<Notification type="success" title="감정하나를 비워냈습니다" />, {
            placement: placement,
        })
    }

    // 닫기 버튼 클릭 이벤트 핸들러
    const onCloseClick = (e) => {
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

    const [isDropped, setIsDropped] = useState(false);
    const draggableMarkup = (
        <div className='flex align-middle justify-center'>
           <Draggable>
            <div>
           <img src='/img/mind/trash.svg' width={100} height={100} />
           </div>
           </Draggable>
         </div>
       );

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
                <h5>버릴 감정을 쓰레기통으로 드래그해서 버려 주세요</h5>
                <DndContext onDragEnd={handleDragEnd}>
                    <div className="grid grid-cols-2 mt-10" >
                    {!isDropped ? draggableMarkup : null}
                    <Droppable>
                        <div>
                       <img src='/img/mind/trashbin.svg' width={300} height={300} />
                       </div>
                    </Droppable>
                    </div>
                </DndContext>
            </motion.div>
        </Modal>
    );

    function handleDragEnd(event) {
        if (event.over && event.over.id === 'droppable') {
          setIsDropped(true);

          //쓰레기 지우는 axios불러야함
            apiDeleteTrash(tsSeq)
            .then((res) => {
                openNotification('top-center');
                onClose();
                goRegister();
            })
            .catch((res) => {})
        }
      }
}

// 컴포넌트의 PropTypes 정의
DialogTrashIntoTrashbin.propTypes = {
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
DialogTrashIntoTrashbin.defaultProps = {
    closable: true,
    width: 520,
    height: 400,
    closeTimeoutMS: 150,
}

export default DialogTrashIntoTrashbin;

