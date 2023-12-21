import React from 'react'
import { Container, DoubleSidedImage } from 'components/shared'

const TrashNull = () => {
    return (
        <Container className="h-full">
            <div className="h-full flex flex-col items-center justify-center">
                <DoubleSidedImage
                    src="/img/others/welcome.png"
                    darkModeSrc="/img/others/welcome-dark.png"
                    alt="Access Denied!"
                />
                <div className="mt-6 text-center">
                    <h3 className="mb-2">감정을 모두 비워냈습니다!</h3>
                    <p className="text-base">
                        버릴 감정을 적어 주세요
                    </p>
                </div>
            </div>
        </Container>
    )
}

export default TrashNull
