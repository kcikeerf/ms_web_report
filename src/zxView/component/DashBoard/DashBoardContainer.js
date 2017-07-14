import React from 'react';
import PropTypes from 'prop-types'; // ES6
import $ from 'jquery';

// import handleAllEchartsResize from 'zx-chart/handleAllEchartsResize';
import DashBoardProject from './DashBoardProject';

import 'zx-style/customScrollBar/customScrollBar.css';
require('jquery-mousewheel')($);
require('malihu-custom-scrollbar-plugin')($);

let config = require('zx-const')[process.env.NODE_ENV];

class DashBoardContainer extends React.Component {
    constructor() {
       super();
       this.state = {
           testList: null,
           subjectTestData: null,
           allStat: {
               total: {
                   value: 0,
                   grade: 0,
                   klass: 0,
                   pupil: 0
               },
               new: {
                   value: 0,
                   grade: 0,
                   klass: 0,
                   pupil: 0
               },
           },
           chineseStat: {
               total: {
                   value: 0,
                   grade: 0,
                   klass: 0,
                   pupil: 0
               },
               new: {
                   value: 0,
                   grade: 0,
                   klass: 0,
                   pupil: 0
               },
           },
           mathStat: {
               total: {
                   value: 0,
                   grade: 0,
                   klass: 0,
                   pupil: 0
               },
               new: {
                   value: 0,
                   grade: 0,
                   klass: 0,
                   pupil: 0
               },
           },
           englishStat: {
               total: {
                   value: 0,
                   grade: 0,
                   klass: 0,
                   pupil: 0
               },
               new: {
                   value: 0,
                   grade: 0,
                   klass: 0,
                   pupil: 0
               },
           },
       }
    }

