import React, {Component} from 'react';
import PropTypes from 'prop-types'; // ES6

import 'materialize-css/dist/css/materialize.css';
import 'materialize-css/dist/js/materialize.js';

import 'zx-style/style-general.css';
import 'zx-style/style-view.css';

import TopNavContainer from '../container/TopNavContainer/TopNavContainer';
import IncorrectItemContainer from '../container/IncorrectItemContainer/IncorrectItemContainer';

class IncorrentItem extends Component {
    constructor() {
        super();
        this.state = {
            iconMessage: 'print'
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
                    <IncorrectItemContainer/>
                </main>
            </div>
        )
    }
}

IncorrentItem.contextTypes = {
    router: PropTypes.object.isRequired
};

export default IncorrentItem;
