import React, { useState, useEffect } from 'react'
import Table from 'components/ui/Table'
import { TableRowSkeleton } from 'components/shared'
import ActionLink from 'components/shared/ActionLink'
import { apiGetLikePosts } from 'services/AccountServices'
import Pagination from 'components/ui/Pagination'

const { Tr, Th, Td, THead, TBody } = Table

const Likes = () => {
    const [likeList, setLikeList] = useState({});
    const [loading, setLoading] = useState(true);
    const [number, setNumber] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const onPaginationChange = (number) => {
        setLoading(true);
        apiGetLikePosts(number - 1)
            .then((res) => {
                setLikeList(res.data.data.likePostList.content);
                setTotalPages(res.data.data.likePostList.totalPages);
                setLoading(false);
                setNumber(number);
            })
    }

    useEffect(() => {
        const fetchPosts = async () => {
            await apiGetLikePosts(number - 1)
                .then((res) => {
                    setLikeList(res.data.data.likePostList.content);
                    setLoading(false);
                })
                .catch((err) => {
                    console.log(err);
                });
        };

        fetchPosts();
    }, []);

    return (
        <div>
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
                        {likeList.length > 0 ? (
                            likeList.map((post) => (
                                <Tr key={post.boardSeq}>
                                    <Td>{post.boardSeq}</Td>
                                    <Td>
                                        <ActionLink to={`/board/view?id=${post.boardSeq}`}>{post.boardName}</ActionLink>
                                    </Td>
                                    <Td>{post.memId}</Td>
                                    <Td>{post.boardWdate}</Td>
                                    <Td>{post.boardLikescount}</Td>
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
        </div>
    );
}

export default Likes;