import React, {Component} from 'react';

export class SectionWrongQuize extends Component {
    constructor() {
        super()
    }

    render() {
        let wrongData = this.props.data;
        let contentWrongQuizItem = wrongData.map(function (wrongObj, index) {
            return <WrongQuizItem key={index} wrongQuizeData={wrongObj}/>
        })
        return (
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

    for (let i = 0; i < data.length; i++) {
        let wrong = {
            order: null,
            full: null,
            average: null,
            correct_percent: null,
            knowledge: null,
            correct_count: null,
            pupil_number: null,
            type: null
        }
        if (data[i].qzp_custom_order) {
            wrong.order = data[i].qzp_custom_order;
        } else {
            if (data[i].qzp_system_order) {
                wrong.order = data[i].qzp_system_order;
            } else {
                wrong.order = data[i].qzp_order;
            }
        }
        wrong.full = parseFloat(data[i].value.total_full_score / data[i].value.pupil_number).toFixed(2);
        wrong.average = parseFloat(data[i].value.score_average).toFixed(2);
        wrong.correct_percent = parseFloat(data[i].value.total_qzp_correct_percent * 100).toFixed(2);
        wrong.knowledge = data[i].ckps.knowledge[0].checkpoint;
        wrong.correct_count = data[i].value.total_qzp_correct_count;
        wrong.pupil_number = data[i].value.pupil_number;
        wrong.type = data[i].qzp_type;

        wrongArr.push(wrong);
    }
    return wrongArr;
}

class WrongQuizItem extends Component {

    render() {
        let wrongObj = this.props.wrongQuizeData;
        let label_percent;
        if(wrongObj.type === '主观'){
            label_percent = '答对比例';
        }else if(wrongObj.type === '客观') {
            label_percent = '平均得分率';
        }
        return (
            <div className="zx-wrong-quiz">
                <div className="zx-wrong-quiz-title">
                    <div className="zx-wrong-quiz-order">
                        <i className="material-icons">subtitles</i>
                        <span>第{wrongObj.order}题</span>
                    </div>
                    <div className="zx-wrong-quiz-full">
                        <span><i className="material-icons">album</i></span>
                        <span>类型:</span>
                        <span>{wrongObj.type}题</span>
                    </div>
                </div>

                <div className="zx-wrong-quiz-content">

                    <div className="zx-wrong-quiz-item">
                        <div className="zx-wrong-quiz-item-part">
                            <span>平均分/满分:</span>
                            <span>{wrongObj.average}/{wrongObj.full}分</span>
                        </div>
                    </div>

                    <div className="zx-wrong-quiz-item">
                        <div className="zx-wrong-quiz-item-part">
                            <span>{label_percent}:</span>
                            <span>{wrongObj.correct_percent}%</span>
                        </div>
                    </div>

                    <div className="zx-wrong-quiz-item">
                        <div className="zx-wrong-quiz-item-part">
                            <span>满分人数/总人数:</span>
                            <span>{wrongObj.correct_count}/{wrongObj.pupil_number}人</span>
                        </div>
                    </div>
                </div>

                <div className="zx-wrong-quiz-bottom">
                    <div className="zx-wrong-quiz-item">
                        <div className="zx-wrong-quiz-item-part">
                            <span>考察知识点:</span>
                            <span>{wrongObj.knowledge}</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}