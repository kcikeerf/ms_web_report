import React from 'react';
import PropTypes from 'prop-types'; // ES6
import $ from 'jquery';

import {createCookie, getCookie, removeCookie} from 'zx-misc/handleCookie';

import Preloader from './Preloader';

let config = require('zx-const')[process.env.NODE_ENV];

export default class TableIndicator extends React.Component {
    constructor() {
        super();
        this.state = {
            activeId: null
        }
    }
    handleDetails(e) {
        e.preventDefault();
        e.stopPropagation();

        let target = $(e.target).parents('tr');
        let indicatorID = target.attr('data-id');
        this.setState({
            activeId: indicatorID
        });
        let modalID = '#' + this.props.data.option.modalId;
        $(modalID).modal('open');
    }

    render() {
        let selecedAccessToken = getCookie(config.COOKIE.SELECTED_ACCESS_TOKEN);
        let data = this.props.data;
        let modalId = data.option.modalId;
        let tHeader = data.data.tHeader;
        let tData = data.data.tData;
        let tAction = data.data.tAction;

        let contentTHeader = tHeader.map((header, index) => {
            return <th key={index}>{header}</th>;
        });

        let contentTData = tData.map((data, index) => {
            let td = [];
            for (let property in data) {
                if (data.hasOwnProperty(property)) {
                    let content = data[property];
                    if (property === '0') {
                        //注释的是指标推送题方法 同116行
                        content = <a href="/">{content}</a>
                        content = <span>{content}</span>
                    }
                    td.push(<td key={property}>{content}</td>);
                }
            }
            return <tr key={index} data-id={tAction[index]} onClick={this.handleDetails.bind(this)}>{td}</tr>
        });

        return (
            <div className="zx-indicator-table-container">
                <table className="highlight zx-table-default">
                    <thead>
                    <tr>
                        {contentTHeader}
                    </tr>
                    </thead>

                    <tbody>
                    {contentTData}
                    </tbody>
                </table>
                <Modal id={modalId} selecedAccessToken={selecedAccessToken} indicatorId={this.state.activeId} />
            </div>
        )
    }
}

class Modal extends React.Component {
    constructor() {
        super();
        this.state = {
            relatedQuizs: null
        }
    }CDN_WLXX_INDICATOR_QUIZE_URL

    componentDidMount() {
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
                }.bind(this),
                complete: function () { // Callback for Modal close
                    $(window.parent.document.getElementsByClassName('zx-icon-clear')).show();
                    $('.zx-report-container-wrapper ').mCustomScrollbar('update');
                }
            });
        });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.indicatorId !== this.props.indicatorId) {
            let selecedAccessToken = nextProps.selecedAccessToken;
            let indicatorId = nextProps.indicatorId;
            //指标获取试题列表
            this.handleGetPaperQuizCkps(selecedAccessToken, indicatorId);
        }
    }

    //指标获取试题列表
    handleGetPaperQuizCkps(selecedAccessToken, ckp_id) {
        let testId = this.props.testId;
        let getPaperQuizCkpsApi = config.CDN_WLXX_INDICATOR_QUIZE_URL;
        let relatedQuizsData = {
            access_token: selecedAccessToken,
            ckp_uid: ckp_id,
            test_uid: testId
        };
        let getPaperQuizCkpsPromise = $.get(getPaperQuizCkpsApi);
        getPaperQuizCkpsPromise.done(function (responses) {
            let reaponeseArr = [];
            for (let i = 0; i < responses.length; i++) {
                if (responses[i].ckp_id === ckp_id) {
                    reaponeseArr.push(...responses[i].data);
                    break;
                }
            }
            if (reaponeseArr.length !== 0) {
                this.setState({
                    relatedQuizs: reaponeseArr
                });
            }
        }.bind(this));
        getPaperQuizCkpsPromise.fail(function (errorResponse) {
            console.log(errorResponse);
        }.bind(this));
    }

    handleAnswerDisplay(e) {
        let answer = $(e.target).parents('.zx-related-quiz-item').find('.zx-related-quiz-answer').toggle(300);
    }

    render() {
        let id = this.props.id;

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
                </div>;
        }

        return (
            <div id={id} className="modal zx-modal-related-quiz">
                <div className="modal-content">
                    <h1>试卷试题</h1>
                    <div className="divider"></div>
                    <div className="zx-related-quiz-container">
                        {contentRelatedQuizs}
                    </div>
                </div>
            </div>
        )
    }
}