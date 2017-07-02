import React, {Component} from 'react';

export class SectionWrongQuize extends Component{
    constructor(){
        super()
    }

    render(){
        let wrongData = this.props.data;
        let contentWrongQuizItem = wrongData.map(function (wrongObj,index) {
            return <WrongQuizItem key ={index} wrongQuizeData={wrongObj}/>
        })
        return(
            <div>{contentWrongQuizItem}</div>
        )
    }
}
//
// class WrongQuize extends Component{
//
//     render(){
//         return(
//             <div></div>
//         )
//     }
//
// }

export function handleWrongQuizeData(reportType, data) {
    let wrongArr = [];

    for(let i=0; i<data.length; i++){
        let wrong ={
            order:null,
            full:null,
            average:null,
            correct_percent:null,
            knowledge:null,
            correct_count:null,
            full_count:null
        }
        if(data[i].qzp_custom_order){
            wrong.order = data[i].qzp_custom_order;
        }else {
            if(data[i].qzp_system_order){
                wrong.order = data[i].qzp_system_order;
            }else {
                wrong.order = data[i].qzp_order;
            }
        }
        wrong.full =parseFloat(data[i].value.total_full_score/data[i].value.pupil_number).toFixed(2) ;
        wrong.average =parseFloat(data[i].value.score_average).toFixed(2);
        wrong.correct_percent = parseFloat(data[i].value.total_qzp_correct_percent*100).toFixed(2);
        wrong.knowledge = data[i].ckps.knowledge[0].checkpoint;
        wrong.correct_count = data[i].value.total_qzp_correct_count;
        wrong.full_count = data[i].value.pupil_number;

        wrongArr.push(wrong);
    }
    return wrongArr;
}

class WrongQuizItem extends Component{

    render(){
        let wrongObj = this.props.wrongQuizeData;
        return(
            <div className="zx-wrong-quiz">
                <div className="zx-wrong-quiz-title">
                    <div className="zx-wrong-quiz-order">
                        <i className="material-icons">subtitles</i>
                        <span>第{wrongObj.order}题</span>
                    </div>
                    <div className="zx-wrong-quiz-full">
                        <span><i className="material-icons">album</i></span>
                        <span>满分:</span>
                        <span>{wrongObj.full}</span>
                    </div>
                </div>
                <div className="zx-wrong-quiz-bottom">
                    <div className="zx-wrong-quiz-bottom-content">

                        <div className="zx-wrong-quiz-item">
                            <div className="zx-wrong-quiz-item-part">
                                <span>平均分:</span>
                                <span>{wrongObj.average}</span>
                            </div>
                            <div className="zx-wrong-quiz-item-part">
                                <span>答对比例：</span>
                                <span>{wrongObj.correct_percent}%</span>
                            </div>
                        </div>

                        <div className="zx-wrong-quiz-item">
                            <div className="zx-wrong-quiz-item-part">
                                <span>考察知识点</span>
                                <span></span>
                            </div>
                            <div className="zx-wrong-quiz-item-part">
                                <span>{wrongObj.knowledge}</span>
                            </div>
                        </div>

                        <div className="zx-wrong-quiz-item">
                            <div className="zx-wrong-quiz-item-part">
                                <span>总人数:</span>
                                <span>{wrongObj.full_count}</span>
                            </div>
                            <div className="zx-wrong-quiz-item-part">
                                <span>满分人数:</span>
                                <span>{wrongObj.correct_count}</span>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}