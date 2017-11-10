'use strict';

const path = require('path');
const fs = require('fs');
const url = require('url');
const moment = require('moment');

// current date
let currentDate = moment().format("YYYYMMDDHH");

// Make sure any symlinks in the project folder are resolved:
// https://github.com/facebookincubator/create-react-app/issues/637
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

const envPublicUrl = process.env.PUBLIC_URL;

function ensureSlash(path, needsSlash) {
    const hasSlash = path.endsWith('/');
    if (hasSlash && !needsSlash) {
        return path.substr(path, path.length - 1);
    } else if (!hasSlash && needsSlash) {
        return `${path}/`;
    } else {
        return path;
    }
}

const getPublicUrl = appPackageJson =>
envPublicUrl || require(appPackageJson).homepage;

// We use `PUBLIC_URL` environment variable or "homepage" field to infer
// "public path" at which the app is served.
// Webpack needs to know it to put the right <script> hrefs into HTML even in
// single-page apps that may serve index.html for nested URLs like /todos/42.
// We can't use a relative path in HTML because we don't want to load something
// like /todos/42/static/js/bundle.7289d.js. We have to know the root.
function getServedPath(appPackageJson) {
    const publicUrl = getPublicUrl(appPackageJson);
    // const servedUrl = envPublicUrl ||
    //     (publicUrl ? url.parse(publicUrl).pathname : '/');
    const servedUrl = envPublicUrl ||
        (publicUrl ? publicUrl : '/');
    return ensureSlash(servedUrl, true);
}

// config after eject: we're in ./config/
module.exports = {
    appDirectory: appDirectory,
    dotenv: resolveApp('.env'),
    currentDate: currentDate,
    appBuildWarpper: resolveApp('build'),
    appBuild: resolveApp(`build/${currentDate}`),
    appPublic: resolveApp('public'),
    appReports: resolveApp('public/reports'),
    //appHtml: resolveApp('public/index.html'),
    //appIndexJs: resolveApp('src/index.js'),
    appPackageJson: resolveApp('package.json'),
    appSrc: resolveApp('src'),
    yarnLockFile: resolveApp('yarn.lock'),
    testsSetup: resolveApp('src/setupTests.js'),
    appNodeModules: resolveApp('node_modules'),
    publicUrl: getPublicUrl(resolveApp('package.json')),
    servedPath: getServedPath(resolveApp('package.json')),
    aliasPath:{
        zxConst: resolveApp('src/const.js'),
        zxMisc: resolveApp('src/misc'),
        zxImg: resolveApp('src/img'),
        zxChart: resolveApp('src/echarts'),
        zxStyle: resolveApp('src/style'),
        zxLib: resolveApp('src/lib')
    },
    zxView: {
        entry: 'zx-view',
        build: resolveApp('build/zxView'),
        public: resolveApp('public/zxView'),
        htmlTemplate: resolveApp('public/index.html'),
        htmlOutput: 'html/index.html',
        indexJs:  resolveApp('src/zxView/index.js')
    },
    zxReportAcademic: {
        entry: 'zx-report-academic',
        build: resolveApp('build/zxReportAcademic'),
        public: resolveApp('public/zxReportAcademic'),
        htmlTemplate: resolveApp('public/index.html'),
        htmlOutput: 'html/zx-report-academic/index.html',
        indexJs:  resolveApp('src/zxReportAcademic/index.js')
    },
    zxPrint: {
        entry: 'zx-print',
        build: resolveApp('build/zxPrint'),
        public: resolveApp('public/zxPrint'),
        htmlTemplate: resolveApp('public/index.html'),
        htmlOutput: 'html/zx-print/index.html',
        indexJs:  resolveApp('src/zxPrint/index.js')
    }

};
