import React, {Component} from 'react';
import $ from 'jquery';

import 'materialize-css/bin/materialize.css';
import 'materialize-css/bin/materialize.js';
import 'materialize-css/js/init';

import '../../style/style-general.css';
import '../../style/style-view.css';

import getCookie from 'zx-misc/getCookie';
import createCookie from 'zx-misc/createCookie';

import TopNav from '../component/TopNav';

let config = require('zx-const')[process.env.NODE_ENV];

class LogIn extends Component {
    constructor() {
        super();
        this.state = {
            showMessage: false,
            message: null
        };
    }

    handleLogin(e) {
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
            this.setState({
                showMessage: false
            });
            let loginApi = config.API_DOMAIN + config.API_LOGIN;
            let loginData = {
                grant_type: 'password',
                name: userName,
                password: password
            };
            let loginPromise = $.post(loginApi, loginData);
            loginPromise.done(function (loginResponse) {
                console.log(loginResponse);
            }.bind(this));
            loginPromise.fail(function (errorResponse) {
                let status = errorResponse.status;
                let repsonseText = errorResponse.responseText;
                let error = JSON.parse(repsonseText).error;
                if (error === 'invalid_grant') {
                    this.setState({
                        showMessage: true,
                        message: '用户名或密码错误'
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
                    <TopNav />
                </header>
                <main className="zx-main-login">
                    <div className="zx-login-container z-depth-3">
                        <h1>登录</h1>
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
                                <i className="material-icons prefix">account_circle</i>
                                <input id="login_password" type="password" className="validate" />
                                <label htmlFor="login_password">密码</label>
                            </div>
                            <button className="waves-effect waves-light btn-large" onClick={this.handleLogin.bind(this)}>登录</button>
                        </form>
                    </div>
                </main>
            </div>
        )
    }
}

export default LogIn;
