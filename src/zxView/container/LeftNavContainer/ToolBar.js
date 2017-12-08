import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types'; // ES6
import {Link} from 'react-router'
import $ from 'jquery';

import {createCookie, getCookie, removeCookie} from 'zx-misc/handleCookie';

let config = require('zx-const')[process.env.NODE_ENV];

export default class ToolBar extends React.Component {


    render() {
        let container;
        let selectedUserRole = getCookie("selectedUserRole");
        if (selectedUserRole === "area_administrator") {
            container =
                <div className="zx-iconbar-tool">
                    <ul>
                        <li className="nav-item">
                            <div className="qwee">
                                错题集打印
                            </div>
                        </li>
                    </ul>
                </div>
        }
        return (
            <div>
                {container}
            </div>
        )
    }
}



