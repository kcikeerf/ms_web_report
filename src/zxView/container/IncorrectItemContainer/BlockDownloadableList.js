import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Map, is} from 'immutable';
import $ from 'jquery';

import handlePrintPaper from '../../misc/handlePrintPaper';
import handleResponseError from '../../misc/handleResponseError';
import handleReportPrint from '../../misc/handleReportPrint';
import handleDateFormat from '../../misc/handleDateFormat';

import WarningPopUpBox from './WarningPopUpBox';
import IsPrintPopUpBox from './IsPrintPopUpBox';

class BlockDownloadableList extends Component {
    constructor() {
        super();
        this.state = {
            flage: null,
            PopBoxContain: null,
            paperListItem: null,
            testSubject: []
        }
    }

    checkAll(e) {
        e.stopPropagation();
        let target = e.target;

        let flag = $(target).prop('checked');
        if (flag) {
            $('.zx-bind-user-list').find('input').prop('checked', 'checked');
        } else {
            $('.zx-bind-user-list').find('input').removeAttr('checked');
        }
    }

    checkUser() {
        let userArr = $('.zx-bind-user-list>tbody').find('input:checked');
        if (userArr.length <= 0) {
            this.setState({
                PopBoxContain: '请选择至少一个要打印的试卷错题集'
            });
            $('#zx-warning-box').modal('open');
        } else {
            $('#zx-is-delect-box').modal('open');
        }
    }

