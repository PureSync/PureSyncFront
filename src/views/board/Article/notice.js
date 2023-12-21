import React from 'react'
import { Container, AdaptableCard } from 'components/shared'
import reducer from './store'
import { injectReducer } from 'store/index'
import { useLocation } from 'react-router-dom'
import useQuery from 'utils/hooks/useQuery'
import NoticeContent from './components/NoticeContent'

injectReducer('knowledgeBaseArticle', reducer)

const Notice = () => {
    
    const query = useQuery();
    const id = query.get('id')
    return (
        <Container>
            <AdaptableCard bodyClass="lg:flex gap-4">
                <div className="my-6 max-w-[800px] w-full mx-auto">
                    <NoticeContent articleId={id}  />
                    {/* <NoticeContent   /> */}
                </div>
                
            </AdaptableCard>
        </Container>
    )
}

export default Notice