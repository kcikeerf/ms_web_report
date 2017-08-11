import React, {Component} from 'react';
import PropTypes from 'prop-types'; // ES6
import $ from 'jquery';

import 'materialize-css/bin/materialize.css';
import 'materialize-css/bin/materialize.js';

import 'zx-style/style-general.css';
import 'zx-style/style-view.css';

import {createCookie, getCookie, removeCookie} from 'zx-misc/handleCookie';

import handleLogin from '../misc/handleLogin';

import wxLogin from 'zx-lib/wx/wxLogin.js';

let config = require('zx-const')[process.env.NODE_ENV];

class LogIn extends Component {
    constructor() {
        super();
        this.state = {
            accessToken: null,
            showMessage: false,
            message: null
        };
    }

    componentDidMount() {
        // 初始化tabs
        $('ul.tabs').tabs();

        wxLogin({
            id:'zx-login-wx-container',
            appid: config.WX_LOGIN_APPID,
            scope: config.WX_LOGIN_SCOPE,
            redirect_uri: config.WX_LOGIN_REDIRECT,
            state: config.WX_LOGIN_STATE,
            //href: config.WX_LOGIN_HREF
        });
    }

    handleLogin(e) {
        e.preventDefault();
        let form = $(e.target).parents('form');
        let userName = form.find('#login_username').val();
        let password = form.find('#login_password').val();

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
            let loginData = {
                grant_type: 'password',
                name: userName,
                password: password
            };
            let loginPromise = handleLogin(loginData);

            loginPromise.done(function (response) {
                this.setState({
                    showMessage: false,
                    accessToken: response.access_token
                });
                createCookie(config.COOKIE.MAIN_ACCESS_TOKEN, response.access_token);
                this.context.router.push('/');
            }.bind(this));

            loginPromise.fail(function (errorResponse) {
                let repsonseJSON = errorResponse.responseJSON;
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

    render() {
        let style = {
            height: '100%'
        };

        return (
            <div style={style} className="zx-body-container">
                <main className="zx-main-login">
                    <div className="zx-login-container z-depth-3">
                        <h1 className="zx-login-header">甄学测评数据中心</h1>
                        <div className="row">
                            <div className="col s12">
                                <ul className="tabs">
                                    <li className="tab col s6"><a href={'#zx-login-tab1'} className="active">账号登录</a></li>
                                    <li className="tab col s6"><a href={'#zx-login-tab2'}>微信登录</a></li>
                                </ul>
                            </div>
                            <div id={'zx-login-tab1'} className="col s12">
                                <div className="section">
                                    {
                                        this.state.showMessage &&
                                        <div className="zx-form-message">{this.state.message}</div>
                                    }
                                    <form className="zx-form-group">
                                        <div className="input-field">
                                            <i className="material-icons prefix">account_circle</i>
                                            <input id="login_username" type="text" className="validate" />
                                            <label htmlFor="login_username">用户名</label>
                                        </div>
                                        <div className="input-field">
                                            <i className="material-icons prefix">lock</i>
                                            <input id="login_password" type="password" className="validate" />
                                            <label htmlFor="login_password">密码</label>
                                        </div>
                                        <button className="waves-effect waves-light btn-large zx-login-btn" onClick={this.handleLogin.bind(this)}>登录</button>
                                    </form>
                                </div>
                            </div>
                            <div id={'zx-login-tab2'} className="col s12">
                                <div className="section">
                                    <div id='zx-login-wx-container'></div>
                                </div>
                            </div>
                        </div>

                    </div>
                </main>
            </div>
        )
    }
}

LogIn.contextTypes = {
    router: PropTypes.object.isRequired
};

export default LogIn;
