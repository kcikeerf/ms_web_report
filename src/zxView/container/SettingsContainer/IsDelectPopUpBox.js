import React,{Component} from 'react'
import $ from 'jquery';

class IsDelectPopUpBox extends Component{
    confirms(){
        this.props.isDelectUser(true);
        $('#isDelect').modal('close');
    }

    cancle(){
        this.props.isDelectUser(false);
        $('#isDelect').modal('close');
    }
    render(){
        return(
            <div id="isDelect" className="modal">
                <div className="modal-content">
                    <h4>甄学</h4>
                    <p>确定要解除已选中的用户吗</p>
                </div>
                <div className="modal-footer">
                    <a className="modal-action modal-close waves-effect waves-green btn-flat" onClick={this.confirms.bind(this)} >确定</a>
                    <a className="modal-action modal-close waves-effect waves-green btn-flat" onClick={this.cancle.bind(this)} >取消</a>
                </div>
            </div>
        )
    }
}

export default IsDelectPopUpBox;