let general = {
    // School view
    API_GET_BINDED_USERS: '/wx/auths/get_binded_users',
    API_CHECK_BIND: '/wx/auths/check_bind',
    API_BIND_USER: '/wx/bind',
    API_UNBIND_USER: '/wx/auths/unbind',
    API_GET_REPORT_LIST_ACADEMIC: '/api/wx/v1.1/reports/list',
    API_GET_REPORT_LIST_OTHER: '/api/wx/v1.1/reports/list2',
    API_GET_REPORT_DETAILS: '/wx/reports/get_pupil_report',
    API_GRADE_KLASS_LIST: '/api/wx/v1.1/tenants/grade_klass_list',
    API_GRADE_PUPIL_LIST: '/api/wx/v1.1/tenants/klass_pupil_list',
    API_QUIZS_DETAILS: '/api/wx/v1.1/quizs/detail',
    API_KLASS_LIST: '/api/wx/v1.1/reports/klass_list',

    API_GET_REPORT_PUPIL: '/api/wx/v1.1/reports/pupil',
    API_GET_REPORT_KLASS: '/api/wx/v1.1/reports/klass',
    API_GET_REPORT_GRADE: '/api/wx/v1.1/reports/grade',
    API_GET_REPORT_PROJECT: '/api/wx/v1.1/reports/project',

    // Reference
    REFERENCE_PROJECT: 'project',
    REFERENCE_PROJECT_LABEL: '整体',
    REFERENCE_GRADE: 'grade',
    REFERENCE_GRADE_LABEL: '年级',
    REFERENCE_CLASS: 'class',
    REFERENCE_CLASS_LABEL: '班级',

    // Report type
    REPORT_TYPE_PUPIL: 'pupil',
    REPORT_TYPE_KLASS: 'klass',
    REPORT_TYPE_GRADE: 'grade',
    REPORT_TYPE_PROJECT: 'project',

    // Report subject
    REPORT_CHINESE: '语文',
    REPORT_MATH: '数学',
    REPORT_ENGLISH: '英语',

    // User Role
    USER_ROLE_PUPIL: 'pupil',
    USER_ROLE_TEACHER: 'teach',
    USER_ROLE_TENANT_ADMINISTRATOR: 'teacher_administrator',
    USER_ROLE_AREA_ADMINISTRATOR: 'area_administrator',

    LOGO: '甄学'
};

let development = {
    // WeChat Test username and OpenID
    TEST_USER_NAME: 'fa89114219116sy',
    TEST_WECHAT_OPENID: 'oQgmFwqpZQYhfL8WXIKkqGJ_k104',

    // School view
    API_DOMAIN: 'http://latest.k12ke.com',
    //API_DOMAIN: 'http://59.110.7.209:4100',

    // Report URL
    URL_REPORT_ACADEMIC_STUDENT: '/zx-report-academic/#/student',
    URL_REPORT_ACADEMIC_CLASS: '/zx-report-academic/#/class',
    URL_REPORT_ACADEMIC_GRADE: '/zx-report-academic/#/school',
    URL_REPORT_ACADEMIC_PROJECT: '/zx-report-academic/#/project',
    URL_REPORT_OTHER_STUDENT: '/build/html/report-page/others/multiIntelligence',

    API_GET_BINDED_USERS: general.API_GET_BINDED_USERS,
    API_CHECK_BIND: general.API_CHECK_BIND,
    API_BIND_USER: general.API_BIND_USER,
    API_UNBIND_USER: general.API_UNBIND_USER,
    API_GET_REPORT_LIST_ACADEMIC: general.API_GET_REPORT_LIST_ACADEMIC,
    API_GET_REPORT_LIST_OTHER: general.API_GET_REPORT_LIST_OTHER,
    API_GET_REPORT_DETAILS: general.API_GET_REPORT_DETAILS,
    API_GRADE_KLASS_LIST: general.API_GRADE_KLASS_LIST,
    API_GRADE_PUPIL_LIST: general.API_GRADE_PUPIL_LIST,
    API_QUIZS_DETAILS: general.API_QUIZS_DETAILS,
    API_KLASS_LIST: general.API_KLASS_LIST,

    API_GET_REPORT_PUPIL: general.API_GET_REPORT_PUPIL,
    API_GET_REPORT_KLASS: general.API_GET_REPORT_KLASS,
    API_GET_REPORT_GRADE: general.API_GET_REPORT_GRADE,
    API_GET_REPORT_PROJECT: general.API_GET_REPORT_PROJECT,

    // Reference
    REFERENCE_PROJECT: general.REFERENCE_PROJECT,
    REFERENCE_PROJECT_LABEL: general.REFERENCE_PROJECT_LABEL,
    REFERENCE_GRADE: general.REFERENCE_GRADE,
    REFERENCE_GRADE_LABEL: general.REFERENCE_GRADE_LABEL,
    REFERENCE_CLASS: general.REFERENCE_CLASS,
    REFERENCE_CLASS_LABEL: general.REFERENCE_CLASS_LABEL,

    // Report type
    REPORT_TYPE_PUPIL: general.REPORT_TYPE_PUPIL,
    REPORT_TYPE_KLASS: general.REPORT_TYPE_KLASS,
    REPORT_TYPE_GRADE: general.REPORT_TYPE_GRADE,
    REPORT_TYPE_PROJECT: general.REPORT_TYPE_PROJECT,

    // Report subject
    REPORT_CHINESE: general.REPORT_CHINESE,
    REPORT_MATH: general.REPORT_MATH,
    REPORT_ENGLISH: general.REPORT_ENGLISH,

    // User Role
    USER_ROLE_PUPIL: general.USER_ROLE_PUPIL,
    USER_ROLE_TEACHER: general.USER_ROLE_TEACHER,
    USER_ROLE_TENANT_ADMINISTRATOR: general.USER_ROLE_TENANT_ADMINISTRATOR,
    USER_ROLE_AREA_ADMINISTRATOR: general.USER_ROLE_AREA_ADMINISTRATOR,

    LOGO: general.LOGO
};

