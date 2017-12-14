import React, {Component} from 'react';
import PropTypes from 'prop-types'; // ES6
// import $ from 'jquery';

import 'materialize-css/bin/materialize.css';
import 'materialize-css/bin/materialize.js';

import 'zx-style/style-general.css';
import 'zx-style/style-view.css';

// import {createCookie, getCookie, removeCookie} from 'zx-misc/handleCookie';

import TopNavContainer from '../container/TopNavContainer/TopNavContainer';
import ManageAccountContainer from '../container/ManageAccountContainer/ManageAccountContainer';

// let config = require('zx-const')[process.env.NODE_ENV];

class ManageAccount extends Component {
    constructor() {
        super();
        this.state = {
            iconMessage:'settings'
        };
    }

    render() {
        let style = {
            height: '100%'
        };

        return (
            <div style={style} className="zx-body-container">
                <header className="zx-header">
                    <TopNavContainer
                        iconMessage={this.state.iconMessage}
                        backBlock={true}
                    />
                </header>
                <main className="zx-main-settings">
                    <ManageAccountContainer />
                </main>
            </div>
        )
    }
}

ManageAccount.contextTypes = {
    router: PropTypes.object.isRequired
};

export default ManageAccount;
