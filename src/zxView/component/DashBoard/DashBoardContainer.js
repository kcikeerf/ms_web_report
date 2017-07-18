import React from 'react';
import PropTypes from 'prop-types'; // ES6
import { Map, is } from 'immutable';
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
        let propsMap = Map(this.props.selectedTestList);
        let nextPropsMap = Map(nextProps.selectedTestList);
        if (!is(propsMap, nextPropsMap)) {
            this.handleTestStats(nextProps.selectedAccessToken, nextProps.selectedTestList, nextProps.selectedUserRole);
        }
    }

    // 获取报告总数等统计
    handleTestStats(selectedAccessToken, testList, userRole) {
        console.log(selectedAccessToken);
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
        let chineseReportOrder = 0, mathReportOrder = 0, englishReportOrder = 0;
        for (let i in testList) {
            let reportOrder = i;
            let testItem = testList[i];
            if (testItem.subject === config.REPORT_CHINESE) {
                testItem.recent = (chineseReportOrder === 0);
                testChinese.push(testItem);
                if (userRole === config.USER_ROLE_PUPIL) {
                    chineseStatTotalValue ++;
                }
                chineseReportOrder ++;
            }
            else if (testItem.subject === config.REPORT_MATH) {
                testItem.recent = (mathReportOrder === 0);
                testMath.push(testItem);
                if (userRole === config.USER_ROLE_PUPIL) {
                    mathStatTotalValue ++;
                }
                mathReportOrder ++;
            }
            else if (testItem.subject === config.REPORT_ENGLISH) {
                testItem.recent = (englishReportOrder === 0);
                testEnglish.push(testItem);
                if (userRole === config.USER_ROLE_PUPIL) {
                    englishStatTotalValue ++;
                }
                englishReportOrder ++;
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
                            if (testItem.recent) {
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
                            if (testItem.recent) {
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
                            if (testItem.recent) {
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
                    userName={this.props.selectedUserName}
                    userRole={this.props.selectedUserRole}
                    userDisplayName={this.props.selectedUserDisplayName}
                    allTestData={allTestData}
                    subjectTestData={updatedSubjectTestData}
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