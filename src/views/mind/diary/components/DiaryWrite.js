import React, { useEffect } from 'react'
import { Container, AdaptableCard } from 'components/shared'
import Editor from './Editor'

const DiaryWrite = () => {
    
    return (
        <Container>
            <AdaptableCard>
                <div className="max-w-[800px] mx-auto">
                    <div className="flex justify-between items-center mb-4">
                    </div>
                    <Editor />
                </div>
            </AdaptableCard>
        </Container>
    )
}

export default DiaryWrite
