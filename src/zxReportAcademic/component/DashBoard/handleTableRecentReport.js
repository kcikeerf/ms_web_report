function handleTableRecentReport(reportList) {
    let modifiedData = {
        tHeader: [],
        tData: []
    };

    modifiedData.tHeader = ['测试', '时间'];

    reportList = reportList.slice(0, 3);
    for (let i in reportList) {
        let reportItem = reportList[i];
        let dataObj = {
            1: reportItem.paper_heading,
            2: reportItem.quiz_date
        };
        modifiedData.tData.push(dataObj);
    }

    return modifiedData;
}

export default handleTableRecentReport;