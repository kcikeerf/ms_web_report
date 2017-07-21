import React, {Component} from 'react';
import $ from 'jquery';
import AddBindUser from './AddBindUser';

export function handleBindUserList(arr) {
    if(!arr){
        return null;
    }
    let userList = [];
    for (let i = 0; i < arr.length; i++) {
        let obj = {
            id: null,
            name: null,
            role: null,
            user_name: null,
            access_token: null
        }
        obj.id = arr[i].id;
        obj.name = arr[i].name;
        obj.role = roleName(arr[i].role);
        obj.user_name = arr[i].user_name;
        obj.access_token = arr[i].access_token;

        userList.push(obj);
    }
    function roleName(str) {
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

    return userList;
}

export class BlockBindUserList extends Component {
    checkAll(e){
        e.stopPropagation();
        let target=e.target;

        let flag = $(target).prop('checked');
        console.log(!$(target).prop('checked'));
        if(flag){
            console.log(1);
            $('.zx-bind-user-list').find('input').prop('checked','checked');
        }else {
            console.log(2);
            $('.zx-bind-user-list').find('input').removeAttr('checked');
        }
    }

    deleteUser(){
        
        $(".zx-bind-user-list")
        let modalID = '#33333';
        $(modalID).modal('open');
    }

    addUser(){
        $('#zx-adduser-modal').modal('open');
    }

    render() {
        let userListData = this.props.data;
        let userList;
        if(userListData){
            userList = userListData.map(function (obj,index) {
                return <BlockBindUserItem key={index} data = {obj}/>
            });
        }
        return (
            <div className="zx-block-user">
                <table className="zx-bind-user-list" >
                    <thead>
                    <tr>
                        <th><input type="checkbox" className="zx-check" onClick={this.checkAll.bind(this)}/><span className="zx-all-labei">全选</span></th>
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
                    <a className="waves-effect waves-light btn" onClick={this.addUser.bind(this)}><i className="material-icons" >add</i></a>
                    <a className="waves-effect waves-light btn red" onClick={this.deleteUser.bind(this)}><i className="material-icons" >remove</i></a>
                </div>
                <AddBindUser />
            </div>

        )
    }
}

class BlockBindUserItem extends Component {
    checkSelect(){

    }

    render() {
        let data = this.props.data;
        return (
            <tr>
                <td token = {data.access_token}><input type='checkbox' className='zx-check' onClick={this.checkSelect.bind(this)}/></td>
                <td>{data.name}</td>
                <td>{data.user_name}</td>
                <td>{data.role}</td>
            </tr>
        )
    }
}