import React, {Component} from 'react';
import PropTypes from 'prop-types'; // ES6

import TopNavContainer from '../container/TopNavContainer/TopNavContainer';
import BindUserContainer from '../container/ManageRelationContainer/BindUserContainer';

class BindUser extends Component {
    constructor() {
        super();
        this.state = {
            iconMessage:'group_add'
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
                    <BindUserContainer />
                </main>
            </div>
        )
    }
}

BindUser.contextTypes = {
    router: PropTypes.object.isRequired
};

export default BindUser;