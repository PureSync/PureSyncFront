const getCookie = (name) => {
    const cookies = document.cookie;

    const cookieArray = cookies.split(';');
  
    for (let i = 0; i < cookieArray.length; i++) {
      const cookie = cookieArray[i].trim();
  
      if (cookie.indexOf(name + '=') === 0) {
        return cookie.substring(name.length + 1, cookie.length);
      }
    }
  
    return null;
  };
  
export default getCookie;