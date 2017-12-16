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
                return <DashbordChildTable key={index} data={item.data} title={item.title} style1={item.style1} time={item.time} areaData={item.areaData}/>;
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

    let chinese = data.chinese ? data.chinese:null;
    let math = data.math ? data.math:null;
    let english = data.english ? data.english:null;

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

    if(test_uid){
        modifiedData.chinese = chinese;
        modifiedData.math = math;
        modifiedData.english = english;
    }else {
        if(chineseBaseTime === mathBaseTime && mathBaseTime === englishBaseTime && chineseBaseTime === englishBaseTime){
            modifiedData.chinese = chinese;
            modifiedData.math = math;
            modifiedData.english = english;
        }else {
            let timeData = handleQuizeTime(chineseBase,mathBase,englishBase);
            if(timeData.maxExt){
                if(timeData.maxExt === chineseExtDataPath){
                    modifiedData.chinese = chinese;
                }
                if(timeData.maxExt === mathExtDataPath){
                    modifiedData.math = math;
                }
                if(timeData.maxExt === englishExtDataPath){
                    modifiedData.english = english;
                }
            }else {
                if(timeData.maxTime === chineseBaseTime){
                    modifiedData.chinese = chinese;
                }
                if(timeData.maxTime === mathBaseTime){
                    modifiedData.math = math;
                }
                if(timeData.maxTime === englishBaseTime){
                    modifiedData.english = english;
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
        areaData:null,
        data:[]
    };
    let chineseBase = data.chinese?data.chinese.basic:null;
    let mathBase = data.math?data.math.basic:null;
    let englishBase =data.english?data.english.basic:null;

    let handleIsSameqiuzeData = handleIsSameqiuze(data);
    let chineseData = handleIsSameqiuzeData.chinese?handleIsSameqiuzeData.chinese.school:null;
    let mathData = handleIsSameqiuzeData.math?handleIsSameqiuzeData.math.school:null;
    let englishData = handleIsSameqiuzeData.english?handleIsSameqiuzeData.english.school:null;

    //区域平均分分化度数据
    let chineseAreaData = handleIsSameqiuzeData.chinese?handleIsSameqiuzeData.chinese.basic.area_data:null;
    let mathAreaData = handleIsSameqiuzeData.math?handleIsSameqiuzeData.math.basic.area_data:null;
    let englishAreaData = handleIsSameqiuzeData.english?handleIsSameqiuzeData.english.basic.area_data:null;

    let areaPupil;
    if(chineseAreaData){
        areaPupil = chineseAreaData.pupil_number;
    }else{
        if(mathAreaData){
            areaPupil = mathAreaData.pupil_number;
        }else{
            areaPupil = englishAreaData.pupil_number;
        }
    }
    let areaChineseAverage = chineseAreaData? parseFloat(chineseAreaData.score_average).toFixed(2):null;
    let areaChineseDiff = chineseAreaData? parseFloat(chineseAreaData.diff_degree).toFixed(2):null;
    let areaMathAverage = mathAreaData? parseFloat(mathAreaData.score_average).toFixed(2):null;
    let areaMathDiff = mathAreaData? parseFloat(mathAreaData.diff_degree).toFixed(2):null;
    let areaEnglishAverage = englishAreaData? parseFloat(englishAreaData.score_average).toFixed(2):null;
    let areaEnglishDiff = englishAreaData? parseFloat(englishAreaData.diff_degree).toFixed(2):null;

    let areaObj = {
        label:'区域',
        pupil:areaPupil,
        chinese:{
            average:areaChineseAverage,
            diff:areaChineseDiff
        },
        math:{
            average:areaMathAverage,
            diff:areaMathDiff
        },
        english:{
            average:areaEnglishAverage,
            diff:areaEnglishDiff
        }
    };
    modifiedData.areaData = areaObj;

    let timeData = handleQuizeTime(chineseBase,mathBase,englishBase);

    modifiedData.time = timeData.maxTime;

    let forData;
    if(chineseData){
        forData = chineseData;
    }else{
        if(mathData){
            forData = mathData;
        }else {
            forData = englishData;
        }
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
        let handleHightData = handleSchoolBase(highData,'高中测试情况','cyan darken-1');
        modifiedData.push(handleHightData);
    }
    return modifiedData;
}