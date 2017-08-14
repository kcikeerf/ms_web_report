import React, {Component} from 'react';
import zxImg from 'zx-img/wx-img.png';
class BlockBindWxUserLogin extends Component {
    render() {
        return (
            <div className="section">
                <div id="zx-login-wx-container" className="zx-login-wx-bind">
                    <div className="zx-login-wx-img">
                        <img src={zxImg} alt=""/>
                    </div>
                    <div className="zx-wx-bindlogin-title">
                        请使用微信“扫一扫”扫描二维码以关联
                    </div>
                </div>

                <div className="zx-wx-bindlogin-tip">
                    <h3>当前PC端xxxx账号登录，</h3>
                    <span>微信扫一扫左边二维码可以关联微信账号。</span>
                </div>
            </div>
        )
    }
}

export default BlockBindWxUserLogin;