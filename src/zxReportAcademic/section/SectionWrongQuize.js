import React, {Component} from 'react';
import {Map, is} from 'immutable';
import $ from 'jquery';

import {SectionWrongQuizePopUp} from './SectionWrongQuizePopUp';

//错题的
export class SectionWrongQuize extends Component {
    constructor() {
        super();
        this.state = {};
    }

    shouldComponentUpdate(nextProps, nextState) {
        let propsMap = Map(this.props);
        let nextPropsMap = Map(nextProps);
        return !is(propsMap, nextPropsMap);
    }

    render() {
        let wrongData = this.props.data.wrongQuize;
        let contentWrongQuizItem,otherWrongQuize;
        if (this.props.data.otherWrongQuize) {
            otherWrongQuize = this.props.data.otherWrongQuize;
            contentWrongQuizItem = wrongData.map(function (wrongObj, index) {
                return <WrongQuizItem key={index} wrongQuizeData={wrongObj} id={index} otherWrongQuize={otherWrongQuize[index]}/>
            });
        } else {
            contentWrongQuizItem = wrongData.map(function (wrongObj, index) {
                return <WrongQuizItem key={index} wrongQuizeData={wrongObj} id={index}/>
            });
        }

        return (
            <div id="zx-report-quiz" className="zx-section-container scrollspy">
                <div className="section">
                    <h2>答题情况</h2>
                    <div className="row">
                        <div className="col s12">
                            {contentWrongQuizItem}
                        </div>
                    </div>
                </div>
                <div className="divider"></div>
            </div>
        )
    }
}

