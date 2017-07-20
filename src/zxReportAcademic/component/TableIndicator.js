import React from 'react';
import PropTypes from 'prop-types'; // ES6
import $ from 'jquery';

import getCookie from 'zx-misc/getCookie';

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

        let modalID = '#' + this.props.modalId;
        $(modalID).modal('open');
    }

    render() {
        let selecedAccessToken = getCookie('selected_access_token');
        let modalId = this.props.modalId;
        let data = this.props.data;
        let tHeader = data.tHeader;
        let tData = data.tData;
        let tAction = data.tAction;

        let contentTHeader = tHeader.map((header, index) => {
            return <th key={index}>{header}</th>;
        });

        let contentTData = tData.map((data, index) => {
            let td = [];
            for (let property in data) {
                if (data.hasOwnProperty(property)) {
                    let content = data[property];
                    if (property === '0') {
                        content = <a href="/">{content}</a>
                    }
                    td.push(<td key={property}>{content}</td>);
                }
            }
            return <tr key={index} data-id={tAction[index]} onClick={this.handleDetails.bind(this)}>{td}</tr>
        });

        return (
            <div className="zx-indicator-table-container">
                <table className="responsive-table highlight">
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
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.indicatorId !== this.props.indicatorId) {
            let selecedAccessToken = nextProps.selecedAccessToken;
            let indicatorId = nextProps.indicatorId;
            this.setState({
                relatedQuizs: null
            });
            this.handleRelatedQuizs(selecedAccessToken, indicatorId);
        }
    }

    handleRelatedQuizs(selecedAccessToken, indicatorId, amount=3) {
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
            console.log(errorResponse);
        }.bind(this));
    }

    render() {
        console.log(this.props.indicatorId);
        let id = this.props.id;

        let contentRelatedQuizs;
        if (this.state.relatedQuizs) {
            contentRelatedQuizs = this.state.relatedQuizs.map((quiz, index) => {
                return (
                    <div key={index} className="section">
                        <div className="zx-related-quiz-item">
                            <h3>题目{index+1}</h3>
                            <div className="zx-related-quiz-text" dangerouslySetInnerHTML={{__html: quiz.text}} />
                            <h3>答案</h3>
                            <div className="zx-related-quiz-answer" dangerouslySetInnerHTML={{__html: quiz.answer}} />
                        </div>
                    </div>
                )
            });

            contentRelatedQuizs =
                <div className="zx-related-quiz-container">
                    {contentRelatedQuizs}
                </div>
            ;
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
            <div id={id} className="modal zx-modal-quiz">
                <div className="modal-content">
                    {contentRelatedQuizs}
                </div>
            </div>
        )
    }
}