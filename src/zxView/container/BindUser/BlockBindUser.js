import React from 'react';
import PropTypes from 'prop-types'; // ES6
import $ from 'jquery';

import {createCookie, getCookie, removeCookie} from 'zx-misc/handleCookie';

let config = require('zx-const')[process.env.NODE_ENV];

class BlockBindUser extends React.Component {
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
            let mainAccessToken = this.props.mainAccessToken;
            let openid = getCookie('wx_openid');
            let unionid = getCookie('wx_unionid');
            let bindingData = {
                access_token: mainAccessToken,
                target_user_from: 'zx',
                current_platform: 'wx',
                wx_openid: openid,
                wx_unionid : unionid,
                user_name: userName,
                password: password
            };
            let bindingPromise = $.post(bindingApi, bindingData);

            bindingPromise.done(function (response) {
                this.setState({
                    showMessage: false,
                    accessToken: response.access_token
                });
                $('input').val('');
            }.bind(this));

            bindingPromise.fail(function (errorResponse) {
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
            maxWidth: '450px',
            // minWidth: '400px'
        };
        return (
            <div>
                <main className="zx-binding-login" style={style}>
                    <div className="zx-login-container z-depth-3">
                        <h1 className="zx-login-header">关联账号</h1>
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
                                    onClick={this.handleLogin.bind(this)}>关联账号
                            </button>
                        </form>
                    </div>
                </main>
            </div>
        )
    }
}

BlockBindUser.contextTypes = {
    router: PropTypes.object.isRequired
};

export default BlockBindUser;