    componentDidMount() {
        $('.zx-dashboard-container').mCustomScrollbar({
            theme: 'minimal-dark',
            scrollInertia: 400,
            mouseWheel:{ scrollAmount: 200 }
        });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.selectedAccessToken !== this.props.selectedAccessToken) {
            this.setState({

            });
            this.handleTestStats(nextProps.selectedAccessToken, nextProps.testList, nextProps.userRole);
        }
    }

    // 获取报告总数等统计
    handleTestStats(selectedAccessToken, testList, userRole) {
        let allStatTotalValue = 0;
        let allStatTotalGrade = 0;
        let allStatTotalKlass = 0;
        let allStatTotalPupil = 0;
        let allStatNewValue = 0;
        let allStatNewGrade = 0;
        let allStatNewKlass = 0;
        let allStatNewPupil = 0;

        let chineseStatTotalValue = 0;
        let chineseStatTotalGrade = 0;
        let chineseStatTotalKlass = 0;
        let chineseStatTotalPupil = 0;
        let chineseStatNewValue = 0;
        let chineseStatNewGrade = 0;
        let chineseStatNewKlass = 0;
        let chineseStatNewPupil = 0;

        let mathStatTotalValue = 0;
        let mathStatTotalGrade = 0;
        let mathStatTotalKlass = 0;
        let mathStatTotalPupil = 0;
        let mathStatNewValue = 0;
        let mathStatNewGrade = 0;
        let mathStatNewKlass = 0;
        let mathStatNewPupil = 0;

        let englishStatTotalValue = 0;
        let englishStatTotalGrade = 0;
        let englishStatTotalKlass = 0;
        let englishStatTotalPupil = 0;
        let englishStatNewValue = 0;
        let englishStatNewGrade = 0;
        let englishStatNewKlass = 0;
        let englishStatNewPupil = 0;

        let testChinese = [], testMath = [], testEnglish = [];
        for (let i in testList) {
            let reportOrder = i;
            let testItem = testList[i];
            if (testItem.subject === config.REPORT_CHINESE) {
                testChinese.push(testItem);
                if (userRole === config.USER_ROLE_PUPIL) {
                    chineseStatTotalValue ++;
                }
            }
            else if (testItem.subject === config.REPORT_MATH) {
                testMath.push(testItem);
                if (userRole === config.USER_ROLE_PUPIL) {
                    mathStatTotalValue ++;
                }
            }
            else if (testItem.subject === config.REPORT_ENGLISH) {
                testEnglish.push(testItem);
                if (userRole === config.USER_ROLE_PUPIL) {
                    englishStatTotalValue ++;
                }
            }
            if (userRole === config.USER_ROLE_PUPIL) {
                allStatTotalValue = chineseStatTotalValue + mathStatTotalValue + englishStatTotalValue;
                allStatNewValue = 1;
                chineseStatNewValue = chineseStatTotalValue && 1;
                mathStatNewValue = mathStatTotalValue && 1;
                englishStatNewValue = englishStatTotalValue && 1;
                this.setState({
                    allStat: {
                        total: {
                            value: allStatTotalValue,
                            grade: allStatTotalGrade,
                            klass: allStatTotalKlass,
                            pupil: allStatTotalPupil
                        },
                        new: {
                            value: allStatNewValue,
                            grade: allStatNewGrade,
                            klass: allStatNewKlass,
                            pupil: allStatNewPupil
                        },
                    },
                    chineseStat: {
                        total: {
                            value: chineseStatTotalValue,
                            grade: chineseStatTotalGrade,
                            klass: chineseStatTotalKlass,
                            pupil: chineseStatTotalPupil
                        },
                        new: {
                            value: chineseStatNewValue,
                            grade: chineseStatNewGrade,
                            klass: chineseStatNewKlass,
                            pupil: chineseStatNewPupil
                        },
                    },
                    mathStat: {
                        total: {
                            value: mathStatTotalValue,
                            grade: mathStatTotalGrade,
                            klass: mathStatTotalKlass,
                            pupil: mathStatTotalPupil
                        },
                        new: {
                            value: mathStatNewValue,
                            grade: mathStatNewGrade,
                            klass: mathStatNewKlass,
                            pupil: mathStatNewPupil
                        },
                    },
                    englishStat: {
                        total: {
                            value: englishStatTotalValue,
                            grade: englishStatTotalGrade,
                            klass: englishStatTotalKlass,
                            pupil: englishStatTotalPupil
                        },
                        new: {
                            value: englishStatNewValue,
                            grade: englishStatNewGrade,
                            klass: englishStatNewKlass,
                            pupil: englishStatNewPupil
                        },
                    }
                });
            }
            else {
                let reportUrl = testItem.report_url;
                let reprtStatsApi = config.API_DOMAIN + reportUrl.replace('.json', '/report_stat.json');
                let reprtStatsData = {
                    access_token: selectedAccessToken
                };
                $.post(reprtStatsApi, reprtStatsData, function(response, status) {
                        response = JSON.parse(response);
                        let testGrade = response.grade || 0;
                        let testKlass = response.klass || 0;
                        let testPupil = response.pupil || 0;

                        if (reportOrder == 0) {
                            allStatNewValue = (testGrade + testKlass + testPupil);
                            allStatNewGrade = testGrade;
                            allStatNewKlass = testKlass;
                            allStatNewPupil = testPupil;
                        }

                        allStatTotalValue += (testGrade + testKlass + testPupil);
                        allStatTotalGrade += testGrade;
                        allStatTotalKlass += testKlass;
                        allStatTotalPupil += testPupil;
                        if (testItem.subject === config.REPORT_CHINESE) {
                            if (chineseStatTotalValue === 0) {
                                chineseStatNewValue = (testGrade + testKlass + testPupil);
                                chineseStatNewGrade = testGrade;
                                chineseStatNewKlass = testKlass;
                                chineseStatNewPupil = testPupil;
                            }
                            chineseStatTotalValue += (testGrade + testKlass + testPupil);
                            chineseStatTotalGrade += testGrade;
                            chineseStatTotalKlass += testKlass;
                            chineseStatTotalPupil += testPupil;
                        }
                        else if (testItem.subject === config.REPORT_MATH) {
                            if (mathStatTotalValue === 0) {
                                mathStatNewValue = (testGrade + testKlass + testPupil);
                                mathStatNewGrade = testGrade;
                                mathStatNewKlass = testKlass;
                                mathStatNewPupil = testPupil;
                            }
                            mathStatTotalValue += (testGrade + testKlass + testPupil);
                            mathStatTotalGrade += testGrade;
                            mathStatTotalKlass += testKlass;
                            mathStatTotalPupil += testPupil;
                        }
                        else if (testItem.subject === config.REPORT_ENGLISH) {
                            if (englishStatTotalValue === 0) {
                                englishStatNewValue = (testGrade + testKlass + testPupil);
                                englishStatNewGrade = testGrade;
                                englishStatNewKlass = testKlass;
                                englishStatNewPupil = testPupil;
                            }
                            englishStatTotalValue += (testGrade + testKlass + testPupil);
                            englishStatTotalGrade += testGrade;
                            englishStatTotalKlass += testKlass;
                            englishStatTotalPupil += testPupil;
                        }

                        this.setState({
                            allStat: {
                                total: {
                                    value: allStatTotalValue,
                                    grade: allStatTotalGrade,
                                    klass: allStatTotalKlass,
                                    pupil: allStatTotalPupil
                                },
                                new: {
                                    value: allStatNewValue,
                                    grade: allStatNewGrade,
                                    klass: allStatNewKlass,
                                    pupil: allStatNewPupil
                                },
                            },
                            chineseStat: {
                                total: {
                                    value: chineseStatTotalValue,
                                    grade: chineseStatTotalGrade,
                                    klass: chineseStatTotalKlass,
                                    pupil: chineseStatTotalPupil
                                },
                                new: {
                                    value: chineseStatNewValue,
                                    grade: chineseStatNewGrade,
                                    klass: chineseStatNewKlass,
                                    pupil: chineseStatNewPupil
                                },
                            },
                            mathStat: {
                                total: {
                                    value: mathStatTotalValue,
                                    grade: mathStatTotalGrade,
                                    klass: mathStatTotalKlass,
                                    pupil: mathStatTotalPupil
                                },
                                new: {
                                    value: mathStatNewValue,
                                    grade: mathStatNewGrade,
                                    klass: mathStatNewKlass,
                                    pupil: mathStatNewPupil
                                },
                            },
                            englishStat: {
                                total: {
                                    value: englishStatTotalValue,
                                    grade: englishStatTotalGrade,
                                    klass: englishStatTotalKlass,
                                    pupil: englishStatTotalPupil
                                },
                                new: {
                                    value: englishStatNewValue,
                                    grade: englishStatNewGrade,
                                    klass: englishStatNewKlass,
                                    pupil: englishStatNewPupil
                                },
                            }
                        });
                    }.bind(this),
                    'json')
                    .fail(function(status) {

                    });
            }
        }
        this.setState({
            subjectTestData: [
                {
                    subject: 'chinese',
                    order: 1,
                    data: testChinese
                },
                {
                    subject: 'math',
                    order: 2,
                    data: testMath
                },
                {
                    subject: 'english',
                    order: 3,
                    data: testEnglish
                }
            ]
        });

    }

    render() {
        // @TODO: 获取报告'总数目'和'新增数目'
        let dataReportTotalStats = {
            total: 300000,
            increase: 100000
        };

        // @TODO: 获取各学科报告'总数目'
        let pieData = {
            data:[
                {name: '语文', value: 1000},
                {name: '数学', value: 2000},
                {name: '英语', value: 3000},
            ],
            title:'学科报告占比'
        };

        let allTestData = {
            data: this.state.testList,
            stat: this.state.allStat
        };

        let subjectTestData = this.state.subjectTestData;
        let updatedSubjectTestData = [];
        for (let i in subjectTestData) {
            let subjectTestDataItem = subjectTestData[i];
            let updatedSubjectStatDataItem;
            if (subjectTestDataItem.subject === 'chinese') {
                updatedSubjectStatDataItem = {
                    ...subjectTestDataItem,
                    stat: this.state.chineseStat
                }
            }
            else if (subjectTestDataItem.subject === 'math') {
                updatedSubjectStatDataItem = {
                    ...subjectTestDataItem,
                    stat: this.state.mathStat
                }
            }
            else if (subjectTestDataItem.subject === 'english') {
                updatedSubjectStatDataItem = {
                    ...subjectTestDataItem,
                    stat: this.state.englishStat
                }
            }
            updatedSubjectTestData.push(updatedSubjectStatDataItem);
        }


        return (
            <div className="zx-dashboard-container">
                <DashBoardProject
                    wxOpenId={this.props.wxOpenId}
                    userName={this.props.userName}
                    userDisplayName={this.props.userDisplayName}
                    userRole={this.props.userRole}
                    allTestData={allTestData}
                    subjectTestData={updatedSubjectTestData}
                    dataReportTotalStats={dataReportTotalStats}
                    pieData={pieData}
                    handleReportIframeShow={this.props.handleReportIframeShow.bind(this)}
                />
            </div>

        )
    }
}

DashBoardContainer.contextTypes = {
    handleReportIframeShow: PropTypes.func
};

export default DashBoardContainer;