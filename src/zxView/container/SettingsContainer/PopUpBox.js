import React,{Component} from 'react'

class PopUpBox extends Component{
    render(){
        return(
            <div id="PopBox" className="modal">
                <div className="modal-content">
                    <h4>甄学</h4>
                    <p>{this.props.data}</p>
                </div>
                <div className="modal-footer">
                    <a className="modal-action modal-close waves-effect waves-green btn-flat">确定</a>
                </div>
            </div>
        )
    }
}

export default PopUpBox;