import React from 'react';
import PropTypes from 'prop-types'; // ES6
import $ from 'jquery';

import 'materialize-css/bin/materialize.css';
import 'materialize-css/bin/materialize.js';

import 'zx-style/style-general.css';
import 'zx-style/style-view.css';

import getCookie from 'zx-misc/getCookie';

let config = require('zx-const')[process.env.NODE_ENV];


class AddUserPopUp extends React.Component {
    constructor() {
        super();
        this.state = {
            accessToken: null,
            showMessage: false,
            message: null
        };
    }

    handleLogin(e) {
        e.preventDefault();
        let form = $(e.target).parents('form');
        let userName = form.find('#zx-login-username').val();
        let password = form.find('#zx-login-password').val();

        if (userName === '' && password !== '') {
            this.setState({
                showMessage: true,
                message: '请填写用户名'
            });
        }
        else if (userName !== '' && password === '') {
            this.setState({
                showMessage: true,
                message: '请填写密码'
            });
        }
        else if (userName === '' && password === '') {
            this.setState({
                showMessage: true,
                message: '请填写用户名和密码'
            });
        }
        else {
            let bindingApi = config.API_DOMAIN + config.API_BINDING_USER;
            let accessToken = getCookie('access_token');
            let bindingData = {
                access_token: accessToken,
                user_name: userName,
                password: password
            };
            console.log('bindingData', bindingData);
            $.post(bindingApi, bindingData, function (response, status) {
                    this.setState({
                        showMessage: false,
                        accessToken: response.access_token
                    });
                    $('#zx-adduser-modal').modal('close');
                    $('#zx-add-user-success-box').modal('open');
                    $('input').val('');
                }.bind(this),
                'json')
                .fail(function (xhr, status) {
                    let repsonseJSON = xhr.responseJSON;
                    if (repsonseJSON) {
                        let error = repsonseJSON.error;
                        if (error === 'invalid_grant') {
                            this.setState({
                                showMessage: true,
                                message: '用户名或密码错误'
                            });
                        }
                        else {
                            this.setState({
                                showMessage: true,
                                message: '网络异常，请稍后再试'
                            });
                        }
                    }
                    else {
                        this.setState({
                            showMessage: true,
                            message: '网络异常，请稍后再试'
                        });
                    }

                }.bind(this));
        }
    }

    closeBox(){
        $('#zx-adduser-modal').modal('close');
    }

    render() {
        let style = {
            maxWidth: '450px',
            minWidth: '400px'
        };
        return (
            <div>
                <div id="zx-adduser-modal" className="modal" style={style}>
                    <main className="zx-binding-login">
                        <div className="zx-login-container z-depth-3">
                            <a href="javascript:;" className="zx-close-adduser" onClick={this.closeBox.bind(this)}><i className="material-icons">close</i></a>
                            <h1 className="zx-login-header">绑定用户</h1>
                            <div className="divider"></div>
                            {
                                this.state.showMessage &&
                                <div className="zx-form-message">{this.state.message}</div>
                            }
                            <form className="zx-form-group">
                                <div className="input-field">
                                    <i className="material-icons prefix">account_circle</i>
                                    <input id="zx-login-username" type="text" className="validate"/>
                                    <label htmlFor="zx-login-username">用户名</label>
                                </div>
                                <div className="input-field">
                                    <i className="material-icons prefix">lock</i>
                                    <input id="zx-login-password" type="password" className="validate"/>
                                    <label htmlFor="zx-login-password">密码</label>
                                </div>
                                <button className="waves-effect waves-light btn-large zx-login-btn"
                                        onClick={this.handleLogin.bind(this)}>绑定
                                </button>
                            </form>
                        </div>
                    </main>
                </div>
            </div>
        )
    }
}

AddUserPopUp.contextTypes = {
    router: PropTypes.object.isRequired
};

export default AddUserPopUp;