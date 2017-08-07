import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Map, is} from 'immutable';
import $ from 'jquery';

import {createCookie, getCookie, removeCookie} from 'zx-misc/handleCookie';

import handleDelectUserList from '../../misc/handleDelectUser';

import AddBindUserPopUpBox from './AddBindUserPopUpBox';
import DelectSuccessPopUpBox from './DelectSuccessPopUpBox';
import WarningPopUpBox from  './WarningPopUpBox';
import IsDelectPopUpBox from './IsDelectPopUpBox';
import AddUserSuccessPopUpBox from './AddUserSuccessPopUpBox';

let config = require('zx-const')[process.env.NODE_ENV];

class BlockBindUserList extends Component {
    constructor() {
        super();
        this.state = {
            flage: null,
            PopBoxContain: null
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

    isDelectUser(code) {
        let userArr = $('.zx-bind-user-list>tbody').find('input:checked');
        $('#zx-is-delect-box').modal('close');
        let flage = code;
        if (flage) {
            let deleteUserArr = [];
            userArr.each(function () {
                deleteUserArr.push($(this).val());
            });
            let mainAccessToken = this.props.mainAccessToken;
            let data = {
                access_token: mainAccessToken,
                user_names: deleteUserArr
            };
            let delectUser = handleDelectUserList(data);

            delectUser.done(function (response) {
                this.setState({
                    delectPopBoxContain: response
                });
                $('#zx-modals-delect-box').modal('open');

                this.props.handleUpdateBindedUserList();
                //所有input都为空
                $('.zx-bind-user-list').find('input').removeAttr('checked');
            }.bind(this));

            delectUser.fail(function (errorResponse) {
                let repsonseStatus = errorResponse.status;
                if (repsonseStatus) {
                    if (repsonseStatus === 401) {
                        removeCookie(config.API_ACCESS_TOKEN);
                        this.context.router.push('/login');
                    }
                }
                else {

                }
            }.bind(this));
        }
    }

    deleteUser() {
        let userArr = $('.zx-bind-user-list>tbody').find('input:checked');
        if (userArr.length <= 0) {
            this.setState({
                PopBoxContain: '请选择至少一个要解除的账户'
            });
            $('#zx-warning-box').modal('open');
        } else {
            $('#zx-is-delect-box').modal('open');
        }
    }

    addUser() {
        $('#zx-adduser-modal').modal('open');
    }

    shouldComponentUpdate(nextProps , nextState){
        let propsMap = Map(this.props);
        let nextPropsMap = Map(nextProps);

        let stateMap = Map(this.state);
        let nextStateMap = Map(nextState);

        return !(is(propsMap, nextPropsMap) && is(stateMap, nextStateMap));
    }

    componentDidMount(){
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
        let userListData = this.props.data;
        let userList;
        if (userListData) {
            userList = userListData.map(function (obj, index) {
                return <BlockBindUserItem key={index} data={obj} id={index}/>
            });
        }

        return (
            <div className="zx-block-user">
                <div className="zx-bind-user-btn">

                    <a className="waves-effect waves-light btn" onClick={this.addUser.bind(this)}>
                        <span className="zx-bind-icon"><i className="material-icons">add</i></span>
                        <span className="zx-bind-label">添加用户</span>
                    </a>
                    <a className="waves-effect waves-light btn red lighten-2" onClick={this.deleteUser.bind(this)}>
                        <span className="zx-bind-icon"><i className="material-icons">remove</i></span>
                        <span className="zx-bind-label">解除用户</span>
                    </a>

                    <IsDelectPopUpBox isDelectUser={this.isDelectUser.bind(this)}/>
                    <DelectSuccessPopUpBox data={this.state.delectPopBoxContain}/>
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
                        <th>用户名称</th>
                        <th>用户名</th>
                        <th>角色</th>
                    </tr>
                    </thead>
                    <tbody>
                    {userList}
                    </tbody>
                </table>

                <AddBindUserPopUpBox
                    mainAccessToken={mainAccessToken}
                    handleUpdateBindedUserList = {this.props.handleUpdateBindedUserList.bind(this)}
                />
                <AddUserSuccessPopUpBox
                    mainAccessToken={mainAccessToken}
                    handleUpdateBindedUserList = {this.props.handleUpdateBindedUserList.bind(this)}
                />

            </div>

        )
    }
}

class BlockBindUserItem extends Component {

    render() {
        let data = this.props.data;
        let role = this.roleName(data.role);
        let inputId = `zx-bind-user-list-${this.props.id}`;
        return (
            <tr>
                <td>
                    <input type="checkbox" className="filled-in" id={inputId}
                           value={data.user_name}/>
                    <label htmlFor={inputId}></label>
                </td>
                <td>{data.name}</td>
                <td>{data.user_name}</td>
                <td>{role}</td>
            </tr>
        )
    }

    roleName(str) {
        switch (str) {
            case 'area_administrator':
                return '教育局';
                break;
            case 'tenant_administrator':
                return '校长';
                break;
            case 'teacher':
                return '老师';
                break;
            case 'pupil':
                return '学生';
                break;
            default:
                return '系统用户';
        }
    }
}

BlockBindUserList.contextTypes = {
    router: PropTypes.object.isRequired,
    handleUpdata: PropTypes.func,
    isDelectUser: PropTypes.func,
    handleAddCompelet: PropTypes.func
};

export default BlockBindUserList;