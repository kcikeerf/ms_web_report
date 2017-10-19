import React from "react";
import DashbordChildTable from './DashbordChildTable'

export class BlockReportSchoolBase extends React.Component{
    constructor() {
        super();
    }
    render(){
        let data = this.props.data;
        let contentBase;
        if(data){
            contentBase = data.map(function (item,index) {
                return <DashbordChildTable key={index} data={item.data} title={item.title} style1={item.style1} time={item.time}/>;
            }.bind(this));
        }
        return(
            <div className="zx-dashboard-base">
                {contentBase}
            </div>
        )
    }

}


//挑出 最近一次考试的 时间和外挂码
function handleQuizeTime(chineseBase,mathBase,englishBase) {
    let modifiedData = {
        maxTime:null,
        maxExt:null
    };

    let chineseBaseTime =chineseBase? chineseBase.quiz_date.replace(/-/g,'\/'):'1970/01/01';
    let mathBaseTime = mathBase ? mathBase.quiz_date.replace(/-/g,'\/'):'1970/01/01';
    let englishBaseTime = englishBase?englishBase.quiz_date.replace(/-/g,'\/'):'1970/01/01';
    let max;
    if(chineseBaseTime>mathBaseTime){
        max = chineseBaseTime
    }else{
        max = mathBaseTime;
    }
    if(englishBaseTime>max){
        max = englishBaseTime;
    }
    modifiedData.maxTime = max;
    if(max === chineseBaseTime){
        modifiedData.maxExt = chineseBase.test_ext_data_path;
    }
    if(max === mathBaseTime){
        modifiedData.maxExt = mathBase.test_ext_data_path;
    }
    if(max === englishBaseTime){
        modifiedData.maxExt = englishBase.test_ext_data_path;
    }

    return modifiedData;
}

//挑选出是否是同一次考试
function handleIsSameqiuze(data) {
    let modifiedData = {
        chinese:null,
        math:null,
        english:null
    };
    //试卷是否有uid，如果有uid 证明是一次考试
    let test_uid = data.basic.bank_union_test_uid;

    let chinese = data.chinese;
    let math = data.math;
    let english = data.english;

    let chineseBase =chinese?chinese.basic:null;
    let mathBase =math?math.basic:null;
    let englishBase =english?english.basic:null;

    //外挂码
    let chineseExtDataPath = chineseBase?chineseBase.test_ext_data_path:null;
    let mathExtDataPath = mathBase?mathBase.test_ext_data_path:null;
    let englishExtDataPath = englishBase?englishBase.test_ext_data_path:null;

    let chineseBaseTime =chineseBase?chineseBase.quiz_date.replace(/-/g,'\/'):null;
    let mathBaseTime =mathBase?mathBase.quiz_date.replace(/-/g,'\/'):null;
    let englishBaseTime = englishBase?englishBase.quiz_date.replace(/-/g,'\/'):null;

    let chineseData =chinese ? chinese.school :null;
    let mathData = math ? math.school : null;
    let englishData = english ? english.school:null;

    if(test_uid){
        modifiedData.chinese = chineseData;
        modifiedData.math = mathData;
        modifiedData.english = englishData;
    }else {
        if(chineseBaseTime === mathBaseTime && mathBaseTime === englishBaseTime && chineseBaseTime === englishBaseTime){
            modifiedData.chinese = chineseData;
            modifiedData.math = mathData;
            modifiedData.english = englishData;
        }else {
            let timeData = handleQuizeTime(chineseBase,mathBase,englishBase);
            if(timeData.maxExt){
                if(timeData.maxExt === chineseExtDataPath){
                    modifiedData.chinese = chineseData;
                }
                if(timeData.maxExt === mathExtDataPath){
                    modifiedData.math = mathData;
                }
                if(timeData.maxExt === englishExtDataPath){
                    modifiedData.english = englishData;
                }
            }else {
                if(timeData.maxTime === chineseBaseTime){
                    modifiedData.chinese = chineseData;
                }
                if(timeData.maxTime === mathBaseTime){
                    modifiedData.math = mathData;
                }
                if(timeData.maxTime === englishBaseTime){
                    modifiedData.english = englishData;
                }
            }

        }
    }

    return modifiedData;
}

//计算表格数据
function handleSchoolBase(data,title,style1) {
    let modifiedData = {
        style1:style1,
        title:title,
        time:null,
        data:[]
    };
    let chineseBase = data.chinese?data.chinese.basic:null;
    let mathBase = data.math?data.math.basic:null;
    let englishBase =data.english?data.english.basic:null;

    let handleIsSameqiuzeData = handleIsSameqiuze(data);
    let chineseData = handleIsSameqiuzeData.chinese?handleIsSameqiuzeData.chinese:null;
    let mathData = handleIsSameqiuzeData.math?handleIsSameqiuzeData.math:null;
    let englishData = handleIsSameqiuzeData.english?handleIsSameqiuzeData.english:null;

    let timeData = handleQuizeTime(chineseBase,mathBase,englishBase);

    modifiedData.time = timeData.maxTime;

    let forData;
    if(chineseData){
        forData = chineseData;
    }else if(mathData){
        forData = mathData;
    }else if(englishData){
        forData = englishData;
    }

    for(let i=0;i<forData.length;i++){
        let tdArr = {
            label:null,
            pupil:null,
            chinese:{
                average:null,
                diff:null
            },
            math:{
                average:null,
                diff:null
            },
            english:{
                average:null,
                diff:null
            }
        };
        tdArr.label = forData[i].basic.school_name;
        tdArr.pupil = forData[i].data.pupil_number;
        if(chineseData){
            tdArr.chinese.average = parseFloat(chineseData[i].data.score_average).toFixed(2);
            tdArr.chinese.diff = parseFloat(chineseData[i].data.diff_degree).toFixed(2);
        }
        if(mathData){
            tdArr.math.average = parseFloat(mathData[i].data.score_average).toFixed(2);
            tdArr.math.diff = parseFloat(mathData[i].data.diff_degree).toFixed(2);
        }
        if(englishData){
            tdArr.english.average = parseFloat(englishData[i].data.score_average).toFixed(2);
            tdArr.english.diff = parseFloat(englishData[i].data.diff_degree).toFixed(2);
        }

        modifiedData.data.push(tdArr);
    }

    return modifiedData;
}

export function handleBlockReportSchoolBase(data) {
    let modifiedData = [];
    let blockData = data.blocks;
    if(Object.keys(blockData.primary_school_base).length > 1){
        let primaryData = blockData.primary_school_base;
        let handlePrimaryData = handleSchoolBase(primaryData,'小学测试情况','brown lighten-2');
        modifiedData.push(handlePrimaryData);
    }

    if(Object.keys(blockData.middle_school_base).length > 1){
        let middleData = blockData.middle_school_base;
        let handleMiddleData = handleSchoolBase(middleData,'中学测试情况','blue-grey lighten-1');
        modifiedData.push(handleMiddleData);
    }

    if(Object.keys(blockData.high_school_base).length > 1){
        let highData = blockData.high_school_base;
        let handleHightData = handleSchoolBase(highData,'高中猜测情况','cyan darken-1');
        modifiedData.push(handleHightData);
    }
    return modifiedData;
}