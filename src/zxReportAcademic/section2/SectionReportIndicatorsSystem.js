import React,{Component} from 'react';

class BlockIndicatorsLvOneSystem extends Component{
    render(){
        return(
            <div>1</div>
        )
    }
}

class BlockIndicatorsLvTwoSystem extends Component{
    render(){
        return(
            <div>2</div>
        )
    }
}

class SectionReportIndicatorsSystem extends Component{

    render(){
        let title = this.props.title;
        console.log(this.props.data);
        return(
            <div className="zx-section-container">
                <div className="section">
                    <h2>{title}</h2>
                    <div className="row">
                        <div className="col s12">
                            <div className="zx-inclicators-System">
                                <BlockIndicatorsLvOneSystem />
                                <BlockIndicatorsLvTwoSystem />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="divider"></div>
            </div>
        )
    }
}

export default SectionReportIndicatorsSystem;