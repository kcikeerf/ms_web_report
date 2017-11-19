import React, {Component} from 'react';
import PropTypes from 'prop-types'; // ES6
import {Map, is} from 'immutable';
import $ from 'jquery';

import Preloader from './../component/Preloader';

import 'zx-style/customScrollBar/customScrollBar.css';

import {createCookie, getCookie, removeCookie} from 'zx-misc/handleCookie';

require('jquery-mousewheel')($);
require('malihu-custom-scrollbar-plugin')($);

let config = require('zx-const')[process.env.NODE_ENV];

export class SectionReportQuiz extends Component {
    constructor() {
        super();
        this.state = {
            modalActive: null,
            selectedQuizId: null,
            selectedQuizOrder: null,
            selectedQuizKnowledge: null,
            selectedQuizKnowledgeId: null,
            selectedQuizParentData: null,
            quizsListResponse: null,
            getPaperQuizCkpsResponse: null,
            quizsDetailResponse: null,
            relatedQuizsResponse: null,
        };
    }

    // //判断是否数据是否更改
    // shouldComponentUpdate(nextProps, nextState) {
    //     let propsMap = Map(this.props);
    //     let nextPropsMap = Map(nextProps);
    //     return !is(propsMap, nextPropsMap);
    // }

    handleQuizModalOpen(selectedQuizId, selectedQuizOrder, selectedQuizKnowledge, selectedQuizKnowledgeId, selectedQuizAbilityId, selectedQuizSkillId, selectedQuizParentData = null) {
        let modalID = '#' + selectedQuizId;
        this.setState({
            modalActive: true,
            selectedQuizId,
            selectedQuizOrder,
            selectedQuizKnowledge,
            selectedQuizKnowledgeId,
            selectedQuizAbilityId,
            selectedQuizSkillId,
            selectedQuizParentData
        });

        $('#zx-modal-quiz').modal('open');
    }

    handleQuizsListResponse(response, indicatorId) {
        this.setState({
            quizsListResponse: response,
            indicatorId: indicatorId
        });

        $('#zx-modal-quiz').modal('close');
        $('#list').modal('open');
    }

    // 推题
    handleRelatedQuizsResponse(response) {
        this.setState({
            relatedQuizsResponse: response
        });
    }

    // 试题详情
    handleQuizsDetailResponse(response) {
        this.setState({
            quizsDetailResponse: response
        });
        $('#detail').modal('open');
        $('#list').modal('close');
    }


    // 试题列表
    handleList(checkPointUid, e) {
        this.setState({
            activeId: checkPointUid
        });
        $('#list').modal('open');
        $('#detail').modal('close');

        let selecedAccessToken = getCookie(config.COOKIE.SELECTED_ACCESS_TOKEN);

        //指标获取试题列表
        this.handleGetPaperQuizCkps(selecedAccessToken, checkPointUid);
    }

    //指标获取试题列表
    handleGetPaperQuizCkps(selecedAccessToken, checkPointUid) {
        let testId = this.props.testId;

        let getPaperQuizCkpsApi = config.API_DOMAIN + config.API_GET_PAPER_QUIZ_CKPS;
        let relatedQuizsData = {
            access_token: selecedAccessToken,
            ckp_uid: checkPointUid,
            test_uid: testId
        };

        let getPaperQuizCkpsPromise = $.post(getPaperQuizCkpsApi, relatedQuizsData);
        getPaperQuizCkpsPromise.done(function (response) {
            if (response.qzps.length !== 0) {
                this.setState({
                    getPaperQuizCkpsResponse: response
                });
            }
        }.bind(this));
        getPaperQuizCkpsPromise.fail(function (errorResponse) {
            console.log(errorResponse);
        }.bind(this));

    }

    handleDetailClose() {
        $('#detail').modal('close');
    }

