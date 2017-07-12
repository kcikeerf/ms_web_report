import React from 'react';
import $ from 'jquery';

import getCookie from 'zx-misc/getCookie';
import PhotoZoom from './PhotoZoomItem';

import 'zx-style/customScrollBar/customScrollBar.css';
require('jquery-mousewheel')($);
require('malihu-custom-scrollbar-plugin')($);

let config = require('zx-const')[process.env.NODE_ENV];

export class SectionWrongQuizePopUp extends React.Component {
    constructor() {
        super();
        this.state = {
            data_ready: null,
            classPreloader: '',
            qzp_order: null,
            qzp_body: null,
            qzp_answer: null,
            qzp_response: null,
            qzp_img_url: null,
        }
    }

    componentDidMount() {
        $('.modal').mCustomScrollbar({
            theme: 'minimal-dark',
            scrollInertia: 400,
            mouseWheel:{ scrollAmount: 80 }
        });

        $(document).ready(function () {
            $('.zx-modal-quiz').modal({
                dismissible: true, // Modal can be dismissed by clicking outside of the modal
                opacity: .5, // Opacity of modal background
                inDuration: 300, // Transition in duration
                outDuration: 200, // Transition out duration
                startingTop: '4%', // Starting top style attribute
                endingTop: '10%', // Ending top style attribute
                ready: function(modal, trigger) { // Callback for Modal open. Modal and trigger parameters available.
                    console.log(modal, trigger);
                    $(window.parent.document.getElementsByClassName('zx-icon-clear')).hide();
                },
                complete: function() { // Callback for Modal close
                    $(window.parent.document.getElementsByClassName('zx-icon-clear')).show();
                }
            });
        });

        if (this.props.wrongObj) {
            let qzp_id = this.props.wrongObj.qzp_id;
            let access_token = getCookie('access_token');
            let reportUrlKlass = getCookie('report_url');
            let arrayReportUrl = reportUrlKlass.split('/');
            let positionTests = arrayReportUrl.indexOf('tests');
            let testId = arrayReportUrl[positionTests + 1];
            let api_quiz_details = config.API_DOMAIN + config.API_QUIZS_DETAILS;
            let postData = {
                access_token: access_token,
                test_id: testId,
                qzp_id: qzp_id,
                user_name: null
            };

            $.post(api_quiz_details, postData, function (response, status) {
                let qzp_order, qzp_body, qzp_answer, qzp_response, qzp_img_url;
                qzp_order = response.qzp_order;
                qzp_body = response.quiz_body;
                qzp_answer = response.qzp_answer;
                qzp_response = response.result_info.hyt_quiz_data[Object.keys(response.result_info.hyt_quiz_data)[0]];
                qzp_img_url = response.result_info.hyt_snapshot_data[Object.keys(response.result_info.hyt_snapshot_data)[0]];

                this.setState({
                    data_ready: true,
                    classPreloader: 'loaded',
                    qzp_order: qzp_order,
                    qzp_body: qzp_body,
                    qzp_answer: qzp_answer,
                    qzp_response: qzp_response,
                    qzp_img_url: qzp_img_url
                });
            }.bind(this), 'json').fail(function (status) {
                this.setState({
                    data_ready: false,
                    classPreloader: 'loaded'
                });
            }.bind(this));
        }

    }

    // 处理返回的正确答案
    handleRegData(str) {
        if (str != null && typeof str != 'undefined') {
            if (/^\d{1,3}\./.test(str)) {
                //let tmp_str = str.replace(/(\r\n|\n|\r|\s)/gm, '');
                let tmp_str_array = str.split(/\d{1,3}\./);
                tmp_str_array.splice(0, 1);
                if (tmp_str_array.length === 1) {
                    return <div className="zx-qzp-answer-container">{tmp_str_array[0]}</div>;
                }
                else if (tmp_str_array.length > 1) {
                    let content_item = tmp_str_array.map((answer, index) =>
                        <li key={index}>
                            {answer}
                        </li>
                    );

                    return <div className="zx-qzp-answer-container">
                        <ol>{content_item}</ol>
                    </div>;
                }
                return str;
            }
            else {
                str = str.replace(/(\r\n|\n|\r)/gm, '<br/>');
                return <div className="zx-qzp-answer-container" dangerouslySetInnerHTML={{__html: str}}/>;
            }
        }
        else {
            return str;
        }
    }

