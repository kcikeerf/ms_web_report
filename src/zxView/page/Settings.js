import React, {Component} from 'react';
import PropTypes from 'prop-types'; // ES6
import $ from 'jquery';

import 'materialize-css/bin/materialize.css';
import 'materialize-css/bin/materialize.js';

import 'zx-style/style-general.css';
import 'zx-style/style-view.css';

import TopNavContainer from '../container/TopNavContainer/TopNavContainer';
import SettingsContainer from '../container/SettingsContainer/SettingsContainer';

let config = require('zx-const')[process.env.NODE_ENV];

class Settings extends Component {
    constructor() {
        super();
        this.state = {
        };
    }

    render() {
        let style = {
            height: '100%'
        };

        return (
            <div style={style} className="zx-body-container">
                <header className="zx-header">
                    <TopNavContainer settingBlock={true} />
                </header>
                <main className="zx-main-settings">
                    <SettingsContainer />
                </main>
            </div>
        )
    }
}

Settings.contextTypes = {
    router: PropTypes.object.isRequired
};

export default Settings;