    render() {

        let testSubject = this.props.testSubject;
        let testGrade = this.props.testGrade;
        let accessToken = this.props.accessToken;
        let testId = this.props.testId;
        let id = this.props.id;
        let title = this.props.title;
        let options = this.props.options;
        let contentNote;
        if (options) {
            contentNote = options.map(function (obj, index) {
                let style = `zx-quiz-note-${obj.level}`;
                return <li key={index} className="zx-quiz-note">
                    <div className={style}>{obj.color}</div>
                    <span className="zx-quiz-word">{obj.note}</span>
                </li>;
            });
        }
        let data = this.props.data;
        let contentQuiz;
        if (data) {
            contentQuiz = data.map((dataItem, index) => {
                let selfValue = dataItem.selfValue;
                let parentValues = dataItem.parentValues;

                let id = selfValue.data.id;
                let type = selfValue.data.type;
                let order = selfValue.data.customOrder || selfValue.data.systemOrder || selfValue.data.order;
                let level = selfValue.data.level;
                let knowledge = selfValue.data.knowledge[0].checkpoint;
                let knowledgeId = selfValue.data.knowledge[0].uid;
                let skillId = selfValue.data.knowledge[0].uid;
                let abilityId = selfValue.data.knowledge[0].uid;

                return (
                    <QuizItem
                        key={index}
                        id={id}
                        type={type}
                        order={order}
                        level={level}
                        knowledge={knowledge}
                        knowledgeId={knowledgeId}
                        skillId={skillId}
                        abilityId={abilityId}

                        handleQuizModalOpen={this.handleQuizModalOpen.bind(this)}
                    />
                )
            });
        }

        let modalActive = this.state.modalActive;
        let selectedQuizId = this.state.selectedQuizId;
        let selectedQuizOrder = this.state.selectedQuizOrder;
        let selectedQuizKnowledge = this.state.selectedQuizKnowledge;
        let selectedQuizKnowledgeId = this.state.selectedQuizKnowledgeId;
        let selectedQuizAbilityId = this.state.selectedQuizAbilityId;
        let selectedQuizSkillId = this.state.selectedQuizSkillId;
        let selectedQuizParentData = this.state.selectedQuizParentData;

        return (
            <div id={id} className="zx-section-container">
                <div className="section">
                    <h2>{title}</h2>
                    <div className="zx-note-container">
                        <div className="zx-note-icon"><i className="material-icons">info_outline</i></div>
                        <ul className="zx-note-content">
                            {contentNote}
                        </ul>
                    </div>
                    <div className="zx-quiz-container">
                        {contentQuiz}
                    </div>
                    <QuizModal
                        accessToken={accessToken}
                        testId={testId}
                        active={modalActive}
                        selectedQuizId={selectedQuizId}
                        selectedQuizOrder={selectedQuizOrder}
                        selectedQuizKnowledge={selectedQuizKnowledge}
                        selectedQuizKnowledgeId={selectedQuizKnowledgeId}
                        selectedQuizAbilityId={selectedQuizAbilityId}
                        selectedQuizSkillId={selectedQuizSkillId}
                        selectedQuizParentData={selectedQuizParentData}
                        testSubject={testSubject}
                        testGrade={testGrade}
                        handleQuizsListResponse={this.handleQuizsListResponse.bind(this)}
                    />
                    <ListModal
                        accessToken={accessToken}
                        testId={testId}
                        quizsListResponse={this.state.quizsListResponse}
                        testSubject={testSubject}
                        testGrade={testGrade}
                        indicatorId={this.state.indicatorId}
                        handleQuizsDetailResponse={this.handleQuizsDetailResponse.bind(this)}
                        handleRelatedQuizsResponse={this.handleRelatedQuizsResponse.bind(this)}


                    />
                    <DetailModal
                        handleDetailClose={this.handleDetailClose.bind(this)}
                        originalQuiz={this.state.quizsDetailResponse}//详情
                        relatedQuizsResponse={this.state.relatedQuizsResponse}//推题
                        handleList={this.handleList.bind(this)}
                        // id={modalId}
                    />
                </div>
                <div className="divider"></div>
            </div>
        )
    }
}

//错题单题block
class QuizItem extends Component {
    constructor() {
        super();
        this.state = {}
    }

    handleQuizModalOpen(e) {
        e.preventDefault();
        e.stopPropagation();

        let selectedQuizId = this.props.id;
        let selectedQuizOrder = this.props.order;
        let selectedQuizKnowledge = this.props.knowledge;
        let selectedQuizKnowledgeId = this.props.knowledgeId;
        let selectedQuizAbilityId = this.props.abilityId;
        let selectedQuizSkillId = this.props.skillId;
        let selectedQuizParentData = null;

        this.props.handleQuizModalOpen(selectedQuizId, selectedQuizOrder, selectedQuizKnowledge, selectedQuizKnowledgeId, selectedQuizAbilityId, selectedQuizSkillId, selectedQuizParentData);
    }

