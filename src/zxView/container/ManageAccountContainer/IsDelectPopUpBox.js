import React,{Component} from 'react'

class IsDelectPopUpBox extends Component{
    confirms(){
        this.props.isDelectUser(true);
    }

    cancle(){
        this.props.isDelectUser(false);
    }
    render(){
        return(
            <div id="zx-is-delect-box" className="modal">
                <div className="modal-content">
                    <h4>甄学</h4>
                    <p>确定要解除已选中的身份吗?解除以后不再显示身份的信息</p>
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