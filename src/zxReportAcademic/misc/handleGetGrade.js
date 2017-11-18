export default function handleGetGrade(grade) {
    let gradeFlag;
    switch (grade) {
        case '一年级':
            gradeFlag = true;
            break;
        case '二年级':
            gradeFlag = true;
            break;
        case '三年级':
            gradeFlag = true;
            break;
        case '四年级':
            gradeFlag = true;
            break;
        case '五年级':
            gradeFlag = true;
            break;
        case '六年级':
            gradeFlag = true;
            break;
        case '七年级':
            gradeFlag = true;
            break;
        case '八年级':
            gradeFlag = true;
            break;
        case '九年级':
            gradeFlag = true;
            break;
        default:
            gradeFlag = false;
            break;
    }

    return gradeFlag;
}