import getHeaderCookie from './getHeaderCookie';

export function parseJwt(token) {
    try {
        const base64Payload = token.split('.')[1];
        const payload = atob(base64Payload);
        return JSON.parse(payload);
    } catch (e) {
        console.error('JWT 디코딩 중 오류 발생:', e);
        return null;
    }
}

// JWT 토큰에서 memId와 memSeq 추출
export function getMemInfoFromToken() {
    const token = getHeaderCookie(); 
    const decodedToken = parseJwt(token); 

    if (decodedToken) {
        const memId = decodedToken.memId;
        const memSeq = decodedToken.memSeq;
        const memEmail = decodedToken.memEmail; 

        return { memId, memSeq, memEmail};
    }

    return null;
}

export const memInfo = getMemInfoFromToken();
if (memInfo) {
    console.log('memId:', memInfo.memId, 'memSeq:', memInfo.memSeq, 'memEmail:',memInfo.memEmail);
}

