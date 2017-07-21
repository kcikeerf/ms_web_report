import React, {Component} from 'react';
import PropTypes from 'prop-types';

import $ from 'jquery';
import AddBindUser from './AddBindUser';
import PopUpBox from './PopUpBox';
import IsDelectPopUpBox from './IsDelectPopUpBox';
import handleDelectUserList from '../../misc/handleDelectUser';
import getCookie from 'zx-misc/getCookie';
import removeCookie from 'zx-misc/removeCookie';

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
            console.log(1);
            $('.zx-bind-user-list').find('input').prop('checked', 'checked');
        } else {
            console.log(2);
            $('.zx-bind-user-list').find('input').removeAttr('checked');
        }
    }

    isDelectUser(code) {
        this.setState({
            flage: code
        });
    }

    deleteUser() {
        let userArr = $('.zx-bind-user-list>tbody').find('input:checked');

        if (userArr.length <= 0) {
            this.setState({
                PopBoxContain: '请选择至少一个要解除的账户'
            });
            $('#PopBox').modal('open');
            return false;
        } else {
            $('#isDelect').modal('open');

            if (this.state.flage) {
                let deleteUserArr = [];
                userArr.each(function () {
                    deleteUserArr.push($(this).val());
                });
                let access_token = getCookie('access_token');
                let data = {
                    access_token: null,
                    user_names: null
                }
                data.access_token = access_token;
                data.user_names = deleteUserArr;
                let delectUser = handleDelectUserList(data);

                delectUser.done(function (response) {
                    let message = '';
                    for (let k = 0; k < response.length; k++) {
                        message += response[k].message + '成功</<br>';
                    }
                    this.setState({
                        PopBoxContain: message
                    });
                    $('#PopBox').modal('open');
                    let userListData = this.props.data;
                    for (let i = 0; i < userListData.length; i++) {
                        for (let j = 0; j < response.length; j++) {
                            if (userListData[i].user_name == response[j].user_name) {
                                userListData.splice(i, 1);
                            }
                        }
                    }
                    this.props.handleUpdata(userListData);

                }.bind(this));

                delectUser.fail(function (errorResponse) {
                    let repsonseStatus = errorResponse.status;
                    if (repsonseStatus) {
                        if (repsonseStatus === 401) {
                            removeCookie('access_token');
                            this.context.router.push('/login');
                        }
                    }
                    else {

                    }
                }.bind(this));
            }

        }

    }

    addUser() {
        $('#zx-adduser-modal').modal('open');
    }

    render() {
        let userListData = this.props.data;
        let userList;
        if (userListData) {
            userList = userListData.map(function (obj, index) {
                return <BlockBindUserItem key={index} data={obj}/>
            });
        }
        return (
            <div className="zx-block-user">
                <table className="zx-bind-user-list">
                    <thead>
                    <tr>
                        <th><input type="checkbox" className="zx-check" onClick={this.checkAll.bind(this)}/><span
                            className="zx-all-labei">全选</span></th>
                        <th>用户名称</th>
                        <th>用户名</th>
                        <th>角色</th>
                    </tr>
                    </thead>
                    <tbody>
                    {userList}
                    </tbody>
                </table>
                <div className="zx-bind-user-btn">
                    <a className="waves-effect waves-light btn red" onClick={this.deleteUser.bind(this)}>
                        <span className="zx-bind-icon"><i className="material-icons">remove</i></span>
                        <span className="zx-bind-label">解除用户</span>
                    </a>

                    <a className="waves-effect waves-light btn" onClick={this.addUser.bind(this)}>
                        <span className="zx-bind-icon"><i className="material-icons">add</i></span>
                        <span className="zx-bind-label">添加用户</span>
                    </a>

                    <PopUpBox data={this.state.PopBoxContain}/>
                    <IsDelectPopUpBox isDelectUser={this.isDelectUser.bind(this)}/>
                </div>
                <AddBindUser />
            </div>

        )
    }
}

class BlockBindUserItem extends Component {

    render() {
        let data = this.props.data;
        let role = this.roleName(data.role);
        return (
            <tr>
                <td><input type='checkbox' className='zx-check' value={data.user_name}/></td>
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
    handleUpdata: PropTypes.func
};

export default BlockBindUserList;