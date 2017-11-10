import React,{Component} from 'react'

class IsDelectPopUpBox extends Component{
    confirms(){
        this.props.isPrintPaper(true);
    }

    cancle(){
        this.props.isPrintPaper(false);
    }
    render(){
        return(
            <div id="zx-is-delect-box" className="modal">
                <div className="modal-content">
                    <h4>甄学</h4>
                    <p>确定要打印本试卷的错题集吗？</p>
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