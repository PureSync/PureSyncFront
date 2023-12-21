import {getCookie} from './cookie';

function parseLockToken(lockToken) {

    function remove(str, index, length) {
        return str.substring(0, index) + str.substring(index + length);
    }
    lockToken = remove(lockToken, 199, "01Kej11".length);
    lockToken = remove(lockToken, 122, "9YrH7".length);
    lockToken = remove(lockToken, 77, "Bus9712".length);
    lockToken = remove(lockToken, 58, "Spu935".length);

    return lockToken;
}

export function parseJwt(token) {
    if (token == "") return;
    try {
        let processedToken =  parseLockToken(token)
        const base64Payload = processedToken.split('.')[1];
        const payload = atob(base64Payload);
        return JSON.parse(payload);

    } catch (e) {
        console.log(e);
        console.error('JWT 디코딩 중 오류 발생:', e);
        return null;
    }
}

// JWT 토큰에서 memId와 memSeq 추출
export function getMemInfoFromToken() {
    const token = getCookie();
    const decodedToken = parseJwt(token);

    if (decodedToken) {
        const memId = decodedToken.memId;
        const memSeq = decodedToken.memSeq;
        const memEmail = decodedToken.memEmail;
        const memImg = decodedToken.memImg;

        const memberObject = {
            avatar: memImg,
            userName: memId,
            authority: ['user', 'admin'],
            email: memEmail
        };

        return memberObject;
    }

    return null;
}

export const memInfo = getMemInfoFromToken();
