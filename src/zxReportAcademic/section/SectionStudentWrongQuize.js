import React, {Component} from 'react';
import $ from 'jquery';
import {SectionWrongQuizePopUp} from './SectionWrongQuizePopUp';

export class SectionStudentWrongQuize extends Component {
    constructor() {
        super();
        this.state = {};
    }

    render() {
        let wrongData = this.props.data;
        let contentWrongQuizItem = wrongData.map(function (wrongObj, index) {
            return <WrongQuizItem key={index} wrongQuizeData={wrongObj}/>
        })
        return (
            <div className="row">
                <div className="col s12">
                    <div className="section">
                        <h2>学生错题集</h2>
                        <div className="row">
                            <div className="col s12">
                                {contentWrongQuizItem}
                            </div>
                        </div>
                    </div>
                    <div className="divider"></div>
                </div>
            </div>

        )
    }
}


export function handleOtherWrongQuizeData(reportType, data, otherReportData) {
    let projectArr = [], gradetArr = [], klassArr = [], obj = {};
    console.log('*', otherReportData);
    if (otherReportData) {

        for (let i = 0; i < otherReportData.length; i++) {
console.log(i,6666);

            // if (otherReportData[i].type === "project") {
            //     console.log(1);
            //     let otherReportDataPaperQzps = otherReportData[i].data.paper_qzps;
            //     for (let j = 0; j < otherReportDataPaperQzps.length; j++) {
            //
            //         let otherWrong = {
            //             pupilNumber: null,
            //             scoreAverage: null,
            //             scoreAveragePercent: null,
            //             totleFullScore: null,
            //             totalQzpCorrectCount: null,
            //         };
            //
            //         let pupilNumber;//总人数
            //         let scoreAverage;//平均分
            //         let scoreAveragePercent;//平均得分率（答对比例）
            //         let totleFullScore;//总得分
            //         let totalQzpCorrectCount;//满分人数
            //
            //         pupilNumber = otherReportDataPaperQzps[j].value.pupil_number;
            //         scoreAverage = otherReportDataPaperQzps[j].value.score_average;
            //         scoreAveragePercent = otherReportDataPaperQzps[j].value.score_average_percent;
            //         totleFullScore = otherReportDataPaperQzps[j].value.total_full_score;
            //         totalQzpCorrectCount = otherReportDataPaperQzps[j].value.total_qzp_correct_count;
            //         otherWrong.pupilNumber = pupilNumber;
            //         otherWrong.scoreAverage = scoreAverage;
            //         otherWrong.scoreAveragePercent = scoreAveragePercent;
            //         otherWrong.totleFullScore = totleFullScore;
            //         otherWrong.totalQzpCorrectCount = totalQzpCorrectCount;
            //         projectArr.push(otherWrong);
            //     }
            // }
            //
            // obj.projectArr = projectArr;
            //
            //
            // if (otherReportData[i].type === "grade") {
            //     console.log(2);
            //     let otherReportDataPaperQzps = otherReportData[i].data.paper_qzps;
            //     for (let j = 0; j < otherReportDataPaperQzps.length; j++) {
            //
            //         let otherWrong = {
            //             pupilNumber: null,
            //             scoreAverage: null,
            //             scoreAveragePercent: null,
            //             totleFullScore: null,
            //             totalQzpCorrectCount: null,
            //         };
            //
            //         let pupilNumber;//总人数
            //         let scoreAverage;//平均分
            //         let scoreAveragePercent;//平均得分率（答对比例）
            //         let totleFullScore;//总得分
            //         let totalQzpCorrectCount;//满分人数
            //
            //         pupilNumber = otherReportDataPaperQzps[j].value.pupil_number;
            //         scoreAverage = otherReportDataPaperQzps[j].value.score_average;
            //         scoreAveragePercent = otherReportDataPaperQzps[j].value.score_average_percent;
            //         totleFullScore = otherReportDataPaperQzps[j].value.total_full_score;
            //         totalQzpCorrectCount = otherReportDataPaperQzps[j].value.total_qzp_correct_count;
            //         otherWrong.pupilNumber = pupilNumber;
            //         otherWrong.scoreAverage = scoreAverage;
            //         otherWrong.scoreAveragePercent = scoreAveragePercent;
            //         otherWrong.totleFullScore = totleFullScore;
            //         otherWrong.totalQzpCorrectCount = totalQzpCorrectCount;
            //         gradetArr.push(otherWrong);
            //     }
            // }
            // obj.gradetArr = gradetArr;
            //
            //
            // if (otherReportData[i].type === "klass") {
            //     console.log(3);
            //     let otherReportDataPaperQzps = otherReportData[i].data.paper_qzps;
            //     for (let j = 0; j < otherReportDataPaperQzps.length; j++) {
            //
            //         let otherWrong = {
            //             pupilNumber: null,
            //             scoreAverage: null,
            //             scoreAveragePercent: null,
            //             totleFullScore: null,
            //             totalQzpCorrectCount: null,
            //         };
            //
            //         let pupilNumber;//总人数
            //         let scoreAverage;//平均分
            //         let scoreAveragePercent;//平均得分率（答对比例）
            //         let totleFullScore;//总得分
            //         let totalQzpCorrectCount;//满分人数
            //
            //         pupilNumber = otherReportDataPaperQzps[j].value.pupil_number;
            //         scoreAverage = otherReportDataPaperQzps[j].value.score_average;
            //         scoreAveragePercent = otherReportDataPaperQzps[j].value.score_average_percent;
            //         totleFullScore = otherReportDataPaperQzps[j].value.total_full_score;
            //         totalQzpCorrectCount = otherReportDataPaperQzps[j].value.total_qzp_correct_count;
            //         otherWrong.pupilNumber = pupilNumber;
            //         otherWrong.scoreAverage = scoreAverage;
            //         otherWrong.scoreAveragePercent = scoreAveragePercent;
            //         otherWrong.totleFullScore = totleFullScore;
            //         otherWrong.totalQzpCorrectCount = totalQzpCorrectCount;
            //         klassArr.push(otherWrong);
            //     }
            // }
            // obj.klassArr = klassArr;
            //
            //
            // console.log('66', obj);
            //
            // if (obj.projectArr && obj.gradetArr.length === 0 && obj.klassArr.length === 0) {
            //     return obj
            // }
            // console.log(obj.klassArr.length);
            // if (obj.projectArr && obj.gradetArr && obj.klassArr.length === 0) {
            //     // let projectData,gradeData,klassData;
            //     let dataArr = [];
            //     let objData = {
            //         projectData: null,
            //         gradeData: null,
            //     };
            //     for (let i = 0; i < obj.projectArr.lenght; i++) {
            //         let projectData = obj.projectArr[i];
            //         let gradeData = obj.gradetArr[i];
            //         objData.projectData = projectData;
            //         objData.gradeData = gradeData;
            //         dataArr.push(objData);
            //     }
            //     console.log(5, {dataArr});
            //     return {dataArr}
            // }
            //
            //
            // if (obj.projectArr && obj.gradetArr && obj.klassArr) {
            //     let dataArr = [];
            //     let objData = {
            //         projectData: null,
            //         gradeData: null,
            //         klassData: null,
            //     };
            //
            //     for (let i = 0; i < obj.projectArr.length; i++) {
            //         console.log(1);
            //         let projectData = obj.projectArr[i];
            //         let gradeData = obj.gradetArr[i];
            //         let klassData = obj.klassArr[i];
            //         objData.projectData = projectData;
            //         objData.gradeData = gradeData;
            //         objData.klassData = klassData;
            //         dataArr.push(objData);
            //     }
            //     console.log(6, dataArr);
            //     return {dataArr}
            // }


        }
    }
}

