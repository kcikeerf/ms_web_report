import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Map, is} from 'immutable';
import $ from 'jquery';

import handlePrintPaper from '../../misc/handlePrintPaper';
import handleResponseError from '../../misc/handleResponseError';
import handleReportPrint from '../../misc/handleReportPrint';

import WarningPopUpBox from './WarningPopUpBox';
import IsPrintPopUpBox from './IsPrintPopUpBox';

class BlockDownloadableList extends Component {
    constructor() {
        super();
        this.state = {
            flage: null,
            PopBoxContain: null,
            paperListItem: null,
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

    deleteUser() {
        let userArr = $('.zx-bind-user-list>tbody').find('input:checked');
        if (userArr.length <= 0) {
            this.setState({
                PopBoxContain: '请选择至少一个要打印的试卷'
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
                paperListArr.push($(this).val());
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
                this.props.handleUpdateBindedUserList();
                //所有input都为空
                $('.zx-bind-user-list').find('input').removeAttr('checked');
                let list = this.state.paperListItem;
                let basic,
                    incorrectItem,
                    text = [],
                    bankQizpointQzps,
                    answer = [],
                    bankCheckpointCkps,
                    ability,
                    knowledge,
                    skill;
                let testList = list.collection.test_list;
                if (testList.length !== 0) {
                    for (let i = 0; i < testList.length; i++) {
                        incorrectItem = testList[i].incorrect_item;
                        for (let j = 0; j < incorrectItem.length; j++) {
                            let table;
                            text.push(incorrectItem[j].text);
                            bankQizpointQzps = incorrectItem[j].bank_qizpoint_qzps;
                            for (let n = 0; n < bankQizpointQzps.length; n++) {
                                let abilityName, knowledgeName, skillName;
                                bankCheckpointCkps = bankQizpointQzps[n].bank_checkpoint_ckps;
                                answer.push(`<p>${bankQizpointQzps[n].answer}</p>`);
                                for (let m in bankCheckpointCkps) {
                                    if (m === 'ability') {
                                        ability = bankCheckpointCkps.ability;
                                        if (ability.length!==0) {
                                            for (let k = 0; k < ability.length; k++) {
                                                abilityName = ability[k].name;
                                                abilityName = `${abilityName.split('/')[0]}/${abilityName.split('/')[1]}`
                                            }
                                        }else {
                                            abilityName=''
                                        }
                                    }
                                    else if (m === 'knowledge') {
                                        knowledge = bankCheckpointCkps.knowledge;
                                        if (knowledge.length!==0) {
                                            for (let k = 0; k < knowledge.length; k++) {
                                                knowledgeName = knowledge[k].name;
                                                knowledgeName = `${knowledgeName.split('/')[0]}/${knowledgeName.split('/')[1]}`
                                            }
                                        }else {
                                            knowledgeName=''
                                        }
                                    }
                                    else if (m === 'skill') {
                                        skill = bankCheckpointCkps.skill;
                                        if (skill.length!==0) {
                                            for (let k = 0; k < skill.length; k++) {
                                                skillName = skill[k].name;
                                                skillName = `${skillName.split('/')[0]}/${skillName.split('/')[1]}`
                                            }
                                        }else {
                                            skillName=''
                                        }
                                    }
                                }
                                table = `<table border="1">
                                    <tr>
                                        <th style='background:#ede7f6'>知识</th>
                                        <th style='background:#e8eaf6'>技能</th>
                                        <th style='background:#e3f2fd'>能力</th>
                                    </tr>
                                    <tr>
                                        <td style='background:#ede7f6'>${knowledgeName}</td>
                                        <td style='background:#e8eaf6'>${abilityName}</td>
                                        <td style='background:#e3f2fd'>${skillName}</td>
                                    </tr>
                                </table>`;
                                answer.push(table);
                            }
                        }
                    }
                }
                handleReportPrint([...text, ...answer]);
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

    render() {
        let mainAccessToken = this.props.mainAccessToken;
        let paperList = this.props.data;
        let userList;
        if (paperList) {
            userList = paperList.map(function (item, index) {
                return <BlockBindUserItem key={index} data={item} id={index}/>
            });
        }

        return (
            <div className="zx-block-user">
                <div className="zx-bind-user-btn">

                    <a className="waves-effect waves-light btn" onClick={this.deleteUser.bind(this)}>
                        <span className="zx-bind-icon"><i className="material-icons">print</i></span>
                        <span className="zx-bind-label">打印错题</span>
                    </a>
                    <IsPrintPopUpBox isPrintPaper={this.isPrintPaper.bind(this)}/>
                    <WarningPopUpBox data={this.state.PopBoxContain}/>
                </div>

                <table className="zx-bind-user-list">
                    <thead>
                    <tr>
                        <th>
                            <input type="checkbox" className="filled-in" id="zx-bind-user-list-filled-in-box"
                                   onClick={this.checkAll.bind(this)}/>
                            <label className="zx-check-all-center" htmlFor="zx-bind-user-list-filled-in-box">全选</label>
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
        let url = this.props.data.report_url;
        return (
            <tr>
                <td>
                    <input type="checkbox" className="filled-in" id={inputId} value={url}/>
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