    render() {
        let type = this.props.type;
        let order = this.props.order;
        let level = this.props.level;
        let style = `zx-quiz-item zx-quiz-item-${level}`;

        return (
            <div className={style}>
                <div className="zx-quiz-item-top">
                    <div className="zx-quiz-item-left">{type}</div>
                </div>
                <div className="zx-quiz-item-main" onClick={this.handleQuizModalOpen.bind(this)}>
                    {order}
                </div>
            </div>
        )
    }
}

QuizItem.contextTypes = {
    handleQuizModalOpen: PropTypes.func
};

class QuizModal extends React.Component {
    constructor() {
        super();
        this.state = {
            originalQuiz: null,
            relatedQuizs: null,
            getPaperQuizCkpsResponse: null,
            flag: false
        }
    }

    componentDidMount() {
        $(document).ready(function () {
            // 初始化弹框
            $('#zx-modal-quiz').modal({
                dismissible: false, // Modal can be dismissed by clicking outside of the modal
                opacity: 0.5, // Opacity of modal background
                inDuration: 300, // Transition in duration
                outDuration: 300, // Transition out duration
                startingTop: '4%', // Starting top style attribute
                endingTop: '10%', // Ending top style attribute,
                ready: function (modal, trigger) { // Callback for Modal open. Modal and trigger parameters available.
                    // 隐藏iframe关闭按钮
                    $(window.parent.document.getElementsByClassName('zx-icon-clear')).hide();
                    // 禁用报告滚动
                    $('.zx-report-container-wrapper ').mCustomScrollbar('disable');
                }.bind(this),
                complete: function () { // Callback for Modal close
                    $(window.parent.document.getElementsByClassName('zx-icon-clear')).show();
                    $('.zx-report-container-wrapper ').mCustomScrollbar('update');
                }
            });
        });

        $('.zx-modal-related-quiz').mCustomScrollbar({
            theme: 'inset-3-dark',
            scrollInertia: 400,
            mouseWheel: {scrollAmount: 200},
        });

    }

