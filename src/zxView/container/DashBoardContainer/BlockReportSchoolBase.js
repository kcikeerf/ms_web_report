import React from "react";
import DashbordChildTable from './DashbordChildTable'

export class BlockReportSchoolBase extends React.Component{

    render(){
        let data = this.props.data;
        console.log(data);
        let contentBase;
        if(data){
            contentBase = data.map(function (item,index) {
                let title = item.title;
                let style1= item.style1;
                return <DashbordChildTable data={item.data} title={title} style1={style1}/>;
            }.bind(this));
        }
        return(
            <div className="zx-dashboard-base">
                {contentBase}
            </div>
        )
    }

}
function handleSchoolBase(data,title,style1) {
    let obj = {
        style1:style1,
        title:title,
        data:[]
    };

    let chineseData = data.chinese.school;
    let mathData = data.math.school;
    let englishData = data.english.school;

    if(chineseData.length!==0){
        for(let i=0;i<chineseData.length;i++){
            let tdArr = [];
            tdArr.push(chineseData[i].basic.school_name);
            tdArr.push(chineseData[i].data.pupil_number);
            tdArr.push(parseFloat(chineseData[i].data.score_average).toFixed(2));
            tdArr.push(parseFloat(chineseData[i].data.diff_degree).toFixed(2));
            obj.data.push(tdArr);
        }
    }
    if(mathData.length !==0){
        console.log(obj.data)
        for(let j=0;j<mathData.length;j++){
            if(obj.data.length === 0){
                let tdArr = [];
                tdArr.push(mathData[j].basic.school_name);
                tdArr.push(mathData[j].data.pupil_number);
                tdArr.push(parseFloat(mathData[j].data.score_average).toFixed(2));
                tdArr.push(parseFloat(mathData[j].data.diff_degree).toFixed(2));
                obj.data.push(tdArr);
            }else {
                let score_average = parseFloat(mathData[j].data.score_average).toFixed(2);
                let diff_degree = parseFloat(mathData[j].data.diff_degree).toFixed(2);
                obj.data[j].push(score_average);
                obj.data[j].push(diff_degree);
            }

        }
    }

    if(englishData.length !== 0){
        for(let k=0;k<englishData.length;k++){
            if(obj.data.length === 0){
                let tdArr = [];
                tdArr.push(englishData[k].basic.school_name);
                tdArr.push(englishData[k].data.pupil_number);
                tdArr.push(parseFloat(englishData[k].data.score_average).toFixed(2));
                tdArr.push(parseFloat(englishData[k].data.diff_degree).toFixed(2));
                obj.data.push(tdArr);
            }else {
                let score_average = parseFloat(englishData[k].data.score_average).toFixed(2)
                let diff_degree = parseFloat(englishData[k].data.diff_degree).toFixed(2);
                obj.data[k].push(score_average);
                obj.data[k].push(diff_degree);
            }

        }
    }

    return obj;
}

export function handleBlockReportSchoolBase(data) {
    let modifiedData = [];
    let blockData = data.blocks;
    console.log(data);
    if(Object.keys(blockData.primary_school_base).length !== 0){
        let primaryData = blockData.primary_school_base;
        let objData = handleSchoolBase(primaryData,'小学基本情况','brown lighten-2');
        modifiedData.push(objData);
    }

    if(Object.keys(blockData.middle_school_base).length !== 0){
        let middleData = blockData.middle_school_base;
        let objData = handleSchoolBase(middleData,'中学基本情况','blue-grey lighten-1');
        modifiedData.push(objData);
    }

    if(Object.keys(blockData.high_school_base).length !== 0){
        let highData = blockData.high_school_base;
        let objData = handleSchoolBase(highData,'高中基本情况','cyan darken-1');
        modifiedData.push(objData);
    }

    return modifiedData;
}