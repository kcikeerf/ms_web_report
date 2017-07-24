import React,{Component} from 'react'
import $ from 'jquery';
import PropTypes from 'prop-types'; // ES6

class WarningPopUpBox extends Component{
    cancle(){
        $('#warningPopUpBox').modal('close');
    }
    render(){
        return(
            <div id="warningPopUpBox" className="modal">
                <div className="modal-content">
                    <h4>甄学</h4>
                    <p>{this.props.data}</p>
                </div>
                <div className="modal-footer">
                    <a href="javascript:;" className="modal-action modal-close waves-effect waves-green btn-flat" onClick={this.cancle.bind(this)}>确定</a>
                    <a href="javascript:;" className="modal-action modal-close waves-effect waves-green btn-flat" onClick={this.cancle.bind(this)}>取消</a>
                </div>
            </div>
        )
    }
}
WarningPopUpBox.contextTypes = {
    router: PropTypes.object.isRequired
};

export default WarningPopUpBox;