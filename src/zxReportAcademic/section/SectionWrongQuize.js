import React, {Component} from 'react';
import {Map, is} from 'immutable';
import $ from 'jquery';

import getCookie from 'zx-misc/getCookie';

import {SectionWrongQuizePopUp} from './SectionWrongQuizePopUp';

let config = require('zx-const')[process.env.NODE_ENV];

//错题的
export class SectionWrongQuize extends Component {
    constructor() {
        super();
        this.state = {};
    }
    //判断是否数据是否更改
    shouldComponentUpdate(nextProps, nextState) {
        let propsMap = Map(this.props);
        let nextPropsMap = Map(nextProps);
        return !is(propsMap, nextPropsMap);
    }

    render() {
        let reportType = this.props.data.reportType;
        let wrongData = this.props.data.wrongQuize;
        let contentWrongQuizItem, otherWrongQuize;
        if (this.props.data.otherWrongQuize) {
            otherWrongQuize = this.props.data.otherWrongQuize;
            contentWrongQuizItem = wrongData.map(function (wrongObj, index) {
                return <WrongQuizItem key={index} id={index} reportType={reportType} wrongQuizeData={wrongObj}  otherWrongQuize={otherWrongQuize[index]}/>
            });
        } else {
            contentWrongQuizItem = wrongData.map(function (wrongObj, index) {
                return <WrongQuizItem key={index} id={index} reportType={reportType} wrongQuizeData={wrongObj} />
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
        if (data[i].value) {
            let scoreFull = data[i].value.total_full_score;
            let scoreReal = data[i].value.total_real_score;
            if(scoreReal<scoreFull) {
                let wrong = {
                    order: null,
                    full: null,
                    average: null,
                    correct_percent: null,
                    knowledge: null,
                    knowledge_uid: null,
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
                let scoreFull = data[i].value.total_full_score;
                let scoreReal = data[i].value.total_real_score;

                if (reportType !== 'pupil') {
                    wrong.full = parseFloat(scoreFull / data[i].value.pupil_number).toFixed(2);
                    wrong.correct_percent = parseFloat(data[i].value.total_qzp_correct_percent * 100).toFixed(2);
                    wrong.knowledge = data[i].ckps.knowledge[0].checkpoint;
                    wrong.knowledge_uid = data[i].ckps.knowledge[0].uid;
                    wrong.type = data[i].qzp_type;
                    wrong.qzp_id = data[i].qzp_id;
                    wrong.average = parseFloat(data[i].value.score_average).toFixed(2);
                    wrong.correct_count = data[i].value.total_qzp_correct_count;
                    wrong.pupil_number = data[i].value.pupil_number;
                }
                else {
                    wrong.full = parseFloat(scoreFull).toFixed(2);
                    wrong.real = parseFloat(scoreReal).toFixed(2);
                    wrong.correct_percent = parseFloat(data[i].value.score_average_percent * 100).toFixed(2);
                    wrong.type = data[i].qzp_type;
                    wrong.qzp_id = data[i].qzp_id;
                    wrong.knowledge = data[i].ckps.knowledge[0].checkpoint;
                    wrong.knowledge_uid = data[i].ckps.knowledge[0].uid;
                }
                wrongArr.push(wrong);
            }
        }
    }
    return wrongArr;
}

//错题单题block
class WrongQuizItem extends Component {
    constructor() {
        super();
        this.state = {
            wrongQuizActive: false,
            relatedQuizActive: false
        }
    }

    handleWrongQuizModal(e) {
        e.preventDefault();
        e.stopPropagation();
        this.setState({
            wrongQuizActive: true
        });
        let target = $(e.target);
        let modalID = '#' + target.attr('data-modal-target');
        $(modalID).modal('open');
    }

    handleRelatedQuizModal(e) {
        e.preventDefault();
        e.stopPropagation();
        this.setState({
            relatedQuizActive: true
        });
        let target = $(e.target);
        let modalID = '#' + target.attr('data-modal-target');
        $(modalID).modal('open');
    }

    render() {
        let reportType = this.props.reportType;
        let wrongObj = this.props.wrongQuizeData;
        let otherWrongQuize = this.props.otherWrongQuize;
        let label_percent;
        if(wrongObj.type === '主观'){
            label_percent = '答对比例';
        }
        else if(wrongObj.type === '客观') {
            if (reportType !== 'pupil') {
                label_percent = '平均得分率';
            }
            else {
                label_percent = '得分率';
            }

        }

        let contentScore, contentFullScoreNumb;
        if (reportType !== 'pupil') {
            contentScore = (
                <div className="zx-wrong-quiz-item">
                    <span>平均分/满分:</span>
                    <span>{wrongObj.average}/{wrongObj.full}分</span>
                </div>
            );
            contentFullScoreNumb = (
                <div className="zx-wrong-quiz-item">
                    <span>满分人数/总人数:</span>
                    <span>{wrongObj.correct_count}/{wrongObj.pupil_number}人</span>
                </div>
            );
        }
        else {
            contentScore = (
                <div className="zx-wrong-quiz-item">
                    <span>学生得分/本题满分:</span>
                    <span>{wrongObj.real}/{wrongObj.full}分</span>
                </div>
            );
        }

        let wrongQuizId = `zx-modal-wrong-quiz-${this.props.id}`;
        let relatedQuizId = `zx-modal-related-quiz-${this.props.id}`;
        return (
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

                    {contentScore}

                    <div className="zx-wrong-quiz-item">
                        <span>{label_percent}:</span>
                        <span>{wrongObj.correct_percent}%</span>
                    </div>

                    {contentFullScoreNumb}
                </div>

                <div className="zx-wrong-quiz-bottom">
                    <div className="zx-wrong-quiz-item">
                        <span>考察知识点:</span>
                        <span>{wrongObj.knowledge}</span>
                    </div>
                </div>

                <div className="zx-wrong-quiz-action">
                    <button className="btn" data-modal-target={wrongQuizId} onClick={this.handleWrongQuizModal.bind(this)}>题目分析</button>
                    <button className="btn" data-modal-target={relatedQuizId} onClick={this.handleRelatedQuizModal.bind(this)}>短板提升</button>
                </div>

                <SectionWrongQuizePopUp id={wrongQuizId} active={this.state.wrongQuizActive} wrongObj={wrongObj}  otherWrongQuize={otherWrongQuize} />
                <RelatedQuizModal id={relatedQuizId} active={this.state.relatedQuizActive} indicatorId={wrongObj.knowledge_uid} />
            </div>
        )
    }
}

class RelatedQuizModal extends React.Component {
    constructor() {
        super();
        this.state = {
            relatedQuizs: null
        }
    }

    componentDidMount() {
        let id = this.props.id;
        $(document).ready(function () {
            $('.zx-modal-related-quiz').modal({
                dismissible: true, // Modal can be dismissed by clicking outside of the modal
                opacity: .5, // Opacity of modal background
                inDuration: 300, // Transition in duration
                outDuration: 200, // Transition out duration
                startingTop: '4%', // Starting top style attribute
                endingTop: '10%', // Ending top style attribute,
                ready: function (modal, trigger) { // Callback for Modal open. Modal and trigger parameters available.
                    $(window.parent.document.getElementsByClassName('zx-icon-clear')).hide();
                    $('.zx-report-container-wrapper ').mCustomScrollbar('disable');
                    //this.handleQuiz();
                }.bind(this),
                complete: function () { // Callback for Modal close
                    $(window.parent.document.getElementsByClassName('zx-icon-clear')).show();
                    $('.zx-report-container-wrapper ').mCustomScrollbar('update');
                }
            });
        });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.active) {
            $('ul.tabs').tabs();

            let selecedAccessToken = getCookie('selected_access_token');
            let indicatorId = nextProps.indicatorId;
            this.setState({
                relatedQuizs: null
            });
            this.handleRelatedQuizs(selecedAccessToken, indicatorId);
        }
    }

    handleRelatedQuizs(selecedAccessToken, indicatorId, amount=2) {
        let relatedQuizsApi = config.API_DOMAIN + config.API_GET_RELATED_QUIZS;
        let relatedQuizsData = {
            access_token: selecedAccessToken,
            ckp_uid: indicatorId,
            amount: amount
        };
        let relatedQuizsPromise = $.post(relatedQuizsApi, relatedQuizsData);
        relatedQuizsPromise.done(function(response) {
            this.setState({
                relatedQuizs: response
            });
        }.bind(this));
        relatedQuizsPromise.fail(function(errorResponse) {
        }.bind(this));
    }

    handleAnswerDisplay(e) {
        let answer = $(e.target).parents('.zx-related-quiz-item').find('.zx-related-quiz-answer').toggle(300);
    }

    render() {
        let id = this.props.id;

        let tmpIndicatorIntro = [
            '书面上用于标明句读和语气的符号,用来表示停顿、语气以及词语的性质和作用。分为点号（句号、问好、逗号等）、标号（引号、括号、破折号等）、符号（注释号、斜线号、标识号等）三大类',
            '古诗文句子中，在理解句意的基础上，将句子分解成各个部分，并确定各部分彼此与整体结构或目的关系',
            '一种修辞手法，利用词的多义或同音的条件，有意使语句具有双重意义，言在此而意在彼',
            '通过读的方式，对再次出现的信息能够识别的思维过程',
            '是指对语段或文章的主题、结构、内容、语言的合理性进行客观评价和论证的过程',
            '领会和体验作者透过文本表达的情绪、情感、意图、目的等的能力',
            '发现句子、语段、文章内在逻辑关系或以符合逻辑的关系表述事物的能力',
            '将具有一致性或相关联系的信息、事物、观点或其他类似物匹配起来的能力',
            '点、线、面、角、相交线与平行线、三角形、四边形、圆、尺规作图、定义、命题、定理',
            '概率的意义、事件、频率、列表、画树状图、概率的计算',
            '方程与方程组、不等式与不等式组',
            '将某些事物按其内在性质归属为同一类的思维过程',
            '在新的学习或应用情境中，借鉴过往经验的过程',
            '归纳推理：由个别到一般的推理方法，从两个或几个单称判断或特称判断得出一个全称判断',
            '敏感感知数与数量、数量关系、估算结果等的能力',
            '理解文字说明，并将其转化为数学问题的能力',
            '对数学概念进行准确区分的能力',
            'each other, one another相互代词就是表示相互关系的代词。它与它所指代的名词或代词是一种互指关系，因此它们是复数或者二者以上。英语中的相互代词只有两个，即each other和one another。在正式文体中多用each other指两者，用one another 指两者以上',
            '连系动词，是用来帮助说明主语的动词。它本身有词义，但不能单独用作谓语，其后必须跟表语，构成系表结构说明主语的状况、性质、特征等情况',
            '名词分为可数名词和不可数名词。可数名词有单数和复数之分，这在句子的应用中十分重要，表示两个或者两个以上的数的概念时，该名词就要用复数形式，复数规则变化是在名词词尾加-s或者-es，不规则变化需要特殊记忆'
        ];
        let random = Math.round(Math.random() * (tmpIndicatorIntro.length - 0) + 0);

        let contentRelatedQuizs;
        if (this.state.relatedQuizs) {
            contentRelatedQuizs = this.state.relatedQuizs.map((quiz, index) => {
                return (
                    <div key={index} className="section">
                        <div className="zx-related-quiz-item">
                            <h3>题目{index+1}</h3>
                            <div className="zx-related-quiz-text" dangerouslySetInnerHTML={{__html: quiz.text}} />
                            <div className="zx-related-quiz-answer-title">
                                <h3>答案</h3>
                                <button className="btn" onClick={this.handleAnswerDisplay.bind(this)}>展开</button>
                            </div>
                            <div className="zx-related-quiz-answer" dangerouslySetInnerHTML={{__html: quiz.answer}} />
                        </div>
                    </div>
                )
            });
        }
        else {
            contentRelatedQuizs =
                <div className="zx-modal-preloader-container">
                    <div className="preloader-wrapper active">
                        <div className="spinner-layer spinner-red-only">
                            <div className="circle-clipper left">
                                <div className="circle"></div>
                            </div><div className="gap-patch">
                            <div className="circle"></div>
                        </div><div className="circle-clipper right">
                            <div className="circle"></div>
                        </div>
                        </div>
                    </div>
                </div>
            ;
        }



        return (
            <div id={id} className="modal zx-modal-related-quiz">
                <div className="modal-content">
                    <h1>短板提升(DEMO)</h1>
                    <div className="divider"></div>
                    <div className="row">
                        <div className="col s12">
                            <h3>知识点详解</h3>
                            <p>{tmpIndicatorIntro[random]}</p>
                        </div>
                        <div className="col s12">
                            <ul className="tabs">
                                <li className="tab col s6"><a href={'#'+ id + '-tab1'} className="active">练习试题</a></li>
                                <li className="tab col s6"><a href={'#'+ id + '-tab2'}>微课推荐</a></li>
                            </ul>
                        </div>
                        <div id={id + '-tab1'} className="col s12">
                            <div className="zx-related-quiz-container">
                                {contentRelatedQuizs}
                            </div>
                        </div>
                        <div id={id + '-tab2'} className="col s12">
                            <div className="zx-video-wrapper">
                                <object width="640" height="360">
                                    <param name="movie"
                                           value="http://swf.ws.126.net/openplayer/v01/-0-2_MCMC9108Q_MCMC9OHQ3-vimg1_ws_126_net//image/snapshot_movie/2017/6/5/2/MCMCFEV52-1430711943278.swf"></param>
                                    <param name="allowScriptAccess" value="always"></param>
                                    <param name="wmode" value="transparent"></param>
                                    <embed
                                        src="http://swf.ws.126.net/openplayer/v01/-0-2_MCMC9108Q_MCMC9OHQ3-vimg1_ws_126_net//image/snapshot_movie/2017/6/5/2/MCMCFEV52-1430711943278.swf"
                                        type="application/x-shockwave-flash" width="640" height="360" allowFullScreen="true"
                                        wmode="transparent" allowScriptAccess="always"></embed>
                                </object>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}