    render() {
        let wrongObj = this.props.wrongObj;
        let id = this.props.id;
        let qzp_order;
        let qzp_body = this.state.qzp_body;
        let qzp_answer = this.state.qzp_answer;
        let qzp_response = this.state.qzp_response;
        let qzp_img_url = this.state.qzp_img_url;

        if (wrongObj) {
            qzp_order = wrongObj.order;
        }
        let content_student_answer, content_student_answer_choice, content_student_answer_img;
        if (qzp_response != null) {
            content_student_answer_choice =
                <div className="zx-qzp-response-container">
                    {qzp_response}
                </div>;
        }
        if (qzp_response != null || qzp_img_url != null) {
            content_student_answer =
                <section className="zx-report-subsection">
                    <h3 className="zx-report-subsection-title">第{qzp_order}题的作答</h3>
                    {content_student_answer_choice}
                    {content_student_answer_img}
                </section>
        }
        if (qzp_img_url != null) {
            content_student_answer_img =
                <div className="zx-qzp-response-container">
                    <PhotoZoom src={qzp_img_url}/>
                </div>
        }
        let content_qzp_answer = this.handleRegData(qzp_answer);

        let contentQuizKnowledge;
        if (wrongObj) {
            contentQuizKnowledge =
                <div className="zx-qzp-response-container">
                    {wrongObj.knowledge}
                </div>
            ;
        }

        let conentQuizStudent;
        let contentTableStats;
        if (wrongObj && this.props.wrongObj.reportType === "project") {
            conentQuizStudent =
                <section className="zx-report-subsection">
                    <h3 className="zx-report-subsection-title">学生得分情况</h3>
                    <div className="zx-qzp-response-container">
                        <p>本题满分：{wrongObj.full}分</p>
                        <p>平均得分：{wrongObj.average}分</p>
                    </div>
                </section>;

            let tableData = <tr>
                <td>区域</td>
                <td className="zx-text-align-right">{wrongObj.average}/{wrongObj.full}分</td>
                <td className="zx-text-align-right">{wrongObj.correct_count}人</td>
                <td className="zx-text-align-right">{wrongObj.pupil_number}人</td>
            </tr>;

            contentTableStats =
                <table className="table zx-table">
                    <tbody>
                    <tr>
                        <th></th>
                        <th className="zx-text-align-right">平均得分/满分</th>
                        <th className="zx-text-align-right">满分人数</th>
                        <th className="zx-text-align-right">总人数</th>
                    </tr>
                    {tableData}
                    </tbody>
                </table>
        }

        let content_modal;
        let data_ready = this.state.data_ready;
        if (data_ready === false) {
            content_modal = <h3 className="zx-text-align-center">网络繁忙，请稍后再试</h3>;
        }
        else if (data_ready === true) {
            content_modal =
                <section className="zx-report-section">
                    <h2 className="zx-section-title">错题分析-第{qzp_order}题</h2>
                    <section className="zx-report-subsection">
                        <h3 className="zx-report-subsection-title">题目</h3>
                        <div className="zx-qzp-body-container" dangerouslySetInnerHTML={{__html: qzp_body}}/>
                    </section>
                    {content_student_answer}
                    <section className="zx-report-subsection">
                        <h3 className="zx-report-subsection-title">参考答案</h3>
                        {content_qzp_answer}
                    </section>
                    <section className="zx-report-subsection">
                        <h3 className="zx-report-subsection-title">知识点</h3>
                        {contentQuizKnowledge}
                    </section>
                    {conentQuizStudent}
                    <section className="zx-report-subsection">
                        <h3 className="zx-report-subsection-title">统计数据</h3>
                        {contentTableStats}
                    </section>
                </section>
        }

        return (
            <div id={id} className="modal zx-modal-quiz">
                <div className="modal-content">
                    <div className="zx-container-body">
                        {content_modal}
                    </div>
                </div>
            </div>
        )
    }
}



