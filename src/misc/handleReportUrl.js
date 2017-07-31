import $ from 'jquery';
let config = require('zx-const')[process.env.NODE_ENV];

export function handleParseReportUrl(reportUrl) {
    reportUrl = reportUrl.substring(reportUrl.indexOf('/tests') + 1);
    let reportUrlArray = reportUrl.split('/');
    let properties = [], ids = [], ext;
    for (let i in reportUrlArray) {
        let reportUrlArrayItem = reportUrlArray[i];
        if (i == (reportUrlArray.length-1)) {
            reportUrlArrayItem = reportUrlArrayItem.split('.');
            ext = reportUrlArrayItem[1].split('=')[1];
            reportUrlArrayItem = reportUrlArrayItem[0];
        }

        if (i % 2 !== 0) {
            ids.push(reportUrlArrayItem);
        }
        else {
            properties.push(reportUrlArrayItem);
        }
    }
    let params={};
    for (let i in properties) {
        let property = properties[i];
        let id = ids[i];
        params[property] = id;
    }
    params.ext = ext;

    return $.param(params);
}

export function handleAssembleReportUrl(queryObj) {
    if (!queryObj) {
        return null;
    }
    let queryArray = [];
    if (queryObj.tests) {
        queryArray.push('tests');
        queryArray.push(queryObj.tests);
    }
    if (queryObj.project) {
        queryArray.push('project');
        queryArray.push(queryObj.project);
    }
    if (queryObj.grade) {
        queryArray.push('grade');
        queryArray.push(queryObj.grade);
    }
    if (queryObj.klass) {
        queryArray.push('klass');
        queryArray.push(queryObj.klass);
    }
    if (queryObj.pupil) {
        queryArray.push('pupil');
        queryArray.push(queryObj.pupil);
    }
    return '/reports_warehouse/' + queryArray.join('/') + '.json';
}