    componentDidUpdate() {
        $('ul.tabs').tabs({});
        $('.point').css('display', 'block');
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            flag: false,
        });
        if (nextProps.active) {
            // 初始化tabs
            $('ul.tabs').tabs();

            let testSubject = this.props.testSubject;
            let testGrade = this.props.testGrade;
            let accessToken = this.props.accessToken;
            let testId = this.props.testId;
            let selectedQuizId = nextProps.selectedQuizId;
            let selectedQuizKnowledgeId = nextProps.selectedQuizKnowledgeId;
            let selectedQuizAbilityId = nextProps.selectedQuizAbilityId;
            let selectedQuizSkillId = nextProps.selectedQuizSkillId;
            this.setState({
                relatedQuizs: null
            });
            this.handleOriginalQuiz(accessToken, testId, selectedQuizId, selectedQuizKnowledgeId, selectedQuizAbilityId, selectedQuizSkillId, testSubject, testGrade);
        }
    }

    // 获取原题
    handleOriginalQuiz(accessToken, testId, selectedQuizId, selectedQuizKnowledgeId, selectedQuizAbilityId, selectedQuizSkillId, testSubject, testGrade) {
        let quizDetailsApi = config.API_DOMAIN + config.API_QUIZS_DETAILS;
        let quizDetailsData = {
            access_token: accessToken,
            test_id: testId,
            qzp_id: selectedQuizId,
            user_name: null
        };
        let quizCat;
        let quizDetailsPromis = $.post(quizDetailsApi, quizDetailsData);
        quizDetailsPromis.done(function (response) {
            quizCat = response.quiz_cat;
            this.setState({
                originalQuiz: {
                    fullScore: response.full_score,
                    body: response.quiz_body,
                    answer: response.qzp_answer,
                    resultContent: response.result_info.result_answer,
                    quizCat: response.quiz_cat,
                    checkPoint: (response.lv2_ckp && response.lv2_ckp.knowledge[0] && response.lv2_ckp.knowledge[0].checkpoint) ? (response.lv2_ckp.knowledge[0].checkpoint) : null,
                    checkPointUid: (response.lv2_ckp && response.lv2_ckp.knowledge[0] && response.lv2_ckp.knowledge[0].uid) ? (response.lv2_ckp.knowledge[0].uid) : null,
                }
            });

            //试题推送方法
            //判断 当前为九年级才调用
            // if (testGrade === 'jiu_nian_ji') {
            this.handleRelatedQuizs(accessToken, selectedQuizKnowledgeId, selectedQuizAbilityId, selectedQuizSkillId, testSubject, testGrade, quizCat, selectedQuizId);
            // }

        }.bind(this));
        quizDetailsPromis.fail(function (errorResponse) {
            console.log(errorResponse);
        }.bind(this));
    }

    // 获取试题推送
    handleRelatedQuizs(accessToken, selectedQuizKnowledgeId, selectedQuizAbilityId, selectedQuizSkillId, testSubject, testGrade, quizCat, selectedQuizId, amount = 3) {
        let relatedQuizsApi = config.API_DOMAIN + config.API_GET_RELATED_QUIZS_PLUS;
        let relatedQuizsData;
        let parameter = {
            access_token: accessToken,
            grade: testGrade,
            subject: testSubject,
            accuracy: "exact",
            knowledge_uid: selectedQuizKnowledgeId,
            quiz_uid: selectedQuizId,
            levelword: "zhong_deng",
            amount: amount,
        };

        if (testSubject === 'ying_yu') {
            relatedQuizsData = {
                ...parameter,
                cat_type: quizCat,
            }
        } else {
            relatedQuizsData = {
                ...parameter
            }
        }


        let relatedQuizsPromise = $.post(relatedQuizsApi, relatedQuizsData);

        relatedQuizsPromise.done(function (response) {
            if (response.length !== 0) {
                this.setState({
                    flag: true,
                    relatedQuizs: response
                });
            }
        }.bind(this));
        relatedQuizsPromise.fail(function (errorResponse) {
            console.log(errorResponse);
        }.bind(this));
    }

    // 处理题目推送答案隐藏
    handleRelatedQuizAnswerDisplay(e) {
        let answer = $(e.target).parents('.zx-related-quiz-item').find('.zx-related-quiz-answer').toggle(300);
    }

    // 处理返回的正确答案
    handleOriginalQuizAnswerStyle(answer) {
        if (answer && answer !== '') {
            if (answer != null && typeof answer != 'undefined') {
                if (/^\d{1,3}\./.test(answer)) {
                    //let tmp_str = answer.replace(/(\r\n|\n|\r|\s)/gm, '');
                    let tmp_str_array = answer.split(/\d{1,3}\./);
                    tmp_str_array.splice(0, 1);
                    if (tmp_str_array.length === 1) {
                        return <div className="zy-qzp-answer-container">{tmp_str_array[0]}</div>;
                    }
                    else if (tmp_str_array.length > 1) {
                        let content_item = tmp_str_array.map((answer, index) =>
                            <li key={index}>
                                {answer}
                            </li>
                        );

                        return <div className="zy-qzp-answer-container">
                            <ol>{content_item}</ol>
                        </div>;
                    }
                    return answer;
                }
                else {
                    answer = answer.replace(/(\r\n|\n|\r)/gm, '<br/>');
                    return <div className="zy-qzp-answer-container" dangerouslySetInnerHTML={{__html: answer}}/>;
                }
            }
            else {
                return answer;
            }
        }
    }

    //关闭错题弹框
    handleClose() {
        $('#zx-modal-quiz').modal('close');
    }

    // 试题列表
    handleList(checkPointUid, e) {
        let accessToken = this.props.accessToken;
        //指标获取试题列表
        this.handleGetPaperQuizCkps(accessToken, checkPointUid);
    }

    //指标获取试题列表
    handleGetPaperQuizCkps(selecedAccessToken, indicatorId) {
        let testId = this.props.testId;
        let getPaperQuizCkpsApi = config.API_DOMAIN + config.API_GET_PAPER_QUIZ_CKPS;
        let relatedQuizsData = {
            access_token: selecedAccessToken,
            ckp_uid: indicatorId,
            test_uid: testId
        };
        let getPaperQuizCkpsPromise = $.post(getPaperQuizCkpsApi, relatedQuizsData);
        getPaperQuizCkpsPromise.done(function (response) {
            if (response.qzps.length !== 0) {
                this.setState({
                    getPaperQuizCkpsResponse: response,
                    flag: true
                });
            }

            this.props.handleQuizsListResponse(response, indicatorId);

        }.bind(this));
        getPaperQuizCkpsPromise.fail(function (errorResponse) {
            console.log(errorResponse);
        }.bind(this));
    }


    render() {
        let selectedQuizId = this.props.selectedQuizId;
        let selectedQuizOrder = this.props.selectedQuizOrder;

        let preloader = (
            <div className="zx-modal-preloader-container">
                <div className="preloader-wrapper active">
                    <div className="spinner-layer spinner-red-only">
                        <div className="circle-clipper left">
                            <div className="circle"></div>
                        </div>
                        <div className="gap-patch">
                            <div className="circle"></div>
                        </div>
                        <div className="circle-clipper right">
                            <div className="circle"></div>
                        </div>
                    </div>
                </div>
            </div>
        );

        let contentaOriginalQuiz, contentRelatedQuizs;
        let originalQuiz = this.state.originalQuiz;
        if (originalQuiz) {
            let originalQuizBody = originalQuiz.body;
            let selectedQuizKnowledge = originalQuiz.checkPoint ? (originalQuiz.checkPoint) : null;
            if (selectedQuizKnowledge) {
                selectedQuizKnowledge = <a href="javascript:;">{selectedQuizKnowledge}</a>
            }
            else {
                selectedQuizKnowledge = <p className="zx-related-quiz">暂时无法找到对应指标</p>
            }
            let checkPointUid = originalQuiz.checkPointUid;
            let originalQuizAnswer = this.handleOriginalQuizAnswerStyle(originalQuiz.answer);
            let originalQuizResultContent = originalQuiz.resultContent;
            let contentResult;
            if (originalQuizResultContent) {
                contentResult = (
                    <div className="section">
                        <h3>学生作答</h3>
                        <div className="zx-related-quiz-text"
                             dangerouslySetInnerHTML={{__html: originalQuizResultContent}}/>
                    </div>
                );
            }
            contentaOriginalQuiz = (
                <div className="section">
                    <div className="zx-related-quiz-item">
                        <div className="section">
                            <h3>原题</h3>
                            <div className="zx-related-quiz-text" dangerouslySetInnerHTML={{__html: originalQuizBody}}/>
                        </div>
                        <div className="section">
                            <h3>答案</h3>
                            <div className="zx-related-quiz-text">
                                {originalQuizAnswer}
                            </div>
                        </div>
                        <div className="section" onClick={this.handleList.bind(this, checkPointUid)}>
                            <h3>知识点</h3>
                            <div className="zx-related-quiz-text">
                                {selectedQuizKnowledge}
                            </div>
                        </div>
                        {contentResult}
                    </div>
                </div>
            );
        }
        else {
            contentRelatedQuizs = <Preloader/>;
        }

        let Tabs;
        if (this.state.relatedQuizs && this.state.flag) {
            Tabs = <ul className="tabs">
                <li className="tab col s6"><a href={'#' + selectedQuizId + '-tab1'} className="active">答题分析</a></li>
                <li className="tab col s6"><a href={'#' + selectedQuizId + '-tab2'}>试题推送</a></li>
            </ul>;
            contentRelatedQuizs = this.state.relatedQuizs.map((quiz, index) => {
                return (
                    <div key={index} className="section">
                        <div className="zx-related-quiz-item">
                            <h3>练习题{index + 1}</h3>
                            <div className="zx-related-quiz-text" dangerouslySetInnerHTML={{__html: quiz.text}}/>
                            <div className="zx-related-quiz-answer-title">
                                <h3>答案</h3>
                                <button className="btn" onClick={this.handleRelatedQuizAnswerDisplay.bind(this)}>展开
                                </button>
                            </div>
                            <div className="zx-related-quiz-answer" dangerouslySetInnerHTML={{__html: quiz.answer}}/>
                        </div>
                    </div>
                )
            });
        }
        else {
            Tabs = <ul className="tabs">
                <li className="tab col s12"><a href={'#' + selectedQuizId + '-tab1'} className="active">答题分析</a></li>
            </ul>;
        }

        return (
            <div id='zx-modal-quiz' className="modal zx-modal-related-quiz">
                <div className="modal-content">
                    <span className="zx-font-size">第{selectedQuizOrder}题</span>
                    <span className="zx-close" onClick={this.handleClose.bind(this)}>
                        <i className="material-icons zx-font-size">clear</i>
                    </span>
                    <div className="divider"></div>
                    <div className="row">

                        <div className="col s12 zx-overflow-x">
                            {Tabs}
                        </div>

                        <div id={selectedQuizId + '-tab1'} className="col s12 point">
                            <div className="zx-related-quiz-container">
                                {contentaOriginalQuiz}
                            </div>
                        </div>

                        <div id={selectedQuizId + '-tab2'} className="col s12">
                            <div className="zx-related-quiz-container">
                                {contentRelatedQuizs}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

class ListModal extends React.Component {

    componentDidMount() {
        $(document).ready(function () {
            $('.modal').modal();
        });
    }

    //关闭弹框
    handleClose() {
        $('#list').modal('close');
    }

    render() {
        let testId = this.props.testId;
        let indicatorId = this.props.indicatorId;
        let testSubject = this.props.testSubject;
        let testGrade = this.props.testGrade;
        let selecedAccessToken = this.props.accessToken;
        let contentRelatedQuizs, contentOriginalQuiz, quizId;
        let data = {
            tData: [],
            tHeader: ['题号', '题类型', '难易程度', '题目'],
            quizId: []
        };

        if (this.props.quizsListResponse) {
            this.props.quizsListResponse.qzps.forEach((quiz, index) => {
                quizId = quiz.uid;
                let tData = [
                    quiz.order,
                    quiz.cat_cn,
                    quiz.levelword,
                    '查看试题详情'
                ];
                data.tData.push(tData);
                data.quizId.push(quizId);
            });

            let contentRelatedQuizs =
                <TableScrollWithSkip
                    handleQuizsDetailResponse={this.props.handleQuizsDetailResponse.bind(this)}
                    handleRelatedQuizsResponse={this.props.handleRelatedQuizsResponse.bind(this)}
                    // id={id}
                    data={data}
                    testId={testId}
                    testSubject={testSubject}
                    testGrade={testGrade}
                    indicatorId={indicatorId}
                    selecedAccessToken={selecedAccessToken}
                    handleClose={this.handleClose.bind(this)}
                />;

            contentOriginalQuiz =
                <div className="row">
                    <div className="col s12">
                        <div className="zx-related-quiz-container">
                            {contentRelatedQuizs}
                        </div>
                    </div>
                </div>
        }
        else {
            contentOriginalQuiz =
                <div className="zx-modal-preloader-container">
                    <div className="preloader-wrapper active">
                        <div className="spinner-layer spinner-red-only">
                            <div className="circle-clipper left">
                                <div className="circle"></div>
                            </div>
                            <div className="gap-patch">
                                <div className="circle"></div>
                            </div>
                            <div className="circle-clipper right">
                                <div className="circle"></div>
                            </div>
                        </div>
                    </div>
                </div>;
        }

        let id = 'list';
        return (
            <div id={id} className="modal zx-modal-related-quiz">
                <div className="modal-content">
                    <span className="zx-font-size">原题列表</span>
                    <span className="zx-close" onClick={this.handleClose.bind(this)}>
                        <i className="material-icons zx-font-size">clear</i>
                    </span>
                    <div className="divider"></div>
                    <div className="row">
                        <div id={`${id}-tab1`} className="col s12 point">
                            <div className="zx-related-quiz-container">
                                {contentOriginalQuiz}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


class TableScrollWithSkip extends React.Component {

    constructor() {
        super();
        this.state = {
            originalQuiz: null,
            relatedQuizs: null
        };
    }

    componentDidMount() {
        $('.zx-table-scroll tbody').mCustomScrollbar({
            theme: 'inset-3-dark',
            scrollInertia: 400,
            mouseWheel: {scrollAmount: 200}
        });
    }

    handleQuizsDetails(quizId, e) {
        let testSubject = this.props.testSubject;
        let testGrade = this.props.testGrade;
        let indicatorId = this.props.indicatorId;

        let testId = this.props.testId;
        let selecedAccessToken = this.props.selecedAccessToken;
        let quizDetailsApi = config.API_DOMAIN + config.API_QUIZS_DETAILS;
        let quizDetailsData = {
            access_token: selecedAccessToken,
            test_id: testId,
            qzp_id: quizId,
            user_name: null
        };
        let quizCat;
        let quizDetailsPromis = $.post(quizDetailsApi, quizDetailsData);
        quizDetailsPromis.done(function (response) {
            quizCat = response.quiz_cat;
            this.setState({
                originalQuiz: {
                    fullScore: response.full_score,
                    body: response.quiz_body,
                    answer: response.qzp_answer,
                    resultContent: response.result_info.result_answer,
                    quizCat: response.quiz_cat
                }
            });

            this.props.handleQuizsDetailResponse(response);

            //试题推送方法
            //判断 当前为九年级才调用
            // if (testGrade === 'jiu_nian_ji') {
            this.handGetRelatedQuizsPlus(selecedAccessToken, indicatorId, testSubject, testGrade, quizCat, quizId);
            // }

        }.bind(this));
    }

    //试题推送方法
    handGetRelatedQuizsPlus(accessToken, selectedQuizKnowledgeId, testSubject, testGrade, quizCat, selectedQuizId, amount = 3) {
        let getRelatedQuizsPlusApi = config.API_DOMAIN + config.API_GET_RELATED_QUIZS_PLUS;
        let relatedQuizsData;
        let parameter = {
            access_token: accessToken,
            grade: testGrade,
            subject: testSubject,
            accuracy: "exact",
            knowledge_uid: selectedQuizKnowledgeId,
            quiz_uid: selectedQuizId,
            levelword: "zhong_deng",
            amount: amount,
        };

        if (testSubject === 'ying_yu') {
            relatedQuizsData = {
                ...parameter,
                cat_type: quizCat,
            }
        } else {
            relatedQuizsData = {
                ...parameter
            }
        }

        let getRelatedQuizsPlusPromise = $.post(getRelatedQuizsPlusApi, relatedQuizsData);
        getRelatedQuizsPlusPromise.done(function (response) {
            if (response.length !== 0) {
                this.setState({
                    flag: true,
                    relatedQuizs: response
                });
            }

            this.props.handleRelatedQuizsResponse(response);

        }.bind(this));
        getRelatedQuizsPlusPromise.fail(function (errorResponse) {
            console.log(errorResponse);
        }.bind(this));
    }

    render() {
        let data = this.props.data;

        //传入标题和数据
        let tHeader = data.tHeader;
        let tData = data.tData;

        //设置样式
        let tStyle = data.tStyle || 'bordered zx-table-scroll';

        let contentTHeader = tHeader.map((header, index) => {
            return <th key={index}>{header}</th>;
        });
        let content;
        let contentTData = tData.map((data, index) => {
            let td = [];
            for (let i = 0; i < data.length; i++) {
                if (i === 3) {
                    content = <a href="javascript:;">{data[i]}</a>
                } else {
                    content = data[i]
                }
                td.push(<td key={i}
                            onClick={this.handleQuizsDetails.bind(this, this.props.data.quizId[index])}>{content}</td>);
            }
            return <tr key={index}>{td}</tr>
        });

        return (
            <div>
                <table className={tStyle}>
                    <thead>
                    <tr>
                        {contentTHeader}
                    </tr>
                    </thead>

                    <tbody>
                    {contentTData}
                    </tbody>
                </table>
            </div>
        )
    }
}


// 此组件只接收父级传来的数据（试题详情和推题）
class DetailModal extends React.Component {
    constructor() {
        super();
        this.state = {}
    }

    componentDidMount() {
        $(document).ready(function () {
            $('.zx-modal-related-quiz').modal({
                dismissible: false, // Modal can be dismissed by clicking outside of the modal
                opacity: .5, // Opacity of modal background
                inDuration: 300, // Transition in duration
                outDuration: 300, // Transition out duration
                startingTop: '4%', // Starting top style attribute
                endingTop: '10%', // Ending top style attribute,
                ready: function (modal, trigger) { // Callback for Modal open. Modal and trigger parameters available.
                    $(window.parent.document.getElementsByClassName('zx-icon-clear')).hide();
                    $('.zx-report-container-wrapper ').mCustomScrollbar('disable');
                }.bind(this),
                complete: function () { // Callback for Modal close
                    $(window.parent.document.getElementsByClassName('zx-icon-clear')).show();
                    $('.zx-report-container-wrapper ').mCustomScrollbar('update');
                }
            });
        });
    }


    componentDidUpdate() {
        $('ul.tabs').tabs();
        $('.point').css('display', 'block');
    }

    componentWillUnmount() {

    }

    // 处理题目推送答案隐藏
    handleRelatedQuizAnswerDisplay(e) {
        let answer = $(e.target).parents('.zx-related-quiz-item').find('.zx-related-quiz-answer').toggle(300);

    }

    render() {
        let id = 'detail';
        let contentaQuizDetail, contentQuizsPlus;
        let originalQuiz = this.props.originalQuiz;
        let relatedQuizsResponse = this.props.relatedQuizsResponse;
        let selectedQuizOrder, Tabs;

        // 原题详情
        if (originalQuiz) {
            let originalQuizBody = originalQuiz.quiz_body;
            let originalQuizAnswer = originalQuiz.qzp_answer;
            selectedQuizOrder = originalQuiz.qzp_order;
            let checkPoint = originalQuiz.lv2_ckp.knowledge[0].checkpoint;
            let checkPointUid = originalQuiz.lv2_ckp.knowledge[0].uid;
            contentaQuizDetail = (
                <div className="section">
                    <div className="zx-related-quiz-item">
                        <div className="section">
                            <h3>原题</h3>
                            <div className="zx-related-quiz-text" dangerouslySetInnerHTML={{__html: originalQuizBody}}/>
                        </div>

                        <div className="section">
                            <h3>答案</h3>
                            <div className="zx-related-quiz-text"
                                 dangerouslySetInnerHTML={{__html: originalQuizAnswer}}/>
                        </div>

                        <div className="section" onClick={this.props.handleList.bind(this, checkPointUid)}>
                            <h3>知识点</h3>
                            <div className="zx-related-quiz-text">
                                <a href="javascript:;">{checkPoint}</a>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
        else {
            contentaQuizDetail = <Preloader/>;
        }

        // 试题
        if (relatedQuizsResponse) {
            Tabs = <ul className="tabs">
                <li className="tab col s6"><a href={'#' + id + '-tab1'} className="active">原题</a></li>
                <li className="tab col s6"><a href={'#' + id + '-tab2'}>试题推送</a></li>
            </ul>;
            contentQuizsPlus = relatedQuizsResponse.map((quiz, index) => {
                return (
                    <div key={index} className="section">
                        <div className="zx-related-quiz-item">
                            <h3>练习题{index + 1}</h3>
                            <div className="zx-related-quiz-text" dangerouslySetInnerHTML={{__html: quiz.text}}/>
                            <div className="zx-related-quiz-answer-title">
                                <h3>答案</h3>
                                <button className="btn" onClick={this.handleRelatedQuizAnswerDisplay.bind(this)}>
                                    展开
                                </button>
                            </div>
                            <div className="zx-related-quiz-answer" dangerouslySetInnerHTML={{__html: quiz.answer}}/>
                        </div>
                    </div>
                )
            });
        }
        else {
            Tabs = <ul className="tabs">
                <li className="tab col s12">
                    <a href={'#' + id + '-tab1'} className="active">原题</a>
                </li>
            </ul>;
        }

        return (
            <div id={id} className="modal zx-modal-related-quiz">
                <div className="modal-content">
                    <span className="zx-font-size">第{selectedQuizOrder}题</span>
                    <span className="zx-close" onClick={this.props.handleDetailClose.bind(this)}>
                        <i className="material-icons zx-font-size">clear</i>
                    </span>
                    <div className="divider"></div>
                    <div className="row">

                        <div className="col s12 zx-overflow-x">
                            {Tabs}
                        </div>

                        <div id={id + '-tab1'} className="col s12">
                            <div className="zx-related-quiz-container">
                                {contentaQuizDetail}
                            </div>
                        </div>

                        <div id={id + '-tab2'} className="col s12">
                            <div className="zx-related-quiz-container">
                                {contentQuizsPlus}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}