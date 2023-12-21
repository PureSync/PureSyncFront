import React, { useState, useEffect } from 'react'
import { AdaptableCard } from 'components/shared'
// import BoardListHeader from './components/BoardListHeader'
import Table from 'components/ui/Table'
import { Loading, TextBlockSkeletonm, TableRowSkeleton } from 'components/shared'
import ActionLink from 'components/shared/ActionLink'
import { apiGetQnaArticleList} from 'services/QnaBoardService'
import Pagination from 'components/ui/Pagination'


const { Tr, Th, Td, THead, TBody } = Table


const Customers = () => {
    const [qnaboardList, setQnaboardList] = useState({});
    const [loading, setLoading] = useState(true);
    const [number, setNumber] = useState(0);
    const [totalPages, setTotalPages] = useState(1);


    const onPaginationChange = (number) => {
        setLoading(true);
        apiGetQnaArticleList(number - 1)
            .then((res) => {
                setQnaboardList(res.data.data.qnaBoardPage);
                setTotalPages(res.data.data.totalPages);
                setLoading(false);
                setNumber(number);
            })
    }

    useEffect(() => {
        const fetchPosts = async () => {
            await apiGetQnaArticleList(number - 1)
                .then((res) => {
                    setQnaboardList(res.data.data.qnaBoardPage);
                    setTotalPages(res.data.data.totalPages);
                    setLoading(false);
                })

        }

        fetchPosts();
    }, [number]);


    return (
        <>
            <AdaptableCard className="h-full" bodyClass="h-full">
                <BoardListHeader />


                <Table>
                    <THead>
                        <Tr>
                            <Th>글번호</Th>
                            <Th>제목</Th>
                            <Th>작성자</Th>
                            <Th>작성일시</Th>
                        </Tr>
                    </THead>
                    {loading ? (
                        <TableRowSkeleton columns={5} rows={10} />
                    ) : (
                        <TBody>
                            {qnaboardList.length > 0 ? (
                                qnaboardList.map((qnaboard) => (
                                    <Tr key={qnaboard.qnaBoardSeq}>
                                        <Td>{qnaboard.qnaBoardSeq}</Td>
                                        <Td>
                                            {qnaboard.qnaBoardStatus === 2 ? (
                                                <span className="deleted-message">관리자에 의해 삭제된 게시글입니다</span>
                                            ) : (
                                                <ActionLink to={`/qnaboard/view?id=${qnaboard.qnaBoardSeq}`}>{qnaboard.qnaBoardName}</ActionLink>
                                            )}
                                        </Td>
                                        <Td>{qnaboard.memId}</Td>
                                        <Td>{qnaboard.qnaBoardWdate}</Td>
                                
                                    </Tr>
                                ))
                            ) : (
                                <Tr>
                                    <Td colSpan="5" className="text-center">게시물이 없습니다.</Td>
                                </Tr>
                            )}
                        </TBody>
                    )}
                </Table>

                <div className='text-center mt-5'>
                    <Pagination onChange={onPaginationChange} total={totalPages} />
                </div>

            </AdaptableCard>
        </>
    )
}

export default Customers