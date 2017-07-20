import React, {Component} from 'react';
import PropTypes from 'prop-types'; // ES6
import $ from 'jquery';

import 'materialize-css/bin/materialize.css';
import 'materialize-css/bin/materialize.js';

import 'zx-style/style-general.css';
import 'zx-style/style-view.css';

import createCookie from 'zx-misc/createCookie';

import TopNavContainer from '../container/TopNavContainer/TopNavContainer';

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
            let loginApi = config.API_DOMAIN + config.API_LOGIN;
            let loginData = {
                grant_type: 'password',
                name: userName,
                password: password
            };
            $.post(loginApi, loginData, function(response, status) {
                    this.setState({
                        showMessage: false,
                        accessToken: response.access_token
                    });
                    createCookie('access_token', response.access_token);
                    this.context.router.push('/');
                }.bind(this),
                'json')
                .fail(function(xhr, status) {
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

    render() {
        let style = {
            height: '100%'
        };

        return (
            <div style={style} className="zx-body-container">
                <header className="zx-header">
                    <TopNavContainer />
                </header>
                <main className="zx-main-login">
                    <div className="zx-login-container z-depth-3">
                        <h1 className="zx-login-header">登录</h1>
                        <div className="divider"></div>
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
                </main>
            </div>
        )
    }
}

LogIn.contextTypes = {
    router: PropTypes.object.isRequired
};

export default LogIn;
