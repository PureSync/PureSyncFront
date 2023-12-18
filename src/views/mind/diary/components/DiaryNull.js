import React from 'react'
import { Container, DoubleSidedImage } from 'components/shared'

const DiaryNull = () => {
    return (
        <Container className="h-full">
            <div className="h-full flex flex-col items-center justify-center">
                <DoubleSidedImage
                    src="/img/others/pending-approval.png"
                    darkModeSrc="/img/others/pending-approval-dark.png"
                    alt="작성된 마음일기가 없습니다"
                />
                <div className="mt-6 text-center">
                    <h3 className="mb-2">작성된 마음일기가 없습니다</h3>
                    <p className="text-base">
                        새로운 마음일기를 작성해주세요
                    </p>
                </div>
            </div>
        </Container>
    )
}

export default DiaryNull
