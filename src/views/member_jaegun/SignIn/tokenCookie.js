function setTokenCookie(token){

    console.log(token);
    const LIMIT_DAY = 7
    const days = LIMIT_DAY;
    const oneDayBySec = 864e5;
    const expires = new Date( Date.now() + days * oneDayBySec). toUTCString();
    document.cookie=`token=${token.body.access_token}; expires=${expires}; path=/`;
}

export default setTokenCookie;