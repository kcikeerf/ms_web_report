let general = {
    // API version
    API_VERSION: '/api/v1.2',

    // 获取access token的api
    API_LOGIN: '/oauth/token',

    // 绑定用户
    API_BINDING_USER:'/api/v1.2/users/bind',
    //解除用户
    API_UNBINDING_USER:'/api/v1.2/users/unbind',

    // 获取用户信息
    API_GET_USER_INFO: '/api/v1.2/users/get_info',
    // 获取绑定的用户列表
    API_GET_BINDED_USERS: '/api/v1.2/users/get_binded_users',
    // 获得学业报告列表
    API_GET_REPORT_LIST_ACADEMIC: '/api/v1.2/reports/list',
    // 获取班级列表
    API_KLASS_LIST: '/api/v1.2/reports/klass_list',

    // 获取项目报告
    API_GET_REPORT_PROJECT: '/api/v1.2/reports/project',
    // 获取年级报告
    API_GET_REPORT_GRADE: '/api/v1.2/reports/grade',
    // 获取班级报告
    API_GET_REPORT_KLASS: '/api/v1.2/reports/klass',
    // 获取学生报告
    API_GET_REPORT_PUPIL: '/api/v1.2/reports/pupil',

    // 获取单题信息
    API_QUIZS_DETAILS: '/api/v1.2/quizs/detail',
    // 获取指标推送的题目
    API_GET_RELATED_QUIZS: '/api/v1.2/checkpoints/get_related_quizs',

    // 报告类型
    REPORT_TYPE_PROJECT_LABEL: '区域报告',
    REPORT_TYPE_PROJECT: 'project',
    REPORT_TYPE_GRADE_LABEL: '学校报告',
    REPORT_TYPE_GRADE: 'grade',
    REPORT_TYPE_KLASS_LABEL: '班级报告',
    REPORT_TYPE_KLASS: 'klass',
    REPORT_TYPE_PUPIL_LABEL: '学生报告',
    REPORT_TYPE_PUPIL: 'pupil',

    // 报告科目
    REPORT_CHINESE: '语文',
    REPORT_MATH: '数学',
    REPORT_ENGLISH: '英语',

    // 用户角色
    USER_ROLE_AREA_ADMINISTRATOR_LABEL: '区域管理员',
    USER_ROLE_AREA_ADMINISTRATOR: 'area_administrator',
    USER_ROLE_TENANT_ADMINISTRATOR_LABEL: '租户管理员',
    USER_ROLE_TENANT_ADMINISTRATOR: 'tenant_administrator',
    USER_ROLE_PROJECT_ADMINISTRATOR_LABEL: '项目管理员',
    USER_ROLE_PROJECT_ADMINISTRATOR: 'project_administrator',
    USER_ROLE_TEACHER_LABEL: '老师',
    USER_ROLE_TEACHER: 'teacher',
    USER_ROLE_PUPIL_LABEL: '学生',
    USER_ROLE_PUPIL: 'pupil',
};

let development = {
    ...general,

    // 服务器地址
    API_DOMAIN: 'http://59.110.7.209:4500',

    // 报告链接
    URL_REPORT_ACADEMIC_STUDENT: '/html/zx-report-academic/#/student',
    URL_REPORT_ACADEMIC_CLASS: '/html/zx-report-academic/#/class',
    URL_REPORT_ACADEMIC_GRADE: '/html/zx-report-academic/#/school',
    URL_REPORT_ACADEMIC_PROJECT: '/html/zx-report-academic/#/project',
    URL_REPORT_OTHER_STUDENT: '/build/html/report-page/others/multiIntelligence',
};

let production = {
    ...general,

    // 服务器地址
    API_DOMAIN: 'http://59.110.7.209:4500',

    // 报告链接
    URL_REPORT_ACADEMIC_STUDENT: '/zx-report-academic/#/student',
    URL_REPORT_ACADEMIC_CLASS: '/zx-report-academic/#/class',
    URL_REPORT_ACADEMIC_GRADE: '/zx-report-academic/#/school',
    URL_REPORT_ACADEMIC_PROJECT: '/zx-report-academic/#/project',
    URL_REPORT_OTHER_STUDENT: '/apps/report-page/others/multiIntelligence',
};

module.exports = {
    development: development,
    production: production
};