export function handleWrongQuizeData(reportType, data) {
    let wrongArr = [];

    for (let i = 0; i < data.length; i++) {
        let scoreFull = data[i].value.total_full_score;
        let scoreReal = data[i].value.total_real_score;
        if(scoreReal<scoreFull){
            let wrong = {
                order: null,
                full: null,
                average: null,
                correct_percent: null,
                knowledge: null,
                correct_count: null,
                pupil_number: null,
                type: null,
                qzp_id: null,
                reportType: reportType
            };
            if (data[i].qzp_custom_order) {
                wrong.order = data[i].qzp_custom_order;
            } else {
                if (data[i].qzp_system_order) {
                    wrong.order = data[i].qzp_system_order;
                } else {
                    wrong.order = data[i].qzp_order;
                }
            }
            wrong.full = parseFloat(scoreFull).toFixed(2);
            wrong.real = parseFloat(scoreReal).toFixed(2);
            wrong.correct_percent = parseFloat(data[i].value.score_average_percent*100).toFixed(2);
            wrong.type = data[i].qzp_type;
            wrong.qzp_id = data[i].qzp_id;

            wrongArr.push(wrong);
        }
    }
    return wrongArr;
}

class WrongQuizItem extends Component {

    render() {
        let wrongObj = this.props.wrongQuizeData;
        let label_percent;
        if(wrongObj.type === '主观'){
            label_percent = '答对比例';
        }else if(wrongObj.type === '客观') {
            label_percent = '得分率';
        }
        let id= wrongObj.qzp_id;
        let ids = `#${id}`;
        return (
            <a href={ids}>
            <div className="zx-wrong-quiz">
                <div className="zx-wrong-quiz-title">
                    <div className="zx-wrong-quiz-order">
                        {wrongObj.order}题
                    </div>
                    <div className="zx-wrong-quiz-full">
                        {wrongObj.type}题
                    </div>
                </div>

                <div className="zx-wrong-quiz-content">

                    <div className="zx-wrong-quiz-item">
                        <span>学生得分/本题满分:</span>
                        <span>{wrongObj.real}/{wrongObj.full}分</span>
                    </div>

                    <div className="zx-wrong-quiz-item">
                        <span>{label_percent}:</span>
                        <span>{wrongObj.correct_percent}%</span>
                    </div>

                </div>

                <div className="zx-wrong-quiz-bottom">
                    <div className="zx-wrong-quiz-item">
                        <span>考察知识点:</span>
                        <span>{wrongObj.knowledge}</span>
                    </div>
                </div>
                <SectionWrongQuizePopUp id={id} wrongObj={wrongObj}/>
            </div>
            </a>
        )
    }
}