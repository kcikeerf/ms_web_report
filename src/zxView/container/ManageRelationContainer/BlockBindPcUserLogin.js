import React from 'react';
import PropTypes from 'prop-types'; // ES6
import $ from 'jquery';

import handleResponseError from '../../misc/handleResponseError';

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

    componentDidMount(){
        $(document).ready(function () {
            $('.modal').modal({
                dismissible: false, // Modal can be dismissed by clicking outside of the modal
                opacity: .5, // Opacity of modal background
                inDuration: 300, // Transition in duration
                outDuration: 200, // Transition out duration
                startingTop: '4%', // Starting top style attribute
                endingTop: '15%', // Ending top style attribute
            });
        });
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
            let openid = getCookie(config.COOKIE.WX_OPENID);
            let unionid = getCookie(config.COOKIE.WX_UNIONID);
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
                    message:'关联成功！'
                });
                $('input').val('');
                removeCookie(config.API_ACCESS_TOKEN);
                $('#zx-bindUser-success-modal').modal('open');
                // this.context.router.push('/');
                // window.location.href = config.URL_HOME;
            }.bind(this));

            bindingPromise.fail(function (errorResponse) {
                handleResponseError(this ,errorResponse);
                let errorMessage;
                let repsonseJSON = errorResponse.responseJSON;
                if (repsonseJSON.code && repsonseJSON.message) {
                    errorMessage = repsonseJSON.message;
                    if (repsonseJSON.code === 'e41010') {
                        errorMessage = '甄学账号或密码错误'
                    }
                }
                else {
                    errorMessage = '网络异常，请稍后再试';
                }
                this.setState({
                    showMessage: true,
                    message: errorMessage
                });
            }.bind(this));
        }
    }

    confirm(){
        // this.context.router.push('/');
        createCookie(config.COOKIE.LOGIN_METHOD, config.LOGIN_WX_BIND_ACCOUNT);
        window.location.href = config.URL_HOME;

    }

    render() {
        let style = {
            margin:'0 auto',
            maxWidth: '450px',
            // minWidth: '400px'
        };
        let mainUserRole = this.props.mainUserRole;
        return (
            <div>
                <main className="zx-binding-login" style={style}>
                    <div className="zx-login-container z-depth-3">
                        <h4>当前是微信账号登录</h4>
                        <h4>请在下方输入账号和密码关联甄学账号</h4>
                        <div className="divider"></div>
                        {
                            this.state.showMessage &&
                            <div className="zx-form-message">{this.state.message}</div>
                        }
                        <form className="zx-form-group">
                            <div className="input-field">
                                <i className="material-icons prefix">account_circle</i>
                                <input id="zx-login-username" type="text" className="validate"/>
                                <label htmlFor="zx-login-username">账号</label>
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

                <div id="zx-bindUser-success-modal" className="modal">
                    <div className="modal-content">
                        <h4>账号关联成功！！！</h4>
                        <p>请跳转首页！</p>
                    </div>
                    <div className="modal-footer">
                        <button className="modal-action modal-close waves-effect waves-green btn-flat" onClick={this.confirm.bind(this)} >确定</button>
                    </div>
                </div>
            </div>
        )
    }
}

BlockBindUser.contextTypes = {
    router: PropTypes.object.isRequired
};

export default BlockBindUser;