import React, {Component} from 'react';

// class SectionWrongQuize extends Component{
//     constructor(){
//         super()
//     }
//
//     render(){
//         <div></div>
//     }
// }
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

class WrongQuizItem extends Component{

    render(){
        return(
            <div className="zx-wrong-quiz">
                <div className="zx-wrong-quiz-left">
                    <div className="zx-wrong-quiz-left-order">1</div>
                    <div className="zx-wrong-quiz-left-attention">关注度 <span>高</span></div>
                </div>
                <div className="zx-wrong-quiz-right">
                    <lu className="zx-wrong-quiz-right-content">
                        <li>
                            <span>满分</span><span>5</span>
                        </li>
                        <li>
                            <span>平均分</span><span>5</span>
                        </li>
                        <li>
                            <span>答对比例</span><span>5</span>
                        </li>
                    </lu>

                    <ul className="zx-wrong-quiz-right-content">
                        <li>
                            <span>满分人数</span><span>5</span>
                        </li>
                        <li>
                            <span><i class="material-icons">trending_up</i></span>
                            <span>考察知识点</span>
                        </li>
                        <li className="zx-wrong-quiz-right-content-top-items">
                            <span>5</span>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}
export default WrongQuizItem;