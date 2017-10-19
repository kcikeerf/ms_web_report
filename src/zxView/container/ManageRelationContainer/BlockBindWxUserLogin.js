import React, {Component} from 'react';
import wxLogin from 'zx-lib/wx/wxLogin.js';
import PropTypes from 'prop-types'; // ES6
import handleURLParameter from 'zx-misc/handleURLParameter';
import $ from 'jquery';
import {createCookie, getCookie, removeCookie} from 'zx-misc/handleCookie';

let config = require('zx-const')[process.env.NODE_ENV];

class BlockBindWxUserLogin extends Component {
    constructor() {
        super();
    }

    componentDidMount() {
        $('.modal').modal({
            dismissible: false, // Modal can be dismissed by clicking outside of the modal
            opacity: .5, // Opacity of modal background
            inDuration: 300, // Transition in duration
            outDuration: 200 // Transition out duration
        });

        wxLogin({
            id:'zx-login-wxBind-container',
            appid: config.WX_LOGIN_APPID,
            scope: config.WX_LOGIN_SCOPE,
            redirect_uri: config.WX_BIND_REDIRECT,
            state: config.WX_LOGIN_STATE,
            href: config.WX_LOGIN_HREF

        });

        let wxCode = handleURLParameter('code');
        if(wxCode){
            let wxAccessTokenData = {
                code: wxCode
            };
            let wxAccessTokenApi = config.WX_API_GET_WX_ACCESS + '?' + $.param(wxAccessTokenData);
            let wxAccessTokenPromise = $.get(wxAccessTokenApi);
            wxAccessTokenPromise.done(function (responseWx) {
                let parsedResponseWx = JSON.parse(responseWx);
                let wxOpenid = parsedResponseWx.openid;
                let wxUnionid = parsedResponseWx.unionid;
                if (parsedResponseWx.errcode) {
                    this.context.router.push('/login');
                }else {
                    let bindingApi = config.API_DOMAIN + config.API_BINDING_USER;
                    let mainAccessToken = this.props.mainAccessToken;
                    let bindingData = {
                        access_token: mainAccessToken,
                        target_user_from : 'wx',
                        current_platform : 'pc',
                        wx_openid:wxOpenid ,
                        wx_unionid : wxUnionid,
                        nickname:parsedResponseWx.nickname,
                        sex: parsedResponseWx.sex,
                        province: parsedResponseWx.province,
                        city: parsedResponseWx.city,
                        country: parsedResponseWx.country,
                        headimgurl:parsedResponseWx.headimgurl
                    };
                    let bindingPromise = $.post(bindingApi, bindingData);
                    bindingPromise.done(function (response) {
                        $('#zx-bind-wxUser-success-modal').modal('open');

                    }.bind(this));

                    bindingPromise.fail(function (error) {
                        $('#zx-bind-wxUser-error-modal').modal('open');

                    }.bind(this))
                }

            }.bind(this));
        }

    }
    handleConfirm(){
        this.context.router.push('/');
    }
    render() {
        let mainUserRole = this.props.mainUserRole;
        return (
            <div className="section">

                <div  className="zx-login-wx-bind">
                    <h4>当前是甄学账号登录</h4>
                    <h4>请使用微信扫描下方二维码关联微信</h4>
                    <div id="zx-login-wxBind-container"></div>
                </div>

                <div id="zx-bind-wxUser-success-modal" className="modal">
                    <div className="modal-content">
                        <h4>微信关联成功！！！</h4>
                        <p>请跳转到首页！</p>
                    </div>
                    <div className="modal-footer">
                        <button className="modal-action modal-close waves-effect waves-green btn-flat" onClick={this.handleConfirm.bind(this)}>确定</button>
                    </div>
                </div>

                <div id="zx-bind-wxUser-error-modal" className="modal">
                    <div className="modal-content">
                        <h4>微信关联失败！！！</h4>
                        <p>网络异常，跳转首页请稍后再试！</p>
                    </div>
                    <div className="modal-footer">
                        <button className="modal-action modal-close waves-effect waves-green btn-flat" onClick={this.handleConfirm.bind(this)}>确定</button>
                    </div>
                </div>
            </div>


        )
    }
}

BlockBindWxUserLogin.contextTypes = {
    router: PropTypes.object.isRequired
};

export default BlockBindWxUserLogin;