import React,{Component} from 'react'
import PropTypes from 'prop-types'; // ES6
import $ from 'jquery';

class AddUserSuccessPopUpBox extends Component{
    backHome(){
        this.context.router.push('/');
    }

    render(){
        return(
            <div id="addUserPopUpBox" className="modal">
                <div className="modal-content">
                    <h4>甄学</h4>
                    <p>绑定用户成功！！！</p>
                </div>
                <div className="modal-footer">
                    <a href="javascript:;" className="modal-action modal-close waves-effect waves-green btn-flat" onClick={this.backHome.bind(this)} >返回首页</a>
                    <a href="javascript:;" className="modal-action modal-close waves-effect waves-green btn-flat" onClick={this.props.handleAddCompelet.bind(this)} >继续添加</a>
                </div>
            </div>
        )
    }
}
AddUserSuccessPopUpBox.contextTypes = {
    router: PropTypes.object.isRequired
};
export default AddUserSuccessPopUpBox;