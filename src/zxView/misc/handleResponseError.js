import {createCookie, getCookie, removeCookie} from 'zx-misc/handleCookie';
let config = require('zx-const')[process.env.NODE_ENV];

function handleResponseError(component, errorResponse) {
    let repsonseStatus = errorResponse.responseStatus;
    let repsonseJSON = errorResponse.responseJSON;
    if (repsonseStatus || repsonseJSON) {
        let code = repsonseJSON.code;
        if (
            repsonseStatus === 400 ||
            repsonseStatus === 401 ||
            repsonseStatus === 403 ||
            code === 'w20000' || // 网络异常
            code === 'w21004' || // 该账号不能进行以下操作，请使用主账号进行操作
            code === 'e41100' || // Access Token 过期
            code === 'e41101' || // Access Token 无效
            code === 'e41101' // Access Token 已被注销
        ) {
            for (let i in config.COOKIE) {
                removeCookie(config.COOKIE[i]);
            }
            component.context.router.push('/login');
        }
    }
    else {
        for (let i in config.COOKIE) {
            removeCookie(config.COOKIE[i]);
        }
        component.context.router.push('/login');
    }
}

export default handleResponseError;