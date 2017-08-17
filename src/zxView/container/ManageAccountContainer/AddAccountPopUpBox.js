import React from 'react';
import PropTypes from 'prop-types'; // ES6
import $ from 'jquery';

import handleResponseError from '../../misc/handleResponseError';

let config = require('zx-const')[process.env.NODE_ENV];

class AddAccountPopUpBox extends React.Component {
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
                message: '请填写身份代码'
            });
        }
        else if (userName !== '' && password === '') {
            this.setState({
                showMessage: true,
                message: '请填写身份密码'
            });
        }
        else if (userName === '' && password === '') {
            this.setState({
                showMessage: true,
                message: '请填写身份代码和身份密码'
            });
        }
        else {
            let bindingApi = config.API_DOMAIN + config.API_BINDING_USER;
            let mainAccessToken = this.props.mainAccessToken;
            let bindingData = {
                access_token: mainAccessToken,
                target_user_from: 'password',
                user_name: userName,
                password: password
            };
            let bindingPromise = $.post(bindingApi, bindingData);

            bindingPromise.done(function (response) {
                if(response.code === 'i11000'){
                    $('input').val('');
                    $('#zx-adduser-modal').modal('close');
                    this.setState({
                        showMessage: false,
                        message: response.message
                    });
                    $('#zx-add-user-success-box').modal('open');
                }else if(response.code === 'i11002'){
                    this.setState({
                        showMessage: true,
                        message: '该身份与当前账号已经绑定'
                    });
                }
            }.bind(this));

            bindingPromise.fail(function (errorResponse) {
                handleResponseError(this ,errorResponse);
                let errorMessage;
                let repsonseJSON = errorResponse.responseJSON;
                if (repsonseJSON.code && repsonseJSON.message) {
                    errorMessage = repsonseJSON.message;
                    if (repsonseJSON.code === 'e41009') {
                        errorMessage = '身份代码或密码错误'
                    }
                }
                else {
                    errorMessage = '网络异常    ，请稍后再试';
                }
                this.setState({
                    showMessage: true,
                    message: errorMessage
                });
            }.bind(this));
        }
    }

    closeBox(){
        $('#zx-adduser-modal').modal('close');
        $('input').val('');
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
                            <h1 className="zx-login-header">绑定身份</h1>
                            <div className="divider"></div>
                            {
                                this.state.showMessage &&
                                <div className="zx-form-message">{this.state.message}</div>
                            }
                            <form className="zx-form-group">
                                <div className="input-field">
                                    <i className="material-icons prefix">account_circle</i>
                                    <input id="zx-login-username" type="text" className="validate"/>
                                    <label htmlFor="zx-login-username">身份代码</label>
                                </div>
                                <div className="input-field">
                                    <i className="material-icons prefix">lock</i>
                                    <input id="zx-login-password" type="password" className="validate"/>
                                    <label htmlFor="zx-login-password">身份密码</label>
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

AddAccountPopUpBox.contextTypes = {
    router: PropTypes.object.isRequired
};

export default AddAccountPopUpBox;