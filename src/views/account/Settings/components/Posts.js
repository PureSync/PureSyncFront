import React, { useState, useEffect } from 'react'
import Table from 'components/ui/Table'
import { Loading } from 'components/shared'
import ActionLink from 'components/shared/ActionLink'
import { apiGetMyPosts } from 'services/AccountServices'

const { Tr, Th, Td, THead, TBody } = Table

const Posts = () => {
    const [postList, setPostList] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            await apiGetMyPosts()
                .then((response) => {
                    setPostList(response.data.data.postList);
                    setLoading(false);
                })
                .catch((err) => {console.log(err)});
        };

        fetchPosts();
    }, []); // 빈 배열을 전달하여 컴포넌트가 마운트될 때만 한 번 호출되도록 설정

    return (
        <Loading loading={loading}>
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
                </Table>
            </div>
        </Loading>
    );
}

export default Posts;