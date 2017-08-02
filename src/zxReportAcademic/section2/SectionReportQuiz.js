import React, {Component} from 'react';
import PropTypes from 'prop-types'; // ES6
import {Map, is} from 'immutable';
import $ from 'jquery';

import getCookie from 'zx-misc/getCookie';

import {SectionWrongQuizePopUp} from './SectionWrongQuizePopUp';

let config = require('zx-const')[process.env.NODE_ENV];

export class SectionReportQuiz extends Component {
    constructor() {
        super();
        this.state = {
            modalActive: null,
            selectedQuizId: null,
            selectedQuizKnowledgeId: null
        };
    }
    // //判断是否数据是否更改
    // shouldComponentUpdate(nextProps, nextState) {
    //     let propsMap = Map(this.props);
    //     let nextPropsMap = Map(nextProps);
    //     return !is(propsMap, nextPropsMap);
    // }

    handleQuizModalOpen(selectedQuizId, selectedQuizKnowledgeId) {
        let modalID = '#' + selectedQuizId;
        this.setState({
            modalActive: true,
            selectedQuizId: selectedQuizId,
            selectedQuizKnowledgeId: selectedQuizKnowledgeId
        });

        $('#zx-modal-quiz').modal('open');
    }

    render() {
        let accessToken = this.props.accessToken;
        let testId = this.props.testId;
        let id = this.props.id;
        let title = this.props.title;

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
                let knowledgeId = selfValue.data.knowledge[0].uid;

                return (
                    <QuizItem
                        key={index}
                        id={id}
                        type={type}
                        order={order}
                        level={level}
                        knowledgeId={knowledgeId}
                        handleQuizModalOpen={this.handleQuizModalOpen.bind(this)}
                    />
                )
            });
        }

        let modalActive = this.state.modalActive;
        let selectedQuizId = this.state.selectedQuizId;
        let selectedQuizKnowledgeId = this.state.selectedQuizKnowledgeId;

        return (
            <div id={id} className="zx-section-container">
                <div className="section">
                    <h2>{title}</h2>
                    <div className="zx-quiz-container">
                        {contentQuiz}
                    </div>
                    <QuizModal
                        accessToken={accessToken}
                        testId={testId}
                        active={modalActive}
                        selectedQuizId={selectedQuizId}
                        selectedQuizKnowledgeId={selectedQuizKnowledgeId}
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

        let target = $($(e.target).parent());
        let selectedQuizId = target.attr('data-target');
        let selectedQuizKnowledgeId = target.attr('data-knowledge');

        this.props.handleQuizModalOpen(selectedQuizId, selectedQuizKnowledgeId);
    }

    render() {
        let id = this.props.id;
        let type = this.props.type;
        let order = this.props.order;

        let knowledgeId = this.props.knowledgeId;

        let level = this.props.level;
        let style = `zx-quiz-item zx-quiz-item-${level}`;
        return (
            <div className={style} data-target={id} data-knowledge={knowledgeId}>
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
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.active) {
            // 初始化tabs
            $('ul.tabs').tabs();

            let accessToken = this.props.accessToken;
            let testId = this.props.testId;
            let selectedQuizId = nextProps.selectedQuizId;
            let selectedQuizKnowledgeId = nextProps.selectedQuizKnowledgeId;
            this.setState({
                relatedQuizs: null
            });
            this.handleOriginalQuiz(accessToken, testId, selectedQuizId);
            this.handleRelatedQuizs(accessToken, selectedQuizKnowledgeId);
        }
    }

    // 获取原题
    handleOriginalQuiz(accessToken, testId, selectedQuizId) {
        let quizDetailsApi = config.API_DOMAIN + config.API_QUIZS_DETAILS;
        let quizDetailsData = {
            access_token: accessToken,
            test_id: testId,
            qzp_id: selectedQuizId,
            user_name: null
        };

        let quizDetailsPromis = $.post(quizDetailsApi, quizDetailsData);
        quizDetailsPromis.done(function(response) {
            console.log(response);
        }.bind(this));
        quizDetailsPromis.fail(function(errorResponse) {
            console.log(errorResponse);
        }.bind(this));
    }

    // 获取试题推送
    handleRelatedQuizs(accessToken, selectedQuizKnowledgeId, amount=2) {
        let relatedQuizsApi = config.API_DOMAIN + config.API_GET_RELATED_QUIZS;
        let relatedQuizsData = {
            access_token: accessToken,
            ckp_uid: selectedQuizKnowledgeId,
            amount: amount
        };
        let relatedQuizsPromise = $.post(relatedQuizsApi, relatedQuizsData);
        relatedQuizsPromise.done(function(response) {
            this.setState({
                relatedQuizs: response
            });
        }.bind(this));
        relatedQuizsPromise.fail(function(errorResponse) {
            console.log(errorResponse);
        }.bind(this));
    }

    handleAnswerDisplay(e) {
        let answer = $(e.target).parents('.zx-related-quiz-item').find('.zx-related-quiz-answer').toggle(300);
    }

    render() {
        let selectedQuizId = this.props.selectedQuizId;

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
            contentRelatedQuizs = preloader;
        }

        return (
            <div id='zx-modal-quiz' className="modal zx-modal-related-quiz">
                <div className="modal-content">
                    <h1>题目分析</h1>
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