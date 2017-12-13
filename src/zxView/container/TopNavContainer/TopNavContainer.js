import React from 'react';
import PropTypes from 'prop-types'; // ES6
import {Map, is} from 'immutable';
import $ from 'jquery';

import {createCookie, getCookie, removeCookie} from 'zx-misc/handleCookie';

import logo from 'zx-img/logo2.svg';

import handleLogOut from '../../misc/handleLogOut';

let config = require('zx-const')[process.env.NODE_ENV];

class TopNav extends React.Component {
    shouldComponentUpdate(nextProps, nextState) {
        let propsMap = Map(this.props);
        let nextPropsMap = Map(nextProps);
        return !is(propsMap, nextPropsMap);
    }

    componentDidMount() {
        let $sideNav = $('.side-nav');
        $sideNav.css('transform', 'translateX(-125%)')
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

    // 导航到管理身份页面
    handleNav(e) {
        e.preventDefault();
        this.context.router.push('/manage-account');
    }

    // 退出
    handleLogout(e) {
        let main_access_token = getCookie(config.COOKIE.MAIN_ACCESS_TOKEN);
        let tokenData = {
            token: main_access_token
        };
        handleLogOut(this, tokenData);
    }

    //关联账号
    handleBindUser(e) {
        this.context.router.push('/manage-relation');
    }

    //错题打印
    handleIncorrectItem(e) {
        this.context.router.push('/incorrect-item');
    }

    toggleMenu() {
        let $zxIconbarTool = $(".qzxc");
        let $qwe = $(".qwe");
        let $zxMargin = $(".zx-iconbar");
        let $width = $zxMargin.css('width');
        let $sideNav = $('.side-nav');
        let transform = $sideNav.css('transform').split(/[()]/)[1];
        let translateX = transform.split(',')[4].trim();
        let $collapsibleBody = $('.collapsible-body');
        if ($width === "56px") {
            $qwe.css('overflow', 'visible');
            $zxMargin.css('width', '200px');
            $('.zx-main').css('margin-left', '200px');
            if (translateX === '56') {
                $sideNav.addClass('zx-collapse');
                $sideNav.css('transform', 'translateX(-125%)');
                $collapsibleBody.css('transform', 'translateX(-125%)');
                if ($(window).width() > 1230) {
                    // $('.zx-main').css('margin-left', '60px');
                }
                else {
                    // $('.zx-main').css('margin-left', '0px');
                }
            }
        }
        else if ($width === "200px") {
            $qwe.css('overflow', 'hidden');
            $zxMargin.css('width', '56px');
            $('.zx-main').css('margin-left', '56px');
            if (translateX === '200') {
                $sideNav.addClass('zx-collapse');
                $sideNav.css('transform', 'translateX(-125%)');
                $collapsibleBody.css('transform', 'translateX(-125%)');
                $zxIconbarTool.css('transform', 'translateX(-110px)');
            }
        }
        // material css框架使用的是translateX来改变左侧导航的出现隐藏
        // let $sideNav = $('.side-nav');
        // let transform = $sideNav.css('transform').split(/[()]/)[1];
        // let translateX = transform.split(',')[4].trim();
        // if (translateX === '-375') {
        //     $sideNav.removeClass('zx-collapse');
        //     $sideNav.css('transform', 'translateX(60px)');
        //     if ($(window).width() > 1230) {
        //         $('.zx-main').css('margin-left', '360px');
        //     }
        //     else {
        //         $('.zx-main').css('margin-left', '0px');
        //     }
        //
        // }
        // else if (translateX === '0') {
        //     $sideNav.addClass('zx-collapse');
        //     $sideNav.css('transform', 'translateX(-125%)');
        //     if ($(window).width() > 1230) {
        //         $('.zx-main').css('margin-left', '60px');
        //     }
        //     else {
        //         $('.zx-main').css('margin-left', '0px');
        //     }
        // }
        // else if (translateX === '60') {
        //     $sideNav.addClass('zx-collapse');
        //     $sideNav.css('transform', 'translateX(-125%)');
        //     if ($(window).width() > 1230) {
        //         $('.zx-main').css('margin-left', '60px');
        //     }
        //     else {
        //         $('.zx-main').css('margin-left', '0px');
        //     }
        // }
    }

    render() {
        let message, mainUserName;
        let loginMethod = this.props.loginMethod;
        switch (this.props.iconMessage) {
            case 'group_add':
                message = '账号关联';
                break;
            case 'settings':
                message = '身份管理';
                break;
            case 'print':
                message = '可下载测试列表';
                break;
            case 'undefined':
                message = '甄学';
                break;
        }

        if (loginMethod === config.LOGIN_ACCOUNT) {
            if (this.props.mainUser.name === '-') {
                mainUserName = config.VISITOR;
            }
            else {
                mainUserName = this.props.mainUser.name;
            }
        } else {
            if (this.props.mainUser && this.props.mainUser.name !== '-') {
                mainUserName = this.props.mainUser.name;
            }
            else if (this.props.mainUser && this.props.mainUser.third_party &&
                this.props.mainUser.third_party[loginMethod] &&
                this.props.mainUser.third_party[loginMethod].nickname) {
                mainUserName = this.props.mainUser.third_party[loginMethod].nickname;
            }
            else {
                mainUserName = config.VISITOR;
            }
        }

        return (
            <div className="navbar-fixed">
                <nav>
                    <div className="nav-wrapper">
                        <div className="row">
                            <div className="col s12">
                                {
                                    this.props.mainAccessToken &&
                                    <i className="material-icons zx-menu-collapse-btn zx-main-left"
                                       onClick={this.toggleMenu.bind(this)}>menu</i>
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
                                            <a onClick={this.handleHome.bind(this)}>
                                                <i className="material-icons left zx-lessen-margin">arrow_back</i>返回
                                            </a>
                                        </li>
                                    }
                                </ul>
                                {
                                    this.props.mainAccessToken &&
                                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                                        <a className='dropdown-button waves-effect waves-light' href='#'
                                           data-activates='dropdown2'>
                                            <i className="material-icons left zx-lessen-margin">build</i>
                                            工具
                                            <i className="material-icons right zx-lessen-margin">expand_more</i>
                                        </a>

                                        <a className='dropdown-button waves-effect waves-light' href='#'
                                           data-activates='dropdown1'>
                                            <i className="material-icons left zx-lessen-margin">account_circle</i>
                                            {mainUserName}
                                            <i className="material-icons right zx-lessen-margin">expand_more</i>
                                        </a>

                                        <ul id='dropdown1' className='dropdown-content'>
                                            {
                                                this.props.mainAccessToken &&
                                                <li>
                                                    <a onClick={this.handleBindUser.bind(this)}>
                                                        <i className="material-icons left zx-lessen-margin">group_add</i>账号关联
                                                    </a>
                                                </li>
                                            }
                                            {
                                                this.props.mainAccessToken &&
                                                <li>
                                                    <a onClick={this.handleNav.bind(this)}>
                                                        <i className="material-icons left zx-lessen-margin">settings</i>身份管理
                                                    </a>
                                                </li>
                                            }
                                            {
                                                this.props.mainAccessToken &&
                                                <li>
                                                    <a onClick={this.handleLogout.bind(this)}>
                                                        <i className="material-icons left zx-lessen-margin">exit_to_app</i>退出
                                                    </a>
                                                </li>
                                            }
                                        </ul>
                                        <ul id='dropdown2' className='dropdown-content'>
                                            {
                                                this.props.mainAccessToken &&
                                                <li>
                                                    <a onClick={this.handleIncorrectItem.bind(this)}>
                                                        <i className="material-icons left zx-lessen-margin">print</i>错题打印
                                                    </a>
                                                </li>
                                            }
                                        </ul>
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