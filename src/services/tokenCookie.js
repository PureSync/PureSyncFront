function setTokenCookie(token){

    const LIMIT_DAY = 7
    const days = LIMIT_DAY;
    const oneDayBySec = 864e5;
    const expires = new Date( Date.now() + days * oneDayBySec). toUTCString();
    document.cookie=`access_token=${token}; expires=${expires}; path=/`;
}

export default setTokenCookie;