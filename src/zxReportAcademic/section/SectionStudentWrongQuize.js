import React, {Component} from 'react';
import $ from 'jquery';
import {SectionWrongQuizePopUp} from './SectionWrongQuizePopUp';

export class SectionStudentWrongQuize extends Component {
    constructor() {
        super();
        this.state = {};
    }

    render() {
        let wrongData = this.props.data.wrongQuize;
        let otherWrongQuize = this.props.data.otherWrongQuize;

        let contentWrongQuizItem = wrongData.map(function (wrongObj, index) {
            return <WrongQuizItem key={index} wrongQuizeData={wrongObj} otherWrongQuize={otherWrongQuize[index]}/>
        });
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
    let tHead=['','平均得分','满分人数','满分比例'];
    let projectArr = [], gradeArr = [], klassArr = [], obj = {};
    if (otherReportData) {
        for (let i = 0; i < otherReportData.length; i++) {

            if (otherReportData[i].type === "project") {


                let otherReportDataPaperQzps = otherReportData[i].data.paper_qzps;
                for (let j = 0; j < otherReportDataPaperQzps.length; j++) {
                    let dataContent=[];

                    let pupilNumber;//总人数
                    let scoreAverage;//平均分
                    let scoreAveragePercent;//平均得分率（答对比例）
                    let totleFullScore;//总得分
                    let totalQzpCorrectCount;//满分人数
                    let totalQzpCorrectCountPercent;//满分人数比例

                    pupilNumber = otherReportDataPaperQzps[j].value.pupil_number;
                    scoreAverage = parseFloat(otherReportDataPaperQzps[j].value.score_average).toFixed(2);
                    scoreAveragePercent = otherReportDataPaperQzps[j].value.score_average_percent;
                    totleFullScore = otherReportDataPaperQzps[j].value.total_full_score;
                    totalQzpCorrectCount = otherReportDataPaperQzps[j].value.total_qzp_correct_count;
                    totalQzpCorrectCountPercent=parseFloat(totalQzpCorrectCount/pupilNumber).toFixed(2);


                    dataContent.push(scoreAverage);
                    dataContent.push(totalQzpCorrectCount);
                    dataContent.push(totalQzpCorrectCountPercent);
                    projectArr.push(dataContent);
                }
                obj.projectArr = projectArr;
            }

            if (otherReportData[i].type === "grade") {


                let otherReportDataPaperQzps = otherReportData[i].data.paper_qzps;
                for (let j = 0; j < otherReportDataPaperQzps.length; j++) {
                    let dataContent=[];

                    let pupilNumber;//总人数
                    let scoreAverage;//平均分
                    let scoreAveragePercent;//平均得分率（答对比例）
                    let totleFullScore;//总得分
                    let totalQzpCorrectCount;//满分人数
                    let totalQzpCorrectCountPercent;//满分人数比例

                    pupilNumber = otherReportDataPaperQzps[j].value.pupil_number;
                    scoreAverage = parseFloat(otherReportDataPaperQzps[j].value.score_average).toFixed(2);
                    scoreAveragePercent = otherReportDataPaperQzps[j].value.score_average_percent;
                    totleFullScore = otherReportDataPaperQzps[j].value.total_full_score;
                    totalQzpCorrectCount = otherReportDataPaperQzps[j].value.total_qzp_correct_count;
                    totalQzpCorrectCountPercent=parseFloat(totalQzpCorrectCount/pupilNumber).toFixed(2);


                    dataContent.push(scoreAverage);
                    dataContent.push(totalQzpCorrectCount);
                    dataContent.push(totalQzpCorrectCountPercent);
                    gradeArr.push(dataContent);
                }
                obj.gradeArr = gradeArr;
            }

            if (otherReportData[i].type === "klass") {


                let otherReportDataPaperQzps = otherReportData[i].data.paper_qzps;
                for (let j = 0; j < otherReportDataPaperQzps.length; j++) {
                    let dataContent=[];

                    let pupilNumber;//总人数
                    let scoreAverage;//平均分
                    let scoreAveragePercent;//平均得分率（答对比例）
                    let totleFullScore;//总得分
                    let totalQzpCorrectCount;//满分人数
                    let totalQzpCorrectCountPercent;//满分人数比例

                    pupilNumber = otherReportDataPaperQzps[j].value.pupil_number;
                    scoreAverage = parseFloat(otherReportDataPaperQzps[j].value.score_average).toFixed(2);
                    scoreAveragePercent = otherReportDataPaperQzps[j].value.score_average_percent;
                    totleFullScore = otherReportDataPaperQzps[j].value.total_full_score;
                    totalQzpCorrectCount = otherReportDataPaperQzps[j].value.total_qzp_correct_count;
                    totalQzpCorrectCountPercent=parseFloat(totalQzpCorrectCount/pupilNumber).toFixed(2);


                    dataContent.push(scoreAverage);
                    dataContent.push(totalQzpCorrectCount);
                    dataContent.push(totalQzpCorrectCountPercent);
                    klassArr.push(dataContent);
                }
                obj.klassArr = klassArr;
            }

        }

        if (obj.projectArr && !obj.gradeArr && !obj.klassArr) {
            let dataArr=[];
            let objData = {
                tData:null,
                tHead:null
            };
            for (let i = 0; i < obj.projectArr.length; i++) {
                let tData = [];
                let projectData = obj.projectArr[i];
                tData.push(projectData);
                projectData.unshift('区域');
                objData.tData=tData;
                objData.tHead=tHead;
                dataArr.push(objData)
            }
            console.log('001',dataArr);
            return dataArr
        }

        if (obj.projectArr && obj.gradeArr && !obj.klassArr) {
            let dataArr = [];
            let objData = {
                tData:null,
                tHead:null
            };
            for (let i = 0; i < obj.projectArr.length; i++) {
                let tData = [];
                let projectData = obj.projectArr[i];
                let gradeData = obj.gradeArr[i];
                projectData.unshift('区域');
                gradeData.unshift('年级');
                tData.push(projectData);
                tData.push(gradeData);
                objData.tData = tData;
                objData.tHead = tHead;
                dataArr.push(objData);
            }
            console.log('002',dataArr);
            return dataArr
        }

        if (obj.projectArr && obj.gradeArr && obj.klassArr) {
            let dataArr = [];
            let objData = {
                tData:null,
                tHead:null
            };
            for (let i = 0; i < obj.projectArr.length; i++) {
                let tData = [];
                let projectData = obj.projectArr[i];
                let gradeData = obj.gradeArr[i];
                let klassData = obj.klassArr[i];
                projectData.unshift('区域');
                gradeData.unshift('年级');
                klassData.unshift('班级');
                tData.push(projectData);
                tData.push(gradeData);
                tData.push(klassData);
                objData.tData = tData;
                objData.tHead = tHead;
                dataArr.push(objData);
            }
            console.log('003',dataArr);
            return dataArr
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
        let otherWrongQuize = this.props.otherWrongQuize;
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
                <SectionWrongQuizePopUp id={id} wrongObj={wrongObj} otherWrongQuize={otherWrongQuize}/>
            </div>
            </a>
        )
    }
}