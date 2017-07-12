function removeCookie(cname) {
    let value = '';
    let days = -1;
    let date, expires;
    if (days) {
        date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = '; expires=' + date.toUTCString();
    }
    else {
        expires = '';
    }
    document.cookie = cname + '=' + value + expires + '; path=/';
}

export default removeCookie;