let test = {
    // WeChat Test username and OpenID
    TEST_USER_NAME: 'fa89114219116sy',
    TEST_WECHAT_OPENID: 'oQgmFwqpZQYhfL8WXIKkqGJ_k104',

    // School view
    API_DOMAIN: 'http://latest.k12ke.com',
    //API_DOMAIN: 'http://59.110.7.209:4100', // 测试服务器

    // Report URL
    URL_REPORT_ACADEMIC_STUDENT: '/zx-report-academic/#/student',
    URL_REPORT_ACADEMIC_CLASS: '/zx-report-academic/#/class',
    URL_REPORT_ACADEMIC_GRADE: '/zx-report-academic/#/school',
    URL_REPORT_ACADEMIC_PROJECT: '/zx-report-academic/#/project',
    URL_REPORT_OTHER_STUDENT: '/build/html/report-page/others/multiIntelligence',

    API_GET_BINDED_USERS: general.API_GET_BINDED_USERS,
    API_CHECK_BIND: general.API_CHECK_BIND,
    API_BIND_USER: general.API_BIND_USER,
    API_UNBIND_USER: general.API_UNBIND_USER,
    API_GET_REPORT_LIST_ACADEMIC: general.API_GET_REPORT_LIST_ACADEMIC,
    API_GET_REPORT_LIST_OTHER: general.API_GET_REPORT_LIST_OTHER,
    API_GET_REPORT_DETAILS: general.API_GET_REPORT_DETAILS,
    API_GRADE_KLASS_LIST: general.API_GRADE_KLASS_LIST,
    API_GRADE_PUPIL_LIST: general.API_GRADE_PUPIL_LIST,
    API_QUIZS_DETAILS: general.API_QUIZS_DETAILS,
    API_KLASS_LIST: general.API_KLASS_LIST,

    API_GET_REPORT_PUPIL: general.API_GET_REPORT_PUPIL,
    API_GET_REPORT_KLASS: general.API_GET_REPORT_KLASS,
    API_GET_REPORT_GRADE: general.API_GET_REPORT_GRADE,
    API_GET_REPORT_PROJECT: general.API_GET_REPORT_PROJECT,

    // Reference
    REFERENCE_PROJECT: general.REFERENCE_PROJECT,
    REFERENCE_PROJECT_LABEL: general.REFERENCE_PROJECT_LABEL,
    REFERENCE_GRADE: general.REFERENCE_GRADE,
    REFERENCE_GRADE_LABEL: general.REFERENCE_GRADE_LABEL,
    REFERENCE_CLASS: general.REFERENCE_CLASS,
    REFERENCE_CLASS_LABEL: general.REFERENCE_CLASS_LABEL,

    // Report type
    REPORT_TYPE_PUPIL: general.REPORT_TYPE_PUPIL,
    REPORT_TYPE_KLASS: general.REPORT_TYPE_KLASS,
    REPORT_TYPE_GRADE: general.REPORT_TYPE_GRADE,
    REPORT_TYPE_PROJECT: general.REPORT_TYPE_PROJECT,

    // Report subject
    REPORT_CHINESE: general.REPORT_CHINESE,
    REPORT_MATH: general.REPORT_MATH,
    REPORT_ENGLISH: general.REPORT_ENGLISH,

    // User Role
    USER_ROLE_PUPIL: general.USER_ROLE_PUPIL,
    USER_ROLE_TEACHER: general.USER_ROLE_TEACHER,
    USER_ROLE_TENANT_ADMINISTRATOR: general.USER_ROLE_TENANT_ADMINISTRATOR,
    USER_ROLE_AREA_ADMINISTRATOR: general.USER_ROLE_AREA_ADMINISTRATOR,

    LOGO: general.LOGO
};

