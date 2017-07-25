import React, {Component} from 'react'
import $ from 'jquery';
import PropTypes from 'prop-types'; // ES6

class DelectSuccessPopUpBox extends Component {
    cancle() {
        $('#zx-modals-delect-box').modal('close');
    }

    blackHome() {
        this.context.router.push('/');
    }

    render() {
        let messageData = this.props.data;
        let message;
        if (messageData) {
            message = messageData.map(function (obj, index) {
                return <li key={index}>{obj.message}</li>
            })
        }

        return (
            <div id="zx-modals-delect-box" className="modal">
                <div className="modal-content">
                    <h4>甄学</h4>
                    <ul>{message}</ul>
                </div>
                <div className="modal-footer">
                    <a href="javascript:;" className="modal-action modal-close waves-effect waves-green btn-flat"
                       onClick={this.cancle.bind(this)}>留在此页</a>
                    <a href="javascript:;" className="modal-action modal-close waves-effect waves-green btn-flat"
                       onClick={this.blackHome.bind(this)}>返回首页</a>
                </div>
            </div>
        )
    }
}
DelectSuccessPopUpBox.contextTypes = {
    router: PropTypes.object.isRequired
};

export default DelectSuccessPopUpBox;