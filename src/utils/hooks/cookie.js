function setCookie(token) {
    const LIMIT_DAY = 7
    const days = LIMIT_DAY;
    const oneDayBySec = 864e5;
    const expires = new Date( Date.now() + days * oneDayBySec). toUTCString();
    document.cookie=`access_token=${token}; expires=${expires}; path=/`;
}

function getCookie() {
    const cookies = document.cookie.split(';');
    let access_token = "";
    
    for (const cookie of cookies) {
        const [name, value] = cookie.trim().split('=');
        if (name == 'access_token') {
            access_token = value;
            break;
        }
    }
    return access_token;
}
  

export { setCookie, getCookie };