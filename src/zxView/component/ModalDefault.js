import React from 'react';
import $ from 'jquery';
//let config = require('zx-const')[process.env.NODE_ENV];

export default class ModalDefault extends React.Component {
    componentDidMount() {
        $(document).ready(function(){
            $('.modal').modal();
        });
    }
    render() {
        return (
            <div id="zxModalWarning" className="modal modal-fixed-footer">
                <div className="modal-content">
                    <h4>抱歉</h4>
                    <p>用户没有查看该报告的权限</p>
                </div>
                <div className="modal-footer">
                    <a href="#!" className="modal-action modal-close waves-effect waves-green btn-flat ">知道了</a>
                </div>
            </div>
        )
    }
}