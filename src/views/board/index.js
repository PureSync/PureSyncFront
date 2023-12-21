import React, { useState, useEffect } from 'react'
import { AdaptableCard } from 'components/shared'
import BoardListHeader from './components/BoardListHeader'
import Table from 'components/ui/Table'
import { Loading, TextBlockSkeletonm, TableRowSkeleton } from 'components/shared'
import ActionLink from 'components/shared/ActionLink'
import { apiGetArticleList, apiGetNotice } from 'services/BoardService'
import Pagination from 'components/ui/Pagination'
import { HiOutlineSpeakerphone } from 'react-icons/hi'
import { Link } from 'react-router-dom'

const { Tr, Th, Td, THead, TBody } = Table


const Customers = () => {
    const [boardList, setboardList] = useState({});
    const [loading, setLoading] = useState(true);
    const [number, setNumber] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [noticeList, setNoticeList] = useState({});

    const onPaginationChange = (number) => {
        setLoading(true);
        apiGetArticleList(number - 1)
            .then((res) => {
                setboardList(res.data.data.boardPage);
                setTotalPages(res.data.data.totalPages);
                setLoading(false);
                setNumber(number);
            })
    }

    useEffect(() => {
        const fetchPosts = async () => {
            await apiGetArticleList(number - 1)
                .then((res) => {
                    setboardList(res.data.data.boardPage);
                    setTotalPages(res.data.data.totalPages);
                    setLoading(false);
                })


            await apiGetNotice()
                .then((res) => {

                    setNoticeList(res.data.data.noticeList)
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
                            <Th>좋아요</Th>
                        </Tr>
                    </THead>
                    {loading ? (
                        <TableRowSkeleton columns={5} rows={10} />
                    ) : (
                        <TBody>
                            {noticeList.length > 0 ? (
                                noticeList.map((notice) => {
                                    console.log(notice);
                                    return (

                                        <Tr key={notice.notice_seq}>
                                            <Td >
                                                <span className="flex items-center rounded-full gap-1">
                                                    <span
                                                        className='text-red-600 bg-red-100 dark:text-red-100 dark:bg-red-500/20 p-1 avatar-circle'
                                                    >
                                                        <HiOutlineSpeakerphone />
                                                    </span>
                                                </span>
                                            </Td>
                                            <Td >
                                            <ActionLink to={`/notice/view?id=${notice.notice_seq}`}>{notice.notice_title}</ActionLink>
                                                    {/* <Link to={{ PathNm`/notice/view?id=${notice.notice_seq}`, data = { notice }}  >{notice.notice_title}</Link> */}
                                            </Td>
                                            <Td >{notice.notice_writer}</Td>
                                            <Td >{notice.notice_wdate}</Td>
                                            <Td>-</Td>
                                        </Tr>
                                    )
                                })
                            ) : (
                                <Tr>
                                    <Td colSpan="5" className="text-center">게시물이 없습니다.</Td>
                                </Tr>)
                            }

                            {boardList.length > 0 ? (
                                boardList.map((board) => (
                                    <Tr key={board.boardSeq}>
                                        <Td>{board.boardSeq}</Td>
                                        <Td>
                                            {board.boardStatus === 2 ? (
                                                <span className="deleted-message">관리자에 의해 삭제된 게시글입니다</span>
                                            ) : (
                                                <ActionLink to={`/board/view?id=${board.boardSeq}`}>{board.boardName}</ActionLink>
                                            )}
                                        </Td>
                                        <Td>{board.memId}</Td>
                                        <Td>{board.boardWdate}</Td>
                                        <Td>{board.boardLikescount}</Td>
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