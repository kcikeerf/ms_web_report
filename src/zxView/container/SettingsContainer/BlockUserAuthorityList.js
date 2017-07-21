import React, {Component} from 'react';
let config = require('zx-const')[process.env.NODE_ENV];

export default class BlockUserAuthorityList extends Component {
    render() {
        let userRole = this.props.data;
        let userAuthorityList;
        if (userRole === config.USER_ROLE_AREA_ADMINISTRATOR) {
            userAuthorityList = [
                '查看区域报告',
                '查看所有学校报告',
                '查看所有班级报告',
                '查看所有学生报告',
            ]
        }
        else if (userRole === config.USER_ROLE_TENANT_ADMINISTRATOR) {
            userAuthorityList = [
                '查看本学校报告',
                '查看本学校的所有班级报告',
                '查看本学校的所有学生报告',
            ]
        }
        else if (userRole === config.USER_ROLE_PROJECT_ADMINISTRATOR) {
            userAuthorityList = [
                '查看区域报告',
                '查看所有学校报告',
                '查看所有班级报告',
                '查看所有学生报告',
            ]
        }
        else if (userRole === config.USER_ROLE_TEACHER) {
            userAuthorityList = [
                '查看本班级报告',
                '查看本班级的所有学生报告',
            ]
        }
        else if (userRole === config.USER_ROLE_PUPIL) {
            userAuthorityList = [
                '查看本学生报告',
            ]
        }
        else {
            userAuthorityList = []
        }

        let contentAuthorityList = userAuthorityList.map((item, index) => {
            return (
                <div className="zx-user-autority-item">
                    <i className="material-icons">check_circle</i>
                    <span>{item}</span>
                </div>
            )
        });
        return(
            <div className="zx-user-autority-list-container">
                <div className="zx-user-autority-list">{contentAuthorityList}</div>

            </div>
        )
    }
}