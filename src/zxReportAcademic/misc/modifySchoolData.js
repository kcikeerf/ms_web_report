let config = require('zx-const')[process.env.NODE_ENV];
function modifySchoolData(reportType, data) {
    let modifySchoolData = {
        reportType:reportType,
        header: [],
        data: []
    };
    let tmHeader;
    if(reportType === config.REPORT_TYPE_PROJECT){
        tmHeader = ['学校名称','班级数量','参考人数','平均分','分化度'];
    }
    let label,classNum,lentStudent,averageScore,diffDegree;
    let tmpTableData = [];
    for(let i = 0; data.length; i++){
        label = data[i][1];
        classNum = 9;
        lentStudent = parseFloat(data[i][1].report_data.data.knowledge.base.pupil_number);
        averageScore = parseFloat(data[i][1].report_data.data.knowledge.base.weights_score_average);
        diffDegree = parseFloat(data[i][1].report_data.data.knowledge.base.diff_degree);

        tmpTableData.push(label);
        tmpTableData.push(classNum);
        tmpTableData.push(lentStudent);
        tmpTableData.push(averageScore.toFixed(0));
        tmpTableData.push(diffDegree.toFixed(0));
    }
    modifySchoolData.header = tmHeader;
    modifySchoolData.data = tmpTableData;

    return modifySchoolData;
}
export default modifySchoolData;