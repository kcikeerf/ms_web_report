import {createCookie, getCookie, removeCookie} from 'zx-misc/handleCookie';
let config = require('zx-const')[process.env.NODE_ENV];

function handleResponseError(component, errorResponse) {
    let repsonseStatus = errorResponse.status;
    if (repsonseStatus) {
        if (repsonseStatus === 401 || repsonseStatus === 400 || repsonseStatus === 403) {
            for (let i in config.COOKIE) {
                removeCookie(config.COOKIE[i]);
            }
            component.context.router.push('/login');
        }
    }
    else {

    }
}

export default handleResponseError;