//处理错题数据
export function handleOtherWrongQuizeData(reportType, data, otherReportData) {
    let tHead=['','平均得分','满分人数','满分比例'];
    let projectArr = [], gradeArr = [], klassArr = [];
    let obj = {
        projectArr: null,
        gradeArr: null,
        klassArr: null
    };
    if (otherReportData) {
        for (let i = 0; i < otherReportData.length; i++) {
            let pupilNumber;//总人数
            let scoreAverage;//平均分
            // let scoreAveragePercent;//平均得分率（答对比例）
            // let totleFullScore;//总得分
            let totalQzpCorrectCount;//满分人数
            let totalQzpCorrectCountPercent;//满分人数比例
            if (otherReportData[i].type === "project") {
                let otherReportDataPaperQzps = otherReportData[i].data.paper_qzps;

                for (let j = 0; j < otherReportDataPaperQzps.length; j++) {
                    let dataContent=[];
                    pupilNumber = otherReportDataPaperQzps[j].value.pupil_number;
                    scoreAverage = parseFloat(otherReportDataPaperQzps[j].value.score_average).toFixed(2);
                    // scoreAveragePercent = otherReportDataPaperQzps[j].value.score_average_percent;
                    // totleFullScore = otherReportDataPaperQzps[j].value.total_full_score;
                    totalQzpCorrectCount = otherReportDataPaperQzps[j].value.total_qzp_correct_count;
                    totalQzpCorrectCountPercent=(parseFloat((totalQzpCorrectCount/pupilNumber)*100).toFixed(2))+'%';
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
                    pupilNumber = otherReportDataPaperQzps[j].value.pupil_number;
                    scoreAverage = parseFloat(otherReportDataPaperQzps[j].value.score_average).toFixed(2);
                    // scoreAveragePercent = otherReportDataPaperQzps[j].value.score_average_percent;
                    // totleFullScore = otherReportDataPaperQzps[j].value.total_full_score;
                    totalQzpCorrectCount = otherReportDataPaperQzps[j].value.total_qzp_correct_count;
                    totalQzpCorrectCountPercent=(parseFloat((totalQzpCorrectCount/pupilNumber)*100).toFixed(2))+'%';
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
                    pupilNumber = otherReportDataPaperQzps[j].value.pupil_number;
                    scoreAverage = parseFloat(otherReportDataPaperQzps[j].value.score_average).toFixed(2);
                    // scoreAveragePercent = otherReportDataPaperQzps[j].value.score_average_percent;
                    // totleFullScore = otherReportDataPaperQzps[j].value.total_full_score;
                    totalQzpCorrectCount = otherReportDataPaperQzps[j].value.total_qzp_correct_count;
                    totalQzpCorrectCountPercent=(parseFloat((totalQzpCorrectCount/pupilNumber)*100).toFixed(2))+'%';
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
            for (let i = 0; i < obj.projectArr.length; i++) {
                let tData = [];
                let objData = {
                    tData:null,
                    tHead:null
                };
                let projectData = obj.projectArr[i];
                projectData.unshift('区域');
                tData.push(projectData);
                objData.tData=tData;
                objData.tHead=tHead;
                dataArr.push(objData)
            }
            return dataArr
        }

        if (obj.projectArr && obj.gradeArr && !obj.klassArr) {
            let dataArr = [];
            for (let i = 0; i < obj.projectArr.length; i++) {
                let objData = {
                    tData:null,
                    tHead:null
                };
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
            return dataArr
        }

        if (obj.projectArr && obj.gradeArr && obj.klassArr) {
            let dataArr = [];
            for (let i = 0; i < obj.projectArr.length; i++) {
                let objData = {
                    tData:null,
                    tHead:null
                };
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
            return dataArr
        }
    }
}

//错题处理卡片信息数据
export function handleWrongQuizeData(reportType, data) {
    let wrongArr = [];
    for (let i = 0; i < data.length; i++) {
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
            reportType:reportType
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
        wrong.full = parseFloat(data[i].value.total_full_score / data[i].value.pupil_number).toFixed(2);
        wrong.average = parseFloat(data[i].value.score_average).toFixed(2);
        wrong.correct_percent = parseFloat(data[i].value.total_qzp_correct_percent * 100).toFixed(2);
        wrong.knowledge = data[i].ckps.knowledge[0].checkpoint;
        wrong.correct_count = data[i].value.total_qzp_correct_count;
        wrong.pupil_number = data[i].value.pupil_number;
        wrong.type = data[i].qzp_type;
        wrong.qzp_id = data[i].qzp_id;

        wrongArr.push(wrong);
    }
    return wrongArr;
}

//错题单题block
class WrongQuizItem extends Component {
    constructor() {
        super();
        this.state = {
            active: false
        }
    }

    handleModal(e) {
        e.preventDefault();
        e.stopPropagation();
        this.setState({
            active: true
        });
        let target = $(e.target);
        let modalID = '#' + target.attr('data-target');
        $(modalID).modal('open');
    }

    render() {
        let wrongObj;
        wrongObj = this.props.wrongQuizeData;
        let otherWrongQuize = this.props.otherWrongQuize;
        let label_percent;
        if(wrongObj.type === '主观'){
            label_percent = '答对比例';
        }else if(wrongObj.type === '客观') {
            label_percent = '平均得分率';
        }

        let id = `zx-modal-quiz-${this.props.id}`;
        return (
            <div className="zx-wrong-quiz" data-target={id} onClick={this.handleModal.bind(this)}>
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
                        <span>平均分/满分:</span>
                        <span>{wrongObj.average}/{wrongObj.full}分</span>
                    </div>

                    <div className="zx-wrong-quiz-item">
                        <span>{label_percent}:</span>
                        <span>{wrongObj.correct_percent}%</span>
                    </div>

                    <div className="zx-wrong-quiz-item">
                        <span>满分人数/总人数:</span>
                        <span>{wrongObj.correct_count}/{wrongObj.pupil_number}人</span>
                    </div>
                </div>

                <div className="zx-wrong-quiz-bottom">
                    <div className="zx-wrong-quiz-item">
                        <span>考察知识点:</span>
                        <span>{wrongObj.knowledge}</span>
                    </div>
                </div>
                <SectionWrongQuizePopUp id={id} wrongObj={wrongObj} active={this.state.active} otherWrongQuize={otherWrongQuize}/>
            </div>
        )
    }
}