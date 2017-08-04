export function createCookie(name, value, days) {
    let date, expires;
    if (days) {
        date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = '; expires=' + date.toUTCString();
    }
    else {
        expires = '';
    }
    document.cookie = name + '=' + value + expires + '; path=/';
}

export function getCookie(cname) {
    let name = cname + '=';
    let ca = document.cookie.split(';');
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length,c.length);
        }
    }
    return '';
}

export function removeCookie(cname) {
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