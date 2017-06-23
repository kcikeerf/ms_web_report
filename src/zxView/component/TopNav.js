import React from 'react';
//import PropTypes from 'prop-types'; // ES6
import $ from 'jquery';

class TopNav extends React.Component {
    // 导航到 设置 页面
    handleNav(event) {
        event.preventDefault();
        //this.context.router.push('/settings');
    }
    toggleMenu(e) {
        if ($('.side-nav').hasClass('zx-collapse')) {
            $('.side-nav').removeClass('zx-collapse');
            $('.side-nav').show(200);
            $('.zx-main').css('margin-left', '300px');
        }
        else {
            $('.side-nav').addClass('zx-collapse');
            $('.side-nav').hide(200);
            $('.zx-main').css('margin-left', '0');
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
                                    <li><a onClick={this.handleNav.bind(this)}>设置</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        )
    }
}

// TopNav.contextTypes = {
//     router: PropTypes.object.isRequired
// };

export default TopNav;