    isPrintPaper(code) {
        let userArr = $('.zx-bind-user-list>tbody').find('input:checked');
        $('#zx-is-delect-box').modal('close');
        let flage = code;
        if (flage) {
            let paperListArr = [];
            userArr.each(function () {
                paperListArr.push($(this).val().split(',')[0]);
            });
            let mainAccessToken = this.props.mainAccessToken;
            let data = {
                access_token: mainAccessToken,
                report_url_list: paperListArr
            };
            let delectUser = handlePrintPaper(data);
            delectUser.done(function (response) {
                this.setState({
                    paperListItem: response
                });
                $('#zx-modals-delect-box').modal('open');
                // this.props.handleUpdateBindedUserList();
                //所有input都为空
                $('.zx-bind-user-list').find('input').removeAttr('checked');
                let list = response;
                let basic,
                    school,
                    subject,
                    name,
                    incorrectItem,
                    text = [],
                    bankQizpointQzps,
                    answer = [],
                    bankCheckpointCkps,
                    ability,
                    knowledge,
                    skill,
                    lastLable;
                let testList = list.collection;
                if (!$.isEmptyObject(testList)) {
                    basic = testList.basic;
                    school = basic.school;
                    subject = basic.subject;
                    name = basic.name;
                    incorrectItem = testList.incorrect_item;
                    for (let j = 0; j < incorrectItem.length; j++) {
                        let table;
                        if (incorrectItem[j].quiz_cat !== lastLable) {
                            text.push(`<h3 style="color: #1d7d74">${incorrectItem[j].quiz_cat_cn}</h3>`);
                            text.push(`<span style="float: right">[E.<span style="font-weight:700;">${(j + 1)}</span>]&nbsp;<span style="color: #1d7d74"><span style="font-weight: 700;">测试名:</span><span style="font-size:10px;">${incorrectItem[j].bank_test_name}${incorrectItem[j].bank_test_time}</span></span>${incorrectItem[j].text}</span>`);
                            lastLable = incorrectItem[j].quiz_cat
                        } else {
                            text.push(`<span style="float: right">[E.<span style="font-weight:700;">${(j + 1)}</span>]&nbsp;<span style="color: #1d7d74"><span style="font-weight: 700;">测试名:</span><span style="font-size:10px;">${incorrectItem[j].bank_test_name}${incorrectItem[j].bank_test_time}</span></span>${incorrectItem[j].text}</span>`);
                        }
                        bankQizpointQzps = incorrectItem[j].bank_qizpoint_qzps;
                        for (let n = 0; n < bankQizpointQzps.length; n++) {
                            let abilityName, knowledgeName, skillName;
                            bankCheckpointCkps = bankQizpointQzps[n].bank_checkpoint_ckps;
                            answer.push(`<span style="float: right">[E.<span style="font-weight:700;">${(j + 1)}</span>]</span><p>${bankQizpointQzps[n].answer}</p>`);
                            for (let m in bankCheckpointCkps) {
                                if (m === 'ability') {
                                    ability = bankCheckpointCkps.ability;
                                    if (ability.length !== 0) {
                                        for (let k = 0; k < ability.length; k++) {
                                            abilityName = ability[k].name;
                                            abilityName = `${abilityName.split('/')[0]}/${abilityName.split('/')[1]}`
                                        }
                                    } else {
                                        abilityName = ''
                                    }
                                }
                                else if (m === 'knowledge') {
                                    knowledge = bankCheckpointCkps.knowledge;
                                    if (knowledge.length !== 0) {
                                        for (let k = 0; k < knowledge.length; k++) {
                                            knowledgeName = knowledge[k].name;
                                            knowledgeName = `${knowledgeName.split('/')[0]}/${knowledgeName.split('/')[1]}`
                                        }
                                    } else {
                                        knowledgeName = ''
                                    }
                                }
                                else if (m === 'skill') {
                                    skill = bankCheckpointCkps.skill;
                                    if (skill.length !== 0) {
                                        for (let k = 0; k < skill.length; k++) {
                                            skillName = skill[k].name;
                                            skillName = `${skillName.split('/')[0]}/${skillName.split('/')[1]}`
                                        }
                                    } else {
                                        skillName = ''
                                    }
                                }
                            }
                            table = `<table border="1">
                                    <tr>
                                        <th style='background:#ede7f6'>知识</th>
                                        <th style='background:#ede7f6'>${knowledgeName}</th>
                                    </tr>
                                    <tr>
                                        <th style='background:#e8eaf6'>技能</th>
                                        <th style='background:#e8eaf6'>${skillName}</th>
                                    </tr>
                                    <tr>
                                        <th style='background:#ede7f6'>能力</th>
                                        <th style='background:#ede7f6'>${abilityName}</th>
                                    </tr>
                                </table>`;
                            answer.push(table);
                        }
                    }
                }

                let date = handleDateFormat('yyyy年MM月dd日');
                let firstPage = `<div style="position:relative;width:795px;height:1120px;background:#ffffff;margin:0 auto;">
                    <div style="position:absolute;right:80px;top:80px;text-align: right;">
                        <img 
                        src="data:image/png;base64,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"
                        style="width: 190px;height: 115px;"
                        />
                    </div>
                    <br/><br/><br/><br/><br/><br/><br/><br/>
                    <div style="position:absolute;left:95px;top:375px;">
                        <p style="color:#1d7d74;font-size:25px;font-weight:700;">${subject} 错题本</p>
                        <p style="color:#1d7d74;font-size:25px;font-weight:700;">INCORRECT ITEM COLLECTION</p>
                    </div>
                    <br/><br/><br/><br/><br/><br/><br/><br/>
                    <div style="position:absolute;right:95px;bottom:245px;text-align:right;">
                        <p style="color: #1d7d74;font-weight: 700;font-size: 20px;">${school}</p>
                        <p style="color: #1d7d74;font-weight: 700;font-size: 20px;">${name}</p>
                    </div>
                    <br/><br/><br/><br/><br/><br/>
                    <span style="float: left;position: absolute;bottom: 87px;left: 95px;">
                        <img 
                        src="data:image/png;base64,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" alt=""
                        />
                    </span>
                    <br/><br/>
                    <div style="position:absolute;text-align:right;color:#1d7d74;font-weight:700;">打印时间 : ${date}</div>
                </div>
                <br/><br/><br/>
                `;
                handleReportPrint([firstPage, ...text, ...["<br/><br style='page-break-before:always'/><h1>答案</h1>"], ...answer]);
                let userArr = $('.zx-bind-user-list>tbody').find('input');
                userArr.each(function () {
                    $(this).removeAttr("disabled");
                });
                this.setState({testSubject: []});
            }.bind(this));

            delectUser.fail(function (errorResponse) {
                handleResponseError(this, errorResponse);
            }.bind(this));
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        let propsMap = Map(this.props);
        let nextPropsMap = Map(nextProps);
        let stateMap = Map(this.state);
        let nextStateMap = Map(nextState);

        return !(is(propsMap, nextPropsMap) && is(stateMap, nextStateMap));
    }

    componentDidMount() {
        $(document).ready(function () {
            $('.modal').modal({
                dismissible: true, // Modal can be dismissed by clicking outside of the modal
                opacity: .5, // Opacity of modal background
                inDuration: 300, // Transition in duration
                outDuration: 200, // Transition out duration
                startingTop: '4%', // Starting top style attribute
                endingTop: '15%', // Ending top style attribute
            });
        });
    }

    checkFun(e) {
        let $tool = $('.zx-bind-user-list>tbody');
        if ($(e.target).is(':checked')) {
            let par = $(e.target).val().split(",")[1];
            let testSubject = this.state.testSubject;
            testSubject.push(par);
            this.setState({testSubject: testSubject});
            let userArrCheck = $tool.find('input:checked');
            if ($(userArrCheck).val()) {
                if ($(e.target).is(':checked')) {
                    let userArrCheck = $tool.find('input:checked');
                    let userArr = $tool.find('input');
                    let subject;
                    if (userArrCheck.val()) {
                        let paperInfos = $(userArrCheck).val().split(",");
                        subject = paperInfos[1];
                        userArr.each(function () {
                            if ($(this).val().split(",")[1] !== subject) {
                                $(this).attr("disabled", "disabled");
                            }
                        });
                    }
                }
                else {
                    let userArr = $('.zx-bind-user-list>tbody').find('input');
                    userArr.each(function () {
                        $(this).removeAttr("disabled");
                    })
                }
            }
        }
        else {
            this.state.testSubject.pop();
            if (this.state.testSubject.length === 0) {
                let userArr = $('.zx-bind-user-list>tbody').find('input');
                userArr.each(function () {
                    $(this).removeAttr("disabled");
                })
            }
        }
    }

    render() {
        let mainAccessToken = this.props.mainAccessToken;
        let paperList = this.props.data;
        let userList;
        if (paperList) {
            userList = paperList.map(function (item, index) {
                return <BlockBindUserItem
                    key={index}
                    data={item}
                    id={index}
                    checkFun={this.checkFun.bind(this)}
                />
            }.bind(this));
        }

        return (
            <div className="zx-block-user">
                <div className="zx-bind-user-btn">
                    <a className="waves-effect waves-light btn" onClick={this.checkUser.bind(this)}>
                        <span className="zx-bind-icon"><i className="material-icons">print</i></span>
                        <span className="zx-bind-label">打印错题</span>
                    </a>
                    <span className="zx-notice">
                        <i className="material-icons ">report</i>
                        <span className="zx-notice-text">
                            : 仅支持单一学科一次或多次错题集打印
                        </span>
                    </span>
                    <IsPrintPopUpBox isPrintPaper={this.isPrintPaper.bind(this)}/>
                    <WarningPopUpBox data={this.state.PopBoxContain}/>
                </div>

                <table className="zx-bind-user-list">
                    <thead>
                    <tr>
                        <th>
                            <label className="zx-check-all-center" htmlFor="zx-bind-user-list-filled-in-box">选项</label>
                        </th>
                        <th>试卷列表</th>
                    </tr>
                    </thead>
                    <tbody>
                    {userList}
                    </tbody>
                </table>

            </div>

        )
    }
}

class BlockBindUserItem extends Component {

    render() {
        let data = this.props.data;
        let inputId = `zx-bind-user-list-${this.props.id}`;
        let url = [data.report_url, data.subject];

        return (
            <tr>
                <td>
                    <input type="checkbox" className="filled-in" id={inputId} value={url}
                           onClick={this.props.checkFun.bind(this)}/>
                    <label htmlFor={inputId}></label>
                </td>
                <td value={url}>{data.name}</td>
            </tr>
        )

    }
}

BlockDownloadableList.contextTypes = {
    router: PropTypes.object.isRequired,
    handleUpdata: PropTypes.func,
    isDelectUser: PropTypes.func,
    handleAddCompelet: PropTypes.func
};

export default BlockDownloadableList;