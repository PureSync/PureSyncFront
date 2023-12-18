
function setHeaderCookie() {
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

export default setHeaderCookie;