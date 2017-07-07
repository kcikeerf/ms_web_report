let config = require('zx-const')[process.env.NODE_ENV];

function handleReportLabel(reportType='') {
    switch(reportType) {
        case 'project':
            return '区域';
        case 'grade':
            return '年级';
        case 'klass':
            return '班级';
        case 'pupil':
            return '学生';
        default:
            return '';
    }
}

export default handleReportLabel;