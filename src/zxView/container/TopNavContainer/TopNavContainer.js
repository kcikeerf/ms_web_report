import React from 'react';
import PropTypes from 'prop-types'; // ES6
import $ from 'jquery';

import {createCookie, getCookie, removeCookie} from 'zx-misc/handleCookie';
import logo from 'zx-img/logo2.svg';
let config = require('zx-const')[process.env.NODE_ENV];

class TopNav extends React.Component {
    componentDidMount() {
    }

    componentDidUpdate() {
        $('.dropdown-button').dropdown({
                inDuration: 300,
                outDuration: 225,
                // constrainWidth: false, // Does not change width of dropdown to that of the activator
                hover: false, // Activate on hover
                gutter: 1, // Spacing from edge
                belowOrigin: true, // Displays dropdown below the button
                alignment: 'left', // Displays dropdown with edge aligned to the left of button
                stopPropagation: false // Stops event propagation
            }
        );
    }

    // 导航到主页
    handleHome(e) {
        e.preventDefault();
        this.context.router.push('/');
    }

    // 导航到 设置 页面
    handleNav(e) {
        e.preventDefault();
        this.context.router.push('/settings');
    }

    // 退出
    handleLogout(e) {
        removeCookie(config.COOKIE.MAIN_ACCESS_TOKEN);
        this.context.router.push('/login');
    }

    //绑定用户
    handleBindUser(e){
        this.context.router.push('/bindUser');
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
        let message, mainUsername;
        switch (this.props.iconMessage) {
            case 'group_add':
                message = '关联微信';
                break;
            case 'settings':
                message = '身份管理';
                break;
            case 'undefined':
                message = '甄学';
                break
        }

        if (this.props.mainUser) {
            mainUsername = this.props.mainUser.name;
        }
        return (
            <div className="navbar-fixed">
                <nav>
                    <div className="nav-wrapper">
                        <div className="row">
                            <div className="col s12">
                                {
                                    this.props.mainAccessToken &&
                                    <i className="material-icons zx-menu-collapse-btn" onClick={this.toggleMenu.bind(this)}>menu</i>
                                }
                                <div className="brand-logo">
                                    <img className="svg-style" src={logo} alt="甄学"/>
                                </div>
                                <a className="brand-logo zx-margin-left"
                                   onClick={this.handleHome.bind(this)}>{message}</a>
                                <ul id="nav-mobile" className="right hide-on-med-and-down">
                                    {
                                        this.props.backBlock &&
                                        <li>
                                            <a
                                                // className="waves-effect waves-light btn amber darken-1"
                                                onClick={this.handleHome.bind(this)}
                                            >
                                                <i className="material-icons left zx-lessen-margin">arrow_back</i>返回
                                            </a>
                                        </li>
                                    }
                                </ul>
                                {
                                    this.props.mainAccessToken &&
                                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                                        <a className='dropdown-button waves-effect waves-light' href='#'
                                           data-activates='dropdown1'>
                                            <i className="material-icons left zx-lessen-margin">account_circle</i>
                                            {mainUsername}
                                            <i className="material-icons right zx-lessen-margin">expand_more</i>
                                        </a>


                                        <ul id='dropdown1' className='dropdown-content'>
                                            {
                                                this.props.mainAccessToken &&
                                                <li>
                                                    <a
                                                        // className="waves-effect waves-light btn amber darken-1"
                                                        onClick={this.handleBindUser.bind(this)}
                                                    >
                                                        <i className="material-icons left zx-lessen-margin">group_add</i>关联微信
                                                    </a>
                                                </li>
                                            }
                                            {
                                                this.props.mainAccessToken &&
                                                <li>
                                                    <a
                                                        // className="waves-effect waves-light btn amber darken-1"
                                                        onClick={this.handleNav.bind(this)}
                                                    >
                                                        <i className="material-icons left zx-lessen-margin">settings</i>身份管理
                                                    </a>
                                                </li>
                                            }
                                            {
                                                this.props.mainAccessToken &&
                                                <li>
                                                    <a
                                                        // className="waves-effect waves-light btn amber darken-1"
                                                        onClick={this.handleLogout.bind(this)}
                                                    >
                                                        <i className="material-icons left zx-lessen-margin">exit_to_app</i>退出
                                                    </a>
                                                </li>
                                            }
                                        </ul>
                                        {/*
                                     <li>
                                     <a
                                     className="waves-effect waves-light btn disabled"
                                     >
                                     <i className="material-icons left">print</i>打印
                                     </a>
                                     </li>
                                    */}

                                    </ul>
                                }
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