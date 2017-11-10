import React, {Component} from 'react';
import PropTypes from 'prop-types'; // ES6
import $ from 'jquery';

import 'materialize-css/bin/materialize.css';
import 'materialize-css/bin/materialize.js';

import '../../style/style-report.css';

import SectionIndex from '../section/SectionIndex2';
import BlockItemToWord from '../section/BlockItemToWord';

let config = require('zx-const')[process.env.NODE_ENV];

class ReportContainer extends Component {
    constructor() {
        super();
        this.state = {};
    }

    render() {
        return (
            <div>
                <BlockItemToWord/>
                <SectionIndex/>
            </div>
        )
    }
}

ReportContainer.contextTypes = {
    router: PropTypes.object.isRequired,
};

export default ReportContainer;
