import $ from 'jquery';
import handleResponseError from './handleResponseError';
import {createCookie, getCookie, removeCookie} from 'zx-misc/handleCookie';
let config = require('zx-const')[process.env.NODE_ENV];

export function handlePaperList(component, loginMethod, paperListData, setState=false) {
    // let paperListApi = 'http://59.110.7.209:4000/api/v1.2/tests/download_able_list';
    let paperListApi = 'http://59.110.7.209:4000' + config.API_GET_DOWNLOAD_ABLE_LIST;
    let bindedUserListPromise = $.post(paperListApi, paperListData);
    bindedUserListPromise.done(function (response) {
        let newState = {
            loaded: true,
            loginMethod,
            // paperList:response.test_list
            paperList:[
                {
                    "name": "数学",
                    "report_url": "/reports_warehouse/tests/5875f4f1fa33185e8cbe7635/project/5875f4f1fa33185e8cbe7635/grade/817195942477299712/klass/837655874364243968/pupil/820881944802754560.json",
                    "uid": "5875f4f1fa33185e8cbe7635",
                    "subject":"shu_xue",
                    "subject_cn":"数学",
                },
                {
                    "name": "语文",
                    "report_url": "/reports_warehouse/tests/5875f4f1fa33185e8cbe7635/project/5875f4f1fa33185e8cbe7635/grade/817195942477299712/klass/837655874364243968/pupil/820881944802754560.json",
                    "uid": "5875f4f1fa33185e8cbe7635",
                    "subject":"yu_wen",
                    "subject_cn":"语文",
                },
                {
                    "name": "语文",
                    "report_url": "/reports_warehouse/tests/5875f4f1fa33185e8cbe7635/project/5875f4f1fa33185e8cbe7635/grade/817195942477299712/klass/837655874364243968/pupil/820881944802754560.json",
                    "uid": "5875f4f1fa33185e8cbe7635",
                    "subject":"yu_wen",
                    "subject_cn":"语文",
                },
                {
                    "name": "英语",
                    "report_url": "/reports_warehouse/tests/5875f4f1fa33185e8cbe7635/project/5875f4f1fa33185e8cbe7635/grade/817195942477299712/klass/837655874364243968/pupil/820881944802754560.json",
                    "uid": "5875f4f1fa33185e8cbe7635",
                    "subject":"ying_yu",
                    "subject_cn":"英语",
                },
                {
                    "name": "语文",
                    "report_url": "/reports_warehouse/tests/5875f4f1fa33185e8cbe7635/project/5875f4f1fa33185e8cbe7635/grade/817195942477299712/klass/837655874364243968/pupil/820881944802754560.json",
                    "uid": "5875f4f1fa33185e8cbe7635",
                    "subject":"yu_wen",
                    "subject_cn":"语文",
                },
                {
                    "name": "英语",
                    "report_url": "/reports_warehouse/tests/5875f4f1fa33185e8cbe7635/project/5875f4f1fa33185e8cbe7635/grade/817195942477299712/klass/837655874364243968/pupil/820881944802754560.json",
                    "uid": "5875f4f1fa33185e8cbe7635",
                    "subject":"ying_yu",
                    "subject_cn":"英语",
                }
            ]
        };
        component.setState(newState);
    }.bind(this));
    bindedUserListPromise.fail(function (errorResponse) {
        handleResponseError(component ,errorResponse);
    }.bind(this));
}

