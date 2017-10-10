import React from 'react';
import PropTypes from 'prop-types'; // ES6
import { Map, is } from 'immutable';
import $ from 'jquery';

import {DashBordAreaProject,handleDashBord} from './DashBoardAreaProject';

import 'zx-style/customScrollBar/customScrollBar.css';
require('jquery-mousewheel')($);
require('malihu-custom-scrollbar-plugin')($);

let config = require('zx-const')[process.env.NODE_ENV];

class DashBordAreaContainer extends React.Component{
    constructor(){
        super();
        this.state = {
            data:null
        }
    }

    componentDidMount(){
        $('.zx-dashboard-container').mCustomScrollbar({
            theme: 'minimal-dark',
            scrollInertia: 400,
            mouseWheel:{ scrollAmount: 200 }
        });
        // this.handleDashbord(this.props.selectedAccessToken, this.props.selectedTestList, this.props.selectedUserRole);
    }

    componentWillReceiveProps(nextProps) {
        let propsMap = Map(this.props.selectedTestList);
        let nextPropsMap = Map(nextProps.selectedTestList);

        if (!is(propsMap, nextPropsMap)){
            this.handleDashbord(nextProps.selectedAccessToken, nextProps.selectedTestList, nextProps.selectedUserRole);
        }

        // if (nextProps.selectedAccessToken !== this.props.selectedAccessToken){
        //     this.handleDashbord(nextProps.selectedAccessToken, nextProps.selectedTestList, nextProps.selectedUserRole);
        // }
    }

    handleDashbord(selectedAccessToken, testList, userRole){
        let reprtDashbordApi = config.API_DOMAIN + config.API_GET_AREA_DASHBOARD;
        let reprtDashbordData = {
            access_token: selectedAccessToken
        };
        let reprtDashbordPromise = $.post(reprtDashbordApi, reprtDashbordData);
        reprtDashbordPromise.done(function (response) {
            this.setState({
               data:response
            });
        }.bind(this));
        reprtDashbordPromise.fail(function (error) {
            console.log(error);
        }.bind(this));
    }

    render(){
        let dataUser = {
            userName: this.props.selectedUserName,
            userRole: this.props.selectedUserRole
        };
        return(
            <div className="zx-dashboard-container">
                <DashBordAreaProject
                    data = {this.state.data}
                    dataUser={dataUser}
                    userDisplayName={this.props.selectedUserDisplayName}
                    handleReportIframeShow={this.props.handleReportIframeShow.bind(this)}
                />
            </div>
        )
    }
}

DashBordAreaContainer.contextType = {
    handleReportIframeShow: PropTypes.func
};

export default DashBordAreaContainer;