let production = {
    // School view
    API_DOMAIN: 'http://www.k12ke.com',

    // Report URL
    URL_REPORT_ACADEMIC_STUDENT: '/zx-report-academic/#/student',
    URL_REPORT_ACADEMIC_CLASS: '/zx-report-academic/#/class',
    URL_REPORT_ACADEMIC_GRADE: '/zx-report-academic/#/school',
    URL_REPORT_ACADEMIC_PROJECT: '/zx-report-academic/#/project',
    URL_REPORT_OTHER_STUDENT: '/apps/report-page/others/multiIntelligence',

    API_GET_BINDED_USERS: general.API_GET_BINDED_USERS,
    API_CHECK_BIND: general.API_CHECK_BIND,
    API_BIND_USER: general.API_BIND_USER,
    API_UNBIND_USER: general.API_UNBIND_USER,
    API_GET_REPORT_LIST_ACADEMIC: general.API_GET_REPORT_LIST_ACADEMIC,
    API_GET_REPORT_LIST_OTHER: general.API_GET_REPORT_LIST_OTHER,
    API_GET_REPORT_DETAILS: general.API_GET_REPORT_DETAILS,
    API_GRADE_KLASS_LIST: general.API_GRADE_KLASS_LIST,
    API_GRADE_PUPIL_LIST: general.API_GRADE_PUPIL_LIST,
    API_QUIZS_DETAILS: general.API_QUIZS_DETAILS,
    API_KLASS_LIST: general.API_KLASS_LIST,

    API_GET_REPORT_PUPIL: general.API_GET_REPORT_PUPIL,
    API_GET_REPORT_KLASS: general.API_GET_REPORT_KLASS,
    API_GET_REPORT_GRADE: general.API_GET_REPORT_GRADE,
    API_GET_REPORT_PROJECT: general.API_GET_REPORT_PROJECT,

    // Reference
    REFERENCE_PROJECT: general.REFERENCE_PROJECT,
    REFERENCE_PROJECT_LABEL: general.REFERENCE_PROJECT_LABEL,
    REFERENCE_GRADE: general.REFERENCE_GRADE,
    REFERENCE_GRADE_LABEL: general.REFERENCE_GRADE_LABEL,
    REFERENCE_CLASS: general.REFERENCE_CLASS,
    REFERENCE_CLASS_LABEL: general.REFERENCE_CLASS_LABEL,

    // Report type
    REPORT_TYPE_PUPIL: general.REPORT_TYPE_PUPIL,
    REPORT_TYPE_KLASS: general.REPORT_TYPE_KLASS,
    REPORT_TYPE_GRADE: general.REPORT_TYPE_GRADE,
    REPORT_TYPE_PROJECT: general.REPORT_TYPE_PROJECT,

    // Report subject
    REPORT_CHINESE: general.REPORT_CHINESE,
    REPORT_MATH: general.REPORT_MATH,
    REPORT_ENGLISH: general.REPORT_ENGLISH,

    // User Role
    USER_ROLE_PUPIL: general.USER_ROLE_PUPIL,
    USER_ROLE_TEACHER: general.USER_ROLE_TEACHER,
    USER_ROLE_TENANT_ADMINISTRATOR: general.USER_ROLE_TENANT_ADMINISTRATOR,
    USER_ROLE_AREA_ADMINISTRATOR: general.USER_ROLE_AREA_ADMINISTRATOR,

    LOGO: general.LOGO
};

module.exports = {
    test: test,
    development: development,
    production: production
};