import React, {Component} from 'react';
import PropTypes from 'prop-types'; // ES6
import $ from 'jquery';

import 'materialize-css/bin/materialize.css';
import 'materialize-css/bin/materialize.js';

import 'zx-style/style-general.css';
import 'zx-style/style-view.css';

import {createCookie, getCookie, removeCookie} from 'zx-misc/handleCookie';

import TopNavContainer from '../container/TopNavContainer/TopNavContainer';
import SettingsContainer from '../container/SettingsContainer/SettingsContainer';

let config = require('zx-const')[process.env.NODE_ENV];

class Settings extends Component {
    constructor() {
        super();
        let mainAccessToken = getCookie(config.COOKIE.MAIN_ACCESS_TOKEN);
        this.state = {
            mainAccessToken: (mainAccessToken !== '') ? mainAccessToken : null,
            mainUser: null
        };
    }

    handleMainUserName(name) {
        this.setState({
            mainUser: name
        });
    }

    render() {
        let mainAccessToken = this.state.mainAccessToken;
        let mainUser = this.state.mainUser;
        let style = {
            height: '100%'
        };

        return (
            <div style={style} className="zx-body-container">
                <header className="zx-header">
                    <TopNavContainer mainAccessToken={mainAccessToken} mainUser={mainUser} backBlock={true}/>
                </header>
                <main className="zx-main-settings">
                    <SettingsContainer handleMainUserName={this.handleMainUserName.bind(this)}/>
                </main>
            </div>
        )
    }
}

Settings.contextTypes = {
    router: PropTypes.object.isRequired
};

export default Settings;
