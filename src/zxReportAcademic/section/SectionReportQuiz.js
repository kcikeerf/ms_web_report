import React, {Component} from 'react';
import PropTypes from 'prop-types'; // ES6
import {Map, is} from 'immutable';
import $ from 'jquery';

import 'zx-style/customScrollBar/customScrollBar.css';
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
            selectedQuizParentData: null
        };
    }
    // //判断是否数据是否更改
    // shouldComponentUpdate(nextProps, nextState) {
    //     let propsMap = Map(this.props);
    //     let nextPropsMap = Map(nextProps);
    //     return !is(propsMap, nextPropsMap);
    // }

    handleQuizModalOpen(selectedQuizId, selectedQuizOrder,selectedQuizKnowledge, selectedQuizKnowledgeId, selectedQuizParentData=null) {
        let modalID = '#' + selectedQuizId;
        this.setState({
            modalActive: true,
            selectedQuizId,
            selectedQuizOrder,
            selectedQuizKnowledge,
            selectedQuizKnowledgeId,
            selectedQuizParentData
        });

        $('#zx-modal-quiz').modal('open');
    }

    render() {
        let accessToken = this.props.accessToken;
        let testId = this.props.testId;
        let id = this.props.id;
        let title = this.props.title;
        let options = this.props.options;
        let contentNote;
        if(options) {
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

                return (
                    <QuizItem
                        key={index}
                        id={id}
                        type={type}
                        order={order}
                        level={level}
                        knowledge={knowledge}
                        knowledgeId={knowledgeId}
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
                        selectedQuizParentData={selectedQuizParentData}
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
        this.state = {
        }
    }

    handleQuizModalOpen(e) {
        e.preventDefault();
        e.stopPropagation();

        let selectedQuizId = this.props.id;
        let selectedQuizOrder = this.props.order;
        let selectedQuizKnowledge= this.props.knowledge;
        let selectedQuizKnowledgeId = this.props.knowledgeId;
        let selectedQuizParentData = null;

        this.props.handleQuizModalOpen(selectedQuizId, selectedQuizOrder, selectedQuizKnowledge,selectedQuizKnowledgeId, selectedQuizParentData);
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
            relatedQuizs: null
        }
    }

    componentDidMount() {
        $(document).ready(function () {
            // 初始化弹框
            $('#zx-modal-quiz').modal({
                dismissible: true, // Modal can be dismissed by clicking outside of the modal
                opacity: .5, // Opacity of modal background
                inDuration: 300, // Transition in duration
                outDuration: 200, // Transition out duration
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

    componentWillReceiveProps(nextProps) {
        if (nextProps.active) {
            // 初始化tabs
            $('ul.tabs').tabs();

            let accessToken = this.props.accessToken;
            let testId = this.props.testId;
            let selectedQuizId = nextProps.selectedQuizId;
            console.log(typeof selectedQuizId);
            let selectedQuizKnowledgeId = nextProps.selectedQuizKnowledgeId;
            this.setState({
                relatedQuizs: null
            });
            this.handleOriginalQuiz(accessToken, testId, selectedQuizId);
            this.handleRelatedQuizs(accessToken, selectedQuizId, selectedQuizKnowledgeId);
        }
    }

    // 获取原题
    handleOriginalQuiz(accessToken, testId, selectedQuizId) {
        let quizDetailsApi = config.CDN_WLXX_QUIZE_URL + '/quize.json';
        let quizDetailsData = {
            access_token: accessToken,
            test_id: testId,
            qzp_id: selectedQuizId,
            user_name: null
        };

        let quizDetailsPromis = $.get(quizDetailsApi);
        quizDetailsPromis.done(function(responses) {
            let reaponeseArr = [];
            for(let i=0;i<responses.length;i++){
                if(responses[i].id === selectedQuizId){
                    reaponeseArr.push(responses[i]);
                    break;
                }
            }
            let response = reaponeseArr[0];
            this.setState({
                originalQuiz: {
                    fullScore: response.full_score,
                    body: response.text,
                    answer: response.answer,
                    // resultContent: response.result_info.result_answer
                }
            });
        }.bind(this));
        quizDetailsPromis.fail(function(errorResponse) {
            console.log(errorResponse);
        }.bind(this));
    }

    // 获取试题推送
    handleRelatedQuizs(accessToken,selectedQuizId, selectedQuizKnowledgeId, amount=2) {

        let relatedQuizsApi = config.CDN_WLXX_RELATED_QUIZE_URL + '/qiuz_detail.json';
        let relatedQuizsData = {
            access_token: accessToken,
            ckp_uid: selectedQuizKnowledgeId,
            amount: amount
        };
        let relatedQuizsPromise = $.get(relatedQuizsApi);
        relatedQuizsPromise.done(function(responses) {
            let reaponeseArr = [];
            for(let i=0;i<responses.length;i++){
                if(responses[i].uid === selectedQuizId){
                    reaponeseArr.push(responses[i]);
                }
            }
            this.setState({
                relatedQuizs: reaponeseArr
            });
        }.bind(this));
        relatedQuizsPromise.fail(function(errorResponse) {
            console.log(errorResponse);
        }.bind(this));
    }

    // 处理题目推送答案隐藏
    handleRelatedQuizAnswerDisplay(e) {
        let answer = $(e.target).parents('.zx-related-quiz-item').find('.zx-related-quiz-answer').toggle(300);
    }

    // 处理返回的正确答案
    handleOriginalQuizAnswerStyle(answer) {
        if (!answer && answer !== '') {
            if (/^\d{1,3}\./.test(answer)) {
                //let tmp_answer = answer.replace(/(\r\n|\n|\r|\s)/gm, '');
                let tmp_answer_array = answer.split(/\d{1,3}\./);
                tmp_answer_array.splice(0, 1);
                if (tmp_answer_array.length === 1) {
                    return <div className="zx-qzp-answer-container">{tmp_answer_array[0]}</div>;
                }
                else if (tmp_answer_array.length > 1) {
                    let content_item = tmp_answer_array.map((answer, index) =>
                        <li key={index}>
                            {answer}
                        </li>
                    );

                    return <div className="zx-qzp-answer-container">
                        <ol>{content_item}</ol>
                    </div>;
                }
                return answer;
            }
            else {
                answer = answer.replace(/(\r\n|\n|\r)/gm, '<br/>');
                return <div className="zx-qzp-answer-container" dangerouslySetInnerHTML={{__html: answer}}/>;
            }
        }
        else {
            return '暂无数据';
        }
    }

    //关闭错题弹框
    handleClose() {
        $('#zx-modal-quiz').modal('close');
    }

    render() {
        let selectedQuizId = this.props.selectedQuizId;
        let selectedQuizOrder = this.props.selectedQuizOrder;
        let selectedQuizKnowledge= this.props.selectedQuizKnowledge;

        let preloader = (
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
        );

        let contentaOriginalQuiz;
        let originalQuiz = this.state.originalQuiz;
        if (originalQuiz) {
            let originalQuizBody = originalQuiz.body;
            let originalQuizAnswer = this.handleOriginalQuizAnswerStyle(originalQuiz.answer);
            let originalQuizResultContent = originalQuiz.resultContent;
            let contentResult;
            if (originalQuizResultContent) {
                contentResult = (
                    <div className="section">
                        <h3>学生作答</h3>
                        <div className="zx-related-quiz-text" dangerouslySetInnerHTML={{__html: originalQuizResultContent}} />
                    </div>
                );
            }
            contentaOriginalQuiz = (
                <div className="section">
                    <div className="zx-related-quiz-item">
                        <div className="section">
                            <h3>原题</h3>
                            <div className="zx-related-quiz-text" dangerouslySetInnerHTML={{__html: originalQuizBody}} />
                        </div>
                        <div className="section">
                            <h3>答案</h3>
                            <div className="zx-related-quiz-text" dangerouslySetInnerHTML={{__html: originalQuizAnswer}} />
                        </div>
                        <div className="section">
                            <h3>知识点</h3>
                            <div className="zx-related-quiz-text">{selectedQuizKnowledge}</div>
                        </div>
                        {contentResult}
                    </div>
                </div>
            );
        }
        else {

        }

        let contentRelatedQuizs;
        if (this.state.relatedQuizs) {
            contentRelatedQuizs = this.state.relatedQuizs.map((quiz, index) => {
                return (
                    <div key={index} className="section">
                        <div className="zx-related-quiz-item">
                            <h3>练习题{index+1}</h3>
                            <div className="zx-related-quiz-text" dangerouslySetInnerHTML={{__html: quiz.text}} />
                            <div className="zx-related-quiz-answer-title">
                                <h3>答案</h3>
                                <button className="btn" onClick={this.handleRelatedQuizAnswerDisplay.bind(this)}>展开</button>
                            </div>
                            <div className="zx-related-quiz-answer" dangerouslySetInnerHTML={{__html: quiz.answer}} />
                        </div>
                    </div>
                )
            });
        }
        else {
            contentRelatedQuizs = preloader;
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
                        <div className="col s12">
                            <ul className="tabs">
                                <li className="tab col s6"><a href={'#'+ selectedQuizId + '-tab1'} className="active">答题分析</a></li>
                                <li className="tab col s6"><a href={'#'+ selectedQuizId + '-tab2'}>练习试题</a></li>
                            </ul>
                        </div>
                        <div id={selectedQuizId + '-tab1'} className="col s12">
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