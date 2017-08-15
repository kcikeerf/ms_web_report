let general = {
    // API version
    API_VERSION: '/api/v1.2',
    // 获取access token的api
    API_LOGIN: '/oauth/token',
    /*
     ================
     登录的方法
     ================
     */
    LOGIN_ACCOUNT: 'account',
    LOGIN_WX: 'wx',
    /*
     ================
     退出登录
     ================
     */
    API_LOGOUT:'/oauth/revoke',

    VISITOR:'游客',

    /*
     ================
     Cookie
     ================
     */
    // access token存cookie的名字
    COOKIE: {
        LOGIN_METHOD: 'login_method',
        MAIN_ACCESS_TOKEN: 'main_access_token',
        CLIENT_ACCESS_TOKEN: 'client_access_token',
        WX_OPENID: 'wx_openid',
        WX_UNIONID: 'wx_unionid',
        SELECTED_ACCESS_TOKEN:'selected_access_token'
    },

    /*
    ================
    账号密码登录
    ================
     */
    // 绑定用户
    API_BINDING_USER:'/api/v1.2/users/bind',
    //解除用户
    API_UNBINDING_USER:'/api/v1.2/users/unbind',
    // 获取用户信息
    API_GET_USER_INFO: '/api/v1.2/users/get_info',
    // 获取绑定的用户列表
    API_GET_BINDED_USERS: '/api/v1.2/users/get_binded_users',

    /*
     ================
     微信登录
     ================
     */
    WX_API_GET_ZX_ACCESS: 'http://wxapp.k12ke.com/wx-config/api/get-zx-access.php',
    WX_API_GET_WX_ACCESS: 'http://wxapp.k12ke.com/wx-config/api/get-wx-access.php',
    WX_API_GET_USER_INFO: 'https://api.weixin.qq.com/sns/userinfo',
    WX_LOGIN_APPID: 'wx927c08e40a902073',
    WX_LOGIN_SCOPE: 'snsapi_login',
    WX_LOGIN_REDIRECT: encodeURIComponent('http://wxapp.k12ke.com/wx-config/api/wx-redirect-callback.php'),
    WX_LOGIN_HREF: 'https://rawcdn.githack.com/k12ke/wxbarcode/master/wx-style-barcode.css',

    /*
     ================
     微信扫码绑定
     ================
     */
    WX_BIND_REDIRECT: encodeURIComponent('http://wxapp.k12ke.com/wx-config/api/wx-redirect-bind-callback.php'),


    /*
     ================
     获取报告
     ================
     */
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
    REPORT_TYPE_PROJECT_LABEL: '区域',
    REPORT_TYPE_PROJECT: 'project',
    REPORT_TYPE_PROJECT_ICON: 'place',

    REPORT_TYPE_GRADE_LABEL: '学校',
    REPORT_TYPE_GRADE: 'grade',
    REPORT_TYPE_GRADE_ICON: 'account_balance',

    REPORT_TYPE_KLASS_LABEL: '班级',
    REPORT_TYPE_KLASS: 'klass',
    REPORT_TYPE_KLASS_ICON: 'people',

    REPORT_TYPE_PUPIL_LABEL: '学生',
    REPORT_TYPE_PUPIL: 'pupil',
    REPORT_TYPE_PUPIL_ICON: 'person',

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

    API_LOGIN_STATE:'dev',
    // 服务器地址
    API_DOMAIN: 'http://59.110.7.209:4502',
    /*
     ================
     微信登录
     ================
     */
    WX_LOGIN_STATE:'dev',
    // 报告链接
    URL_REPORT_ACADEMIC: '/html/zx-report-academic/#/report',
    URL_REPORT_OTHER_STUDENT: '/build/html/report-page/others/multiIntelligence',
    //首页地址
    URL_HOME:'/html'
};

let testing = {
    ...general,

    API_LOGIN_STATE:'test',
    // 服务器地址
    API_DOMAIN: 'http://59.110.7.209:4502',
    /*
     ================
     微信登录
     ================
     */
    WX_LOGIN_STATE:'test',
    // 报告链接
    URL_REPORT_ACADEMIC: '/zx-report-academic/#/report',
    URL_REPORT_OTHER_STUDENT: '/apps/report-page/others/multiIntelligence',
    //首页地址
    URL_HOME:'/'
};

let demo = {
    ...general,

    API_LOGIN_STATE:'demo',
    // 服务器地址
    API_DOMAIN: 'http://59.110.7.209:4500',
    /*
     ================
     微信登录
     ================
     */
    WX_LOGIN_STATE:'demo',
    // 报告链接
    URL_REPORT_ACADEMIC: '/zx-report-academic/#/report',
    URL_REPORT_OTHER_STUDENT: '/apps/report-page/others/multiIntelligence',
    //首页地址
    URL_HOME:'/'
};

let production = {
    ...general,

    API_LOGIN_STATE:'prod',
    // 服务器地址
    API_DOMAIN: 'http://59.110.7.209:4502',
    /*
     ================
     微信登录
     ================
     */
    WX_LOGIN_STATE:'prod',
    // 报告链接
    URL_REPORT_ACADEMIC: '/zx-report-academic/#/report',
    URL_REPORT_OTHER_STUDENT: '/apps/report-page/others/multiIntelligence',
    //首页地址
    URL_HOME:'/'
};

module.exports = {
    development,
    testing,
    demo,
    production,
};