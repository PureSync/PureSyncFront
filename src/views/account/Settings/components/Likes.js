import React, { useState, useEffect } from 'react'
import Table from 'components/ui/Table'
import { Loading } from 'components/shared'
import ActionLink from 'components/shared/ActionLink'
import { apiGetLikePosts } from 'services/AccountServices'

const { Tr, Th, Td, THead, TBody } = Table

const Likes = () => {
    const [likeList, setLikeList] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await apiGetLikePosts();
            setLikeList(response.data.data.likePostList);
            setLoading(false);
        };

        fetchPosts();
    }, []);

    return (
        <Loading loading={loading}>
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
                </Table>
            </div>
        </Loading>
    );
}

export default Likes;