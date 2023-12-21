import React, { useState, useEffect } from 'react'
import Table from 'components/ui/Table'
import { TableRowSkeleton } from 'components/shared'
import ActionLink from 'components/shared/ActionLink'
import { apiGetMyPosts } from 'services/AccountServices'
import Pagination from 'components/ui/Pagination'

const { Tr, Th, Td, THead, TBody } = Table

const Posts = () => {
    const [postList, setPostList] = useState({});
    const [loading, setLoading] = useState(true);
    const [number, setNumber] = useState(1);
    const [totalPages, setTotalPages] = useState(1);


    const onPaginationChange = (number) => {
        setLoading(true);
        apiGetMyPosts(number - 1)
            .then((res) => {
                setPostList(res.data.data.postList.content);
                setTotalPages(res.data.data.postList.totalPages);
                setLoading(false);
                setNumber(number);
            })
    }

    useEffect(() => {
        const fetchPosts = async () => {
            await apiGetMyPosts(number - 1)
                .then((res) => {
                    setPostList(res.data.data.postList.content);
                    setTotalPages(res.data.data.postList.totalPages);
                    setLoading(false);
                })
                .catch((err) => { console.log(err) });
        };

        fetchPosts();
    }, []); // 빈 배열을 전달하여 컴포넌트가 마운트될 때만 한 번 호출되도록 설정

    return (
        <>
            <div>
                <Table>
                    <THead>
                        <Tr>
                            <Th>글번호</Th>
                            <Th>제목</Th>
                            <Th>작성일시</Th>
                            <Th>좋아요</Th>
                        </Tr>
                    </THead>
                    {loading ? (
                        <TableRowSkeleton columns={5} rows={10} />
                    ) : (
                        <TBody>
                            {postList.length > 0 ? (
                                postList.map((post) => (
                                    <Tr key={post.boardSeq}>
                                        <Td>{post.boardSeq}</Td>
                                        <Td>
                                            <ActionLink to={`/board/view?id=${post.boardSeq}`}>{post.boardName}</ActionLink>
                                        </Td>
                                        <Td>{post.boardWdate}</Td>
                                        <Td>{post.boardLikescount}</Td>
                                    </Tr>
                                ))
                            ) : (
                                <Tr>
                                    <Td colSpan="4" className="text-center">게시물이 없습니다.</Td>
                                </Tr>
                            )}
                        </TBody>
                    )}
                </Table>
            </div>

            <div className='text-center mt-5'>
                <Pagination onChange={onPaginationChange} total={totalPages} />
            </div>
        </>
    );
}

export default Posts;