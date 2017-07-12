import React from 'react';
import PropTypes from 'prop-types'; // ES6
import $ from 'jquery';

import removeCookie from 'zx-misc/removeCookie';

class TopNav extends React.Component {
    componentDidMount() {
    }
    // 导航到 设置 页面
    handleNav(e) {
        e.preventDefault();
        //this.context.router.push('/settings');
    }
    // 退出
    handleLogout(e) {
        removeCookie('access_token');
        this.context.router.push('/login');
    }
    toggleMenu() {
        // material css框架使用的是translateX来改变左侧导航的出现隐藏
        let transform = $('.side-nav').css('transform').split(/[()]/)[1];
        let translateX = transform.split(',')[4].trim();
        if (translateX === '-315') {
            $('.side-nav').removeClass('zx-collapse');
            $('.side-nav').css('transform', 'translateX(0)');
            if ($(window).width() > 1230) {
                $('.zx-main').css('margin-left', '300px');
            }
            else {
                $('.zx-main').css('margin-left', '0px');
            }

        }
        else if (translateX === '0') {
            $('.side-nav').addClass('zx-collapse');
            $('.side-nav').css('transform', 'translateX(-105%)');
            if ($(window).width() > 1230) {
                $('.zx-main').css('margin-left', '0px');
            }
            else {
                $('.zx-main').css('margin-left', '0px');
            }
        }
    }

    render() {
        return (
            <div className="navbar-fixed">
                <nav>
                    <div className="nav-wrapper">
                        <div className="row">
                            <div className="col s12">
                                <i className="material-icons zx-menu-collapse-btn" onClick={this.toggleMenu.bind(this)}>menu</i>
                                <a href="#" className="brand-logo">甄学</a>
                                <ul id="nav-mobile" className="right hide-on-med-and-down">
                                    {/*
                                     <li>
                                     <a
                                     className="waves-effect waves-light btn disabled"
                                     >
                                     <i className="material-icons left">print</i>打印
                                     </a>
                                     </li>
                                    */}
                                    <li>
                                        <a
                                            className="waves-effect waves-light btn disabled"
                                            onClick={this.handleNav.bind(this)}
                                        >
                                            <i className="material-icons left">settings</i>设置
                                        </a>
                                    </li>

                                    {
                                        this.props.accessToken &&
                                        <li>
                                            <a
                                                className="waves-effect waves-light btn amber darken-1"
                                                onClick={this.handleLogout.bind(this)}
                                            >
                                                <i className="material-icons left">exit_to_app</i>退出
                                            </a>
                                        </li>
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        )
    }
}

TopNav.contextTypes = {
    router: PropTypes.object.isRequired
};

export default TopNav;